settings 	= require 'app/config/settings'
cameras  	= require 'controllers/engine/cameras'
engine 		= require 'controllers/engine/index'
Loader 		= require 'utils/loading/async_loader'
Mouse 		= require 'utils/mouse'
utils 		= require 'utils/utils'
win 		= require 'utils/window'
renderer    = require 'controllers/engine/renderer'

Experiment  	= require 'views/scenes/experiment'
lights 			= require 'views/scenes/elements/lights'
UI 				= require 'views/scenes/elements/ui'
SierpinskiData  = require 'views/scenes/elements/sierpinski'
GeometryBuilder = require 'views/scenes/elements/geometry_builder'
PathLookatFixed = require 'views/scenes/helpers/path_lookat_fixed'
PathLookatCurve = require 'views/scenes/helpers/path_lookat_curve'
Keyboard 	    = require 'utils/keyboard'

module.exports = class Elements extends Experiment

	ready : off

	geometry: ''
	distance: 0

	rx: 0.1
	ry: 0.1
	rz: 0.1

	fog_near: 0

	audio_pos_z: 0

	current_sound_vol: 0.5

	fog_color: 0x000000
	# color: '#000000'

	setup: ( manifest ) =>

		# @gui.addColor(@, 'color').onChange =>

		# 	@fog_color = String(@color).replace('#', '0x')

		# 	c.log @fog_color

		# 	@scene.fog.color.setHex @fog_color

		###
		Engine
		###

		engine.fov = @config.camera_fov

		###
		UI
		###
		@ui = new UI 'elements', @scene, manifest

		###
		Keyboard controls
		###

		@keyboard = new Keyboard $(window)

		###
		Scene
		###

		if @config.fog_enabled
			@scene.fog = new THREE.FogExp2( @fog_color, @config.fog_in_start )

			@gui.add @scene.fog, 'density', 0, 1

			@fog_near = @config.fog_near

		###
		Helpers
		###

		if settings.debug

			@scene.add new THREE.GridHelper 50, 10
			@scene.add new THREE.AxisHelper 10

			@scene.add new THREE.CameraHelper cameras.user

		###
		Create curve for camera
		###

		@path_in  = new PathLookatFixed 'path_in', @scene, @config.path_in, @config.path_in_lookat, 0x00FF00#, @gui, 1000
		@path_out = new PathLookatCurve 'path_out', @scene, @config.path_out, @config.path_out_lookat, 0x00FF00#, @gui, 200

		###
		Mouse
		###
		@mouse = new Mouse $('body')

		###
		Sounds
		###

		@set_props 'octahedron'

		@audio_pos_z = @config.audio_pos_z_in

		@sounds =
			background: utils.get_asset('background', manifest).data
			dodecahedron: utils.get_asset('aether', manifest).data
			octahedron: utils.get_asset('air', manifest).data
			hexahedron: utils.get_asset('earth', manifest).data
			tetrahedron: utils.get_asset('fire', manifest).data
			icosahedron: utils.get_asset('water', manifest).data

		for key, sound of @sounds
			sound.volume 0
			do sound.play
			sound.loop on

		do @update_sound_position

		@sounds.background.volume 0.5
		@sounds['octahedron'].fade 0, 0.5, 400

		###
		Configure engine
		###

		renderer.shadowMapEnabled = on
		renderer.shadowMapSoft 	  = on

		###
		Lights
		###

		@scene.add lights.ambient
		@scene.add lights.directional

		###
		Objects
		###

		@container = new THREE.Object3D

		@scene.add @container

		@mesh_container = new THREE.Object3D

		@container.add @mesh_container

		# Setup geometry builder
		@builder = new GeometryBuilder()

		# Create Sierpinski class
		@sierpinski = new SierpinskiData.SierpinskiPolyhedron()

		# Sphere for deformer
		params =
			color: 0xFF0000
			wireframe: true
			visible: false

		sphere_radius = @config.sphere_radius
		divisions     = 64

		@sphere = new THREE.Mesh(new THREE.SphereGeometry( sphere_radius, divisions, divisions ), new THREE.MeshLambertMaterial(params));

		@scene.add @sphere

		###
		GUI
		###
		labels = []

		for id of @config.geometries
			labels.push id

		folder_mesh = @gui.addFolder 'controller::elements::mesh'
		folder_fog  = @gui.addFolder 'controller::elements::fog'

		# do folder_mesh.open
		# do folder_fog.open

		folder_mesh.add(@, 'geometry', labels).onChange ( val ) => c.log val
		folder_mesh.add @config, 'radius', 20, 100
		folder_mesh.add @config, 'scale_ratio', 0, 10
		folder_mesh.addColor @config, 'color'
		folder_mesh.add @config, 'wireframe'
		folder_mesh.add @config, 'wireframe_thickness', 1, 10
		folder_mesh.add @config, 'blending', ['NormalBlending', 'AdditiveBlending']
		folder_mesh.add @config, 'opacity', 0, 1
		folder_mesh.add(@config, 'deform', -5, 5).onChange => do @deform_mesh

		folder_mesh.add(@, 'rx', 0, Math.PI*2)
		folder_mesh.add(@, 'ry', 0, Math.PI*2)
		folder_mesh.add(@, 'rz', 0, Math.PI*2)

		folder_fog.add(@config, 'fog_near', 0, 0.1)
		folder_fog.add(@config, 'fog_far', 0, 0.2)
		folder_fog.add(@config, 'fog', 0, 0.1).listen()

		@once 'generated', =>

			do @bind
			@emit 'setup:complete'

		do @generate


	set_props: ( @geometry_id ) =>

		data = @preset()

		for key, val of data
			@config[key] = val


	bind: ->

		c.debug 'binding'

		engine.on 'update', @update
		@keyboard.on 'key:down:space', @on_key_down
		@keyboard.on 'key:up:space', @on_key_up
		@ui.on 'change:geometry', @change_geometry
		@mouse.on 'move', @on_move
		@mouse.on 'down', @on_mouse_down

		do @ui.bind
		do @keyboard.bind
		do @mouse.bind

	unbind: ->

		c.debug 'unbinding'

		engine.off 'update', @update
		@keyboard.off 'key:down:space', @on_key_down
		@keyboard.off 'key:up:space', @on_key_up
		@ui.off 'change:geometry', @generate
		@mouse.off 'move', @on_move
		@mouse.off 'down', @on_mouse_down

		do @ui.unbind
		do @keyboard.unbind
		do @mouse.unbind

	on_key_down: =>

		c.log 'down'

		return if @is_transitioning_in
		return if @is_transition_disabled

		c.log 'x'

		do @transition_out_forward

	on_key_up: =>

		do @transition_out_backward


	change_geometry: ( id ) =>

		@sounds[@geometry_id].fade @current_sound_vol, 0, 400

		@set_props id

		do @disable_transition

		@ui.show_title id

		params =
			opacity: 1
			ease: Power3.easeOut
			onComplete: =>
				do @unbind
				do @generate

		TweenLite.to @ui.ui.transition_black, 3.5, params

		preset = @preset()

		@sounds[@geometry_id].fade 0, 0.5, 400


	calc_fog: -> @config.fog_far + @fog_near

	update: =>

		if @config.fog_enabled

			near = Math.max @config.fog_near, @fog_near

			if @mouse.is_dragging and not @is_transitioning_out

				percent = Math.abs(@mouse.normal_center_x) * 2

				@fog_near = utils.lerp @config.fog_near, 0.012, percent

				@sounds.background.volume @mouse.normal_x

				@current_sound_vol = 1 - @mouse.normal_x

				@sounds[@geometry_id].volume @current_sound_vol

			# c.log 'x', @fog_near

			###
			need to set cam zoom percent
			###
			@config.fog = do @calc_fog

			# if @config.fog < @config.fog_far
			# 	@config.fog = @config.fog_far

			@scene.fog.density = @config.fog


		if @ready

			@mesh.material.wireframe 		  = @config.wireframe
			@mesh.material.wireframeLinewidth = @config.wireframe_thickness
			@mesh.material.opacity 			  = @config.opacity

			color = @config.color.replace('#', '0x')
			@mesh.material.color.setHex(color)

			@mesh.rotation.x += 0.0005
			@mesh.rotation.y += 0.0005
			@mesh.rotation.z += 0.0005

			# c.log @audio_pos_z

			do @update_sound_position

			# @mesh.rotation.x = @rx
			# @mesh.rotation.y = @ry
			# @mesh.rotation.z = @rz

	update_sound_position: ->

		@sounds.background.pos 0, 0, @audio_pos_z
		@sounds[@geometry_id].pos 0, 0, @audio_pos_z

	on_move: =>

		return if @is_transitioning_out

		# distance = cameras.user.position.clone().distanceTo new THREE.Vector3
		# max 	 = 40

		# zoom = distance / 40

		# c.log zoom

		# return

		if @mouse.is_down

			x = (win.width  * 0.5) / win.width
			y = (win.height * 0.5) / win.height

			# distance = @mouse.distance_to x, y
			distance = @mouse.normal_x

			do @deform_tween?.kill

			params =
				distance: distance
				ease: Power2.easeOut
				onUpdate: =>

					@config.deform = @distance.map 0, 1, -1, 1, distance

					do @deform_mesh

			@deform_tween = TweenLite.to @, 0.3, params

			# z = 40 + (60 * Math.abs(@mouse.normal_center_x))
			# cameras.user.position.z = z

			z = -60 * Math.abs(@mouse.normal_center_x)
			@mesh_container.position.z = z

		if @ready

			do @mesh_rotate_tween?.kill

			angle = Math.PI * 0.01

			y = utils.lerp -angle, angle, @mouse.normal_x

			params =
				y: y
				ease: Power4.easeOut

			@mesh_rotate_tween = TweenLite.to @mesh_container.rotation, 5, params

			bounds = @config.cam_move_bounds

			min = new THREE.Vector2 -bounds, -bounds
			max = new THREE.Vector2 bounds, bounds

			do @mesh_position_tween?.kill

			x = utils.lerp min.x, max.x, @mouse.normal_x
			y = utils.lerp min.y, max.y, @mouse.normal_y

			params =
				x: x
				y: -y
				ease: Power4.easeOut

			@mesh_position_tween = TweenLite.to @mesh_container.position,5, params

			do @cam_position_tween?.kill

	on_mouse_down: =>

		do @force_transition_in_complete

	preset: -> @config.geometries[@geometry_id]

	generate: =>

		@mesh_container.remove(@mesh) if @mesh

		@ready = off

		data = @sierpinski.generate(@config.geometry, @config.radius, @config.iteration, @config.scale_ratio, 0)

		@builder.build(@config.geometry, data, @sierpinski.logarithmic_scale(), 0, @on_builder_complete)


	on_builder_complete: ( geometry ) =>

		# do @sounds.background.volume 0

		params =
			color 			   : @config.color
			wireframe 		   : @config.wireframe
			wireframeLinewidth : @config.wireframe_thickness
			blending 		   : THREE[@config.blending]
			opacity 		   : @config.opacity
			transparent 	   : on
			# map 			   : THREE.ImageUtils.loadTexture(settings.base_path+'/img/sierpinski/texture.jpg')

		@mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial params )

		@mesh.castShadow    = on
		@mesh.receiveShadow = on

		@mesh.rotation.x = @preset().rotate_x
		@mesh.rotation.y = @preset().rotate_y
		@mesh.rotation.z = @preset().rotate_z

		@mesh_container.add @mesh

		# calculate the distance between the geom vertex and a sphere vertex
		@data_map = []

		for g_v, i in @mesh.geometry.vertices

			distance = Infinity
			index    = 0

			g_v.weight   = Math.random()
			g_v.position = new THREE.Vector3( g_v.x, g_v.y, g_v.z )

			for s_v, j in @sphere.geometry.vertices

				distance_between_vertex_and_sphere_vertex = s_v.distanceTo(g_v)

				if distance_between_vertex_and_sphere_vertex < distance
					distance = distance_between_vertex_and_sphere_vertex
					index = j

			@data_map.push {vertex: index, distance: distance}

		@config.deform = 0
		@distance = 0.5 #set to center to avoid jump glitch
		do @deform_mesh

		data = @config.geometries[@geometry]

		@ready = on

		do @bind
		do @enable_transition

		@mesh_container.position.z = 0
		@fog_near = @config.fog_near

		params =
			opacity: 0
			ease: Power4.easeOut
			delay: 1.5
			onComplete: =>
				do @ui.hide_title

		TweenLite.to @ui.ui.transition_black, 2, params

		utils.delay 0.3, =>
			@emit 'generated'


	deform_mesh: ->

		for data, i in @data_map

			mesh_vertex_index   = i
			sphere_vertex_index = data.vertex

			percent = data.distance / 50

			v1 = @mesh.geometry.vertices[ mesh_vertex_index ].position
			v2 = @sphere.geometry.vertices[ sphere_vertex_index ]

			if v1.x is 0 and v1.y is 0 and v1.z is 0

			else

				new_position = v1.clone().lerp(v2.clone(), @config.deform )

				@mesh.geometry.vertices[ mesh_vertex_index ].x = new_position.x
				@mesh.geometry.vertices[ mesh_vertex_index ].y = new_position.y
				@mesh.geometry.vertices[ mesh_vertex_index ].z = new_position.z

		@mesh.geometry.verticesNeedUpdate = true
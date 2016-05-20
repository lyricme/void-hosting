happens  	= require 'happens'
settings 	= require 'app/config/settings'
cameras  	= require 'controllers/engine/cameras'
engine 		= require 'controllers/engine/index'
Loader 		= require 'utils/loading/async_loader'
Mouse 		= require 'utils/mouse'
utils 		= require 'utils/utils'

Experiment  = require 'views/scenes/experiment'
lights   	= require 'views/scenes/hires/lights'
config 		= require 'views/scenes/hires/config'
UI 			= require 'views/scenes/ui'
assets 		= require 'views/scenes/hires/assets'
PathLookatFixed = require 'views/scenes/helpers/path_lookat_fixed'
PathLookatCurve = require 'views/scenes/helpers/path_lookat_curve'

module.exports = class Hires extends Experiment

	material : null

	holding_frames: 0

	setup: ( manifest ) =>

		###
		Engine
		###

		engine.fov = config.camera_fov

		###
		UI
		###
		@ui = new UI 'hires', @scene, @gui

		###
		Scene
		###

		if config.fog_enabled
			@scene.fog = new THREE.FogExp2( 0x000000, config.fog_in_start )

			@gui.add @scene.fog, 'density', 0, 1


		###
		Helpers
		###

		if settings.debug

			@scene.add new THREE.GridHelper 50, 10
			@scene.add new THREE.AxisHelper 10

			@scene.add new THREE.CameraHelper cameras.user


		###
		Lights
		###

		@scene.add light for light in lights.all

		###
		Create curve for camera
		###

		@path_in  = new PathLookatFixed 'path_in', @scene, config.path_in, config.path_in_lookat, 0x00FF00#, @gui, 1000
		@path_out = new PathLookatCurve 'path_out', @scene, config.path_out, config.path_out_lookat, 0x00FF00, @gui, 100

		###
		Mouse
		###
		@mouse = new Mouse $('.hitarea')

		###
		GUI
		###

		@gui.addColor(config, 'color_left').name('Left color')
		@gui.addColor(config, 'color_right').name('Right color')
		@gui.addColor(config, 'color_directional').name('Directional color')

		@gui.add(config, 'speed', 0, 2).name( "Movement speed")
		@gui.add(config, 'camera_fov', 10, 200).listen().name( "Field of vision")
		@gui.add(config, 'line_thickness', 1, 8).name( "Line thickness")

		###
		Sound
		###
		Sound  = require 'views/scenes/hires/sound'
		@sound = new Sound

		setTimeout =>

			@sound.klank()
			@sound.percolation()
			@sound.clickable_distortion()
			@sound.background_atmos( 15 )

		, 1000

		###
		Objects
		###

		@container = new THREE.Object3D

		@scene.add @container

		urls = []
		for asset in manifest

			if asset.id in ['pos-x', 'neg-x', 'pos-y', 'neg-y', 'pos-z', 'neg-z']
				urls.push asset.src

		@cubemap 	   = THREE.ImageUtils.loadTextureCube(urls)
		@cubemap.format = THREE.RGBFormat

		shader = THREE.ShaderLib[ "cube" ]
		shader.uniforms[ "tCube" ].texture = @cubemap

		@material = new THREE.ShaderMaterial( {
			fragmentShader: shader.fragmentShader
			vertexShader: shader.vertexShader
			uniforms: shader.uniforms
			depthWrite: false,
			side: THREE.BackSide
		})

		geometry = @loader.get_asset('hires_logo').data

		# scale geometry
		for v in geometry.vertices
			v.multiplyScalar 10

		geometry.__dirtyVertices = true

		params =
			shading: THREE.FlatShading
			color: 0xFFFFFF

		@mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(params))

		@mesh.position.x = 20

		@scene.add @mesh

		do @add_triangles
		do @bind

		@emit 'setup:complete'


	add_triangles: ->

		len = @mesh.geometry.vertices.length

		random_vertex = (len) -> Math.floor Math.random() * len

		lines  = []
		TWO_PI = Math.PI * 2

		Triangle = (size) ->

			position = new THREE.Vector3()

			v1 = position.clone()
			v1.x += size * Math.cos(Math.random() * TWO_PI)
			v1.y += size * Math.sin(Math.random() * TWO_PI)
			v1.z += size * Math.sin(Math.random() * TWO_PI)

			v2 = position.clone()
			v2.x += size * Math.cos(Math.random() * TWO_PI)
			v2.y += size * Math.sin(Math.random() * TWO_PI)
			v2.z += size * Math.sin(Math.random() * TWO_PI)

			v3 = position.clone()
			v3.x += size * Math.cos(Math.random() * TWO_PI)
			v3.y += size * Math.sin(Math.random() * TWO_PI)
			v3.z += size * Math.sin(Math.random() * TWO_PI)

			tri = new THREE.Geometry()
			tri.vertices.push v1
			tri.vertices.push v2
			tri.vertices.push v3

			tri.faces.push( new THREE.Face3( 0, 1, 2 ) )
			tri.computeFaceNormals()

			tri


		min_size = 1
		max_size = 50

		triangles = []

		buffer_geom = new THREE.Geometry()

		len = 1000

		for i in [0...len]

			pos = @mesh.geometry.vertices[random_vertex(len)]

			size = min_size + Math.random() * (max_size - min_size)

			geom = Triangle(size)

			for v, i in geom.vertices

				geom.vertices[i].x += pos.x
				geom.vertices[i].y += pos.y
				geom.vertices[i].z += pos.z

			buffer_geom.merge geom

		params =
			envMap: @cubemap
			shading: THREE.FlatShading
			wireframe: true
			wireframeLinewidth: config.line_thickness

		material = new THREE.MeshLambertMaterial(params)

		@triangles_mesh = new THREE.Mesh(buffer_geom, material)

		@scene.add @triangles_mesh

		for face, index in @triangles_mesh.geometry.faces

			v1 = @triangles_mesh.geometry.vertices[face.a]
			v2 = @triangles_mesh.geometry.vertices[face.b]
			v3 = @triangles_mesh.geometry.vertices[face.c]

			v1.pos = new THREE.Vector3 v1.x, v1.y, v1.z
			v2.pos = new THREE.Vector3 v2.x, v2.y, v2.z
			v3.pos = new THREE.Vector3 v3.x, v3.y, v3.z


		#hires_mesh.material.visible     = false
		#triangles_mesh.material.visible = false

		@ready = on


	bind: ->

		super()

		@mouse.on 'down', @on_mouse_down

		do @ui.bind
		do @mouse.bind

	unbind: ->

		super()

		@mouse.off 'down', @on_mouse_down

		do @ui.unbind
		do @mouse.unbind

	###
	Transition in
	###
	transition_in: ->

		@emit 'transition:in:complete'

		@is_transitioning = on

		###
		UI
		###

		position = @config.path_in[0]

		cameras.user.position.set position.x, position.y, position.z
		cameras.user.lookAt new THREE.Vector3 position.x, position.y, position.z

		cameras.user.rotation.z = Math.PI

		do @ui.transition_in

		###
		Camera
		###

		tween =
			progress: 0

		params =

			progress: 1

			ease: Power1.easeInOut

			onStart: ->

			onUpdate: =>

				position  = @path_in.spline.getPointAt tween.progress

				cameras.user.position.copy position


			onComplete: =>

				@is_transitioning = off

		if @config.transition_debug
			@config.camera_in_duration = 0

		TweenLite.to tween, @config.camera_in_duration, params

		###
		UI
		###

		tween_ui =
			progress: 0

		params =
			progress: 1
			onComplete: =>
				do @ui.transition_out

		@ui_tween = TweenLite.to tween_ui, @config.camera_in_duration, params

		###
		Camera rotation
		###

		params =
			z: Math.PI * 2

		if @config.transition_debug
			@config.camera_rotation_in = 0

		TweenLite.to cameras.user.rotation, @config.camera_rotation_in, params

		###
		Fog
		###

		if @config.fog_enabled

			@scene.fog.density = @config.fog_in_start

			params =
				density: @config.fog_in_end
				ease: Power2.easeOut

			if @config.transition_debug
				@config.fog_in_duration = 0

			TweenLite.to @scene.fog, @config.fog_in_duration, params


		###
		Fov
		###

		engine.fov = 150

		params =
			fov: config.camera_fov
			ease: Power3.easeOut

		if @config.transition_debug
			@config.fov_in_duration = 0

		TweenLite.to engine, @config.fov_in_duration, params

	on_mouse_down: =>

		do @force_transition_in_complete

	update: =>

		return if not @ready

		# Rotation

		mouse_pos_x = @mouse.normal_center_x
		mouse_pos_y = @mouse.normal_center_y

		rotation_x = (Math.PI * 0.3) * -mouse_pos_y
		rotation_y = (Math.PI * 0.3) * -mouse_pos_x

		r = @triangles_mesh.rotation
		delta_x = rotation_x - r.x
		delta_y = rotation_y - r.y

		distance = Math.sqrt(delta_x * delta_x + delta_y * delta_y)

		@triangles_mesh.rotation.x += delta_x * config.speed
		@triangles_mesh.rotation.y += delta_y * config.speed

		@mesh.rotation.x = @triangles_mesh.rotation.x
		@mesh.rotation.y = @triangles_mesh.rotation.y

		@normalize @triangles_mesh
		@normalize @mesh

		if @mouse.is_down and not @is_transitioning_out
			@holding_frames += 0.5
		else
			@holding_frames -= 2

		@holding_frames = Math.max @holding_frames, 0
		@holding_frames = Math.min @holding_frames, 60

		# Increase this for bass when mouse is down
		@noise = (@holding_frames / 10) or 0.05

		for face, index in @triangles_mesh.geometry.faces

			# break if index > 0

			v1 = @triangles_mesh.geometry.vertices[face.a]
			v2 = @triangles_mesh.geometry.vertices[face.b]
			v3 = @triangles_mesh.geometry.vertices[face.c]

			v1.x = v1.pos.x +  (-@noise + Math.random() * (@noise*2))
			v1.y = v1.pos.y +  (-@noise + Math.random() * (@noise*2))
			v1.z = v1.pos.z +  (-@noise + Math.random() * (@noise*2))

			v2.x = v2.pos.x +  (-@noise + Math.random() * (@noise*2))
			v2.y = v2.pos.y +  (-@noise + Math.random() * (@noise*2))
			v2.z = v2.pos.z +  (-@noise + Math.random() * (@noise*2))

			v3.x = v3.pos.x +  (-@noise + Math.random() * (@noise*2))
			v3.y = v3.pos.y +  (-@noise + Math.random() * (@noise*2))
			v3.z = v3.pos.z +  (-@noise + Math.random() * (@noise*2))

		@triangles_mesh.geometry.verticesNeedUpdate = true

		# Color
		lights.point1.intensity  = (Math.abs mouse_pos_x * 2) * 0.5
		lights.point2.intensity = Math.max 0, mouse_pos_y

		lights.point1.color.setHex String(config.color_left).replace('#', '0x')
		lights.point2.color.setHex String(config.color_right).replace('#', '0x')
		lights.directional.color.setHex String(config.color_directional).replace('#', '0x')

		@triangles_mesh.material.wireframeLinewidth = config.line_thickness

	normalize: ( el ) ->
		el.rotation.x = Math.min( 0.5, Math.max( -0.5, el.rotation.x ) )
		el.rotation.y = Math.min( 0.5, Math.max( -0.5, el.rotation.y ) )

	destroy: ->

		super()

		do @sound.stop

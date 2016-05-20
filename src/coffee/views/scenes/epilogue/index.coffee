happens  	= require 'happens'
settings 	= require 'app/config/settings'
cameras  	= require 'controllers/engine/cameras'
engine 		= require 'controllers/engine/index'
Loader 		= require 'utils/loading/async_loader'
utils 		= require 'utils/utils'
Keyboard 	= require 'utils/keyboard'

lights   		= require 'views/scenes/home/lights'
shaders  		= require 'views/scenes/home/shaders'
config 			= require 'views/scenes/epilogue/config'
UI 				= require 'views/scenes/epilogue/ui'
assets 			= require 'views/scenes/epilogue/assets'
PathLookatCurve = require 'views/scenes/helpers/path_lookat_curve'

module.exports = class Home

	camera_path  : null
	attributes   : null
	ready	     : off
	tweens 		 : Array

	has_transitioned_out: off
	is_transitioning: off
	transition_progress: 0
	fov_transition_progress: 0
	dolly_transition_progress: 0

	constructor: ( @scene, @gui ) ->

		happens @

	load: ->

		###
		Preload the assets
		###

		@loader = new Loader

		for asset in assets
			@loader.add asset.id, asset.url, asset.type

		@loader.once 'loaded', @setup

		do @loader.load

	setup: ( manifest ) =>

		###
		Engine
		###

		engine.fov = config.camera_fov

		###
		UI
		###
		@ui = new UI @scene, @gui, manifest

		###
		Keyboard controls
		###

		@keyboard = new Keyboard $(window)

		###
		Tweens
		###

		@tweens = []

		###
		Scene
		###

		if config.fog_enabled
			@scene.fog = new THREE.FogExp2( 0x000000, config.fog_in_start )

			@gui.add @scene.fog, 'density', 0, 0.001

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

		@scene.add light for light in lights

		###
		Sounds
		###

		###
		Sounds
		###
		@sounds =
			start: @loader.get_asset('start').data
			loop: @loader.get_asset('loop').data
			transition_in: @loader.get_asset('transition_in').data
			transition_out: @loader.get_asset('transition_out').data


		@sounds.start.play()
		@sounds.transition_in.play()

		utils.delay 19, =>
			@sounds.loop.volume 0
			@sounds.loop.fade 0, 1, 1000
			@sounds.loop.play()
			@sounds.loop.loop on

		###
		Objects
		###

		@container = new THREE.Object3D

		@scene.add @container

		@container.position.fromArray config.container_position
		@container.rotation.fromArray config.container_rotation

		bounds = 10000

		if config.add_controls

			@gui.add(@container.rotation, 'x', 0, PI_2).name 'rotation x'
			@gui.add(@container.rotation, 'y', 0, PI_2).name 'rotation y'
			@gui.add(@container.rotation, 'z', 0, PI_2).name 'rotation z'
			@gui.add(@container.position, 'x', -bounds, bounds).name 'position x'
			@gui.add(@container.position, 'y', -bounds, bounds).name 'position y'
			@gui.add(@container.position, 'z', -bounds, bounds).name 'position z'

		###
		Shader
		###

		@attributes =
			size:
				type  : 'f'
				value : []
			alpha:
				type  : 'f'
				value : []

		uniforms =
			color:
				type  : "c"
				value : new THREE.Color 0xFFFFFF

			texture:
				type  : "t"
				value : THREE.ImageUtils.loadTexture @loader.get_asset('particle').src

		if config.fog_enabled
			uniforms.topColor =
				type: "c"
				value: new THREE.Color(0x0077ff)

			uniforms.bottomColor =
				type: "c"
				value: new THREE.Color(0xffffff)

			uniforms.offset =
				type: "f"
				value: 33

			uniforms.exponent =
				type: "f"
				value: 0.6

			uniforms.fogColor =
				type: "c"
				value: @scene.fog.color

			uniforms.fogNear =
				type: "f"
				value: @scene.fog.near

			uniforms.fogFar =
				type: "f"
				value: @scene.fog.far

			uniforms.fogDensity =
				type: "f"
				value: @scene.fog.density


		material = new THREE.ShaderMaterial

			uniforms 	   : uniforms
			attributes 	   : @attributes
			vertexShader   : do shaders.vertex
			fragmentShader : do shaders.fragment
			blending       : THREE.AdditiveBlending
			transparent    : on
			fog 		   : config.fog_enabled


		geometry = new THREE.Geometry

		radius_min = 350  * config.scale
		radius_max = 2000 * config.scale
		y_bounds   = 10
		y_curve    = 400  * config.scale

		size_min = 20
		size_max = 40

		for i in [0...config.partices]

			a = utils.random 0, PI_2
			r = utils.random radius_min, radius_max

			x = r * Math.cos a
			# y = utils.random -y_bounds, y_bounds
			y = y_curve * Math.cos (r / radius_max) * Math.PI
			# y = 0
			z = r * Math.sin a

			geometry.vertices.push new THREE.Vector3 x, y, z

			@attributes.alpha.value[ i ] = utils.random 0.2, 1.0
			@attributes.size.value[ i ]  = utils.random size_min, size_max

		@mesh = new THREE.PointCloud geometry, material
		@container.add @mesh
		# @container.rotation.y = 0.1

		###
		Particles tunnel
		###

		size_min = 40
		size_max = 80

		geometry = new THREE.Geometry

		radius_max = radius_min
		radius_min = 150  * config.scale
		y_curve    = 1000 * config.scale

		for i in [0...config.tunnel_particles]

			a = utils.random 0, PI_2
			r = utils.random radius_min, radius_max

			percent = Math.random()

			x = r * Math.cos a
			y = 13422 + y_curve * Math.cos (r / radius_max) * Math.PI
			z = r * Math.sin a

			geometry.vertices.push new THREE.Vector3 x, y, z

			opacity = utils.random 0.2, 1.0

			percent = (y / y_curve)

			if percent > 0.5
				opacity += utils.lerp opacity, 0, 0.5 + percent

			@attributes.alpha.value[ i ] = opacity
			@attributes.size.value[ i ]  = utils.random size_min, size_max

		@tunnel_mesh = new THREE.PointCloud geometry, material

		# utils.gui_controls @gui, @tunnel_mesh, "xxx", 20000
		@container.add @tunnel_mesh

		###
		Calculate the last path position
		###

		mesh = new THREE.Mesh(new THREE.SphereGeometry(100, 4, 4))
		mesh.position.y = 15000
		mesh.visible = off
		@container.add mesh
		@container.updateMatrixWorld()
		vector = new THREE.Vector3
		vector.setFromMatrixPosition( mesh.matrixWorld )
		config.path_camera_dolly.unshift vector.toArray()
		config.path_in.unshift {x: vector.x, y: vector.y, z: vector.z}
		config.path_out.push {x: vector.x, y: vector.y, z: vector.z}

		config.path_in_lookat.unshift {x: vector.x, y: vector.y, z: vector.z}

		###
		Create curve for camera
		###

		@path_in  = new PathLookatCurve 'path_in', @scene, config.path_in, config.path_in_lookat, 0x00FF00#, @gui, 20000
		@path_out = new PathLookatCurve 'path_out', @scene, config.path_out, config.path_in_lookat.reverse(), 0x00FF00#, @gui, 20000

		###
		Ready
		###

		@ready = on
		@emit 'setup:complete'

		do @bind


	bind: ->

		do @keyboard.bind

		engine.on 'update', @update

	unbind: ->

		do @keyboard.unbind

		engine.off 'update', @update

	###
	Transition in
	###
	transition_in: ->

		@is_transitioning = on

		@emit 'transition:in:complete'

		cameras.user.position.fromArray config.path_in[0]
		cameras.user.lookAt new THREE.Vector3

		###
		UI
		###
		do @ui.transition_in

		###
		Kill current tweens
		###

		do @kill_tweens

		###
		Camera
		###

		tween =
			progress: 0

		params =

			progress: 1

			ease: Power2.easeOut

			onUpdate: =>

				position = @path_in.spline.getPointAt tween.progress

				cameras.user.position.copy position

				position = @path_in.spline_camera.getPointAt tween.progress

				cameras.user.lookAt position

			onComplete: =>

				@is_transitioning = off

		if config.transition_debug
			config.camera_in_duration = 0.1

		@tweens.push TweenLite.to tween, config.camera_in_duration, params

		###
		Fog
		###

		if config.fog_enabled

			@scene.fog.density = config.fog_in_start

			params =
				density: config.fog_in_end
				ease: Power2.easeOut

			if config.transition_debug
				config.fog_in_duration = 0

			@tweens.push TweenLite.to @scene.fog, config.fog_in_duration, params


	###
	Transition in
	###
	transition_out_forward: ( fast_transition = false ) ->

		if @is_transitioning
			do @transition_out_fast
			return

		@is_transitioning = on

		# cameras.user.position.fromArray config.path_out[0]
		# cameras.user.lookAt new THREE.Vector3

		###
		UI
		###
		do @ui.transition_out

		###
		Kill current tweens
		###

		do @kill_tweens

		###
		Camera
		###

		tween =
			progress: 0

		params =

			progress: 1

			ease: Power3.easeInOut

			onStart: =>
				@sounds.transition_out.play()

			onUpdate: =>

				position = @path_out.spline.getPointAt tween.progress

				cameras.user.position.copy position

				position = @path_out.spline_camera.getPointAt tween.progress

				cameras.user.lookAt position

			onComplete: =>

				@is_transitioning = off

				do @next


		@tweens.push TweenLite.to tween, config.camera_out_duration, params

		###
		Fog
		###

		if config.fog_enabled

			@scene.fog.density = config.fog_in_end

			params =
				density: config.fog_in_start
				ease: Power2.easeOut
				delay: config.camera_out_duration - 2

			@tweens.push TweenLite.to @scene.fog, config.fog_out_duration, params


	update: =>

		return if not @ready

		rotate = 0.001

		@mesh.rotation.y 		+= rotate
		@tunnel_mesh.rotation.y += rotate

	transition_out_fast: ->

		c.log 'transition_out_fast'

		@ui.once 'transition:out:fast:complete', =>

			do @kill_tweens
			do @next

		do @ui.transition_out_fast

	next: =>

		@has_transitioned_out = on
		@emit 'next'

	kill_tweens: ->

		for tween in @tweens
			do tween?.kill

	enable_transition: ->
	disable_transition: ->

	destroy: ->

		for key, sound of @sounds
			sound.fade 1, 0, 1000

		utils.delay 1, =>

			for object in @scene.children
				@scene.remove object

			for key, sound of @sounds
				do sound.stop
				do sound.unload

			do @kill_tweens
			do @unbind
			do @ui.destroy
			do @loader.dispose

			@emit 'destroyed'

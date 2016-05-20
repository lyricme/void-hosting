happens  	= require 'happens'
settings 	= require 'app/config/settings'
cameras  	= require 'controllers/engine/cameras'
engine 		= require 'controllers/engine/index'
Loader 		= require 'utils/loading/async_loader'
utils 		= require 'utils/utils'
Keyboard 	= require 'utils/keyboard'

lights   	= require 'views/scenes/home/lights'
shaders  	= require 'views/scenes/home/shaders'
config 		= require 'views/scenes/home/config'
UI 			= require 'views/scenes/home/ui'
assets 		= require 'views/scenes/home/assets'

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

	setup: =>

		###
		Engine
		###

		engine.fov = config.camera_fov

		###
		UI
		###
		@ui = new UI @scene, @gui, {hires_logo: @loader.get_asset('hires_logo')}

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
		@sounds =
			start: @loader.get_asset('start').data
			loop: @loader.get_asset('loop').data
			transition: @loader.get_asset('transition').data

		@sounds.start.play()

		utils.delay 37, =>
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

		# size_min = if settings.retina then 10 else 5
		# size_max = if settings.retina then 20 else 10

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
		@container.rotation.y = 0.1

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
		config.path_camera_dolly.push vector.toArray()
		config.path_out.push vector.toArray()

		###
		Camera dolly
		###

		@camera_dolly = new THREE.Mesh(new THREE.SphereGeometry(100, 8, 8), new THREE.MeshBasicMaterial(color: 0xFF0000))
		@camera_dolly.visible = off
		@scene.add @camera_dolly

		###
		Create curve for camera
		###

		@path_in  = utils.path @scene, config.path_in, 0x00FF00
		@path_out = utils.path @scene, config.path_out, 0xFF0000#, @gui
		@path_camera_dolly = utils.path @scene, config.path_camera_dolly, 0x00FF00, null, 5#, @gui

		###
		Ready
		###

		@ready = on
		@emit 'setup:complete'

		do @bind


	bind: ->

		@keyboard.on 'key:down:space', @transition_out_forward
		@keyboard.on 'key:up:space', @transition_out_backward

		do @keyboard.bind

		engine.on 'update', @update

	unbind: ->

		@keyboard.off 'key:down:space', @transition_out_forward
		@keyboard.off 'key:up:space', @transition_out_backward

		do @keyboard.unbind

		engine.off 'update', @update

	###
	Transition in
	###
	transition_in: ->

		@emit 'transition:in:complete'

		@is_transitioning = on

		cameras.user.position.fromArray config.path_in[0]
		cameras.user.lookAt new THREE.Vector3

		###
		UI
		###
		do @ui.transition_in

		###
		Camera
		###

		tween =
			progress: 0

		params =

			progress: 1

			ease: Power2.easeOut

			onUpdate: =>

				do @ui.update

				position  = @path_in.getPointAt tween.progress

				cameras.user.position.copy position
				cameras.user.lookAt new THREE.Vector3

			onComplete: =>

				@is_transitioning = off


		@tweens.push TweenLite.to tween, config.camera_in_duration, params

		###
		Fog
		###

		if config.fog_enabled

			@scene.fog.density = config.fog_in_start

			params =
				density: config.fog_in_end
				ease: Power2.easeOut

			@tweens.push TweenLite.to @scene.fog, config.fog_in_duration, params


	###
	Transition out
	###
	transition_out_backward: =>

		return if @transition_progress is 0
		return if @transition_progress > 0.6

		###
		Kill current tweens
		###

		do @kill_tweens

		###
		UI
		###
		do @ui.transition_out_backward

		###
		Camera
		###

		tween =
			progress: @transition_progress
			percent: 0

		params =

			progress: 0
			percent: 1

			ease: Power3.easeOut

			onUpdate: =>

				position = @path_out.getPointAt tween.progress

				cameras.user.position.copy position
				cameras.user.lookAt @camera_dolly.position

				@sounds.loop.volume tween.percent

				vol = utils.lerp 1, 0, tween.percent

				@sounds.transition.volume vol

			onComplete: =>

				@is_transitioning = off

				do @sounds.transition.stop

		camera_duration = 2 + (2 * @transition_progress)

		@tweens.push TweenLite.to tween, camera_duration, params


		###
		Camera dolly
		###

		if @dolly_transition_progress > 0

			dolly_tween =
				progress: @dolly_transition_progress

			params =

				progress: 0

				ease: Power2.easeOut

				onUpdate: =>

					position = @path_camera_dolly.getPointAt dolly_tween.progress

					@camera_dolly.position.copy position

			dolly_duration = 2 + (2 * @dolly_transition_progress)

			@tweens.push TweenLite.to dolly_tween, dolly_duration, params

		###
		Engine
		###

		if @fov_transition_progress > 0

			params =
				fov: config.camera_fov
				ease: Power3.easeOut

			fov_duration = 5 + (5 * @fov_transition_progress)

			@tweens.push TweenLite.to engine, fov_duration, params


	###
	Transition out
	###
	transition_out_forward: =>

		return if @is_transitioning

		@is_transitioning = on

		###
		Sounds
		###
		@sounds.transition.volume 1
		@sounds.transition.play()

		###
		Kill current tweens
		###

		do @kill_tweens

		###
		UI
		###
		do @ui.transition_out

		###
		Camera
		###

		tween =
			progress: 0

		params =

			progress: 1

			ease: Power2.easeIn

			onUpdate: =>

				@transition_progress = tween.progress

				position = @path_out.getPointAt tween.progress

				cameras.user.position.copy position
				cameras.user.lookAt @camera_dolly.position

				@sounds.loop.volume 1 - tween.progress

			onComplete: =>

				do @next

		@tweens.push TweenLite.to tween, config.camera_out_duration, params

		###
		Camera dolly
		###

		dolly_tween =
			progress: 0

		params =

			progress: 1
			delay: 6

			ease: Power2.easeIn

			onUpdate: =>

				@dolly_transition_progress = dolly_tween.progress

				position = @path_camera_dolly.getPointAt dolly_tween.progress

				@camera_dolly.position.copy position

		@tweens.push TweenLite.to dolly_tween, 3.7, params


		###
		Engine
		###

		params =
			fov: config.camera_fov_out
			delay: 5
			ease: Power3.easeOut
			onUpdate: =>

				@fov_transition_progress = fov_tween.progress()

		fov_tween = TweenLite.to engine, config.camera_fov_out_duration, params

		@tweens.push fov_tween


	update: =>

		return if not @ready

		rotate = 0.001

		@mesh.rotation.y 		+= rotate
		@tunnel_mesh.rotation.y += rotate


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

			for key, sound of @sounds
				do sound.unload

			for object in @scene.children
				@scene.remove object

			do @kill_tweens
			do @unbind
			do @ui.destroy
			do @loader.dispose

			@emit 'destroyed'

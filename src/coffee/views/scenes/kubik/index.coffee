happens  	= require 'happens'
settings 	= require 'app/config/settings'
cameras  	= require 'controllers/engine/cameras'
engine 		= require 'controllers/engine/index'
Loader 		= require 'utils/loading/async_loader'
Mouse 		= require 'utils/mouse'
utils 		= require 'utils/utils'

Experiment  = require 'views/scenes/experiment'
lights   	= require 'views/scenes/kubik/lights'
config 		= require 'views/scenes/kubik/config'
UI 			= require 'views/scenes/ui'
assets 		= require 'views/scenes/kubik/assets'
PathLookatFixed = require 'views/scenes/helpers/path_lookat_fixed'
PathLookatCurve = require 'views/scenes/helpers/path_lookat_curve'

module.exports = class Kubik extends Experiment

	spread: 0


	accel_x: 0.1
	accel_y: 0.1
	accel_z: 0.1

	dopplerFactor: 1
	speedOfSound: 343.3

	setup: ( manifest ) =>

		range = 10

		@gui.add @, 'audio_pos_x', -range, range
		@gui.add @, 'audio_pos_y', -range, range
		@gui.add @, 'audio_pos_z', -range, range

		range = 1000
		@gui.add @, 'accel_x', -range, range
		@gui.add @, 'accel_y', -range, range
		@gui.add @, 'accel_z', -range, range
		@gui.add cameras.user.position, 'z', -100, 1000

		###
		Engine
		###

		engine.fov = config.camera_fov

		###
		UI
		###
		@ui = new UI 'kubik', @scene, @gui

		###
		Scene
		###

		if config.fog_enabled
			@scene.fog = new THREE.FogExp2( 0x000000, config.fog_in_start )

			@gui.add @scene.fog, 'density', 0, 1

		@gui.add engine, 'fov', 0, 200


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
		Create curve for camera
		###

		@path_in  = new PathLookatFixed 'path_in', @scene, config.path_in, config.path_in_lookat, 0x00FF00#, @gui, 1000
		@path_out = new PathLookatCurve 'path_out', @scene, config.path_out, config.path_out_lookat, 0x00FF00#, @gui, 100

		###
		Mouse
		###
		@mouse = new Mouse $('.hitarea')

		###
		Sounds
		###

		# set initial audio position
		@audio_pos_x = 0.1
		@audio_pos_z = @config.audio_pos_z_in

		@sounds =
			background: utils.get_asset('background', manifest).data
			top: utils.get_asset('top', manifest).data

		do @sounds.background.play
		@sounds.top.volume 0
		do @sounds.top.play

		for key, sound of @sounds
			sound.loop on

		###
		Objects
		###

		@container = new THREE.Object3D

		@scene.add @container


		###
		Kubik
		###

		params =
			side: THREE.DoubleSide
			blending: 2
			transparent: on
			depthTest: off
			# wireframe: on
			wireframeLinewidth: 1
			opacity: 0.1
			map: THREE.ImageUtils.loadTexture @loader.get_asset('texture').src

		@material = new THREE.MeshLambertMaterial params
		geometry  = new THREE.BoxGeometry 1, 1, 1

		i      = 0
		@cubes = []

		num_cubes = 160

		@object = new THREE.Object3D()

		while i < num_cubes

			ratio = i / num_cubes

			cube = new THREE.Mesh geometry, @material

			group = new THREE.Object3D
			group.add cube

			group.rotation.y = ( ratio * 360 ) * ( Math.PI / 180 )

			@object.add group

			@cubes.push cube

			i++

		scale = 40
		# do @spread_cubes
		@object.scale.set scale, scale, scale
		@object.rotation.x = HALF_PI
		@container.add @object

		@spread = 0.1

		# @gui.add(@, 'spread', 0, 1).listen()

		@ready = on

		do @bind

		@emit 'setup:complete'


	spread_cubes: () ->

		ratio = 0

		for index, cube of @cubes

			ratio = index / @cubes.length

			# cube.rotation.y = ratio * Math.PI * 2 * 88
			# cube.rotation.y = ratio * Math.PI * 80
			cube.rotation.y = ratio * Math.PI * @spread


	bind: ->

		super()

		@mouse.on 'move', @on_mouse_move
		@mouse.on 'down', @on_mouse_down
		@mouse.on 'up', @on_mouse_up

		do @ui.bind
		do @mouse.bind

	unbind: ->

		super()

		@mouse.off 'move', @on_mouse_move
		@mouse.off 'down', @on_mouse_down
		@mouse.off 'up', @on_mouse_up

		do @ui.unbind
		do @mouse.unbind

	force_transition_in_complete: ->

		super()

		@camera_tween.totalProgress(1).kill()

	on_mouse_down: =>

		return if @is_transitioning_out

		do @force_transition_in_complete

		# CALL TRANSITION IN COMPLETE

		do @fov_tween?.kill
		do @pos_tween?.kill

		params =
			fov: 200
			ease: Cubic.easeOut

		@fov_tween = TweenLite.to engine, 0.6, params

		params =
			z: 33

		@pos_tween = TweenLite.to cameras.user.position, 0.3, params

		@sounds.background.fade 1, 0.5, 600
		@sounds.top.fade 0, 1, 600

	on_mouse_up: =>

		return if @is_transitioning_out

		# return if @is_transitioning

		do @fov_tween?.kill
		do @pos_tween?.kill

		params =
			fov: @config.camera_fov
			ease: Cubic.easeOut

		@fov_tween = TweenLite.to engine, 0.55, params

		params =
			z: @config.path_in[1].z

		@pos_tween = TweenLite.to cameras.user.position, 0.3, params

		@sounds.background.fade 0.5, 1, 600
		@sounds.top.fade 1, 0, 600

	on_mouse_move: =>

		# return if @is_transitioning

		p1_x = 0
		p1_y = 0

		p2_x = @mouse.normal_center_x
		p2_y = @mouse.normal_center_y

		if @mouse.is_down
			duration = 0.25
		else
			duration = 1

		do @rotation_tween?.kill

		x = HALF_PI + @mouse.normal_center_y

		params =
			x: x

		@rotation_tween = TweenLite.to @object.rotation, duration, params

		do @tween?.kill

		spread = @mouse.normal_x.map 0, 1, 0, PI_2

		params =
			spread: spread
			ease: Power3.easeOut
			onUpdate: =>
				do @spread_cubes

		@tween = TweenLite.to @, 1, params

	update: =>

		return if not @ready

		@audio_pos_x = @mouse.normal_center_x * 4

		# @sounds.background.pos @audio_pos_x, null, @audio_pos_z
		@sounds.background.pos @audio_pos_x, null, @audio_pos_z
		# @sounds.background.velocity @accel_x, @accel_y, @accel_z

		for index, cube of @cubes

			ratio = index / @cubes.length

			cube.rotation.x += 0.5 * Math.PI / 180

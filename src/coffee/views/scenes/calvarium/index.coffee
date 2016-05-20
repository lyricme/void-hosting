happens  	= require 'happens'
settings 	= require 'app/config/settings'
cameras  	= require 'controllers/engine/cameras'
engine 		= require 'controllers/engine/index'
renderer    = require 'controllers/engine/renderer'
Loader 		= require 'utils/loading/async_loader'
Mouse 		= require 'utils/mouse'
utils 		= require 'utils/utils'
win 		= require 'utils/window'

Experiment  = require 'views/scenes/experiment'
lights   	= require 'views/scenes/calvarium/lights'
config 		= require 'views/scenes/calvarium/config'
shader 		= require 'views/scenes/calvarium/shader'
UI 			= require 'views/scenes/ui'
assets 		= require 'views/scenes/calvarium/assets'
PathLookatFixed = require 'views/scenes/helpers/path_lookat_fixed'
PathLookatCurve = require 'views/scenes/helpers/path_lookat_curve'

module.exports = class Skull extends Experiment

	xp: 0
	yp: 0
	accel: 1

	reset_amplitude: off

	audio_pos_z: 0

	setup: ( manifest ) =>

		###
		Engine
		###

		engine.fov = config.camera_fov

		###
		UI
		###
		@ui = new UI 'calvarium', @scene, @gui

		TweenLite.set @ui.ui.transition_black, opacity: 1

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

		@audio_pos_z = @config.audio_pos_z_in

		@sounds =
			background: @loader.get_asset('background').data
			glitch: @loader.get_asset('glitch').data
			after: @loader.get_asset('after').data

		do @update_sound_position

		@sounds.glitch.volume 0.5

		do @sounds.background.play
		@sounds.background.loop on

		###
		Objects
		###

		@container = new THREE.Object3D

		@scene.add @container

		###
		Skull
		###

		@attributes =
			displacement   : type: 'v3', value: []
			customColor    : type: 'c' , value: []

		@uniforms =
			amplitude      : type: "f", value: 0

		if config.fog_enabled
			@uniforms.topColor =
				type: "c"
				value: new THREE.Color(0x0077ff)

			@uniforms.bottomColor =
				type: "c"
				value: new THREE.Color(0xffffff)

			@uniforms.offset =
				type: "f"
				value: 33

			@uniforms.exponent =
				type: "f"
				value: 0.6

			@uniforms.fogColor =
				type: "c"
				value: @scene.fog.color

			@uniforms.fogNear =
				type: "f"
				value: @scene.fog.near

			@uniforms.fogFar =
				type: "f"
				value: @scene.fog.far

			@uniforms.fogDensity =
				type: "f"
				value: @scene.fog.density

		window.uniforms = @uniforms

		@material = new THREE.ShaderMaterial
			uniforms       : @uniforms
			attributes     : @attributes
			vertexShader   : do shader.vertex
			fragmentShader : do shader.fragment
			shading        : THREE.FlatShading
			side           : THREE.DoubleSide
			wireframe      : on
			fog 		   : config.fog_enabled

		@geometry = @loader.get_asset('skull').data

		@geometry.dynamic = true

		@mesh = new THREE.Mesh @geometry, @material
		@mesh.position.y = 4
		# @mesh.rotation.y = Math.PI / 3 - 0.6
		# @mesh.rotation.x = 0.25
		# @mesh.rotation.z = -0.12

		@container.add @mesh

		@lookat = new THREE.Vector3

		do @tessellate_geometry
		do @explode_geometry
		do @colors_and_displacement
		do @glitch

		# do @composer.render

		do @bind

		@emit 'setup:complete'

		@ready = on


	bind: ->

		super()

		@on 'transition:in:start', @on_transition_in_start

		@mouse.on 'down', @on_mouse_down
		@mouse.on 'up', @on_mouse_up
		@mouse.on 'move', @on_mouse_move

		do @ui.bind
		do @mouse.bind

	unbind: ->

		super()

		@off 'transition:in:start', @on_transition_in_start

		@mouse.off 'down', @on_mouse_down
		@mouse.off 'up', @on_mouse_up
		@mouse.off 'move', @on_mouse_move

		do @ui.unbind
		do @mouse.unbind

	on_mouse_down: =>

		@uniforms.amplitude.value = 0

		do @glitch_pass.generateTrigger
		@glitch_pass.goWild = on

		do @sounds.glitch.play
		@sounds.glitch.loop on

		do @force_transition_in_complete

	on_transition_in_start: =>

		TweenLite.to @ui.ui.transition_black, 2, {opacity: 0, delay: 3}

	on_mouse_move: =>

		pos_x = (Math.abs @mouse.normal_center_x) * 2

		@x = (HALF_PI*0.5) * @mouse.normal_center_y
		@y = HALF_PI * @mouse.normal_center_x

		do @rotation_tween?.kill

		# c.log 'xxx§', @y

		if @mouse.is_down
			ease = Expo.easeOut
			duration = 1.2
		else
			ease = Cubic.easeOut
			duration = 20

		params =
			x: @x
			y: @y
			ease: ease
		@rotation_tween = TweenLite.to @mesh.rotation, duration, params


	on_mouse_up: =>

		@glitch_pass.goWild = off

		do @speed_tween?.kill

		@accel = 80

		params =
			accel: 1
			ease: Power1.easeOut

		@speed_tween = TweenLite.to @, 0.35, params

		do @sounds.glitch.stop
		do @sounds.after.play



	glitch: =>

		@composer = new THREE.EffectComposer renderer
		@composer.addPass new THREE.RenderPass @scene, cameras.user

		@glitch_pass = new THREE.GlitchPass
		@glitch_pass.renderToScreen = true

		@composer.addPass @glitch_pass

	tessellate_geometry: ->

		tessellateModifier = new THREE.TessellateModifier 1
		tessellateModifier.modify @geometry for i in [ 0..12 ]

	explode_geometry: ->

		explodeModifier = new THREE.ExplodeModifier
		explodeModifier.modify @geometry


	colors_and_displacement: ->

		colors       = @attributes.customColor.value
		displacement = @attributes.displacement.value

		v = 0

		for f in [ 0...@geometry.faces.length ]

			h = 0   * Math.random()
			s = 0   * Math.random()
			l = 0.3 * Math.random()

			x = 112 * ( 0.5 - Math.random() )
			y = 112 * ( 0.5 - Math.random() )
			z = 112 * ( 0.5 - Math.random() )

			for i in [ 0..2 ]

				colors[ v ] = new THREE.Color
				colors[ v ].setHSL( h, s, l )
				colors[ v ].convertGammaToLinear()

				displacement[ v ] = new THREE.Vector3
				displacement[ v ].set( x, y, z )

				v += 1

	reset_amplitude: ->

		do @reset_tween?.kill

		@animate_calvarium = off

		params =
			value: 0
			ease: Power1.easeInOut

		@reset_tween = TweenLite.to @uniforms.amplitude, 1, params

	update_sound_position: ->

		@sounds.background.pos 0, 0, @audio_pos_z
		@sounds.glitch.pos 0, 0, @audio_pos_z

	update: =>

		return if not @ready

		if @mouse.is_down
			@uniforms.amplitude.value -= (0.005*@accel)

		else
			@uniforms.amplitude.value += (0.0008*@accel)

		@uniforms.amplitude.value = THREE.Math.clamp(@uniforms.amplitude.value, 0, 10000)

		do @update_sound_position

		# pos_x = 0

		# if @mouse.is_down
		# 	pos_x = @mouse.normal_center_x / 4

		# @sounds.glitch.pos pos_x, 0, 0

		renderer.setSize win.width, win.height

		do @composer.render

	destroy: ->

		clearTimeout @render_interval
		super()

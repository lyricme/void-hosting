happens  = require 'happens'
Loader 	 = require 'utils/loading/async_loader'
cameras  = require 'controllers/engine/cameras'
renderer = require 'controllers/engine/renderer'
Keyboard = require 'utils/keyboard'
engine 	 = require 'controllers/engine/index'
utils 	 = require 'utils/utils'

module.exports = class Experiment

	has_transitioned_out: off
	is_transitioning: off
	is_transitioning_in: off
	is_transitioning_out: off
	transition_progress: 0
	is_transition_disabled: off
	transition_lock: off
	audio_pos_x: 0
	audio_pos_y: 0
	audio_pos_z: 0

	sounds: Array

	constructor: ( @scene, @gui, @assets, @config ) ->

		happens @

		###
		Tweens
		###

		@tweens = []

		###
		Keyboard controls
		###

		@keyboard = new Keyboard $(window)


	load: ->

		###
		Preload the assets
		###

		@loader = new Loader

		for asset in @assets
			@loader.add asset.id, asset.url, asset.type

		@loader.once 'loaded', @setup

		do @loader.load


	bind: ->

		engine.on 'update', @update
		@keyboard.on 'key:down:space', @on_key_down
		@keyboard.on 'key:up:space', @on_key_up

		do @keyboard.bind

	unbind: ->

		engine.off 'update', @update
		@keyboard.off 'key:down:space', @on_key_down
		@keyboard.off 'key:up:space', @on_key_up

		# do @keyboard.unbind

	on_key_down: =>

		return if @is_transitioning_in
		return if @is_transition_disabled

		do @transition_out_forward

	on_key_up: =>

		do @transition_out_backward

	###
	Transition in
	###
	transition_in: ->

		@emit 'transition:in:complete'

		@is_transitioning 	 = on
		@is_transitioning_in = on

		###
		UI
		###

		position = @config.path_in[0]

		cameras.user.position.set position.x, position.y, position.z
		cameras.user.lookAt new THREE.Vector3

		do @ui.transition_in

		###
		Camera
		###

		tween =
			progress: 0

		params =

			progress: 1

			ease: Power2.easeOut

			onStart: =>
				@emit 'transition:in:start'

			onUpdate: =>

				position  = @path_in.spline.getPointAt tween.progress

				cameras.user.position.copy position
				cameras.user.lookAt new THREE.Vector3

				@emit 'transition:in:update', tween.progress

			onComplete: =>

				@is_transitioning 	 = off
				@is_transitioning_in = off


		if @config.transition_debug
			@config.camera_in_duration = 0.1

		@camera_tween = TweenLite.to tween, @config.camera_in_duration, params

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
		Sound
		###

		params =
			audio_pos_z: 0
			ease: Power1.easeOut

		TweenLite.to @, @config.camera_in_duration, params

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

			@fog_tween = TweenLite.to @scene.fog, @config.fog_in_duration, params

	force_transition_in_complete: ->

		utils.delay 2, =>
			@ui_tween.totalProgress(1).kill()

	###
	Transition out
	###
	transition_out_backward: =>

		return if @is_transition_disabled
		return if @transition_progress is 0
		return if @transition_progress > 0.6

		###
		Kill current tweens
		###

		do @kill_tweens

		###
		UI
		###
		do @ui.show

		###
		Camera
		###

		tween =
			progress: @transition_progress

		params =

			progress: 0

			ease: Power3.easeOut

			onUpdate: =>

				position = @path_out.spline.getPointAt tween.progress

				cameras.user.position.copy position

				position = @path_out.spline_camera.getPointAt tween.progress

				cameras.user.lookAt position

				# @emit 'transition:out:backward', tween.progress
				# c.log 'on_transition_out_backward', value

				value = Math.max value, 0
				value = Math.min value, 1

				@audio_pos_z = utils.lerp 0, @config.audio_pos_z_out, tween.progress

			onComplete: =>

				@is_transitioning 	  = off
				@is_transitioning_out = off


		duration = 1 + (1 * @transition_progress)

		@tweens.push TweenLite.to tween, duration, params

		###
		Dim
		###
		params =
			opacity: 0
			ease: Power3.easeOut

		@tweens.push TweenLite.to @ui.ui.transition_black, duration, params

		###
		Fog
		###

		if @config.fog_enabled

			params =
				density: @config.fog_in_end
				ease: Power2.easeInOut

			@tweens.push TweenLite.to @scene.fog, duration, params


	###
	Transition out
	###
	transition_out_forward: ( fast_transition = false ) =>

		return if @is_transitioning_out
		return if @is_transition_disabled

		if @is_transitioning
			do @transition_out_fast
			return

		return if @is_transitioning

		@is_transitioning     = on
		@is_transitioning_out = on

		###
		Kill current tweens
		###

		do @kill_tweens

		###
		UI
		###
		do @ui.hide

		###
		Camera
		###

		up 	 = new THREE.Vector3( 0, 0, -1 )
		axis = new THREE.Vector3

		tween =
			progress: 0

		params =

			progress: 1

			ease: Power2.easeIn

			onUpdate: =>

				@transition_progress = tween.progress

				position = @path_out.spline.getPointAt tween.progress

				cameras.user.position.copy position

				position = @path_out.spline_camera.getPointAt tween.progress

				cameras.user.lookAt position

				# @emit 'transition:out:forward', tween.progress

				@audio_pos_z = utils.lerp 0, @config.audio_pos_z_out, tween.progress

			onComplete: =>

				do @next

		@tweens.push TweenLite.to tween, @config.camera_out_duration, params


		###
		Dim
		###
		params =
			opacity: 1
			ease: Power2.easeIn

		@tweens.push TweenLite.to @ui.ui.transition_black, @config.camera_out_duration, params


		###
		Fog
		###

		if @config.fog_enabled

			@scene.fog.density = @config.fog_out_start

			params =
				density: @config.fog_out_end
				ease: Power2.easeInOut

			@tweens.push TweenLite.to @scene.fog, @config.fog_out_duration, params

	transition_out_fast: ->

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
		@is_transition_disabled = off

	disable_transition: ->
		@is_transition_disabled = on

	destroy: ->

		c.log 'destroy'

		for object in @scene.children
			@scene.remove object

		for key, sound of @sounds
			do sound.stop
			do sound.unload

		renderer.shadowMapEnabled = off
		renderer.shadowMapSoft 	  = off

		do @unbind
		do @ui.destroy
		do @loader.dispose

		@emit 'destroyed'
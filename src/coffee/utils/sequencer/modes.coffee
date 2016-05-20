happens = require 'happens'

exports.FrameMode = class

	id: 'Delay'
	frame: 0

	constructor: (@frames, @data) -> happens @

	set_frame: (@frame) ->

	get_frame: => 
		frame = Math.floor @frame
		frame = Math.min frame, @total_frames()
		frame = Math.max frame, 0
		frame

	total_frames: -> @frames.total_frames - 1

	_update: => @emit 'update'

exports.LinearMode = class

	id: 'Linear'
	frame: 0

	constructor: (@data) -> happens @

	play: (duration = 1, end_frame = 1, ease = Linear.easeNone) ->

		do @stop
		@frame = 0

		params =
			frame: end_frame
			onUpdate: @_update
			onComplete: @_complete
			ease : ease

		@tween = TweenLite.to @, duration, params

	stop: ->
		TweenLite.killTweensOf(@tween)

	get_frame: => 
		frame = Math.floor @frame

		if frame < 0
			frame = 0
		else if frame > @total_frames()
			frame = @total_frames()

		frame

	total_frames: -> @data.total_frames - 1

	_update: => 
		@emit 'update'

	_complete: => 
		@frame = 0
		do @_update
		@emit 'complete'

exports.RepeatMode = class

	id: 'Linear'
	frame: 0
	repeat: 1

	constructor: (@data) -> happens @

	play: (@duration = 1, end_frame = 1, @ease = Linear.easeNone) =>

		params =
			frame: @total_frames()
			onUpdate: @_update
			onComplete: @_complete
			ease : @ease
			repeat: @repeat

		TweenMax.to @, @duration, params

	stop: ->
		TweenMax.killTweensOf(@)

	get_frame: => 
		frame = Math.floor @frame

		if frame < 0
			frame = 0
		else if frame > @total_frames()
			frame = @total_frames()

		frame

	total_frames: -> @data.total_frames - 1

	_update: => 
		@emit 'update'

	_complete: => 
		@emit 'complete'

	_reverse_complete: => 
		@emit 'reverse_complete'

		@tween.play()
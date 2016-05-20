happens = require 'happens'

module.exports = class Timer

	percent: 0
	_lock: off

	constructor: -> happens @

	start: ( duration = 1, delay = 0 ) ->

		return if @_lock


		do @tween?.kill

		params =
			ease: Linear.easeNone
			delay: delay
			onStart: =>
				do @lock
				c.log 'start'
			onComplete: =>
				do @unlock
				@emit 'ended'

		@tween = TweenLite.to @, duration, params

	stop: ->

		do @tween?.kill

		do @unlock

	lock: -> @_lock = on
	unlock: -> @_lock = off
happens  = require 'happens'
win 	 = require 'utils/window'

module.exports = class Keyboard

	key: 0
	_enabled: off

	constructor: ( @el ) -> happens @

	bind: ->

		@_enabled = on

		@el.on 'keydown', @keydown
		@el.on 'keyup', @keyup

	unbind: ->

		@_enabled = off

		# @el.off 'keydown', @keydown
		# @el.off 'keyup', @keyup

	keydown: ( event ) =>

		do event.preventDefault

		return unless @_enabled

		@key = event.keyCode

		switch @key

			when 32

				@emit 'key:down:space'


	keyup: ( event ) =>

		if @key is 32
			@emit 'key:up:space'
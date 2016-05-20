happens = require 'happens'

module.exports = class

	objects : Array
	count   : 0

	constructor: ->

		happens @

		@objects = []

	listen: ( obj, event_name ) ->

		obj.once event_name, @done

		@objects.push obj

	done: =>

		@count++

		@emit 'done' if @count >= @objects.length
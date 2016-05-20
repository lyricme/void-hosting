happens  = require 'happens'
win 	 = require 'utils/window'

module.exports = class Mouse

	mouse_x: 0
	mouse_y: 0

	mouse_last_x: 0
	mouse_last_y: 0

	normal_x: 0
	normal_y: 0

	normal_center_x: 0
	normal_center_y: 0

	clicked_x: 0
	clicked_y: 0

	is_down: off
	is_dragging: off

	constructor: ( @el ) -> happens @

	bind: ->

		@el.on 'mousedown', @mousedown
		@el.on 'mouseup', @mouseup
		@el.on 'mousemove', @mousemove

	unbind: ->

		@el.off 'mousedown', @mousedown
		@el.off 'mouseup', @mouseup
		@el.off 'click', @click

	mousemove: ( event ) =>

		@mouse_last_x = @mouse_x
		@mouse_last_y = @mouse_y

		position = @_get_event_position event

		@mouse_x = position.x
		@mouse_y = position.y

		@normal_x = @mouse_x / win.width
		@normal_y = @mouse_y / win.height

		@normal_center_x = -0.5 + @normal_x
		@normal_center_y = -0.5 + @normal_y

		if @is_down
			@is_dragging = on
		else
			@is_dragging = off

		@emit 'move'

	mousedown: ( event ) => 

		@is_down = on

		position = @_get_event_position event

		@clicked_x = position.x
		@clicked_y = position.y

		@emit 'down', position

	mouseup: ( event ) => 

		@is_down = off

		@emit 'up'

	distance_to: ( x, y ) ->
		Math.sqrt (x - @normal_x) * (x - @normal_x) + (y - @normal_y) * (y - @normal_y)

	###
	Get the touch / mouse position and return the coords
	@param  {Object} event
	@return {Object}
	###

	_get_event_position: ( event ) ->

		evt_x = event.pageX
		evt_y = event.pageY
		
		return {
			x : evt_x
			y : evt_y
		}
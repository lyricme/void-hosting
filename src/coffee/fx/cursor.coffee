class Cursor

	cursors = [ 
		'not-allowed'
		'help'
		'move'
		'all-scroll'
		'sw-resize'
	]

	_random_to : null;

	random : ->

		funk = =>

			cursor = Math.floor Math.random() * cursors.length
			
			$( 'body' ).css cursor: cursors[ cursor ]

			@_random_to = setTimeout arguments.callee, Math.random() * 5000

		funk()

	stop_random: ->
		clearTimeout @_random_to

module.exports = new Cursor
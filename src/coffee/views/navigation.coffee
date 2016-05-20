happens = require 'happens'

module.exports = class Navigation

	ui: {
		'chapters': 'li a'
	}

	constructor: ( @gui, @data ) ->

		happens @

		do @render

	render: ->

		###
		Template
		###
		
		template = require 'templates/navigation.jade'

		$('main').append template data: @data

		@el  = $ '#navigation'

		for key, id of @ui
			@ui[key] = @el.find id

		do @transition_in
		do @bind
		do @disable

	bind: ->

		@ui.chapters.on 'click', @on_click

	unbind: ->

		@ui.chapters.off 'click', @on_click

	enable: =>

		# c.log 'view::navigation --> enable'

		@ui.chapters.removeClass 'disable'

	disable: =>

		# c.log 'view::navigation --> disable'

		@ui.chapters.addClass 'disable'

	on_click: ( event ) =>

		do event.preventDefault

		id = $(event.currentTarget).data 'id'

		@emit 'click', id

	transition_in: ->

		params =
			autoAlpha: 1
			ease: Power1.easeInOut
			delay: 0.5

		TweenLite.to @el, 2, params

	update: ( chapter ) ->

		@ui.chapters.removeClass 'active'
	
		@el.find("a[data-id="+chapter.id+"]").addClass 'active'


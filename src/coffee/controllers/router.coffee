settings = require 'app/config/settings'
routes   = require 'collections/routes'
happens  = require 'happens'

module.exports = new class Router

	route_index: -1

	constructor: ->

		happens @

		History.Adapter.bind window, 'statechange', @on_state_change

		###
		Initialise the routes
		###

		@routes = []

		for route in routes

			Controller = require 'controllers/scene'
			controller = new Controller route.id

			@routes.push
				url		: route.url
				run		: controller.run
				destroy : controller.destroy
				controller: controller
		

	start: -> do @on_state_change

	on_state_change: =>

		State = do History.getState
		@_url = do @get_url

		@previous_route_index = @route_index
		
		for route, index in routes

			if @_url is route.url 
				@route_index = index
				break

		if @routes[ @previous_route_index ]?

			if @routes[ @previous_route_index ].controller.has_transitioned_out()

				@routes[ @previous_route_index ].destroy =>
					do @run
			else

				@routes[ @previous_route_index ].controller.once 'next', =>

					c.log 'router now destroy the view'

					@routes[ @previous_route_index ].destroy =>

						c.log 'view destroyed'
						do @run

				do @routes[ @previous_route_index ].controller.transition_out

		
		else

			do @run

		@emit 'url:changed', @_url

	run: ->

		@routes[@route_index].controller.once 'transition:in:complete', =>

			@emit 'nav:enable'

		@routes[ @route_index ].run =>

			c.log 'router::run -> done'


	go: ( url, title = '', data = {} ) ->

		c.debug 'go', url, title, data

		return if url is @_url

		History.pushState null, document.title, settings.base_path + url

		@emit 'nav:disable'
		@emit 'go', url


	transition_out_then_go: ( url ) ->

		return if url is @_url

		c.log 'url', url



	###
	Navigate to the next url in routes
	###
	next: ->

		for route, i in routes

			# Prefix base path to /
			if route.url.match '/'
				url = settings.base_path + route.url
			else
				url = route.url

			if url.match window.location.pathname

				index = if ((i+1) < routes.length) then i + 1 else 0

				next_route = routes[index]

				break

		@go next_route.url

	###
	Get the current chapter id
	###
	get_url: -> window.location.pathname.replace settings.base_path, ''
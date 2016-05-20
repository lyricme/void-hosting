gui    = require 'controllers/gui'
scenes = require 'collections/scenes'
router = require 'controllers/router'
routes = require 'collections/routes'
View   = require 'views/navigation'

module.exports = class Navigation

	constructor: ( @id ) ->

		@gui = gui.addFolder "controller::navigation"

		do @gui.open

		###
		Get chapters
		###

		data = do scenes.all

		@view = new View @gui, data

		do @bind

		# Update nav on start
		@on_url_change do router.get_url

	bind: ->

		@view.on 'click', @navigate
		router.on 'go', @on_url_change
		router.on 'nav:disable', @disable
		router.on 'nav:enable', @enable

	navigate: ( id ) ->

		next_route = null

		for route in routes
			if route.id.match id
				next_route = route
				break

		router.go next_route.url

	on_url_change: =>

		url = do router.get_url
		url = url.slice(1, url.length)

		data = do scenes.all

		current_chapter = null

		for chapter in data

			if chapter.id.match url
				current_chapter = chapter
				break

		@view.update current_chapter

	enable: =>  do @view.enable
	disable: => do @view.disable
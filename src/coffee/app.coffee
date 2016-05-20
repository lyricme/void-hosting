window.PI      = Math.PI
window.PI_2    = Math.PI * 2
window.PI_HALF = Math.PI * 0.5

log    	        = require 'utils/log'
browser_test    = require 'utils/browser_test'
engine 	        = require 'controllers/engine/index'
router 	        = require 'controllers/router'
Navigation      = require 'controllers/navigation'
Konami      	= require 'controllers/konami'
dictionary      = require 'models/dictionary'
settings        = require 'app/config/settings'
UnsupportedView = require 'views/unsupported'
NotfoundView 	= require 'views/notfound'
routes 		    = require 'collections/routes'
cursor 			= require 'fx/cursor' 
win 			= require 'utils/window'

class App

	constructor: ->

		window.c = log
		c.enable = on
		
		c.log '%c V O I D', 'background:#000; color: #fff'
		c.log '%c 	Hi-ReS!', 'background:#000; color: #fff'

		c.enable = !settings.live

		browser_test.set_tests ['desktop', 'WebGL', 'AudioContext']

		dictionary.once 'loaded', @test

		do dictionary.load

	test: =>

		url = window.location.pathname.replace settings.base_path, ''

		# 404
		matched = off
		for route in routes

			if url is route.url
				matched = on
				break

		if not matched
			do @not_found
			return

		# supported
		if browser_test.supported()
			do @supported
		else
			do @unsupported

	not_found: ->

		new NotfoundView

	unsupported: ->

		new UnsupportedView

	supported: ->

		engine.once 'loaded', @start
		
		do engine.setup

	start: =>

		new Navigation
		new Konami

		do router.start

		do cursor.random

module.exports = new App
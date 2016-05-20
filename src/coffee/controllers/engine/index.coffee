happens       = require 'happens'
win 	      = require 'utils/window'
settings      = require 'app/config/settings'
gui 		  = require 'controllers/gui'

cameras       = require 'controllers/engine/cameras'
default_scene = require 'controllers/engine/scene'
renderer      = require 'controllers/engine/renderer'
controls      = require 'controllers/engine/controls'

module.exports = new class Index

	rS = null

	scene : default_scene
	fov   : 80

	constructor: ->

		happens @

	###
	Public API
	###

	setup: ->

		@el = $ '#void'

		###
		Camera
		###

		zoom = ( camera, zoom ) ->

			camera.position.set 1 * zoom, 0.75 * zoom, 1 * zoom
			camera.lookAt new THREE.Vector3

		zoom cameras.dev,  160
		
		###
		Renderer
		###

		renderer.setSize win.width, win.height

		@el.append renderer.domElement

		if settings.debug

			###
			Helpers
			###

			@scene.add new THREE.GridHelper 50, 10
			@scene.add new THREE.AxisHelper 10

		###
		Export images
		###
		if not settings.live

			Save = require 'utils/save'

			@save = new Save

			$(window).on 'keydown', ( event ) =>

				img_scale_x = 7
				img_scale_y = 7

				render_scale_x = 3
				render_scale_y = 3

				render_width  = win.width  * render_scale_x
				render_height = win.height * render_scale_y

				width  = win.width  * img_scale_x
				height = win.height * img_scale_y

				if event.keyCode is 80

					renderer.setSize render_width, render_height
					
					@_render cameras.user, 0, 0, render_scale_x, render_scale_y
					renderer.render( @scene, cameras.user )
					
					@save.export(width, height)

		###
		Controls
		###
		@gui = gui.addFolder 'controller::engine'
		@gui.add settings, 'debug'
		do @gui.open

		###
		Bind
		###
		
		do @_bind

		###
		Start
		###

		# @ready = on
		do @_update

		@emit 'loaded'


	set_scene: ( @scene = default_scene, @config = {} ) ->

	###
	Private API
	###

	_bind: ->

		win.on 'resize', @_resize

	_update: =>

		requestAnimationFrame( @_update )

		@emit 'update'

		do controls.update

		# Set fov
		cameras.user.fov = @fov

		if settings.debug
			@_render cameras.dev,  0, 0, 1, 1
			@_render cameras.user, 0, 0, 0.25, 0.25

		else
			@_render cameras.user, 0, 0, 1, 1
			# @_render cameras.dev,  0, 0, 0.25, 0.25
			
	_render: ( camera, left, bottom, width, height ) ->

		left   *= win.width
		bottom *= win.height
		width  *= win.width
		height *= win.height

		cameras.dev.updateProjectionMatrix()
		cameras.user.updateProjectionMatrix()

		renderer.setViewport       left, bottom, width, height
		renderer.setScissor        left, bottom, width, height
		renderer.enableScissorTest true

		if settings.debug
			color = 0x121212
		else
			color = 0x000000

		renderer.setClearColor color, 1

		if @config?
			if @config.has_composer
				# c.log 'let the view render the scene'
			else
				renderer.render( @scene, camera )

	_resize: =>

		cameras.dev.aspect  = win.width / win.height
		cameras.user.aspect = win.width / win.height
		
		cameras.dev.updateProjectionMatrix()
		cameras.user.updateProjectionMatrix()

		renderer.setSize win.width, win.height
happens = require 'happens'
engine  = require 'controllers/engine/index'
gui     = require 'controllers/gui'
router  = require 'controllers/router'

module.exports = class Scene

	constructor: ( @id ) ->

		happens @

		@gui = gui.addFolder "controller::#{@id}"

		do @gui.open

	run: ( done ) =>

		c.log "controller::scene -> run #{@id}"

		###
		Create a new scene for this view
		###
		@scene = new THREE.Scene

		###
		Create the view
		###
		View   = require "views/scenes/#{@id}/index"
		assets = require "views/scenes/#{@id}/assets"
		config = require "views/scenes/#{@id}/config"

		@view  = new View @scene, @gui, assets, config

		###
		Render the black scene while the next one loads
		###
		do engine.set_scene

		@view.once 'setup:complete', =>

			###
			Set the current scene to be rendered
			###
			engine.set_scene @scene, config

			do @view.transition_in

			###
			Callback
			###
			do done

		@view.once 'next', @next

		# To enable the nav
		@view.once 'transition:in:complete', => @emit 'transition:in:complete'

		do @view.load

	destroy: ( done ) =>

		c.log "controller::#{@id} -> destroy"

		@view.once 'destroyed', =>

			do done

		do @view.destroy

	has_transitioned_out: -> @view.has_transitioned_out

	transition_out: ->

		c.log 'transition out scene'

		###
		Unsubscribe from the next chapter listener
		###
		@view.off 'next', @next

		@view.once 'next', =>

			c.log 'next route'
			@emit 'next'

		@view.transition_out_forward true
		do @view.disable_transition

	next: =>

		do (require 'controllers/router').next
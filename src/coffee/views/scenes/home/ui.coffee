happens = require 'happens'
cameras = require 'controllers/engine/cameras'
utils   = require 'utils/utils'

Text    = require 'views/scenes/helpers/text'
config  = require 'views/scenes/home/config'
scenes 	= require 'collections/scenes'
TextFX  = require 'fx/text'

module.exports = class UI


	constructor: ( @scene, @gui, @assets ) ->

		@ui =
			'dim': '.dim'
			'hitarea': '.hitarea'
			'hires': 'h1'
			'preface': 'h2'
			'paragraphs': '.paragraphs p'
			'next': '.next'

		happens @

		@tweens = []

		do @render

	render: ->

		data = scenes.get('home')

		###
		Template
		###
		template = require 'templates/scenes/home.jade'

		$('main').append template data: data

 		###
 		Elements
 		###

		@el  = $ "##{data.id}"

		for key, id of @ui
			@ui[key] = @el.find id

		@ui.letters      = @ui.paragraphs.lettering().children()
		@ui.next_letters = @ui.next.lettering().children()
		@ui.dim.remove()

		###
		Objects
		###

		@container = new THREE.Object3D
		@scene.add @container

		@container.position.fromArray config.title_position

		###
		Text
		###
		text3d = new Text

		@title_meshes = text3d.create_multichar {text: 'VOID', size: 490, curve_segments: 10}

		for mesh, i in @title_meshes
			# mesh.material.opacity = 1
			@container.add mesh
			# mesh.position.fromArray config.title_letter_in_position[i]
			# utils.gui_controls @gui, mesh, "title_letter_#{i}", 2000

		@paragraph_meshes = []


	update: ->

		@container.lookAt cameras.user.position

	transition_in: ->

		# return

		# Hires
		params =
			autoAlpha: 1
			ease: Power2.easeIn
			delay: 2

		TweenLite.to @ui.hires, 4, params

		# Preface
		params =
			autoAlpha: 1
			ease: Power4.easeIn
			delay: 0.5

		TweenLite.to @ui.preface, 1.2, params

		# void letters
		timeline = new TimelineLite
		for mesh, i in @title_meshes

			position = config.title_letter_in_position[i]

			params1 =
				x: position[0]
				y: position[1]
				z: position[2]
				ease: Power3.easeOut

			rotation = config.title_letter_in_rotation[i]

			params2 =
				x: rotation[0]
				y: rotation[1]
				z: rotation[2]
				ease: Power3.easeOut

			params3 =
				opacity: 1
				delay: utils.random 0, 1
				ease: Power2.easeOut

			timeline.to mesh.position, 20, params1, 1.8
			timeline.to mesh.rotation, 20, params2, 1.8
			timeline.to mesh.material, 5,  params3, 2.3

		do timeline.play

		fx = new TextFX
		# Paragraphs
		fx.animate @ui.letters, 4000

		params =
			autoAlpha: 1
			ease: Power2.easeIn
			delay: 3
			onComplete: =>

				# Next text
				fx = new TextFX
				fx.exclude = [11...21]
				fx.animate @ui.next_letters, 0

		TweenLite.to @ui.next, 1.6, params


	transition_out: ->

		do @kill_tweens

		TweenLite.killTweensOf @el

		# El
		params =
			autoAlpha: 0
			ease: Power2.easeOut

		@tweens.push TweenLite.to @el, 1.6, params

		# void letters
		timeline = new TimelineLite
		for mesh in @title_meshes

			range = 200

			x = mesh.position.x + utils.random -range, range
			y = mesh.position.y + utils.random -range, range
			z = mesh.position.z + utils.random -range*2, range*2

			range = Math.PI / 2

			rx = utils.random -range, range
			ry = utils.random -range, range
			rz = utils.random -range, range

			params1 =
				delay: 4
				x: x
				y: y
				z: z
				ease: Power1.easeInOut
			params2 =
				delay: 4
				x: rx
				y: ry
				z: rz
				ease: Power1.easeInOut

			timeline.to mesh.position, 20, params1, 0
			timeline.to mesh.rotation, 20, params2, 0


		do timeline.play

		@tweens.push timeline

	transition_out_backward: ->

		do @kill_tweens

		# El
		params =
			autoAlpha: 1
			ease: Power2.easeOut
			delay: 2

		@tweens.push TweenLite.to @el, 1.6, params

		# void letters
		timeline = new TimelineLite
		for mesh, i in @title_meshes

			position = config.title_letter_in_position[i]

			params1 =
				x: position[0]
				y: position[1]
				z: position[2]
				ease: Power3.easeOut

			rotation = config.title_letter_in_rotation[i]

			params2 =
				x: rotation[0]
				y: rotation[1]
				z: rotation[2]
				ease: Power3.easeOut

			timeline.to mesh.position, 20, params1, 1.8
			timeline.to mesh.rotation, 20, params2, 1.8

		do timeline.play

		@tweens.push timeline


	kill_tweens: ->

		for tween in @tweens
			do tween?.kill

	destroy: ->

		do @el.remove

happens    = require 'happens'
dictionary = require 'models/dictionary'
scenes 	   = require 'collections/scenes'
utils      = require 'utils/utils'
cameras    = require 'controllers/engine/cameras'
TextFX     = require 'fx/text'
settings   = require 'app/config/settings'

module.exports = class UI

	is_overlay_open: on

	ui: Object

	_disabled: off

	constructor: ( @id, @assets ) ->

		happens @

		@ui =
			'ui': '.ui'
			'dim': '.dim'
			'hitarea': '.hitarea'
			'transition_black': '.transition_black'
			'chapter': '.chapter'
			'chapter_index': '.chapter_index'
			'title': 'h2'
			'about': '.about'
			'interactions': '.interactions'
			'authors': '.authors'
			'next': '.next'
			'next_title': '.next h3'
			'next_text': '.next .caps-text'

		###
		Template
		###
		template = require 'templates/scenes/chapter.jade'

		data = scenes.get @id

		locals =
			data: data
			base_path: settings.base_path

		$('main').append template locals

		###
 		Elements
 		###

		@el  = $ "##{data.id}"

		@ui[key] = @el.find(id) for key, id of @ui

		@ui.letters 	 = @ui.about.lettering().children()
		@ui.next_letters = @ui.next_text.lettering().children()

		@tweens = []


	bind: ->

		@ui.next_title.on 'click', @show_about

	unbind: ->

		@ui.next_title.off 'click', @show_about

	disable_ui: ->

		@_disabled = on
		@el.addClass 'disable'

	enable_ui: ->

		@_disabled = off
		@el.removeClass 'disable'

	transition_in: ->

		# Chapter
		params =
			ease: Power2.easeIn
			z: 100

		TweenLite.to @ui.chapter, 1.6, params

		# Chapter title
		params =
			autoAlpha: 1
			ease: Power2.easeIn

		TweenLite.to @ui.chapter_index, 1.6, params

		# Title
		params =
			autoAlpha: 1
			ease: Power1.easeInOut
			delay: 1.6

		TweenLite.to @ui.title, 3, params

		# Paragraphs
		fx = new TextFX
		fx.animate @ui.letters, 2000

		# Interactions
		params =
			autoAlpha: 1
			ease: Power2.easeInOut
			delay: 5.7

		TweenLite.to @ui.interactions, 1.6, params

		# Authors
		params =
			autoAlpha: 1
			ease: Power2.easeInOut
			delay: 5.7

		TweenLite.to @ui.authors, 1.6, params


	transition_out: ->

		# El
		params =
			autoAlpha: 0
			ease: Power2.easeOut

		TweenLite.to @ui.dim, 1.6, params

		params =
			autoAlpha: 0
			ease: Power2.easeOut
			onComplete: =>

				params =
					autoAlpha: 1
					ease: Power2.easeIn
					onComplete: =>

						# Next text
						fx = new TextFX
						fx.animate @ui.next_letters, 0

				TweenLite.to @ui.next, 1.6, params

		TweenLite.to @ui.chapter, 1.6, params

	transition_out_fast: ->

		@ui.transition_black
			.removeClass('layer-0')
			.addClass('layer-5')

		params =
			autoAlpha: 1
			ease: Power2.easeOut
			onComplete: =>
				@emit 'transition:out:fast:complete'

		TweenLite.to @ui.transition_black, 1.3, params

	hide: ->

		return if @_disabled

		do @kill_tweens

		# El
		params =
			autoAlpha: 0
			ease: Power2.easeOut

		@tweens.push TweenLite.to @ui.ui, 1.6, params

	show: ->

		do @kill_tweens

		# El
		params =
			autoAlpha: 1
			delay: 1
			ease: Power2.easeOut

		@tweens.push TweenLite.to @ui.ui, 1, params


	show_about: ( event ) =>

		do event.preventDefault

		@is_overlay_open = !@is_overlay_open

		TweenLite.killTweensOf @ui.dim
		TweenLite.killTweensOf @ui.chapter

		if @is_overlay_open

			params =
				autoAlpha: 0
				ease: Power2.easeOut

			TweenLite.to @ui.dim, 0.6, params

			params =
				autoAlpha: 0
				ease: Power2.easeOut

			TweenLite.to @ui.chapter, 0.6, params

		else

			params =
				autoAlpha: 1
				ease: Power2.easeOut

			TweenLite.to @ui.dim, 1.6, params

			params =
				autoAlpha: 1
				delay: 0.5
				ease: Power2.easeOut

			TweenLite.to @ui.chapter, 1.6, params

	kill_tweens: ->

		for tween in @tweens
			do tween?.kill

	destroy: ->

		@unbind
		do @el.remove
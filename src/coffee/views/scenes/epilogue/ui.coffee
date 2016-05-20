happens    = require 'happens'
cameras    = require 'controllers/engine/cameras'
utils      = require 'utils/utils'
settings   = require 'app/config/settings'
dictionary = require 'app/models/dictionary'

Text    		= require 'views/scenes/helpers/text'
config  		= require 'views/scenes/epilogue/config'
scenes 			= require 'collections/scenes'
TextFX  		= require 'fx/text'
SequencerPlayer = require 'utils/sequencer/player'
SequencerModes  = require 'utils/sequencer/modes'
share 			= require 'utils/share'

module.exports = class UI


	constructor: ( @scene, @gui, @assets ) ->

		@ui =
			'dim': '.dim'
			'hitarea': '.hitarea'
			'transition_black': '.transition_black'
			'hires': 'h1 a'
			'preface': 'h2'
			'paragraphs': '.paragraphs dd, .paragraphs dt'
			'next': '.next'
			'social': '.social'
			'social_links': '.social a'

		happens @

		@tweens = []

		do @render

	render: ->

		data = scenes.get('epilogue')

		###
		Template
		###
		template = require 'templates/scenes/epilogue.jade'

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
		Sequence
		###

		asset = utils.get_asset "hires_sequence", @assets

		@ui.sequence = new Sequence @ui.hires, asset

		do @bind

	bind: ->

		@ui.social_links.on 'click', @on_social_click

	unbind: ->

		@ui.social_links.off 'click', @on_social_click


	on_social_click: ( event ) =>

		do event.preventDefault

		$el = $(event.currentTarget)

		sn = $el.data 'share'

		switch sn
			when 'facebook'
				share.facebook settings.share_url, dictionary.get 'share_text'
			when 'twitter'
				share.twitter settings.share_url, dictionary.get 'share_text'
			when 'google'
				share.plus settings.share_url

	transition_in: ->

		# return

		# Preface
		params =
			delay: config.ui_delay + 10
			autoAlpha: 1
			ease: Power4.easeIn

		TweenLite.to @ui.preface, 1.2, params

		# Hires
		utils.delay config.ui_delay + 14, =>

			do @ui.sequence.play

		delay = (config.ui_delay + 15)
		# delay = 0
		utils.delay delay, =>

			fx = new TextFX
			# Paragraphs
			fx.animate @ui.letters, 4000

		# Social
		delay = config.ui_delay + 21
		# delay = 0
		params =
			delay: delay
			autoAlpha: 1
			ease: Power2.easeIn

		TweenLite.to @ui.social, 1, params


	transition_out: ->

		do @kill_tweens

		# El
		params =
			autoAlpha: 0
			ease: Power2.easeOut

		@tweens.push TweenLite.to @el, 1.6, params

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

	kill_tweens: ->

		for tween in @tweens
			do tween?.kill

	destroy: ->

		do @unbind
		do @sequence?.destroy
		do @el.remove


class Sequence

	constructor: ( @el, asset ) ->

		@player = new SequencerPlayer( @el[0] )

		@player.on 'setup_complete', =>

			@mode = new SequencerModes.LinearMode(@player.data)

			@player.set_mode(@mode)

		@player.noload( asset.data, asset.images )

	play: ->

		@mode.once 'complete', =>
			@mode.frame = @mode.total_frames()
			do @mode._update

		@mode.play 5, @mode.total_frames()

	destroy: ->
		@mode = null
		do @player.destroy

UI    			= require 'views/scenes/ui'
utils 			= require 'utils/utils'
SequencerPlayer = require 'utils/sequencer/player'
SequencerModes  = require 'utils/sequencer/modes'

module.exports = class UI extends UI

	curent_id: 'octahedron'

	constructor: ( @id, @gui, @assets ) ->

		super @id, @assets

		@ui.sequences    = @el.find '[data-sequence]'
		@ui.nav_geometry = @el.find 'nav.geometry'
		@ui.titles       = @el.find '.titles'

		###
		Load spritesheets
		###

		@sequences = {}
		
		len    = @ui.sequences.length
		radius = 300

		@ui.sequences.each ( index, item ) =>

			$el = $ item
			id  = $el.data 'id'

			asset = utils.get_asset "#{id}_sequence", @assets

			@sequences[id] = new Sequence $el, asset

	transition_in: ->

		super()

		delay = 9.5
		# delay = 0

		delays = [1, 0.7, 0.3, 0.7, 1]

		@ui.sequences.each ( index, item ) =>

			$item = $(item)

			params = 
				autoAlpha: 1
				ease: Power2.easeIn
				delay: delay + delays[index]

			TweenLite.to $item.parent(), 1.5, params

		utils.delay delay, =>
			do @bind

	bind: ->

		super()

		@ui.sequences.on 'mouseover', @on_mouse_over
		@ui.sequences.on 'mouseleave', @on_mouse_out
		@ui.sequences.on 'click', @on_navlink_click

	unbind: ->

		super()

		@ui.sequences.off 'mouseover', @on_mouse_over
		@ui.sequences.off 'mouseleave', @on_mouse_out
		@ui.sequences.off 'click', @on_navlink_click


	on_mouse_over: ( event ) =>

		el = $ event.currentTarget
		id = el.data 'id'

		do @sequences[id].play

	on_mouse_out: =>

		el = $ event.currentTarget
		id = el.data 'id'

		do @sequences[id].stop

	on_navlink_click: ( event ) =>

		do event.preventDefault

		$el = $(event.currentTarget)

		id = $el.data 'id'

		return if @curent_id is id

		@curent_id = id

		@ui.nav_geometry.find('a').removeClass 'active'
		@ui.nav_geometry.find('a[data-id="'+id+'"]').addClass 'active'

		# c.log 'xxx', map[id]

		do @disable_ui

		@emit 'change:geometry', id

	show_title: ( id ) ->

		TweenLite.set @ui.titles.find('.title'), autoAlpha: 0

		TweenLite.set @ui.titles.find('[data-id="'+id+'"]'), autoAlpha: 1

		params = 
			ease: Power2.easeIn
			autoAlpha: 1

		TweenLite.to @ui.titles, 1.6, params

		params = 
			ease: Power2.easeIn
			autoAlpha: 0

		TweenLite.to @ui.next_text, 1.6, params

	hide_title: ->

		do @enable_ui

		params = 
			ease: Power2.easeIn
			autoAlpha: 0

		TweenLite.to @ui.titles, 1.6, params

		params = 
			ease: Power2.easeIn
			autoAlpha: 1

		TweenLite.to @ui.next_text, 1.6, params

	destroy: ->

		for key, sequence of @sequences
			do sequence.destroy

		super()


class Sequence

	constructor: ( @el, asset ) ->

		@player = new SequencerPlayer( @el[0] )

		@player.on 'setup_complete', =>

			@mode = new SequencerModes.LinearMode(@player.data)

			@player.set_mode(@mode)
			@mode.frame = 0
			do @mode._update

		@player.noload( asset.data, asset.images )

	play: ->

		@mode.play 1, @mode.total_frames()

		@mode.on 'complete', @repeat_for_hover
	

	stop: ->

		@mode.off 'complete', @repeat_for_hover

	repeat_for_hover: =>
		@mode.play 1, @mode.total_frames()

	destroy: ->
		@mode = null
		do @player.destroy



happens = require 'happens'

module.exports = class Player

	el                : null
	current_frame     : -1
	spritesheet_index : -1
	offset_x		  : 0
	offset_y		  : 0
	mode              : null

	constructor: ( @el ) ->

		happens @

		@el.style.overflow = 'hidden'


	_create_frame: (src, class_name) ->

		el = document.createElement 'div'
		el.className      = class_name
		el.style.position = 'absolute'
		el.style.width    = '100%'
		el.style.height   = '100%'
		el.style.backgroundImage = "url(#{src})" if src
		el.style.backgroundRepeat = "no-repeat"
		el.style.visibility = 'hidden'

		return el

	###
	Setup the container
	###
	_setup: =>

		@container = document.createElement 'div'
		@container.style.position = 'absolute'
		@el.appendChild @container

		width  = @data.frame.width  * @data.frame.scale
		height = @data.frame.height * @data.frame.scale

		@frame_width = @data.frame.width
		@frame_height = @data.frame.height

		@max_frames_horizontal  = Math.round(@data.width  / @data.frame.width)
		@max_frames_vertical    = Math.round(@data.height / @data.frame.height)

		@_frames = []

		for img, i in @_cache

			el = @_create_frame img.src, 'sd_frame'

			@_frames.push el

			@container.appendChild el

		@_cache = null

		@set_size width, height

		@emit 'setup_complete', @


	_update: (force = false) =>

		# Get the current frame
		frame = @mode.get_frame()

		# Get the current spritesheet
		spritesheet_index = Math.floor frame / @data.frames_per_spritesheet

		frames_at_index = spritesheet_index * @data.frames_per_spritesheet
		
		tile = frame - frames_at_index
		# console.log 'spritesheet', spritesheet_index
		# console.log 'spritesheet', spritesheet_index, 'tile', tile, 'frame', frame

		# Calculate the actual x/y position on the spritesheet grid
		index = -1
		xpos = 0
		ypos = 0
		for y in [0...@max_frames_vertical]
			for x in [0...@max_frames_horizontal]
				index++
				if index == tile
					xpos = x
					ypos = y
					break

		background_x = -(xpos * @frame_width)
		background_y = -(ypos * @frame_height)

		background_x += @offset_x
		background_y += @offset_y

		if frame isnt @current_frame or force

			# Hide the last image it it exists
			if @_frames[@spritesheet_index]?

				@_frames[@spritesheet_index].style.visibility = 'hidden'
				@_frames[@spritesheet_index].style.zIndex = 0

			@current_frame = frame
			@spritesheet_index = spritesheet_index

			x = background_x + 'px'
			y = background_y + 'px'

			@_frames[spritesheet_index].style.backgroundPosition = "#{x} #{y}"

			@_frames[spritesheet_index].style.visibility = 'visible'
			@_frames[spritesheet_index].style.zIndex = 1

	_resize: =>

		$window = $(window)

		@set_size $window.width(), $window.height()

		@_update(true)


	###----------------------------------------------
	@public
	###

	load: (@path, frames) =>

		$.ajax
			url: @path + '/' + frames,
			complete: (data) =>
				@data = JSON.parse data.responseText
				@_load_images() 
			error: (error) => 
				#@log error


	noload: (@data, @_cache) ->
		@_setup()

		
	###
	Set the playback mode
	###
	set_mode: (mode) =>
		
		# Unset previous events
		@mode?.off 'update', @update
		
		@mode = mode

		# Subscribe to new mode tick
		@mode.on 'update', @update


	set_size: (@width, @height) =>

		# console.log 'set size', @width, @height

		@el.style.width  = @width  + 'px'
		@el.style.height = @height + 'px'

		@container.style.width  = @width  + 'px'
		@container.style.height = @height + 'px'

		# @log 'el', @el

		$frames = $(@container).find '.sd_frame'

		[@frame_width, @frame_height, @offset_x, @offset_y] = Utils.resize_spritesheet $frames, @data.frame.width, @data.frame.height, @width, @height, @max_frames_horizontal, @max_frames_vertical

		@frame_width = Math.floor( @frame_width	)
		@frame_height = Math.floor( @frame_height )


	update: => 
		return unless @mode?
		@_update()


	###
	Enable the automatic resizing of the sequencer container on window resize
	###
	enable_automatic_resize: ->
		$(window).on 'resize', @_resize
		@_resize()
		

	###
	Disable the automatic resizing of the sequencer container on window resize
	###
	disable_automatic_resize: ->
		$(window).off 'resize', @_resize


	###
	Return the number of frames in the sequence
	@return [Int]
	###
	get_total_frames: -> @data.total_frames - 1

	###
	Return the number of frames in the sequence
	@return [Int]
	###
	get_total_spritesheets: -> @data.total_spritesheets - 1

	destroy: ->         

		# UnSubscribe to new mode tick
		@mode.off 'update', @update

		@mode = null

		@__init = null
		@on     = null
		@off    = null
		@once   = null
		@emit   = null
		@data   = null

		@el.innerHTML = ''


Utils =
	calculate_resize: (image_width, image_height, win_width, win_height) ->

		window_ratio = win_width / win_height
		image_ratio1 = image_width / image_height
		image_ratio2 = image_height / image_width

		if window_ratio < image_ratio1
			
			new_height = win_height
			new_width  = Math.round( new_height * image_ratio1 )

			new_top  = 0
			new_left = (win_width * .5) - (new_width * .5) 

		else
			
			new_width  = win_width
			new_height = Math.round( new_width * image_ratio2 );

			new_top  = (win_height * .5) - (new_height * .5)
			new_left = 0 

		return {
			x      : new_left
			y      : new_top
			width  : new_width
			height : new_height
		}

	###
	Resize image(s) to the browser size retaining aspect ratio
	@param [jQuery]  $images
	@param [Number]  image_width
	@param [Number]  image_height
	@param [Number]  win_width
	@param [Number]  win_width
	@param [Boolean] backgroundsize
	###
	resize: ($images, image_width, image_height, win_width, win_height, backgroundsize) ->

		data = @calculate_resize image_width, image_height, win_width, win_height

		# Background size is a lot fast than scaling and positioning an image

		if backgroundsize
			$images.css
				'background-size'     : "#{data.width}px #{data.height}px"
				'background-position' : "#{data.x}px #{data.y}px"
		
		else
			$images.css
				'margin-top'  : "#{data.y}px"
				'margin-left' : "#{data.x}px"
				'width'       : "#{data.width}px"
				'height'      : "#{data.height}px"

	resize_spritesheet: ($images, image_width, image_height, win_width, win_height, max_frames_horizontal, max_frames_vertical) ->

		# console.log 'image_width', image_width, 'image_height',image_height 

		data = @calculate_resize image_width, image_height, win_width, win_height

		# Background size is a lot fast than scaling and positioning an image

		size_x = data.width * max_frames_horizontal
		size_y = data.height * max_frames_vertical

		$images.css
			'background-size' : "#{size_x}px #{size_y}px"

		return [data.width, data.height, data.x, data.y]
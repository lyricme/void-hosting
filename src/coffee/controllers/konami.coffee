utils    = require 'utils/utils'
settings = require 'app/config/settings'
Loader   = require 'utils/loading/async_loader'
win      = require 'utils/window'

module.exports = class Konami

	num_stickers: 35

	constructor: ->

		# c.log 'controller::konami'

		@el = $ 'body'

		@ui =
			'main': 'main'

		@ui[key] = @el.find(id) for key, id of @ui

		###
		http://www.paulirish.com/2009/cornify-easter-egg-with-jquery/
		up, up, down, down, left, right, left, right, b, a
		###

		kkeys = []
		konami = '38,38,40,40,37,39,37,39,66,65'
		$(document).keydown (e) =>
			kkeys.push e.keyCode
			if kkeys.toString().indexOf(konami) >= 0
				$(document).unbind 'keydown', arguments.callee
				do @wtf
				kkeys = []

		# do @wtf

	wtf: ->

		win.on 'resize', @omg

		@ui.main.addClass 'konami'

		@loader = new Loader

		@loader.add 'images', settings.base_path + '/img/konami/images.json', 'json'
		@loader.add 'lol', settings.base_path + '/sound/konami/lol.mp3', 'sound'

		@loader.once 'loaded', @lols

		do @loader.load

	lols: ( manifest ) =>

		data = @loader.get_asset('images').data.images

		sound = @loader.get_asset('lol').data

		do sound.play

		sound.loop on

		@stickers = []

		for i in [0...@num_stickers]

			start_delay = i * 0.2

			@stickers.push new Sticker start_delay, data

		# do @omg


	omg: =>

		if win.width < 1280
			total = 15
		else if win.width < 1440
			total = 25
		else
			total = @num_stickers

		for sticker in @stickers
			do sticker.hide

		for i in [0...total]
			do @stickers[i].show


class Sticker

	constructor: ( delay, @data ) ->

		@img = $('<img/>')
		@img.addClass 'sticker'

		$('body').append @img

		utils.delay delay, =>
			do @random

	src: ->
		src = @data[ Math.floor(Math.random()*@data.length) ]

		@img.attr 'src', settings.base_path + '/img/konami/' + src

	random: ->

		do @src

		transform = "scale(#{utils.random(0.3, 1)})"

		@img.css
			'left': utils.random(0, win.width * 0.8) + 'px'
			'top' : utils.random(0, win.height * 0.8) + 'px'
			'transform': transform

		delay = utils.random 5, 10

		utils.delay delay, =>

			@start_delay = 0
			do @random


	show: ->
		@img.css 'display', 'block'

	hide: ->
		@img.css 'display', 'none'



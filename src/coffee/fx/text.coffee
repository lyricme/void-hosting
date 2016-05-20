utils = require 'utils/utils'

module.exports = class

	exclude: Array

	constructor: ->

		@exclude = []

	animate: ( letters, base_delay ) ->

		for letter, index in letters

			letter_animation = new LetterAnimation $(letter), base_delay

			if index in @exclude
				letter_animation.once = on

class LetterAnimation

	passes: 5
	opacity: 0
	progress: 0
	once: off

	constructor: ( @el, @base_delay ) ->

		# c.log @el

		@increment = 1 / @passes

		do @animate

	animate: ->

		@progress++

		if @progress <= @passes

			@opacity += @increment

			if @progress is 1
				delay = @base_delay + Math.random() * 2400
			else
				delay = Math.random() * 2400

			@el.delay(delay).animate 'opacity': @opacity, 500, =>
				do @animate

		else

			# one finished

			return if @once

			arr = [0...@passes]

			random_opacity_index = arr[Math.ceil(utils.random(2, arr.length))-1]

			# c.log 'random_opacity_index', random_opacity_index

			@opacity = random_opacity_index * @increment

			@progress = random_opacity_index

			@el.delay(delay).animate 'opacity': @opacity, 500, =>
				do @animate
dictionary = require 'models/dictionary'

module.exports = class

	constructor: ->

		template = require 'templates/notfound.jade'

		locals =
			dictionary: dictionary

		$('body').append template locals
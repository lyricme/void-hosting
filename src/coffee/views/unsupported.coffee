dictionary = require 'models/dictionary'
settings   = require 'app/config/settings'
device     = require 'app/config/device'

module.exports = class

	constructor: ->

		template = require 'templates/unsupported.jade'

		locals =
			dictionary: dictionary
			base_path: settings.base_path
			device: device.device

		$('body').append template locals
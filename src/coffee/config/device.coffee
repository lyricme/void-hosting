bowser   = (require 'bowser').browser
isMobile = require 'ismobilejs'

module.exports = new class Device

	constructor: ->

		@ie 	  = bowser.msie
		@firefox  = bowser.firefox
		@ltie10	  = bowser.msie and bowser.version < 10
		@name     = bowser.name
		@version  = bowser.version
		@mobile   = isMobile.phone
		@tablet   = isMobile.tablet
		@handheld = isMobile.any
		@device   = @tablet or @mobile
		@desktop  = (@tablet or @mobile) is off
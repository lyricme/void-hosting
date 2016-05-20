happens	= require 'happens'

module.exports = class ImageLoader

	constructor: -> happens @

	load: ( asset ) ->

		image = new Image()

		image.onload = =>
			asset.data = image
			@emit 'loaded', asset
		
		image.src = asset.src
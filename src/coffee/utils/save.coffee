renderer = require 'controllers/engine/renderer'
happens  = require 'happens'

module.exports = class 

	constructor: -> happens @

	export: ( width, height ) ->

		img = Canvas2Image.convertToImage renderer.domElement, width, height, 'jpeg'

		$.ajax
			type: 'POST'
			url: 'save_image.php'
			dataType: 'text'
			data:
				base64Data: img.src
			success: (data) =>
				SaveToDisk("exports/#{data}", data)

				@emit 'done'

				c.log 'emit done'
			error: =>
				console.log 'error'
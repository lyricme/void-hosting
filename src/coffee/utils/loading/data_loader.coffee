happens	= require 'happens'

module.exports = class DataLoader

	constructor: -> happens @

	load: ( asset ) ->

		$.ajax
			url: asset.src
			dataType: asset.type
			success: ( data ) => 

				asset.data = data

				@emit 'loaded', asset
			
			error: ( error ) =>

				c.error 'error', error
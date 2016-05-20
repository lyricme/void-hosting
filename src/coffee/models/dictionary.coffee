happens  = require 'happens'
settings = require 'app/config/settings'
Loader   = require 'utils/loading/async_loader'

class Dictionary

	default_dictionary: 'dictionary.xml'

	constructor: ->

		happens @

		@objs = {}

	
	load: ->

		loader = new Loader

		loader.on 'loading', ( percent )  => c.info '[ PERCENT LOADED ] ->', percent

		loader.once 'loaded', ( manifest ) =>

			@objs[ asset.id ] = $ asset.data for asset in manifest

			@emit 'loaded'
	
		loader.add 'dictionary.xml', "#{settings.base_path}/xml/dictionary.xml", 'xml'
		loader.add 'scenes.xml', "#{settings.base_path}/xml/scenes.xml", 'xml'
		
		do loader.load


	get: ( id, dictionary = @default_dictionary ) ->
		
		node = @get_raw id, dictionary

		if node then return node.text() else return ''


	get_raw: ( id, dictionary = @default_dictionary ) ->

		if @objs[ dictionary ].find( id ).length
			return @objs[ dictionary ].find( id )

		return false


	get_dictionary: ( dictionary = @default_dictionary ) ->
		
		return @objs[ dictionary ]


module.exports = new Dictionary
happens	= require 'happens'

module.exports = class SoundLoader

	constructor: -> happens @

	load: ( asset ) ->

		sound = new Howl
			src: [ asset.src ]
			onload: => 
				asset.data = sound
				@emit 'loaded', asset
happens	= require 'happens'

module.exports = class GeometryLoader

	constructor: -> happens @

	load: ( asset ) ->

		loader = new THREE.JSONLoader()

		loader.load asset.src, ( geometry ) =>

			asset.data = geometry

			@emit 'loaded', asset
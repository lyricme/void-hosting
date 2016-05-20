utils = require 'utils/utils'

module.exports = class Text

	create: ( _settings ) ->

		settings =
			text: 'x'
			size: 80
			height: 10
			curve_segments: 2
			font: 'montserrat'
			color: 0xFFFFFF

		utils.merge settings, _settings

		geometry = new THREE.TextGeometry( settings.text, {
			size: settings.size,
			height: settings.height,
			curveSegments: settings.curve_segments,
			font: settings.font
		})

		geometry.computeBoundingBox()

		for v in geometry.vertices
			v.x += -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x )

		material = new THREE.MeshBasicMaterial color: settings.color, transparent: on
		mesh    = new THREE.Mesh( geometry, material )

		return mesh

	create_multichar: ( _settings ) ->

		settings =
			text: 'x'
			size: 80
			height: 10
			line_height: 160
			curve_segments: 2
			font: 'montserrat'
			color: 0xFFFFFF

		utils.merge settings, _settings

		len = settings.text.length

		meshes   = []
		offset_x = ((len * settings.size) / 2) - settings.size/2

		for i in [0...len]

			char = settings.text.charAt i

			geometry = new THREE.TextGeometry( char, {
				size: settings.size,
				height: settings.height,
				curveSegments: settings.curve_segments,
				font: settings.font
			})

			geometry.computeBoundingBox()

			for v in geometry.vertices
				v.x += -0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x )
				v.y += -0.5 * ( geometry.boundingBox.max.y - geometry.boundingBox.min.y )

			material = new THREE.MeshBasicMaterial color: settings.color, transparent: on, depthTest: off
			mesh = new THREE.Mesh( geometry, material )

			mesh.position.x = (i * settings.size) - offset_x

			meshes.push mesh

		return meshes

	create_multiline: ( _settings ) ->

		settings =
			text: 'x'
			size: 80
			height: 10
			line_height: 160
			curve_segments: 2
			font: 'montserrat'
			color: 0xFFFFFF

		utils.merge settings, _settings

		lines = settings.text.split "\\n"

		geometry = new THREE.Geometry

		for line, i in lines

			geom = new THREE.TextGeometry( line, {
				size: settings.size,
				height: settings.height,
				curveSegments: settings.curve_segments,
				font: settings.font
			})

			geom.computeBoundingBox()

			for v in geom.vertices
				v.x += -0.5 * ( geom.boundingBox.max.x - geom.boundingBox.min.x )
				v.y -= i * settings.line_height

			geometry.merge geom

		
		material = new THREE.MeshBasicMaterial color: settings.color, transparent: on
		mesh 	 = new THREE.Mesh( geometry, material )

		return mesh
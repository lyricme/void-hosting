camera = (require 'controllers/engine/cameras').user
utils  = require 'utils/utils'

module.exports = class Path

	path_curve: null
	camera_position: 0.1

	debug: off

	constructor: ( @id, @scene, @points, @lookat, @color, @gui = null, bounds = 100 ) ->

		if @gui
			folder = @gui.addFolder @id
			folder.add @, 'export_data'
			folder.add(@, 'camera_position', 0, 1).onChange => do @update_camera
			do folder.open

		if @gui

			@lookat_marker = new THREE.Mesh(new THREE.SphereGeometry( 2, 8, 8 ), new THREE.MeshBasicMaterial(color:0xFF0000))
			@lookat_marker.position.set @lookat.x, @lookat.y, @lookat.z
			@lookat_marker.visible = @debug
			@scene.add @lookat_marker

			f = folder.addFolder "lookat"
			f.add(@lookat_marker.position, 'x', -bounds, bounds)
			f.add(@lookat_marker.position, 'y', -bounds, bounds)
			f.add(@lookat_marker.position, 'z', -bounds, bounds)
			do f.open

		@markers = []

		for p, i in @points
			
			if @gui
				f = folder.addFolder "point_#{i}"
				f.add(p, 'x', -bounds, bounds).onChange => do @update_path
				f.add(p, 'y', -bounds, bounds).onChange => do @update_path
				f.add(p, 'z', -bounds, bounds).onChange => do @update_path
				do f.open

			marker = new THREE.Mesh(new THREE.SphereGeometry( 1, 8, 8 ), new THREE.MeshBasicMaterial(color:@color))
			marker.visible = @debug
			@markers.push marker
			@scene.add marker

		# debug
		# @scene.add new THREE.CameraHelper camera

		do @update_path

	update_path: =>

		points_vec = []

		for point, i in @points
			@markers[i].position.set point.x, point.y, point.z
			points_vec.push new THREE.Vector3 point.x, point.y, point.z

		# Generate path
		@scene.remove @path_curve

		spline = utils.spline points_vec
				
		points = spline.getPoints 50

		geometry = new THREE.Geometry

		for point in points
			geometry.vertices.push point.clone()

		@path_curve = new THREE.Line geometry, new THREE.LineBasicMaterial 0xFFFFFF*Math.random()
		@path_curve.visible = @debug

		@scene.add @path_curve
		
		# Get spline for camera
		@spline = utils.spline points

	update_camera: =>

		position = @spline.getPointAt @camera_position

		camera.position.copy position
		camera.lookAt @lookat_marker.position

	export_data: ->

		json = {}
		json[@id] = []

		for point, i in @points
			data = 
				x: point.x
				y: point.y
				z: point.z

			json[@id].push data

		json[@id + '_lookat'] = 
			x: @lookat_marker.position.x
			y: @lookat_marker.position.y
			z: @lookat_marker.position.z

		c.log JSON.stringify json, undefined, 4
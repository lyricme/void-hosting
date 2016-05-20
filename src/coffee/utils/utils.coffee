module.exports =

	lerp: ( min, max, ratio ) ->
		min + ((max - min) * ratio)

	random: ( min, max ) ->
		min + Math.random() * (max - min)

	radians: ( degrees ) ->
		degrees * Math.PI / 180

	degrees: ( radians ) ->
		radians * 180 / Math.PI

	spline: ( points ) ->

		tmp = []

		tmp.push point.clone() for point in points

		new THREE.SplineCurve3 tmp

	delay: ( delay, func ) ->
		setTimeout func, delay * 1000

	###
	https://gist.github.com/svlasov-gists/2383751
	###
	merge: (target, source) ->

		# Merges two (or more) objects,
		# giving the last one precedence

		target = {}  if typeof target isnt "object"

		for property of source
			if source.hasOwnProperty(property)
				sourceProperty = source[property]
				if typeof sourceProperty is "object"
					target[property] = @merge(target[property], sourceProperty)
					continue
				target[property] = sourceProperty
		a = 2
		l = arguments.length

		while a < l
			merge target, arguments[a]
			a++

		target

	path: ( scene, positions = [], color = 0xFF0000, gui = null, smoothness = 100 ) ->

		path_points = ("#{i}" for i in [0...positions.length])

		# bounds = 100
		bounds = 10000
		meshes = []
		size = 50
		# size = 10

		for i in [0...path_points.length]

			mesh 	  = new THREE.Mesh(new THREE.SphereGeometry( size, 16, 16 ), new THREE.MeshBasicMaterial( color: color, wireframe: on ) )
			mesh.name = "path_#{i}"

			mesh.position.fromArray positions[i]

			if gui
				gui.add mesh, 'name'
				gui.add(mesh.position, 'x', -bounds, bounds).name('position x')
				gui.add(mesh.position, 'y', -bounds, bounds).name('position y')
				gui.add(mesh.position, 'z', -bounds, bounds).name('position z')

			meshes.push mesh

			# scene.add mesh

		positions 	 = (mesh.position.clone() for mesh in meshes)

		spline 		 = @spline positions

		points 		 = spline.getPoints smoothness

		geometry = new THREE.Geometry

		for point in points
			geometry.vertices.push point.clone()

		line = new THREE.Line geometry, new THREE.LineBasicMaterial color: color

		# line.visible = off
		# scene.add line

		return @spline points

	gui_controls: ( gui, object, name, position_bounds = 100 ) ->

		rotation_bounds = Math.PI * 2

		object.updateMatrix()

		folder = gui.addFolder name
		folder.add object.position, 'x', -position_bounds, position_bounds
		# folder.add object.position, 'y', 0, 300
		folder.add object.position, 'y', -position_bounds, position_bounds
		folder.add object.position, 'z', -position_bounds, position_bounds
		folder.add object.rotation, 'x', -rotation_bounds, rotation_bounds
		folder.add object.rotation, 'y', -rotation_bounds, rotation_bounds
		folder.add object.rotation, 'z', -rotation_bounds, rotation_bounds

	get_asset: ( id, manifest ) ->
		result = false
		for asset in manifest
			if asset.id.match id
				result = asset

		return result

window.PI      = Math.PI
window.HALF_PI = Math.PI / 2
window.PI_2    = Math.PI * 2

Number::map = (in_min, in_max, out_min, out_max) ->
	(this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min

String::capitalizeFirstLetter = ->
	@charAt(0).toUpperCase() + @slice(1)

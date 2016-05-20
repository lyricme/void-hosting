happens  	= require 'happens'
settings 	= require 'app/config/settings'
cameras  	= require 'controllers/engine/cameras'
engine 		= require 'controllers/engine/index'
Loader 		= require 'utils/loading/async_loader'
Mouse 		= require 'utils/mouse'
utils 		= require 'utils/utils'

Experiment  = require 'views/scenes/experiment'
lights   	= require 'views/scenes/liquidice/lights'
config 		= require 'views/scenes/liquidice/config'
UI 			= require 'views/scenes/ui'
assets 		= require 'views/scenes/liquidice/assets'
PathLookatFixed = require 'views/scenes/helpers/path_lookat_fixed'
PathLookatCurve = require 'views/scenes/helpers/path_lookat_curve'

module.exports = class Liquidice extends Experiment

	values    	: null
	points    	: null
	positions 	: []
	material  	: null
	tween     	: null
	audio_pos_x : 0.1
	audio_pos_y : 0.1
	audio_pos_z : 0

	setup: ( manifest ) =>

		range = 1

		@gui.add @, 'audio_pos_x', -range, range
		@gui.add @, 'audio_pos_y', -range, range
		@gui.add @, 'audio_pos_z', -range, range

		###
		Engine
		###

		engine.fov = config.camera_fov

		###
		UI
		###
		@ui = new UI 'liquidice', @scene, @gui

		###
		Scene
		###

		if config.fog_enabled
			@scene.fog = new THREE.FogExp2( 0x000000, config.fog_in_start )

			@gui.add @scene.fog, 'density', 0, 1


		###
		Helpers
		###

		if settings.debug

			@scene.add new THREE.GridHelper 50, 10
			@scene.add new THREE.AxisHelper 10

			@scene.add new THREE.CameraHelper cameras.user


		###
		Lights
		###

		@scene.add light for light in lights

		###
		Create curve for camera
		###

		@path_in  = new PathLookatFixed 'path_in', @scene, config.path_in, config.path_in_lookat, 0x00FF00#, @gui, 1000
		@path_out = new PathLookatCurve 'path_out', @scene, config.path_out, config.path_out_lookat, 0x00FF00#, @gui, 100

		###
		Mouse
		###
		@mouse = new Mouse $('body')

		###
		Sounds
		###

		@audio_pos_z = @config.audio_pos_z_in

		@sounds =
			background: utils.get_asset('background', manifest).data
			top: utils.get_asset('top', manifest).data

		@sounds.background.volume 2
		do @sounds.background.play

		@sounds.top.volume 0
		do @sounds.top.play

		for key, sound of @sounds
			sound.loop on

		###
		Objects
		###

		@container = new THREE.Object3D

		@scene.add @container

		###
		Marching cubes
		###

		axisMin   = -6 # this is the bounding box range
		axisMax   = 6
		axisRange = axisMax - axisMin

		# The Marching Cubes Algorithm draws an isosurface of a given value.
		# To use this for a Metaballs simulation, we need to:
		# (1) Initialize the domain - create a grid of size*size*size @points in space
		# (2) Initialize the range  - a set of @values, corresponding to each of the @points, to zero.
		# (3) Add 1 to @values array for @points on boundary of the sphere;
		#       @values should decrease to zero quickly for @points away from sphere boundary.
		# (4) Repeat step (3) as desired
		# (5) Implement Marching Cubes algorithm with isovalue slightly less than 1.

		size   = 16
		size2  = size * size
		size3  = size * size * size
		@points = []

		# generate the list of 3D @points
		k = 0

		while k < size
			j = 0

			while j < size
				i = 0

				while i < size

					x = axisMin + axisRange * i / (size - 1)
					y = axisMin + axisRange * j / (size - 1)
					z = axisMin + axisRange * k / (size - 1)

					@points.push new THREE.Vector3 x, y, z

					i++
				j++
			k++

		@values = []

		# initialize @values
		i = 0

		while i < size3
			@values[i] = 0
			i++


		###
		Balls
		###

		urls = []
		for asset in manifest

			if asset.id in ['pos-x', 'neg-x', 'pos-y', 'neg-y', 'pos-z', 'neg-z']
				urls.push asset.src

		textureCube 	   = THREE.ImageUtils.loadTextureCube(urls)
		textureCube.format = THREE.RGBFormat

		fShader = THREE.FresnelShader

		uniforms =
			mRefractionRatio:
				type: "f"
				value: 1.02

			mFresnelBias:
				type: "f"
				value: 0.1

			mFresnelPower:
				type: "f"
				value: 2.0

			mFresnelScale:
				type: "f"
				value: 1.0

			tCube:
				type: "t"
				value: textureCube

		if config.fog_enabled
			uniforms.topColor =
				type: "c"
				value: new THREE.Color(0x0077ff)

			uniforms.bottomColor =
				type: "c"
				value: new THREE.Color(0xffffff)

			uniforms.offset =
				type: "f"
				value: 33

			uniforms.exponent =
				type: "f"
				value: 0.6

			uniforms.fogColor =
				type: "c"
				value: 0x000000

			uniforms.fogNear =
				type: "f"
				value: 0

			uniforms.fogFar =
				type: "f"
				value: 1

			uniforms.fogDensity =
				type: "f"
				value: 0.01

		@material = new THREE.ShaderMaterial
			uniforms       : uniforms
			vertexShader   : fShader.vertexShader
			fragmentShader : fShader.fragmentShader
			fog: true
			side: THREE.DoubleSide

		i = 0

		while i < config.max_blobs

			[x, y, z] = @random_sphere_point 0, 0, 0, 4

			@positions.push new THREE.Vector3(x, y, z)

			i++

		@clock  = new THREE.Clock

		###
		GUI
		###

		@gui.add(config, 'num_blobs', 1, config.max_blobs).name 'blobs'
		@gui.add(config, 'speed', 0, 1).name

		@ready = on

		do @bind
		@emit 'setup:complete'


	bind: ->

		super()

		@mouse.on 'down', @on_mouse_down
		@mouse.on 'up', @on_mouse_up

		@on 'transition:out:backward', @on_transition_out_backward
		@on 'transition:out:forward', @on_transition_out_forward

		do @ui.bind
		do @mouse.bind

	unbind: ->

		super()

		@mouse.off 'down', @on_mouse_down
		@mouse.off 'up', @on_mouse_up

		@off 'transition:out:backward', @on_transition_out_backward
		@off 'transition:out:forward', @on_transition_out_forward

		do @ui.unbind
		do @mouse.unbind

	force_transition_in_complete: ->

		super()

		@camera_tween.totalProgress(1).kill()
		@fog_tween.totalProgress(1).kill()

	transition_in: ->

		super()

		params =
			audio_pos_z: 0
			ease: Power1.easeOut

		TweenLite.to @, @config.camera_in_duration, params

	on_transition_out_backward: ( value ) =>

		value = Math.max value, 0
		value = Math.min value, 1

		# c.log 'on_transition_out_backward', value

		@audio_pos_z = utils.lerp 0, @config.audio_pos_z_out, value

	on_transition_out_forward: ( value ) =>

		# c.log 'on_transition_out_forward', value

		@audio_pos_z = utils.lerp 0, @config.audio_pos_z_out, value

	update: =>

		return if not @ready

		@audio_pos_x = @mouse.normal_x
		@audio_pos_y = @mouse.normal_y

		@sounds.background.pos @audio_pos_x, @audio_pos_y, @audio_pos_z
		@sounds.top.pos @audio_pos_x, @audio_pos_y, @audio_pos_z

		t = @clock.getElapsedTime()

		@ballUpdate config.speed * t


	ballUpdate: (t) ->

		@resetValues @values

		i = 0

		while i < config.num_blobs

			x = @positions[i].x * Math.cos(1.5 * t) * config.scalar
			y = @positions[i].y * Math.cos(2.5 * t) * config.scalar
			z = @positions[i].z * Math.sin(5.7 * t) * config.scalar

			@addBall @points, @values, new THREE.Vector3( x, y, z )

			i++

		@container.remove @mesh
		geometry = @marchingCubes(@points, @values, 0.5)

		@mesh = new THREE.Mesh(geometry, @material)
		@container.add @mesh

		@container.rotation.x += 0.3 * (@mouse.normal_center_x * 0.05)
		@container.rotation.y += 0.3 * (@mouse.normal_center_x * 0.05)
		@container.rotation.z += 0.3 * (@mouse.normal_center_y * 0.05)

	# METABALLS FUNCTIONS
	resetValues: (@values) ->

		i = 0

		while i < @values.length
			@values[i] = 0
			i++

	# add @values corresponding to a ball with radius 1 to @values array
	addBall: (@points, @values, center) ->

		i = 0

		while i < @values.length
			OneMinusD2 = 1.0 - center.distanceToSquared(@points[i])
			@values[i] += Math.exp(-(OneMinusD2 * OneMinusD2))
			i++

	# MARCHING CUBES ALGORITHM
	# parameters: domain @points, range @values, isolevel
	# returns: geometry
	marchingCubes: (@points, @values, isolevel) ->

		# assumes the following global @values have been defined:
		#   THREE.edgeTable, THREE.triTable
		size = Math.round(Math.pow(@values.length, 1 / 3))
		size2 = size * size
		size3 = size * size * size

		# Vertices may occur along edges of cube, when the @values at the edge's end@points
		#   straddle the isolevel value.
		# Actual position along edge weighted according to function @values.
		vlist = new Array(12)
		geometry = new THREE.Geometry()
		vertexIndex = 0
		z = 0

		while z < size - 1
			y = 0

			while y < size - 1
				x = 0

				while x < size - 1

					# index of base point, and also adjacent @points on cube
					p = x + size * y + size2 * z
					px = p + 1
					py = p + size
					pxy = py + 1
					pz = p + size2
					pxz = px + size2
					pyz = py + size2
					pxyz = pxy + size2

					# store scalar @values corresponding to vertices
					value0 = @values[p]
					value1 = @values[px]
					value2 = @values[py]
					value3 = @values[pxy]
					value4 = @values[pz]
					value5 = @values[pxz]
					value6 = @values[pyz]
					value7 = @values[pxyz]

					# place a "1" in bit @positions corresponding to vertices whose
					#   isovalue is less than given constant.
					cubeindex = 0
					cubeindex |= 1  if value0 < isolevel
					cubeindex |= 2  if value1 < isolevel
					cubeindex |= 8  if value2 < isolevel
					cubeindex |= 4  if value3 < isolevel
					cubeindex |= 16  if value4 < isolevel
					cubeindex |= 32  if value5 < isolevel
					cubeindex |= 128  if value6 < isolevel
					cubeindex |= 64  if value7 < isolevel

					# bits = 12 bit number, indicates which edges are crossed by the isosurface
					bits = THREE.edgeTable[cubeindex]

					# if none are crossed, proceed to next iteration
					# continue  if bits is 0

					# check which edges are crossed, and estimate the point location
					#    using a weighted average of scalar @values at edge end@points.
					# store the vertex in an array for use later.
					mu = 0.5

					# bottom of the cube
					if bits & 1
						mu = (isolevel - value0) / (value1 - value0)
						vlist[0] = @points[p].clone().lerp(@points[px], mu)
					if bits & 2
						mu = (isolevel - value1) / (value3 - value1)
						vlist[1] = @points[px].clone().lerp(@points[pxy], mu)
					if bits & 4
						mu = (isolevel - value2) / (value3 - value2)
						vlist[2] = @points[py].clone().lerp(@points[pxy], mu)
					if bits & 8
						mu = (isolevel - value0) / (value2 - value0)
						vlist[3] = @points[p].clone().lerp(@points[py], mu)

					# top of the cube
					if bits & 16
						mu = (isolevel - value4) / (value5 - value4)
						vlist[4] = @points[pz].clone().lerp(@points[pxz], mu)
					if bits & 32
						mu = (isolevel - value5) / (value7 - value5)
						vlist[5] = @points[pxz].clone().lerp(@points[pxyz], mu)
					if bits & 64
						mu = (isolevel - value6) / (value7 - value6)
						vlist[6] = @points[pyz].clone().lerp(@points[pxyz], mu)
					if bits & 128
						mu = (isolevel - value4) / (value6 - value4)
						vlist[7] = @points[pz].clone().lerp(@points[pyz], mu)

					# vertical lines of the cube
					if bits & 256
						mu = (isolevel - value0) / (value4 - value0)
						vlist[8] = @points[p].clone().lerp(@points[pz], mu)
					if bits & 512
						mu = (isolevel - value1) / (value5 - value1)
						vlist[9] = @points[px].clone().lerp(@points[pxz], mu)
					if bits & 1024
						mu = (isolevel - value3) / (value7 - value3)
						vlist[10] = @points[pxy].clone().lerp(@points[pxyz], mu)
					if bits & 2048
						mu = (isolevel - value2) / (value6 - value2)
						vlist[11] = @points[py].clone().lerp(@points[pyz], mu)

					# construct triangles -- get correct vertices from triTable.
					i = 0
					cubeindex <<= 4 # multiply by 16...
					# "Re-purpose cubeindex into an offset into triTable."
					#  since each row really isn't a row.

					# the while loop should run at most 5 times,
					#   since the 16th entry in each row is a -1.
					until THREE.triTable[cubeindex + i] is -1
						index1 = THREE.triTable[cubeindex + i]
						index2 = THREE.triTable[cubeindex + i + 1]
						index3 = THREE.triTable[cubeindex + i + 2]
						geometry.vertices.push vlist[index1].clone().multiplyScalar 10
						geometry.vertices.push vlist[index2].clone().multiplyScalar 10
						geometry.vertices.push vlist[index3].clone().multiplyScalar 10
						face = new THREE.Face3(vertexIndex, vertexIndex + 1, vertexIndex + 2)
						geometry.faces.push face
						geometry.faceVertexUvs[0].push [
							new THREE.Vector2(0, 0)
							new THREE.Vector2(0, 1)
							new THREE.Vector2(1, 1)
						]
						vertexIndex += 3
						i += 3

					x++
				y++
			z++

		geometry.mergeVertices()
		geometry.computeFaceNormals()
		geometry.computeVertexNormals()

		return geometry

	random_sphere_point: (x0 = 0, y0 = 0, z0 = 0, radius = 1) ->
		u = Math.random()
		v = Math.random()
		theta = 2 * Math.PI * u
		phi = Math.acos(2 * v - 1)
		x = x0 + (radius * Math.sin(phi) * Math.cos(theta))
		y = y0 + (radius * Math.sin(phi) * Math.sin(theta))
		z = z0 + (radius * Math.cos(phi))
		return [x, y, z]


	on_mouse_down: =>

		return if @is_transitioning_out

		do @force_transition_in_complete

		do @tween?.kill
		do @pos_tween?.kill

		params =
			scalar: 2
			ease: Power1.easeIn

		@tween = TweenLite.to config, 1, params

		params =
			z: 0

		@pos_tween = TweenLite.to cameras.user.position, 1, params

		@sounds.background.fade 1, 0.5, 600
		@sounds.top.fade 0, 2, 600


	on_mouse_up: =>

		return if @is_transitioning_out
		do @tween?.kill
		do @pos_tween?.kill

		params =
			scalar: 1
			ease: Elastic.easeOut

		@tween = TweenLite.to config, 2, params

		params =
			z: @config.path_in[1].z

		@pos_tween = TweenLite.to cameras.user.position, 0.3, params

		@sounds.background.fade 0.5, 2, 600
		@sounds.top.fade 2, 0, 600
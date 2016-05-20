###

SierpinskiPolyhedron

A class for generating Polyhedral Sierpinski fractals.
The class returns a list of positions that can be used to generate the geometry after.
###

class SierpinskiPolyhedron

	# Static
	PHI 	= 1.61803399
	normals = Array

	# Some standard presets
	presets : {
		'IcosahedronGeometry' : {
			scale_ratio : 1 + PHI
		}
		'TetrahedronGeometry' : {
			scale_ratio : 2
		}
		'OctahedronGeometry' : {
			scale_ratio : 2
		}
	}
	
	# Defaults
	type        : null
	radius 	    : null
	iterations  : null
	scale_ratio : null

	###
	Generate and return a a list of objects containing information on each icosahedra in the fractal
	@param [String] geometry_class
	@param [Number] radius
	@param [Int]    iterations
	@param [Number] scale_ratio
	@param [Int] 	detail
	###
	generate: ( @geometry_class = 'IcosahedronGeometry', @radius = 20, @iterations = 1, @scale_ratio = 2.61803399, @detail = 0 ) ->	

		# The default scale of the fractal
		# This fractal builds down so the scale value will decrease on each iteration
		scale     = 1

		# Create the initial geometry with no subdivisons (smoothness)
		
		if @geometry_class is 'BoxGeometry'
			geometry = new THREE[@geometry_class](@radius, @radius, @radius)
		else
			geometry = new THREE[@geometry_class](@radius, @detail)

		# The initial data set contains the current geometry vertex positions and the center position
		positions = [{vertices: [], center: new THREE.Vector3()}]

		# Clear the normals list 
		normals = []

		# Generate the inital vector list
		for v in geometry.vertices
			
			# Normalise the vertices
			# These normals will be used when calculating the vertex positions in the fractal
			normals.push v.clone().normalize()

			# Store the initial vertex positions
			positions[0].vertices.push v.clone()


		# The scalar is responsible for positioning the next polyhedra inside the previous polyhedron
		scalar = 1 - (1 / @scale_ratio)

		# Generate the fractal and store each new data set in the positions list
		for i in [0...@iterations]			
			scale    /= @scale_ratio
			radius    = @radius * scale
			tmp       = @_generate_data( positions, radius, scalar, i + 1 )
			positions = tmp


		geometry.dispose()

		positions


	###
	Returns an list of objects containing information for the center and vertex positions for each successive icosahedron
	@param  [Array]  positions
	@param  [Number] radius
	@param  [Number] scalar
	@param  [Int]    iteration
	@return [Array]  positions_new
	###
	_generate_data: ( positions, radius, scalar, iteration ) ->

		# Store each new polyhedron's data in this list
		positions_new = []

		for position in positions
			
			for vertex, i in position.vertices

				# Store all new vertices in this list
				vertices = []

				# Calculate the new center position from the previous center vertex
				center_new = position.center.clone().lerp(vertex.clone(), scalar)

				# Calculate the positions for the next polyhedron's vertex list
				for normal, j in normals

					x = center_new.x + radius * normals[j].x
					y = center_new.y + radius * normals[j].y
					z = center_new.z + radius * normals[j].z

					vertices.push new THREE.Vector3( x, y, z )

				data = {
					vertices : vertices
					center   : center_new
				}

				positions_new.push data

		positions_new

	###
	Calculate the logarithmic scale of the geometry from the iteration
	@return [Number]
	###

	logarithmic_scale: -> @radius / Math.pow(@scale_ratio, @iterations)


###

SierpinskiSponge

A class for generating Sierpinski Sponge fractals.
The class returns a list of positions that can be used to generate the geometry after.
###

class SierpinskiSponge

	# Defaults
	size       : null
	iterations : null

	###
	Generate and return a list of Vectors for each cube in the fractal
	@param  [Number] radius
	@param  [Int]    iterations
	@param  [Int]    grid
	@param  [Array]  holes
	@return [Array]  positions
	###
	generate: (@size = 20, @iterations = 2, @grid = 3, @holes = [4, 10, 12, 13, 14, 16, 22]) ->

		# The divisor of the fractal
		divisor   = 1 / @grid

		# The initial cube size from the first iteration
		cube_size = @size * divisor

		# The initial data set contains the center position
		# Each sponge is calculated from the center position
		positions = [new THREE.Vector3()]

		# Generate the fractal and store each new data set in the positions list
		for i in [0...@iterations]

			tmp = []

			# Create a sponge for each center position in the list
			for position in positions

				tmp = tmp.concat(@_sponge(position, cube_size, @grid, @holes))
			
			# Scale the cube size down for the next iteration
			cube_size *= divisor

			positions = tmp

		# Center all positions
		center_offset = (@size / 2) - (@logarithmic_scale() / 2)

		for position in positions
			position.x -= center_offset
			position.y -= center_offset
			position.z -= center_offset

		positions


	###
	Generate a sponge and return the center positions
	@param  [Vector3] 		   position
	@param  [Number]  		   cube_size
	@param  [Int]     		   grid
	@param  [Array[, Int]]     holes
	@return [Array[, Vector3]] positions
	###
	_sponge: (position, cube_size, grid, holes) ->

		i = 0
		positions = []

		for levels in [0...grid]
			for rows in [0...grid]
				for columns in [0...grid]

					position_new   = new THREE.Vector3

					position_new.x = position.x + (rows * cube_size)
					position_new.y = position.y + (levels * cube_size)
					position_new.z = position.z + (columns * cube_size)

					# Only add to the list if the grid index isn't in the holes list
					if not inlist(i, holes)
						positions.push position_new 	

					i++

		positions


	###
	Check to see if the val is in the list
	@param  [mixed]   val
	@param  [Array]   list
	@return [Boolean] result
	###
	inlist = (val, list) ->
    	result = false

    	for item in list
    		if item is val
    			result = true
    			break
    	result 


    ###
    Calculate the logarithmic scale of the geometry from the iteration
    @return [Number]
    ###
    logarithmic_scale: -> @size / Math.pow(@grid, @iterations)


exports.SierpinskiPolyhedron = SierpinskiPolyhedron
exports.SierpinskiSponge 	 = SierpinskiSponge


module.exports = class GeometryBuilder 

	chunk_size : 10
	count      : 0
	total      : 0
	progress   : 0
	geometries : []

	build: (@geometry_class, @data, @size, @detail, @callback) ->

		@_reset()

		chunks = []

		while @data.length > 0
			chunks.push @data.splice(0, @chunk_size)

		@total = chunks.length
	
		for chunk, i in chunks
			new Builder(@geometry_class, chunk, @size, @detail, @_on_chunk_complete)


	_on_chunk_complete: (geometery) =>

		@count++
		@progress = @count / @total

		@geometries.push geometery

		if @count is @total

			mesh_geometry = new THREE.Geometry()

			for geometry in @geometries

				mesh_geometry.merge geometry

			# mesh_geometry.mergeVertices()
			# mesh_geometry.computeCentroids()
			# mesh_geometry.computeFaceNormals()
			# mesh_geometry.computeVertexNormals()

			@callback mesh_geometry

			@_reset()


	_reset: ->

		@count 		= 0
		@total      = 0
		@progress   = 0
		@geometries = []


class Builder 

	constructor: (@geometry_class, @data, @size, @detail, @callback) ->

		@progress 	= 0
		@time_total = 0
		@total    	= @data.length
		@geometry   = new THREE.Geometry()

		@_build()


	_build: =>

		if @geometry_class is "BoxGeometry"
			tmp_geometry = new THREE[@geometry_class](@size, @size, @size)
		else
			tmp_geometry = new THREE[@geometry_class](@size, @detail)

		for v, i in @data[@progress].vertices

			tmp_geometry.vertices[i].x = v.x
			tmp_geometry.vertices[i].y = v.y
			tmp_geometry.vertices[i].z = v.z


		@geometry.merge tmp_geometry

		@progress++

		if @progress is @total

			@callback @geometry
		
		else

			window.setTimeout @_build, 10

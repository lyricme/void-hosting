happens = require 'happens'
camera  = (require 'controllers/engine/cameras').user

module.exports = class Hotspot

	over    : off
	mouse_x : 0
	mouse_y : 0
	enabled : on
	visible : off

	constructor: ( @el, @shape = 'box', @size_x = 10, @size_y = 10, @size_z = 10 ) ->
		
		happens @

		@box()    if @shape is 'box'
		@sphere() if @shape is 'sphere'
		@plane()  if @shape is 'plane'

	box: ->

		geometry = new THREE.BoxGeometry( @size_x, @size_y, @size_z )

		@mesh = new THREE.Mesh(geometry, @material())
		@mesh.visible = @visible


	sphere: ->

		geometry = new THREE.SphereGeometry( @size_x, 8, 8 )

		@mesh = new THREE.Mesh(geometry, @material())
		@mesh.visible = @visible

	plane: ->

		geometry = new THREE.PlaneGeometry( @size_x, @size_y, 1, 1 )

		@mesh = new THREE.Mesh(geometry, @material())
		@mesh.visible = @visible
	
	
	material: -> 

		params =
			 color: 0x00FF00
			 wireframe: true
			 wireframeLinewidth: 5

		new THREE.MeshBasicMaterial( params )

	bind: ->

		@el.on 'click', @on_click
		@el.on 'mousemove', @on_mouse_move

	unbind:->

		@el.off 'click', @on_click
		@el.off 'mousemove', @on_mouse_move

	on_mouse_move: ( event ) =>

		@mouse_x = event.clientX
		@mouse_y = event.clientY

		###	
		Hotspot raycasting
		###

		normal_x = ( @mouse_x / window.innerWidth ) * 2 - 1
		normal_y = -( @mouse_y / window.innerHeight ) * 2 + 1

		vector = new THREE.Vector3( normal_x, normal_y, 0.5 )

		vector.unproject( camera )

		raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() )

		# See if the ray from the camera into the world hits one of our meshes
		intersects = raycaster.intersectObject( @mesh )

		# Toggle rotation bool for meshes that we clicked
		if intersects.length > 0
			do @on_over
		else
			do @on_out


	on_over: ->

		return if not @enabled

		return if @over

		$( 'body' ).css 'cursor', 'pointer'

		@over = on

		@emit 'over'


	on_out: ->

		return if not @enabled
		
		return unless @over

		@over = off

		$( 'body' ).css 'cursor', ''

		@emit 'out'

	on_click: ( event ) =>

		do event.preventDefault

		return if not @over

		@emit 'click'

	reset: -> @enabled = on
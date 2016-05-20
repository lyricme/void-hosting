happens  	= require 'happens'
settings 	= require 'app/config/settings'
cameras  	= require 'controllers/engine/cameras'
engine 		= require 'controllers/engine/index'
Loader 		= require 'utils/loading/async_loader'
Mouse 		= require 'utils/mouse'
utils 		= require 'utils/utils'
Keyboard 	= require 'utils/keyboard'
win			= require 'utils/window'

Experiment  	= require 'views/scenes/experiment'
UI 			    = require 'views/scenes/ui'
assets 		    = require 'views/scenes/blackice/assets'
Hotspot         = require 'views/scenes/helpers/hotspot'
PathLookatFixed = require 'views/scenes/helpers/path_lookat_fixed'
PathLookatCurve = require 'views/scenes/helpers/path_lookat_curve'

module.exports = class Blackice extends Experiment

	material : null
	accel_x  : 0.1
	accel_y  : 0.1
	accel_z  : 0.1
	iteration: 0

	interation_lock: on

	first_time: off

	base_mult: 0

	user_added_texture: off

	setup: ( @manifest ) =>

		@gui.add @, 'audio_pos_z', -30, 30

		@first_time = on

		###
		Engine
		###

		engine.fov = @config.camera_fov

		###
		UI
		###
		@ui = new UI 'blackice', @scene, @gui


		###
		Scene
		###

		if @config.fog_enabled
			@scene.fog = new THREE.FogExp2( 0x000000, @config.fog_in_start )

			@gui.add @scene.fog, 'density', 0, 1


		###
		Helpers
		###

		if settings.debug

			@scene.add new THREE.GridHelper 50, 10
			@scene.add new THREE.AxisHelper 10

			@scene.add new THREE.CameraHelper cameras.user


		###
		Hotpsot
		###
		@hotspot = new Hotspot @ui.ui.hitarea, 'sphere', 70
		@scene.add @hotspot.mesh

		###
		Create curve for camera
		###


		@path_in  = new PathLookatFixed 'path_in', @scene, @config.path_in, @config.path_in_lookat, 0x00FF00#, @gui, 1000
		@path_out = new PathLookatCurve 'path_out', @scene, @config.path_out, @config.path_out_lookat, 0x00FF00#, @gui, 100

		###
		Mouse
		###
		@mouse = new Mouse $('body')

		###
		Sounds
		###

		# set initial audio z position
		@audio_pos_z = @config.audio_pos_z_in

		@sounds =
			base_1: utils.get_asset('base_1', manifest).data
			base_2: utils.get_asset('base_2', manifest).data
			base_3: utils.get_asset('base_3', manifest).data
			melody: utils.get_asset('melody', manifest).data

		@sounds.melody.volume 0.7
		do @sounds.melody.play

		@sound_bases = [
			@sounds.base_1
			@sounds.base_2
			@sounds.base_3
		]

		for sound in @sound_bases
			sound.volume 0
			do sound.play

		for key, sound of @sounds
			sound.loop on

		###
		Objects
		###

		@container = new THREE.Object3D

		@scene.add @container

		@materials = []

		@materials.push @generate_material 'lvl0'
		@materials.push @generate_material 'lvl1'
		@materials.push @generate_material 'lvl2'
		@user_material = @generate_material 'lvl0'

		@iteration = 1
		@generate_mesh @iteration

		do @bind
		@emit 'setup:complete'

	generate_material: ( id ) ->

		urls = []

		sides = ["#{id}-pos-x",
				 "#{id}-neg-x",
				 "#{id}-pos-y",
				 "#{id}-neg-y",
				 "#{id}-pos-z",
				 "#{id}-neg-z"]

		for asset in @manifest

			if asset.id in sides
				urls.push asset.src

		cubemap 	   = THREE.ImageUtils.loadTextureCube(urls)
		cubemap.format = THREE.RGBFormat

		material = new THREE.MeshBasicMaterial({
			color: 0xcccccc
			envMap: cubemap
			shading: THREE.FlatShading
			side: THREE.DoubleSide
		})

		return material


	bind: ->

		super()

		@hotspot.on 'click', @on_click

		do @ui.bind
		do @hotspot.bind
		do @mouse.bind

		$(window).on('dragover', @on_dragover).on('drop', @on_drop)

	unbind: ->

		super()

		@hotspot.off 'click', @on_click

		do @ui.unbind
		do @hotspot.unbind
		do @mouse.unbind

		$(window).off('dragover', @on_dragover).on('drop', @on_drop)

	on_dragover: (event) =>

		do event.preventDefault
		do event.stopPropagation

	on_drop: (event) =>

		do event.preventDefault
		do event.stopPropagation

		file = event.originalEvent.dataTransfer.files[0]

		# console.log file

		if file.type isnt 'image/jpeg' and file.type isnt 'image/png'
			alert 'File not supported, use an image instead'
			return

		reader = new FileReader()

		reader.onload = (event) =>
			# console.log event.target.result

			@user_added_texture = on

			image = event.target.result

			@update_cube_map image

		reader.readAsDataURL(file)


	update_cube_map: (image) ->

		el  = $('#cubemap')

		img = new Image()

		img.onload = =>

			width = img.width
			height = img.height
			scale = 4

			# log img, width, height

			el.css
				'width': (width / scale) + 'px'
				'height': (height / scale) + 'px'

			el.find('img').attr 'src', image

			# Draw image to canvas

			canvas  = document.createElement('canvas')
			canvas.setAttribute 'width', width
			canvas.setAttribute 'height', height
			context = canvas.getContext('2d')

			context.drawImage img, 0, 0

			# Generate cube map tiles

			if (height / width) > 1
				tile_size = img.width / 3
			else
				tile_size = img.height / 3

			# @get_cubemap_tile context, tile_size, 0, tile_size

			# top

			@urls = []

			@urls.push( @get_cubemap_tile context, tile_size, 0, tile_size )

			# left 0
			@urls.push( @get_cubemap_tile context, 0, tile_size, tile_size		 )

			# left 1
			@urls.push( @get_cubemap_tile context, tile_size, tile_size, tile_size )

			# left 2
			@urls.push( @get_cubemap_tile context, (tile_size*2), tile_size, tile_size )

			# left 3
			@urls.push( @get_cubemap_tile context, (tile_size*3), tile_size, tile_size )

			# bottom
			@urls.push( @get_cubemap_tile context, tile_size, (tile_size*2), tile_size )

			@counter_url = 0

			for url in @urls
				img = new Image
				img.onload = @on_cubemap_url_loaded
				img.setAttribute 'src', url


		# log image
		img.setAttribute 'src', image


	on_cubemap_url_loaded: ( ) =>
		@counter_url++
		if @counter_url is @urls.length

			for item, i in @user_material.envMap.image
				item.removeAttribute 'crossorigin'
				item.setAttribute 'src', @urls[ i ]

			@user_material.envMap.needsUpdate = on
			@user_material.needsUpdate = on

		do @generate_mesh


	get_cubemap_tile: ( context, x, y, tile_size ) ->

		c   = $('<canvas/>')
		c.attr 'width', tile_size
		c.attr 'height', tile_size
		ctx = c[0].getContext("2d")

		imgData = context.getImageData( x, y, tile_size, tile_size )

		ctx.putImageData( imgData, 0, 0 )

		data_url = c[0].toDataURL('image/jpeg')

		return data_url


	generate_mesh: =>

		@container.remove @mesh

		ice_noise    = [0.35, 0.3, 0.2]

		NOISE = ice_noise[@iteration-1]

		@vertex_sets = [0]

		geometry = new THREE.IcosahedronGeometry( 50, 2)

		for i in [0...@iteration]
			geometry = @smooth_geometry geometry, i

			set = geometry.vertices.slice(@vertex_sets[i], @vertex_sets[i+1])

			for v in set
				v.multiplyScalar 1 + Math.random() * NOISE

		if @user_added_texture
			material = @user_material
		else
			material = @materials[@iteration-1]

		@mesh = new THREE.Mesh(geometry, material)

		@container.add @mesh

		unless @first_time

			for sound in @sound_bases
				sound.fade 1, 0, 500

		# c.debug 'iteration', @iteration, @sound_bases

		@sound_bases[@iteration-1].fade 0, 1, 500

		@first_time = off

	smooth_geometry: (geometry, subdivision) ->

		modifier = new THREE.SubdivisionModifier subdivision

		smooth = geometry.clone()

		modifier.modify( smooth )

		@vertex_sets.push smooth.vertices.length

		smooth

	transition_in: ->

		super()

		params =
			x: Math.PI*0.3
			y: Math.PI*0.5
			z: Math.PI*0.2
			ease: Power1.easeOut

		TweenLite.to @mesh.rotation, @config.camera_in_duration, params

		utils.delay 8, =>

			@interation_lock = off

			TweenLite.killTweensOf @mesh.rotation

		params =
			audio_pos_z: 0
			ease: Power1.easeOut

		TweenLite.to @, @config.camera_in_duration, params

	update: =>

		# return if @interation_lock

		preset = @get_preset()

		x = Math.abs @mouse.normal_center_x
		y = @mouse.normal_center_y
		z = @audio_pos_z

		base = @sound_bases[@iteration-1]

		base.pos x, y, z

		@sounds.melody.pos 0, 0, z

		x *= preset.vel_x

		base.velocity x, null, null, base._sounds[0]._id

		@mesh.rotation.x += @accel_x * (@mouse.normal_center_x * preset.movement_speed)
		@mesh.rotation.y += @accel_x * (@mouse.normal_center_y * preset.movement_speed)
		@mesh.rotation.z += @accel_y * (@mouse.normal_center_y * preset.movement_speed)

	get_preset: -> @config.iteration_preset[@iteration-1]

	on_click: =>

		return if @is_transitioning_out

		do @force_transition_in_complete

		if @iteration > 2
			@iteration = 1
		else
			@iteration++

		@generate_mesh @iteration

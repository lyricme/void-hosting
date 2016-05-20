module.exports =

	# dev
	add_controls     : off
	transition_debug : off
	fog_enabled 	 : on

	# camera
	camera_fov: 80
	camera_fov_out: 120
	camera_fov_out_duration: 10

	# path transition
	path_in: [
		[14660.800000000001, -16761.800000000003, 12783.1]
		[13328, -15238, 11621]
	]

	path_out:[
		[13328, -15238, 11621]
		[11100, -12545, 9690]
		[7735, -9383, 7878]
		[4207, -4813, 5272]
		[1501, -1205, 3305]
		[0, 0, 0]
		# last position generated from tunnel
	]

	path_camera_dolly:[
		[0, 0, 0]
	]

	# transition times
	camera_in_duration: 2
	camera_out_duration: 10
	
	fog_in_duration: 10

	hires_in_duration: 2
	hires_out_duration: 1

	# fog transition values
	fog_in_start : 0.00070
	fog_in_end   : 0.00007

	# scene props
	scale    : 10
	partices : 40000 * 10
	tunnel_particles: 30000

	### 
	Objects
	###

	# Container
	container_position: [1500, 1050, 4400]
	container_rotation: [4.4, 0.01, 0.28]

	# Title
	title_position: [11100, -12000, 9690]
	title_letter_in_position: [
		[-1173, -25, 0]
		[-291, -25, 0]
		[480, -28, 0]
		[1068, -28, 0]
	]
	title_letter_in_rotation: [
		[0, 0, -0.08]
		[0, 0, 0.21]
		[0, -0.36, 0]
		[-0.08, 0, 0]
	]

	# Hi-ReS!
	ui_hires_scale: 20
	ui_hires_position: [0, 2170, 0]

	# Paragraphs
	paragraph_positions:[
		[0, -700, 0]
		[0, -1435, 0]
	]

	# Enter
	enter_position: [0, -2355, 0]
	enter_letter_in_position: [
		{x: -20, y: 6, z: 0}
		{x: -8, y: 3, z: 0}
		{x: 0, y: 0, z: 0}
		{x: 7, y: -1, z: 0}
		{x: 19, y: -3, z: 0}
	]

	enter_letter_in_rotation: [
		{x: 0, y: 7, z: 11}
		{x: 0, y: 6, z: 0}
		{x: 0, y: 0, z: 0}
		{x: 0, y: -3, z: 0}
		{x: -10, y: 0, z: -5}
	]
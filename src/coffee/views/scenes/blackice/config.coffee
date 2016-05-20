module.exports =

	# dev
	fog_enabled      : on
	transition_debug : off

	# camera
	camera_fov: 55

	# path transition
	"path_in": [
		{
			"x": 0,
			"y": 0,
			"z": 500
		},
		{
			"x": 0,
			"y": 0,
			"z": 80
		}
	]

	"path_in_lookat": {
		"x": 0,
		"y": 0,
		"z": 0
	}

	"path_out": [
		{
			"x": 0,
			"y": 0,
			"z": 80
		},
		{
			"x": 0,
			"y": -40.57142857142857,
			"z": 71
		},
		{
			"x": 0,
			"y": -90.85714285714286,
			"z": 10
		}
	]

	"path_out_lookat": [
		{
			"x": 0,
			"y": 0,
			"z": 0
		}
		{
			"x": 0,
			"y": -100,
			"z": 0
		}
	]

	# transition times
	camera_in_duration: 10
	camera_out_duration: 2
	
	fog_in_duration: 10
	fog_out_duration: 3

	# fog transition values
	fog_in_start : 0.01
	fog_in_end   : 0.001

	fog_out_start : 0.001
	fog_out_end   : 0.1

	audio_pos_z_in: -10
	audio_pos_z_out: 15

	iteration_preset:[
		{
			movement_speed: 0.02
			vel_x: -200
		}
		{
			movement_speed: 0.05
			vel_x: -250
		}
		{
			movement_speed: 0.07
			vel_x: -280
		}
	]
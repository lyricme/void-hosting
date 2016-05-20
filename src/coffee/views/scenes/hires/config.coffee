settings = require 'app/config/settings'

module.exports =

	# dev
	fog_enabled 	 : on
	transition_debug : off

	# camera
	camera_fov: 66

	# path transition
	"path_in": [
		{
			"x": 0,
			"y": 0,
			"z": -34
		},
		{
			"x": 0,
			"y": 0,
			"z": 142
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
			"z": 142
		},
		{
			"x": 0,
			"y": -16
			"z": 47
		},
		{
			"x": 0,
			"y": -16,
			"z": -53
		}
	]

	"path_out_lookat": [
		{
			"x": 0,
			"y": 0,
			"z": -70
		}
		{
			"x": 0,
			"y": -37,
			"z": -70
		}
	]

	# transition times
	camera_in_duration: 22.5
	camera_out_duration: 4

	camera_rotation_in: 21

	fog_in_duration: 5
	fog_out_duration: 7

	# fog transition values
	fog_in_start : 0.1
	fog_in_end   : 0.001

	fog_out_start : 0.001
	fog_out_end   : 0.01

	audio_pos_z_in: 1
	audio_pos_z_out: 1

	# fov
	fov_in_duration: 21

	# scene
	color_left: '#FFFFFF'
	color_right: '#0bfdfd'
	color_directional: '#FFFFFF'
	speed: 0.008
	line_thickness: 2
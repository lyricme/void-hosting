module.exports =

	# dev
	fog_enabled 	 : on
	transition_debug : off

	# camera
	camera_fov: 80

	# path transition
	"path_in": [
		{
			"x": 0,
			"y": 0,
			"z": 300
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
            "y": 0
            "z": 80
        },
        {
            "x": 0,
            "y": -50,
            "z": 200
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
			"y": -50,
			"z": 0
		}
	]

	# transition times
	camera_in_duration: 5
	camera_out_duration: 4

	fog_in_duration: 12
	fog_out_duration: 6

	# fog transition values
	fog_in_start : 0.1
	fog_in_end   : 0.001

	fog_out_start : 0.001
	fog_out_end   : 0.01

	audio_pos_z_in: -15
	audio_pos_z_out: 6

	# scene ice
	num_blobs   : 30
	max_blobs   : 50
	speed 		: 0.15
	scalar  	: 1
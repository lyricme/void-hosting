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
            "y": 0.5714285714285836,
            "z": 80.57142857142856
        },
        {
            "x": 0,
            "y": -17.714285714285722,
            "z": 53.14285714285714
        },
        {
            "x": -20,
            "y": -90.85714285714286,
            "z": -38.28571428571429
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
	camera_in_duration: 15
	camera_out_duration: 2.8
	
	fog_in_duration: 15
	fog_out_duration: 3

	# fog transition values
	fog_in_start : 0.1
	fog_in_end   : 0.001

	fog_out_start : 0.001
	fog_out_end   : 0.01

	audio_pos_z_in: -8
	audio_pos_z_out: 8

	# scene ice
	num_blobs   : 30
	max_blobs   : 50
	speed 		: 0.15
	scalar  	: 1
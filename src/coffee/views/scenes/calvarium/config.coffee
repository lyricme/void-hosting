module.exports =

	# dev
	fog_enabled 	 : on
	transition_debug : off
	has_composer	 : on

	# camera
	camera_fov: 80

	# path transition
	"path_in": [
		{
			"x": 0,
			"y": 0,
			"z": 400
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
            "y": -10,
            "z": 0
        },
        {
            "x": -20,
            "y": -20,
            "z": -30
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
			"y": 0,
			"z": -400
		}
	]

	# transition times
	camera_in_duration: 15
	camera_out_duration: 6
	
	fog_in_duration: 16
	fog_out_duration: 4

	# fog transition values
	fog_in_start : 0.03
	fog_in_end   : 0.01

	fog_out_start : 0.001
	fog_out_end   : 0.01

	audio_pos_z_in: 10
	audio_pos_z_out: -10
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
	"path_in": [
        {
            "x": 0,
            "y": 0,
            "z": 0
        }
        {
            "x": 1200,
            "y": 2571,
            "z": 9257.142857142859
        },
        {
            "x": -3164.0482279868447,
            "y": 13828.571428571428,
            "z": 9257.142857142859
        },
        {
            "x": -5034.709535988308,
            "y": 20000,
            "z": 8059.919620021923
        }
	]

	"path_out": [
		{
            "x": -5034.709535988308,
            "y": 20000,
            "z": 8059.919620021923
        }
        {
            "x": 1200,
            "y": 3571,
            "z": 5000
        },
        {
            "x": 0,
            "y": 0,
            "z": 0
        }
	]

	"path_in_lookat": [
		{
			"x": 0,
			"y": 0,
			"z": 0
		}
	]

	path_camera_dolly:[
		[0, 0, 0]
	]

	# transition times
	camera_in_duration: 40
	camera_out_duration: 10

	fog_in_duration: 2
	fog_out_duration: 2

	ui_delay: 3

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


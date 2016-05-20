module.exports =

	# dev
	fog_enabled 	 : on
	transition_debug : off

	# camera
	camera_fov: 35

	# path transition
	"path_in": [
		{
			"x": 0
			"y": 0
			"z": 400
		}
		{
			"x": 0
			"y": 0
			"z": 40
		}
	]

	"path_in_lookat": {
		"x": 0
		"y": 0
		"z": 0
	}

	"path_out": [
		{
            "x": 0
            "y": 0
            "z": 40
        }
        {
            "x": 0
            "y": -27
            "z": 0
        }
        {
            "x": 0
            "y": -60
            "z": -20
        }
	]

	"path_out_lookat": [
		{
			"x": 0
			"y": 0
			"z": -190
		}
		{
			"x": 0
			"y": -260
			"z": -190
		}
	]

	# transition times
	camera_in_duration: 10
	camera_out_duration: 5
	
	fog_in_duration: 10
	fog_out_duration: 5

	# fog transition values
	fog_in_start  : 0.1
	fog_in_end    : 0.01

	fog_out_start : 0.01
	fog_out_end   : 0.1

	audio_pos_z_in: 35
	audio_pos_z_out: 15

	# movement
	cam_move_bounds: 0.5

	# scene - props set from preset
	sphere_radius: 30
	geometry: ''
	iteration: 0
	radius: 0
	scale_ratio: 0
	deform: 0
	color: '#ffffff'
	wireframe: on
	wireframe_thickness: 0
	blending: ''
	opacity: 0.35
	
	fog_near: 0.029
	fog_far: 0.009
	cam_zoom_percent: 1

	geometries: {
		"dodecahedron": {
			"geometry": "DodecahedronGeometry"
			"iteration": 2
			"radius": 20
			"scale_ratio": 3.61803399
			"color": "#ffffff"
			"wireframe": true
			"wireframe_thickness": 1.5
			"blending": 'NormalBlending'
			"opacity": 1.0
			"rotate": true
			"fog": 0.03
			"deform" : 0
			"rotate_x" : 0
			"rotate_y" : 1.06
			"rotate_z" : 0
			"sound": "aether"
		}
		"icosahedron": {
			"geometry": "IcosahedronGeometry"
			"iteration": 3
			"radius": 20
			"scale_ratio": 2.61803399
			"color": "#ffffff"
			"wireframe": true
			"wireframe_thickness": 1.5
			"blending": 'NormalBlending'
			"opacity": 1.0
			"rotate": true
			"fog": 0.03
			"deform" : 0
			"rotate_x" : 1.27
			"rotate_y" : 1.06
			"rotate_z" : 0
			"sound": "water"
		}
		"tetrahedron":{
			"geometry": "TetrahedronGeometry"
			"iteration": 6
			"radius": 20
			"scale_ratio": 2
			"color": "#ffffff"
			"wireframe": true
			"wireframe_thickness": 1.5
			"blending": 'NormalBlending'
			"opacity": 1.0
			"rotate": true
			"fog": 0.03
			"deform" : 0
			"rotate_x" : 0
			"rotate_y" : 0.99
			"rotate_z" : 2.26
			"sound": "fire"
		}
		"octahedron": {
			"geometry": "OctahedronGeometry"
			"iteration": 5
			# "iteration": 4
			"radius": 20
			"scale_ratio": 2
			"color": "#ffffff"
			"wireframe": true
			"wireframe_thickness": 1.5
			"blending": 'NormalBlending'
			"opacity": 1.0
			"rotate": true
			"fog": 0.046
			"deform" : 0
			"rotate_x" : 0.21
			"rotate_y" : 0
			"rotate_z" : 0
			"sound": "air"
		}
		"hexahedron": {
			"geometry": "BoxGeometry"
			"iteration": 4
			"radius": 20
			"scale_ratio": 2.4
			"color": "#ffffff"
			"wireframe": true
			"wireframe_thickness": 1.5
			"blending": 'NormalBlending'
			"opacity": 1.0
			"rotate": true
			"fog": 0.03
			"deform" : 0
			"rotate_x" : 0.49
			"rotate_y" : (Math.PI/4)
			"rotate_z" : 0
			"sound": "earth"
		}
	}
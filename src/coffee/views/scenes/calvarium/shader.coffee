exports.vertex = ->

	shader = [

		'uniform float amplitude;'

		'attribute vec3 customColor;'
		'attribute vec3 displacement;'

		'varying vec3 vNormal;'
		'varying vec3 vColor;'

		'void main() {'

			'vNormal = normal;'
			'vColor = customColor;'

			'vec3 newPosition = position + amplitude * displacement;'
			'gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );'

		'}'
	]
	
	return shader.join('\n')

exports.fragment = ->

	shader = [
		'varying vec3 vNormal;'
		'varying vec3 vColor;'

		THREE.ShaderChunk[ "fog_pars_fragment" ]

		'void main() {'

			'const float ambient = 0.005;'

			'vec3 light = vec3( 1.0 );'
			'light = normalize( light );'

			'float directional = max( dot( vNormal, light ), 0.0 );'

			'gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );'
			'gl_FragColor.xyz = sqrt( gl_FragColor.xyz );'
			
			THREE.ShaderChunk[ "fog_fragment" ]
		'}'
	]
		
	return shader.join('\n')
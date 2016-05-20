exports.vertex = ->

	shader = [

		'attribute float alpha;'
		'attribute float size;'
		'varying float vAlpha;'

		'void main() {'

			'vAlpha = alpha;'

			'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );'

			'gl_PointSize = size * ( 100.0 / length( mvPosition.xyz ) );'

			'gl_Position = projectionMatrix * mvPosition;'

		'}'
		
	]

	return shader.join('\n')

exports.fragment = ->

	shader = [

		'uniform vec3 color;'

		'varying float vAlpha;'

		'uniform sampler2D texture;'

		THREE.ShaderChunk[ "fog_pars_fragment" ]

		'void main() {'

			'gl_FragColor = vec4( color, vAlpha );'
			'gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );'

			THREE.ShaderChunk[ "fog_fragment" ]

		'}'

	]

	return shader.join('\n')
ambient = new THREE.AmbientLight( 0x414141 )

directional = new THREE.DirectionalLight( 0xFFFFFF, 1 )
directional.position.x = 100
directional.position.y = 100
directional.position.z = 100
directional.shadowCameraNear = 25
directional.castShadow = true

point1 = new THREE.PointLight( 0xFFFFFF, 1, 1000 )
point1.position.set( 50, 50, 50 )

point2 = new THREE.PointLight( 0xFFFFFF, 1, 1000 )
point2.position.set( -50, 50, 50 )

point1.intensity  = 0.1
point2.intensity  = 0.1

exports.directional = directional
exports.point1 = point1
exports.point2 = point2

exports.all = [
	 ambient
	,directional
	,point1
	,point2
]
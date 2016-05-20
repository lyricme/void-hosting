ambient = new THREE.AmbientLight 0xb1b1b1

directional = new THREE.DirectionalLight( 0xFFFFFF, 0.7 )
directional.position.x = 30
directional.position.y = 30
directional.position.z = 30
directional.shadowCameraNear = 25
directional.castShadow = on

exports.ambient 	= ambient
exports.directional = directional
directional = new THREE.DirectionalLight 0xFFFFFF, 1
directional.position.set 0, 100, 10

point = new THREE.PointLight( 0xFFFFFF, 1, 1000 )
point.position.set 0, -150, 0

exports.lights = [point, directional]
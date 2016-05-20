light0 = new THREE.PointLight(0xff0000)
light0.position.set 10, 0, 0
		
light1 = new THREE.PointLight(0x00cc00)
light1.position.set 0, 10, 0

light2 = new THREE.PointLight(0x0000ff)
light2.position.set 0, 0, 10

light3 = new THREE.PointLight(0x333333)
light3.position.set -10, -10, -10

exports.lights = [light0, light1, light2, light3]
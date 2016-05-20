win = require 'utils/window'
gui = require 'controllers/gui'

exports.user = new THREE.PerspectiveCamera( 80, win.width / win.height, 0.1, 100000 )
exports.dev  = new THREE.PerspectiveCamera( 80, win.width / win.height, 0.1, 100000 )

gui = gui.addFolder 'controller::cameras'
# do gui.open

bounds = 20000

exports.user.name = 'user'
exports.dev.name  = 'dev'

gui.add exports.user, 'name'		
gui.add(exports.user, 'fov', 10, 200).listen()
gui.add(exports.user.position, 'x', -bounds, bounds).name('position x')
gui.add(exports.user.position, 'y', -bounds, bounds).name('position y')
gui.add(exports.user.position, 'z', -bounds, bounds).name('position z')
gui.add(exports.user.rotation, 'x', -PI_2, PI_2).name('rotation x')
gui.add(exports.user.rotation, 'y', -PI_2, PI_2).name('rotation y')
gui.add(exports.user.rotation, 'z', -PI_2, PI_2).name('rotation z')

gui.add exports.dev, 'name'		
gui.add(exports.dev, 'fov', 10, 200).listen()
gui.add(exports.dev.position, 'x', -bounds, bounds).name('position x').listen()
gui.add(exports.dev.position, 'y', -bounds, bounds).name('position y').listen()
gui.add(exports.dev.position, 'z', -bounds, bounds).name('position z').listen()
gui.add(exports.dev.rotation, 'x', -PI_2, PI_2).name('rotation x').listen()
gui.add(exports.dev.rotation, 'y', -PI_2, PI_2).name('rotation y').listen()
gui.add(exports.dev.rotation, 'z', -PI_2, PI_2).name('rotation z').listen()
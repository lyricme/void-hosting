settings = require 'app/config/settings'

module.exports = new THREE.WebGLRenderer( alpha: off, antialias: on, preserveDrawingBuffer: !settings.live )
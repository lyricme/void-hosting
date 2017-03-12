config = require '../../package.json'
gulp   = require 'gulp'
concat = require 'gulp-concat'
rename = require 'gulp-rename'
gulpif = require 'gulp-if'
uglify = require 'gulp-uglify'

production = process.env.NODE_ENV is 'production'

exports.paths =
	source: [
		'./src/vendor/jquery.history.js'
		'./src/vendor/EasePack.min.js'
		'./src/vendor/CSSPlugin.min.js'
		'./src/vendor/TweenMax.min.js'
		'./src/vendor/TimelineLite.min.js'
		'./src/vendor/three.js'
		'./src/vendor/DodecahedronGeometry.js'
		'./src/vendor/TrackballControls.js'
		'./src/vendor/montserrat_regular.typeface.js'
		'./src/vendor/jquery.lettering.js'
		'./src/vendor/SubdivisionModifier.js'
		'./src/vendor/mobile-detect.js'
		'./src/vendor/ExplodeModifier.js'
		'./src/vendor/TessellateModifier.js'
		'./src/vendor/CopyShader.js'
		'./src/vendor/DigitalGlitch.js'
		'./src/vendor/EffectComposer.js'
		'./src/vendor/RenderPass.js'
		'./src/vendor/MaskPass.js'
		'./src/vendor/ShaderPass.js'
		'./src/vendor/Projector.js'
		'./src/vendor/howler.js'
		'./src/vendor/howler.spatial.min.js'
	]
	destination: './public/js/'
	filename: 'vendor.js'
	release: "vendor.min.#{config.version}.js"

if not production
	exports.paths.source = exports.paths.source.concat [
		'./src/vendor/savetodisk.js'
		'./src/vendor/canvas2image.js'
	]

gulp.task 'vendor', ->

	if production
		filename = exports.paths.release
	else
		filename = exports.paths.filename

	gulp
		.src exports.paths.source
		.pipe concat filename
		.pipe gulpif production, uglify()
		.pipe gulp.dest exports.paths.destination

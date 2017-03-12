config 		= require '../../package.json'
path 		= require 'path'
gulp 		= require 'gulp'
webpack     = require 'gulp-webpack'
uglify      = require 'gulp-uglify'
gulpif      = require 'gulp-if'
rename      = require 'gulp-rename'
livereload  = require 'gulp-livereload'
handleError = require '../util/handle_error'

development = process.env.NODE_ENV is 'development'
staging     = process.env.NODE_ENV is 'staging'
production  = process.env.NODE_ENV is 'production'
base_path   = process.env.PWD

console.log 'production', production

exports.paths =
	source: './src/coffee/app.coffee'
	watch: './src/coffee/**/*.coffee'
	destination: './public/js/'
	filename: 'app.js'
	release: "app.min.#{config.version}.js"

gulp.task 'scripts', ->

	if production
		filename = exports.paths.release
	else
		filename = exports.paths.filename

	gulp.src exports.paths.source

		.pipe webpack require( base_path + '/webpack.config' )
		.pipe gulpif production, uglify()
		.pipe rename filename
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif development, livereload()

		.on 'error', handleError

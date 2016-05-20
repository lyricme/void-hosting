config 		= require '../../package.json'
path 		= require 'path'
gulp 		= require 'gulp'
livereload  = require 'gulp-livereload'
jade        = require 'gulp-jade'
handleError = require '../util/handle_error'
gulpif      = require 'gulp-if'
dotenv 		= require 'dotenv'
do dotenv.load

development = process.env.NODE_ENV is 'development'
production  = process.env.NODE_ENV is 'production'

exports.paths =
	source: './src/jade/index.jade'
	watch: './src/jade/**/*.jade'
	destination: './public/'

gulp.task 'templates', ->

	gulp.src exports.paths.source

		.pipe(jade(
			pretty: development
			locals: {
				base_path: process.env.BASE_PATH
				ga_analytics: process.env.GA_ANALYTICS
				version: config.version
				production: production
			}
		))
		.pipe gulp.dest exports.paths.destination
		.pipe gulpif development, livereload()
		.on 'error', handleError
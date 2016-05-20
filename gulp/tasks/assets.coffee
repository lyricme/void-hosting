path 		= require 'path'
gulp 		= require 'gulp'

exports.paths =
	source: './src/assets/**/*.*'
	watch: './src/assets/**/*.*'
	destination: './public/'

gulp.task 'assets', ->
	gulp
		.src exports.paths.source
		.pipe gulp.dest exports.paths.destination
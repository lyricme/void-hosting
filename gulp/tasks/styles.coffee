config 		= require '../../package.json'
gulp 	    = require 'gulp'
livereload  = require 'gulp-livereload'
stylus      = require 'gulp-stylus'
rename      = require 'gulp-rename'
nib 	    = require 'nib'
CSSmin      = require 'gulp-minify-css'
source      = require 'vinyl-source-stream'
prefix      = require 'gulp-autoprefixer'
rupture 	= require 'rupture'
handleError = require '../util/handle_error'

development = process.env.NODE_ENV is 'development'
staging     = process.env.NODE_ENV is 'staging'
production  = process.env.NODE_ENV is 'production'

exports.paths =
	source: './src/stylus/app.styl'
	watch: './src/stylus/**/*.styl'
	destination: './public/css/'
	release: "app.min.#{config.version}.css"

gulp.task 'styles', ->
	gulp
		.src exports.paths.source
		.pipe(stylus({
			set: ['include css'],
			use: [nib(), rupture()]
			linenos: development
		}))
		.pipe gulp.dest exports.paths.destination
		.pipe prefix 'last 2 versions', 'Chrome 34', 'Firefox 28', 'iOS 7'
		.on 'error', handleError

	if production
		gulp.src(exports.paths.destination + 'app.css')
			.pipe CSSmin()
			.pipe(rename(exports.paths.release))
			.pipe(gulp.dest(exports.paths.destination))
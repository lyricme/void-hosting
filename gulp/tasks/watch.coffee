gulp 	    = require 'gulp'
livereload  = require 'gulp-livereload'
watchify    = require 'watchify'
source      = require 'vinyl-source-stream'
handleError = require '../util/handle_error'

production = process.env.NODE_ENV is 'production'

# Files to watch
paths = 
	templates: require('./templates').paths
	styles: require('./styles').paths
	assets: require('./assets').paths
	vendor: require('./vendor').paths
	scripts: require('./scripts').paths

gulp.task "watch", ->
	livereload.listen()

	gulp.watch paths.templates.watch, ['templates', 'scripts']
	gulp.watch paths.styles.watch, ['styles']
	gulp.watch paths.assets.watch, ['assets']
	gulp.watch paths.vendor.watch, ['vendor']
	gulp.watch paths.scripts.watch, ['scripts']
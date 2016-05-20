require 'coffee-script'

config =

	output:
		filename: 'app.js'

	module:
		loaders: [
			{ test: /\.jade$/, loader: "jade" }
			{ test: /\.coffee$/, loader: 'coffee-loader' }
		]

	resolve:
		extensions: [ '', '.js', '.coffee' ]
		alias:
			app 		: __dirname + '/src/coffee'
			controllers : __dirname + '/src/coffee/controllers'
			models 		: __dirname + '/src/coffee/models'
			collections : __dirname + '/src/coffee/collections'
			utils       : __dirname + '/src/coffee/utils'
			views       : __dirname + '/src/coffee/views'
			fx       	: __dirname + '/src/coffee/fx'
			templates   : __dirname + '/src/jade'

	node:
		fs: "empty"

if process.env.NODE_ENV is 'development'
	config.devtool = 'eval-source-map'

module.exports = config
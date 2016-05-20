device = require 'app/config/device'

module.exports = new class

	constructor: ->

		@detect    = new MobileDetect(window.navigator.userAgent)
		@tests 	   = {}
		@messages  =
			'WebGL'  : 'WebGL'
			'desktop': 'Desktop Browser'
			'tablet' : 'Tablet Browser'
			'mobile' : 'Mobile Browser'


	###
	Specify the tests for this experiment
	@param tests [Array]
	###
	set_tests: (tests) ->

		for test in tests
			switch test
				when 'desktop'
					if @detect.tablet() or @detect.mobile()
						@tests['desktop'] = off
					else
						@tests['desktop'] = on
				when 'tablet'
					@tests['tablet'] = @detect.tablet()
				when 'mobile'
					@tests['mobile'] = @detect.mobile()
				when 'AudioContext'
					@tests['AudioContext'] = (window.AudioContext or window.webkitAudioContext) isnt undefined
				when 'WebGL'
					supportsWebGL = (->
					  try
					    return !!window.WebGLRenderingContext and !!document.createElement("canvas").getContext("experimental-webgl")
					  catch e
					    return false
					)
					@tests['WebGL'] = supportsWebGL()

	###
	Browser test
	###
	browser_test: ->

		log_type = 'debug'

		result = true

		# Checking user agents
		if env.BROWSER_SPEC[device.name]?
			required_version = env.BROWSER_SPEC[device.name]

			if device.version < required_version
				result = false
				@message = "Unsupported browser"
				log_type = 'error'
			else
				result = true
				@message = "supported"
		else
			result = false

		c[log_type] "[BrowserTest] #{@name} #{@version} #{@message}"
		result

	###
	Test the browser against the tests 
	###
	supported: ->

		result = false
	
		for test, supported of @tests

			# c.log 'supported', test, supported

			if supported is off
				result = off
				break

			if test in ['desktop', 'tablet', 'mobile'] and supported
				result = on

		if result
			result = @browser_test()

		return result

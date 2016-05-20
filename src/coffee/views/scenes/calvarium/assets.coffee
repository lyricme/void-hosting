settings = require 'app/config/settings'

assets = [
	{
		id: 'GlitchPass'
		url: '/js/calvarium/GlitchPass.js'
		type: 'js'
	}
	{
		id: 'skull'
		url: '/js/calvarium/skull.js'
		type: 'geometry'
	}
	{
		id: 'background'
		url: '/sound/calvarium/background.mp3'
		type: 'sound'
	}
	{
		id: 'glitch'
		url: '/sound/calvarium/glitch.mp3'
		type: 'sound'
	}
	{
		id: 'after'
		url: '/sound/calvarium/after.mp3'
		type: 'sound'
	}
]

# Prepend basepath
for asset in assets
	asset.url = settings.base_path + asset.url

module.exports = assets
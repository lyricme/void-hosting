settings = require 'app/config/settings'

assets = [
	{
		id: 'particle'
		url: '/img/home/particle.jpg'
		type: 'image'
	}
	{
		id: 'hires_logo'
		url: '/img/home/hires.png'
		type: 'image'
	}
	{
		id: 'start'
		url: '/sound/home/start.mp3'
		type: 'sound'
	}
	{
		id: 'loop'
		url: '/sound/home/loop.mp3'
		type: 'sound'
	}
	{
		id: 'transition'
		url: '/sound/home/transition.mp3'
		type: 'sound'
	}
]

# Prepend basepath
for asset in assets
	asset.url = settings.base_path + asset.url

module.exports = assets
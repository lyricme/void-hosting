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
		id: 'hires_sequence'
		url: '/img/epilogue/hires.frames.json'
		type: 'sequence'
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
		id: 'transition_in'
		url: '/sound/epilogue/transition_in.mp3'
		type: 'sound'
	}
	{
		id: 'transition_out'
		url: '/sound/epilogue/transition_out.mp3'
		type: 'sound'
	}
]

# Prepend basepath
for asset in assets
	asset.url = settings.base_path + asset.url

module.exports = assets
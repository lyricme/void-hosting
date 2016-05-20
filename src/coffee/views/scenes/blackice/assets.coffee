settings = require 'app/config/settings'

assets = [
	{
		id: 'lvl0-pos-x'
		url: '/img/blackice/lvl0/pos-x.jpg'
		type: 'image'
	}
	{
		id: 'lvl0-neg-x'
		url: '/img/blackice/lvl0/neg-x.jpg'
		type: 'image'
	}
	{
		id: 'lvl0-pos-y'
		url: '/img/blackice/lvl0/pos-y.jpg'
		type: 'image'
	}
	{
		id: 'lvl0-neg-y'
		url: '/img/blackice/lvl0/neg-y.jpg'
		type: 'image'
	}
	{
		id: 'lvl0-pos-z'
		url: '/img/blackice/lvl0/pos-z.jpg'
		type: 'image'
	}
	{
		id: 'lvl0-neg-z'
		url: '/img/blackice/lvl0/neg-z.jpg'
		type: 'image'
	}
	{
		id: 'lvl1-pos-x'
		url: '/img/blackice/lvl1/pos-x.jpg'
		type: 'image'
	}
	{
		id: 'lvl1-neg-x'
		url: '/img/blackice/lvl1/neg-x.jpg'
		type: 'image'
	}
	{
		id: 'lvl1-pos-y'
		url: '/img/blackice/lvl1/pos-y.jpg'
		type: 'image'
	}
	{
		id: 'lvl1-neg-y'
		url: '/img/blackice/lvl1/neg-y.jpg'
		type: 'image'
	}
	{
		id: 'lvl1-pos-z'
		url: '/img/blackice/lvl1/pos-z.jpg'
		type: 'image'
	}
	{
		id: 'lvl1-neg-z'
		url: '/img/blackice/lvl1/neg-z.jpg'
		type: 'image'
	}
	{
		id: 'lvl2-pos-x'
		url: '/img/blackice/lvl2/pos-x.jpg'
		type: 'image'
	}
	{
		id: 'lvl2-neg-x'
		url: '/img/blackice/lvl2/neg-x.jpg'
		type: 'image'
	}
	{
		id: 'lvl2-pos-y'
		url: '/img/blackice/lvl2/pos-y.jpg'
		type: 'image'
	}
	{
		id: 'lvl2-neg-y'
		url: '/img/blackice/lvl2/neg-y.jpg'
		type: 'image'
	}
	{
		id: 'lvl2-pos-z'
		url: '/img/blackice/lvl2/pos-z.jpg'
		type: 'image'
	}
	{
		id: 'lvl2-neg-z'
		url: '/img/blackice/lvl2/neg-z.jpg'
		type: 'image'
	}
	{
		id: 'base_1'
		url: '/sound/blackice/bass_layer_1.mp3'
		type: 'sound'
	}
	{
		id: 'base_2'
		url: '/sound/blackice/bass_layer_2.mp3'
		type: 'sound'
	}
	{
		id: 'base_3'
		url: '/sound/blackice/bass_layer_3_0.mp3'
		type: 'sound'
	}
	{
		id: 'melody'
		url: '/sound/blackice/melody_layer.mp3'
		type: 'sound'
	}
]

# Prepend basepath
for asset in assets
	asset.url = settings.base_path + asset.url

module.exports = assets
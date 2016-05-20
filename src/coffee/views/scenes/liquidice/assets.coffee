settings = require 'app/config/settings'

assets = [
	{
		id: 'pos-x'
		url: '/img/liquidice/pos-x.jpg'
		type: 'image'
	}
	{
		id: 'neg-x'
		url: '/img/liquidice/neg-x.jpg'
		type: 'image'
	}
	{
		id: 'pos-y'
		url: '/img/liquidice/pos-y.jpg'
		type: 'image'
	}
	{
		id: 'neg-y'
		url: '/img/liquidice/neg-y.jpg'
		type: 'image'
	}
	{
		id: 'pos-z'
		url: '/img/liquidice/pos-z.jpg'
		type: 'image'
	}
	{
		id: 'neg-z'
		url: '/img/liquidice/neg-z.jpg'
		type: 'image'
	}
	{
		id: 'MarchingCubesData'
		url: '/js/liquidice/MarchingCubesData.js'
		type: 'js'
	}
	{
		id: 'FresnelShader'
		url: '/js/liquidice/FresnelShader.js'
		type: 'js'
	}
	{
		id: 'background'
		url: '/sound/liquidice/background.mp3'
		type: 'sound'
	}
	{
		id: 'top'
		url: '/sound/liquidice/top.mp3'
		type: 'sound'
	}
]

# Prepend basepath
for asset in assets
	asset.url = settings.base_path + asset.url

module.exports = assets
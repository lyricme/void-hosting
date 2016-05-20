settings = require 'app/config/settings'

assets = [
	{
		id: 'texture'
		url: '/img/kubik/texture.png'
		type: 'image'
	}
	{
		id: 'background'
		url: '/sound/kubik/background.mp3'
		type: 'sound'
	}
	{
		id: 'top'
		url: '/sound/kubik/top.mp3'
		type: 'sound'
	}
]

# Prepend basepath
for asset in assets
	asset.url = settings.base_path + asset.url

module.exports = assets
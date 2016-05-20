settings = require 'app/config/settings'

assets = [
	{
		id: 'pos-x'
		url: '/img/hires/pos-x.jpg'
		type: 'image'
	}
	{
		id: 'neg-x'
		url: '/img/hires/neg-x.jpg'
		type: 'image'
	}
	{
		id: 'pos-y'
		url: '/img/hires/pos-y.jpg'
		type: 'image'
	}
	{
		id: 'neg-y'
		url: '/img/hires/neg-y.jpg'
		type: 'image'
	}
	{
		id: 'pos-z'
		url: '/img/hires/pos-z.jpg'
		type: 'image'
	}
	{
		id: 'neg-z'
		url: '/img/hires/neg-z.jpg'
		type: 'image'
	}
	{
		id: 'hires_logo'
		url: '/js/hires/hires_logo.js'
		type: 'geometry'
	}
]

# Prepend basepath
for asset in assets
	asset.url = settings.base_path + asset.url

module.exports = assets
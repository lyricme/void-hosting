settings = require 'app/config/settings'

assets = [
	{
		id: 'dodecahedron_sequence'
		url: '/img/elements/dodecahedron/dodecahedron.frames.json'
		type: 'sequence'
	}
	{
		id: 'hexahedron_sequence'
		url: '/img/elements/hexahedron/hexahedron.frames.json'
		type: 'sequence'
	}
	{
		id: 'tetrahedron_sequence'
		url: '/img/elements/tetrahedron/tetrahedron.frames.json'
		type: 'sequence'
	}
	{
		id: 'octahedron_sequence'
		url: '/img/elements/octahedron/octahedron.frames.json'
		type: 'sequence'
	}
	{
		id: 'icosahedron_sequence'
		url: '/img/elements/icosahedron/icosahedron.frames.json'
		type: 'sequence'
	}
	{
		id: 'background'
		url: '/sound/elements/background.mp3'
		type: 'sound'
	}
	{
		id: 'aether'
		url: '/sound/elements/aether.mp3'
		type: 'sound'
	}
	{
		id: 'air'
		url: '/sound/elements/air.mp3'
		type: 'sound'
	}
	{
		id: 'earth'
		url: '/sound/elements/earth.mp3'
		type: 'sound'
	}
	{
		id: 'fire'
		url: '/sound/elements/fire.mp3'
		type: 'sound'
	}
	{
		id: 'water'
		url: '/sound/elements/water.mp3'
		type: 'sound'
	}
]

# Prepend basepath
for asset in assets
	asset.url = settings.base_path + asset.url

module.exports = assets
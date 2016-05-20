require 'shelljs/global'
fs = require 'fs'

data =
	images: []

for file in ls "../public/img/konami"
	if file.indexOf('.gif') > 0
		data.images.push file


path = "../public/img/konami/images.json"
		
fs.writeFile path, JSON.stringify(data), (err) ->
	if err
		echo err
		return
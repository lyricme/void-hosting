

shjs = require 'shelljs/global'

path = '../public/sound/'

dirs = [
	'blackice'
	'calvarium'
	'elements'
	'epilogue'
	'home'
	'kubik'
	'liquidice'
	'konami'
]

for dir in dirs

	for file in ls path + dir

		name = file.split('.')[0]

		in_file  = path + dir + '/' + file
		out_file = path + dir + '/' + name

		# echo in_file, out_file
		exec("ffmpeg -i #{in_file} -c:a libvorbis -q:a 4 #{out_file}.ogg")
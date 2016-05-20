require 'shelljs/global'

cmds = []

path = '../src/assets/spritesheet'

sequences = [
	# 'air'
	# 'earth'
	# 'fire'
	# 'water'
	# 'universe'
	'hires'
]

for sequence in sequences
	cmds.push "shjs scripts/exporter.coffee -c #{path}/#{sequence}/config.json"

run = (cmds) =>

	if cmds.length is 0
		echo '[Export] All commands done'
		return 

	cmd = cmds.shift()

	# echo "Running: #{cmd}"

	exec cmd, (code, output) ->
		run cmds

run cmds
setup:
	git config core.fileMode false
	git submodule update --init
	npm install

watch:
	#open http://localhost:9001
	NODE_ENV=development gulp

staging:
	NODE_ENV=staging gulp build
	cd public && rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress . root@dev.hi-res.net:/var/www/void.dev.hi-res.net

release:
	NODE_ENV=production gulp build

spritesheet:
	shjs scripts/spritesheets.coffee
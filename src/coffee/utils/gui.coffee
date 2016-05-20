settings = require 'app/config/settings'

if not settings.live
# if false

	dat = require 'dat-gui'

	module.exports = dat.GUI

else

	class Folder
		add:      -> return @
		listen:   -> return @
		name:     -> return @
		open:     -> return @
		onChange: -> return @
		addFolder: -> new Folder
		addColor: -> return @

	class GUIWrapper

		add:       -> return @
		addFolder: -> new Folder
		name:      -> return @
		close:     -> return @
		step: -> return @
		onChange: -> return @
		setValue: -> return @

	module.exports = GUIWrapper
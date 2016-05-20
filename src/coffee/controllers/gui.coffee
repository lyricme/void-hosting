settings = require 'app/config/settings'
GUI 	 = require 'utils/gui'

gui = new GUI

# do gui.close if not settings.debug

window.gui = gui

module.exports = gui
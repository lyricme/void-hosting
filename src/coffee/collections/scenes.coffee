dictionary  = require 'models/dictionary'
Scene 	    = (require 'models/scene').Scene
Author 	    = (require 'models/scene').Author
Interaction = (require 'models/scene').Interaction

module.exports = new class Scenes

	get: ( id ) ->

		xml = $ dictionary.get_dictionary 'scenes.xml'

		scene = xml.find('scene[id="'+id+'"]')

		model = new Scene
		model.id = scene.attr 'id'
		model.chapter = scene.find('chapter').text()
		model.title = scene.find('title').text()
		model.nav_title = scene.find('nav_title').text()
		model.paragraphs   = []
		model.interactions = []

		scene.find('paragraph').each ( index, item ) =>
			model.paragraphs.push $(item).text()

		model.authors = []

		scene.find('author').each ( index, item ) =>

			$item = $ item

			author = new Author
			author.name = $item.find('name').text()
			author.role = $item.find('role').text()

			model.authors.push author

		scene.find('interaction').each ( index, item ) =>

			$item = $ item

			interaction = new Interaction
			interaction.id   = $item.attr('id')
			interaction.text = $item.text()

			model.interactions.push interaction

		return model

	all: ->

		xml = $ dictionary.get_dictionary 'scenes.xml'

		scenes = []

		xml.find('scene').each ( index, item ) =>

			id = $(item).attr 'id'

			scenes.push @get id

		return scenes


exports.Scene = class Scene

	id: String
	title: String
	paragraphs: Array
	authors: Array
	interactions: Array

exports.Author = class Author

	role: String
	name: String

exports.Interaction = class Interaction

	id: String
	text: String
settings =

	debug: env.DEBUG
	live: env.LIVE

	retina: (window.devicePixelRatio is 2)

	base_path: env.BASE_PATH

	share_url: window.location.href

settings.retina_scale = if settings.retina then 2 else 1

module.exports = settings
class Share

	constructor: ->

		@url = window.location.href


	open_window: ( url, w, h ) =>

		left = ( screen.availWidth  - w ) >> 1
		top  = ( screen.availHeight - h ) >> 1

		window.open url, '', "top=#{top},left=#{left},width=#{w},height=#{h},location=no,menubar=no"

		return off

	plus: ( url ) =>

		url = encodeURIComponent url or @url

		@open_window "https://plus.google.com/share?url=#{url}", 650, 385

		return off

	pinterest: ( url, media, descr ) =>

		url   = encodeURIComponent url or @url
		media = encodeURIComponent media
		descr = encodeURIComponent descr

		@open_window "http://www.pinterest.com/pin/create/button/?url=#{url}&media=#{media}&description=#{descr}", 735, 310

		return off

	tumblr: ( url, media, descr ) =>

		url   = encodeURIComponent url or @url
		media = encodeURIComponent media
		descr = encodeURIComponent descr

		@open_window "http://www.tumblr.com/share/photo?source=#{media}&caption=#{descr}&click_thru=#{url}", 450, 430

		return off

	facebook: ( url , copy = '' ) => 

		url   = encodeURIComponent url or @url
		decsr = encodeURIComponent copy

		@open_window "http://www.facebook.com/share.php?u=#{url}&t=#{decsr}", 600, 300

		return off

	twitter: ( url , copy = '' ) =>

		url = encodeURIComponent url or @url
		
		if copy is '' then copy = 'Generic share text here!'
				
		descr = encodeURIComponent copy

		@open_window "http://twitter.com/intent/tweet/?text=#{descr}&url=#{url}", 600, 300

		return off

	renren: ( url ) => 

		url = encodeURIComponent url or @url

		@open_window "http://share.renren.com/share/buttonshare.do?link=#{url}", 600, 300

		return off

	weibo: ( url ) => 

		url = encodeURIComponent url or @url

		@open_window "http://service.weibo.com/share/share.php?url=#{url}&language=zh_cn", 600, 300

		return off

module.exports = new Share
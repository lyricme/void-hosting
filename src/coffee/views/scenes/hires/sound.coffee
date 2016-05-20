happens = require 'happens'
# Tape = require './recorder'

module.exports = class Sound

	playing : true

	rec: null # instance of recorder

	constructor: ( @app ) ->
		happens @
		
		window.sound = @

		c.log 'x'

		@cc = window.cc = new CoffeeCollider

		setTimeout @start, 750

	tape: ->
		# @rec = new Tape()

		# @app.on "animate", ->
		# 	console.log "animate"

	stop: =>
		cc.reset()

		@playing = false

	play: =>
		console.warn "asd"

	start: => 
		@emit 'started'

		@cc.on "sin", ->
			console.dir arguments[0]

		# do @background_atmos
		# do @clickable_distortion
		# # do @bass_sequence
		# do @percolation
		# do @klank

		# do @glass
		# do @listen_messages
		# do @send_messages



	background_atmos: ( fade_in_time ) ->

		cc.run """
(->

	noise = PinkNoise.ar(0.2)

	noise = Mix Array.fill 10, (i)->
		Resonz.ar(noise, i * 55 + 220, 0.05)

	noise = (noise * 0.2 + noise * Decay.kr(Dust.kr(0.5), 10))

	noise = RHPF.ar( noise, LFNoise0.kr(0.5).range(220, 55), rq:0.001)

	CombL.ar(noise, delaytime:1, decaytime:25).dup() * Line.kr( 0, 0.4, dur: #{fade_in_time})

).play()
""", on

			
	clickable_distortion: ->

		cc.run """
(->
	freq = MouseY.kr(55 / 2, 55, 'exponential')
	freq1 = freq * MouseX.kr(2, 0.5, lag:2.5)
	freq2 = freq * MouseX.kr(0.5, 2, lag:2.5)
	feedback = MouseButton.kr(0, 0.5.pi(), lag:5)
	SinOscFB.ar([freq1, freq2], feedback, mul:0.25)
).play()
""", on


	bass_sequence: ->
		cc.run """

synth = SynthDef (freq)->

	s = SinOscFB.ar( freq ) * Line.kr(1, 0, dur:0.5, doneAction:2)
	s = s.dup()
	Out.ar(0, s) * 0.5

.add()

p = Pseq( [ 55,0,0,0 ], Infinity )

Task ->
	0.wait()
	p.do syncblock (freq)->
		# freq = (60 - 24 + i).midicps()

		Synth(synth, freq:freq)

		[0.5].choose().wait()
.start()

p = Pseq( [ 55,0,0,0,55*1.25 ], Infinity )

Task ->
	0.2.wait()
	p.do syncblock (freq)->
		# freq = (60 - 24 + i).midicps()

		Synth(synth, freq:freq)

		[0.5].choose().wait()
.start()

""", on

	percolation: ( d = 60, c = 7, a = 40 ) ->
		cc.run """
d = #{d} # number of percolators
c = #{c} # number of comb delays
a = #{a} # number of allpass delays
(->
	# sine percolation sound :
	s = Mix.ar Array.fill d, ->
		Resonz.ar(Dust.ar(2 / d, 50), 200 + 30000.rand(), 0.003)

	# reverb predelay time :
	z = DelayN.ar(s, 0.000498)

	# 7 length modulated comb delays in parallel :
	y = Mix.ar CombL.ar(z, 0.1, LFNoise1.kr(Array.fill(c, (->1.rand())), 0.04, 0.05), 15)

	# chain of 4 allpass delays on each of two channels (8 total) :
	a.do ->
		y = AllpassN.ar(y, 0.050, [0.050.rand(), 0.050.rand()], 1)

	# add original sound to reverb and play it :
	s + 0.2 * y
).play()
""", on

	klank: ( n, p ) ->
		cc.run """
(->
	n = 5  # number of simultaneous instruments
	p = 15 # number of partials per instrument

	# filter bank specification :
	z = $([
		Array.fill(p, (-> 80 + 10000.linrand() )) # frequencies
		Array.fill(p, (-> 1.rand2() ))            # amplitudes
		Array.fill(p, (-> 0.2 + 8.rand() ))       # ring times
	])

	p = Pan2.ar(Klank.ar(z, Dust.ar(0.07, 0.25)), SinOsc(1))

	40.do ->
		p = AllpassN.ar(p, 0.050, [0.050.rand(), 0.050.rand()], 1)

	p
).play()

""", on

	glass: ->
		cc.run """
d = 60 # number of percolators
c = 7 # number of comb delays
a = 40 # number of allpass delays

d = 1 # number of percolators
c = 1 # number of comb delays
a = 1 # number of allpass delays

(->
	# sine percolation sound :
	s = Mix.ar Array.fill d, ->
		Resonz.ar( Dust.ar(2 + d.rand(), 50), 200 + 30000.rand(), 0.003 )

	# reverb predelay time :
	z = DelayN.ar(s, 0.000498)

	# 7 length modulated comb delays in parallel :
	y = Mix.ar CombL.ar(z, 0.1, LFNoise1.kr(Array.fill(c, (->1.rand())), 0.04, 0.05), 15)

	# chain of 4 allpass delays on each of two channels (8 total) :
	a.do ->
		y = AllpassN.ar(y, 0.050, [0.050.rand(), 0.050.rand()], 1)

	# add original sound to reverb and play it :
	s + 0.2 * y
).play()
""", on

	listen_messages: ->
		cc.run """

Message.on "noise", (value)->
	console.log "noise is" + value.data

""", on

	send_messages: ->
		cc.run """

freq = MouseY.kr( 10, 100, 'linear' )

p = Pseq( [ 10, 20, 30 ], 1 )

Task ->
	p.do syncblock ( value )->

		# console.log freq

		Message.send "sin", ( value * freq  ).exprange( 0, 1)

		0.5.wait()
.start()

""", on
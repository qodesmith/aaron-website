function type404(num, target) {
  if(num === 0) {
    typer(target)
      .run(function(el) {
        $(el).addClass('abyss');
      })
      .cursor({block: true, blink: 'hard'})
      .line("So you're sitting there,")
      .pause()
      .continue(' trying to get to a web page.')
      .pause()
      .line()
      .line()
      .pause()
      .continue("And it just doesn't seem to be working.")
      .continue('..', 500)
      .pause()
      .line('You think to yourself,')
      .pause()
      .continue([' how', ' did', ' this', ' happen?'], 350)
      .pause(1000)
      .line('Or more importantly...')
      .pause(1000)
      .continue([' WHY'])
      .pause(400)
      .continue([' did', ' this', ' happen?'], 333)
      .pause(2000)
      .line()
      .line('It dawns on you that the internet is this vast abyss')
      .line("that you've been naively staring into as if there")
      .line('were some light at the end of the tunnel.')
      .pause(1000)
      .line('And therein lies the problem.')
      .pause(1000)
      .line(["It's", ' an', ' <em>abyss</em>'], 500)
      .pause()
      .continue(' not a tunnel.')
      .pause(3000)
      .line()
      .line('What were we doing again?');
  } else if(num === 1) {
    typer(target)
      .run(function(el) {
        $(el).addClass('kalam');
        $(el).parent().prepend($('<h1>The Kalam Cosmological Argument</h1>'));
      })
      .pause(1000)
      .line('Whatever begins to exist <span style="color: lightgreen">has a cause.</span>')
      .pause(750)
      .line('The universe began to exist.')
      .pause(750)
      .line('Therefore, the universe <span style="color: lightgreen">has a cause.</span>')
  } else if(num === 2) {
    var host = window.location.hostname;
    var path = window.location.pathname;

    typer(target)
      .cursor({block: true})
      .run(function(el) {
        $(el).addClass('apparently');
      })
      .line('Apparently, ' + host + '<span style="color: yellow">' + path + "</span> isn't a thing.")
  }
}
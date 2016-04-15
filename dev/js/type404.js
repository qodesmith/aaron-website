// Various 404 messages using Typer.
App.f0f = [
  // Abyss.
  (function() {
    typer('.content')
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
  }),

  // Kalam.
  (function() {
    typer('.content')
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
  }),

  // Apparently.
  (function() {
    var host = window.location.hostname;
    var path = window.location.pathname;
    typer('.content', 40)
      .cursor({block: true})
      .run(function(el) {
        $(el).addClass('apparently');
      })
      .line('Apparently,')
      .pause()
      .line(host + '<span style="color: yellow">' + path)
      .line("isn't a thing.")
      .pause(6000)
      .line()
      .line('I believe that means you should enter a new url.')
      .pause(5000)
      .line('How bout you just click the "HOME PAGE" button up top?')
      .run(function() {
        var times = 0;
        App.homeHighlight = setInterval(function() {
          console.log('toggle');
          if(times === 6) {
            clearInterval(App.homeHighlight);
            delete App.homeHighlight;
            return;
          }

          $('.home').toggleClass('highlight');
          times++;
        }, 500);
      });
  })
];
// Various 404 messages using Typer.
var f0f = [
  // Abyss.
  function abyss() {
    typer('.content')
      .run(function(el) {
        $(el)
          .parent()
          .addClass('abyss');
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
      .continue(" that you've been naively staring into as if there")
      .continue(' were some light at the end of the tunnel.')
      .line()
      .line()
      .pause(1000)
      .continue('And therein lies the problem.')
      .pause(1000)
      .line(["It's", ' an', ' <em>abyss</em>'], 500)
      .pause()
      .continue(', not a tunnel.')
      .pause(3000)
      .line()
      .line('What were we doing again?');
  },

  // Kalam.
  function kalam() {
    typer('.content')
      .run(function(el) {
        $(el).parent()
          .addClass('kalam')
          .prepend($('<h1>The Kalam Cosmological Argument</h1>'));
      })
      .pause(1000)
      .line('Whatever begins to exist <span style="color: lightgreen">has a cause.</span>')
      .pause(750)
      .line('The universe began to exist.')
      .pause(750)
      .line('Therefore, the universe <span style="color: lightgreen">has a cause.</span>');
  },

  // Apparently.
  function apparently() {
    var host  = window.location.hostname;
    var path  = window.location.pathname;
    var query = window.location.search;

    var url = [
      '<span class="url">',
      host,
      '<span style="color: yellow">',
      path,
      '</span></span>',
      ' isn\'t a thing.'
    ].join('');

    if (query) path += query;

    typer('.content', 40)
      .cursor({block: true})
      .run(function(el) {
        $(el)
          .addClass('apparently')
          .parent()
          .addClass('apparently');
      })
      .line('Apparently,')
      .pause()
      .line(url)
      .pause(6000)
      .line()
      .line('I believe that means you should enter a new url.')
      .pause(5000)
      .line()
      .line(' How \'bout you just click the "HOME PAGE" button?')
      .run(function() {
        var times = 0;
        var homeHighlight = setInterval(function() {
          if (times === 6) {
            clearInterval(homeHighlight);
            return;
          }

          $('.home').toggleClass('highlight');
          times++;
        }, 500);
      });
  }
];

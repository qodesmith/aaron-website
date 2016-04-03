function typeSkills() {
  var p = 1500;
  var s = 15;

  function loopSkills() {
    typer('.skillset', 50)
      .cursor({color: 'white'})
      .line('good \'ol <strong>JavaScript</strong>')
      .pause(p)
      .continue([' <span style="font-size:.7em">(ain\'t vanilla great?)</span>'])
      .pause(1000)
      .empty()
      .continue('HTML & CSS <span style="font-size: 0.65em">(of course)</span>')
      .pause(p)
      .back('all', s)
      .continue('LESS')
      .pause(p)
      .back('all', s)
      .continue('Flexbox')
      .pause(p)
      .back('all', s)
      .continue('Backbone')
      .pause(p)
      .back('all', s)
      .continue('Node')
      .pause(p)
      .back('all', s)
      .continue('Express')
      .pause(p)
      .back('all', s)
      .continue('Gulp')
      .pause(p)
      .back('all', s)
      .continue('Photoshop')
      .pause(p)
      .back('all', s)
      .continue('Agile Development')
      .pause(p)
      .back('all', s)
      .continue('dealing with client "complications"')
      .pause(p)
      .continue([' <span style="font-size:.7em">(fun times)</span>'])
      .pause(1000)
      .empty()
      .continue('braving the unknown')
      .pause(p)
      .back('all', s)
      .continue('freestyling')
      .pause(p)
      .back('all', s)
      .run(function(el) {
        $(el).html('');
        loopSkills();
      });
  }

  loopSkills();
}
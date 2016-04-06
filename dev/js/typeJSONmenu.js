function typeJSONmenu(selector, views) {
  typer(selector, 20)
    .cursor({block: true, blink: 'hard'})
    .line()
    .pause()
    .continue('<span>{</span>')
    .line('    about: "<a data-url="about" data-view="' + views.about + '">me</a>",')
    .line('  awesome: "<a data-url="projects" data-view="' + views.projects + '">projects</a>",')
    .line('   resume: ["<a data-url="regular-resume" data-view="' + views['regular-resume'] + '">regular</a>", "<a data-url="nerdy-resume" data-view="' + views['nerdy-resume'] + '">nerdy</a>"],')
    .line('      get: "<a data-url="contact" data-view="' + views.contact + '">in contact</a>"')
    .line('<span>}</span>')
    .pause()
    .run(function(el) {
      $('.typer').addClass('drop');
    });
}

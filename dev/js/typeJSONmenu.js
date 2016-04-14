function typeJSONmenu(selector, views) {
  typer(selector, 20)
    .cursor({block: true, blink: 'hard'})
    .line()
    .pause()
    .continue('<span>{</span>')
    .line('    about: "<a data-view="' + views.about + '">me</a>",')
    .line('  awesome: "<a data-view="' + views.projects + '">projects</a>",')
    .line('   resume: ["<a data-view="' + views.regularResume + '">regular</a>", "<a data-view="' + views.nerdyResume + '">nerdy</a>"],')
    .line('      get: "<a data-url="contact" data-view="' + views.contact + '">in contact</a>"')
    .line('<span>}</span>')
    .pause()
    .run(function(el) {
      $('.typer').addClass('drop');
    });
}
function typeMenu(selector) {
  typer(selector, 15)
    .cursor({block: true, blink: 'hard'})
    .line()
    .pause()
    .continue('<span>{</span>')
    .line('    about: "<span class="link" data-view="AboutView">me</span>",')
    .line('     blog: "<span class="link" data-view="BlogView">posts</span>",')
    .line('  awesome: "<span class="link" data-view="ProjectsView">projects</span>",')
    .line('      get: "<span class="link" data-view="ContactView">in contact</span>"')
    .line('<span>}</span>')
    .pause(200)
    .run(function(el) {
      $(el)
        .find('.typer')
        .addClass('drop');
    });
}

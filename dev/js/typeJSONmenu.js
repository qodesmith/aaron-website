function typeJSONmenu() {
  typer('#menu-json', 20)
    .cursor({block: true, blink: 'hard'})
    .line()
    .pause()
    .continue('<span>{</span>')
    .line('    about: "<a data-view="AboutPageView" href="#" id="menu-about">me</a>",')
    .line('  awesome: "<a data-view="ProjectsPageView" href="#" id="menu-projects">projects</a>",')
    // .line('    photo: "<a data-view="PhotosPageView" href="#" id="menu-photos">graphy</a>",')
    .line('   resume: ["<a data-view="RegularResumeView" href="#">regular</a>", "<a data-view="AwesomeResumeView" href="#">nerdy</a>"],')
    .line('      get: "<a data-view="ContactView" href="#" id="menu-contact">in contact</a>"')
    .line('<span>}</span>')
    .pause()
    .run(function(el) {
      // Store the create HTML in the App for later.
      App.menuHTML = $('body').html();
      $('.typer').addClass('drop');
    })
    .listen('transitionend', '.typer');
}

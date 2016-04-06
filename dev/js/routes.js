App.Router = Backbone.Router.extend({
  routes: {
    '': 'index',
    'about': 'about',
    'projects': 'projects',
    'regular-resume': 'regularResume',
    'nerdy-resume': 'nerdyResume',
    'contact': 'contact'
  },
  index: function() {
    console.log('index route');

    // Close any open view when manually navigating
    // to the home page from another page.
    if(App.homePage) {

      // Click on the close button of the view.
      $('.close').click();

      // App.currentView.$el.fadeOut(250, function() {
      //   App.currentView.remove();
      //   App.menuClickable = true;
      // });
    }

    // Render the homepage.
    if(!App.homePage) App.homePage = new App.Views.HomeView();
  },
  about: function() {
    console.log('about route');
    this.checkHomePage();
    this.createView('AboutView');
  },
  projects: function() {
    console.log('projects route');
    this.checkHomePage();
    this.createView('ProjectsView');
  },
  regularResume: function() {
    console.log('regular route');
    this.checkHomePage();
    this.createView('RegularResumeView');
  },
  nerdyResume: function() {
    console.log('nerdy route');
    this.checkHomePage();
    this.createView('AwesomeResumeView');
  },
  contact: function() {
    console.log('contact route');
    this.checkHomePage();
    this.createView('ContactView');
  },
  checkHomePage: function() {
    // Exit if homepage is already rendered.
    if(App.homePage) return;

    // This will cause the homepage view to render without typing.
    App.homeRendered = true;

    // Render the homepage.
    App.homePage = new App.Views.HomeView();
  },
  createView: function(name) {
    App.menuClickable = false;
    if(App.currentView) {

      // Cache the view so as not to collide with App.currentView below.
      var view = App.currentView;

      view.$el.fadeOut(250, function() {
        view.remove();
        view.undelegateEvents();
      });
    }

    App.currentView = new App.Views[name]();
  }
});
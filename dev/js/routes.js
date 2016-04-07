App.Router = Backbone.Router.extend({
  routes: {
    // MAIN ROUTES
    '': 'index',
    'about': 'about',
    'projects': 'projects',
    'regular-resume': 'regularResume',
    'nerdy-resume': 'nerdyResume',
    'contact': 'contact',

    // SINGLE-PROJECT ROUTES
    'typer': 'typer',
    'jac-sound-factory': 'jacSoundFactory',
    'time-calculator': 'timeCalulator',
    'deck-grid': 'deckGrid',
    'background-gallery': 'bgGallery'
  },

  // HELPER FUNCTIONS
  checkHomePage: function() {
    // Exit if homepage is already rendered.
    if(App.homePage) return;

    // This will cause the homepage view to render without typing.
    App.homeRendered = true;

    // Render the homepage.
    App.homePage = new App.Views.HomeView();
  },
  createView: function(name, project) {
    App.menuClickable = false;

    // Kill any open demo view.
    if(App.demoView) {
      var singleProject = App.demoView;
      singleProject.$el.fadeOut(250, function() { App.kill(singleProject) });
    }

    // DEMO VIEWS
    if(project) {
      // If ProjectsView IS open...
      if(App.currentView && App.currentView.projects) {
        // Create the single project view.
        App.demoView = new App.Views[name]();

      // If ProjectsView is NOT open...
      } else {
        // Kill the current view.
        if(App.currentView) {
          var view = App.currentView;
          view.$el.fadeOut(250, function() { App.kill(view) });
        }

        // Create the ProjectsView.
        App.currentView = new App.Views.ProjectsView();

        // Create the single project view.
        App.demoView = new App.Views[name]();
      }

    // ALL OTHER VIEWS
    } else {
      // Kill current view.
      if(App.currentView) {
        var view = App.currentView;
        view.$el.fadeOut(250, function() { App.kill(view) });
      }

      // Create new view.
      App.currentView = new App.Views[name]();
    }
  },

  // MAIN ROUTES
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
    // App.currentView.name = 'Projects';
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

  // SINGLE-PROJECT ROUTES
  typer: function() {
    console.log('typer route hit');
    this.checkHomePage();
    this.createView('TyperDemoView', true);
  },
  jacSoundFactory: function() {
    console.log('JAC Sound Factory is an external link.');
  },
  timeCalulator: function() {
    this.checkHomePage();
    this.createView('TimeCalcView', true);
  },
  deckGrid: function() {
    this.checkHomePage();
    this.createView('DeckGridView', true);
  },
  bgGallery: function() {
    this.checkHomePage();
    this.createView('BackgroundGalleryView', true);
  }
});
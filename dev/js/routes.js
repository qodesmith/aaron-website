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
    'projects/:id': 'projects',

    // 404 ROUTE
    '*404': 'fourZeroFour'
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
      var demo = App.demoView;
      demo.$el.fadeOut(250, function() { App.kill(demo) });
      App.demoView = '';
    }

    // CREATE A DEMO VIEW
    if(project) {
      // If NO view is open, create ProjectsView.
      if(!App.currentView) {
        App.currentView = new App.Views.ProjectsView();

      // Kill any open regular view EXCEPT ProjectsView, create ProjectsView.
      } else if(!App.currentView.projects) {
        var view = App.currentView;
        view.$el.fadeOut(250, function() { App.kill(view) });

        App.currentView = new App.Views.ProjectsView();
      }

      // Create the single project view.
      App.demoView = new App.Views[name]();

    // ALL OTHER VIEWS
    } else {
      // Avoid re-creating ProjectsView.
      try {
        if(App.currentView.projects) {
          console.log('Refusing to re-create ProjectsView');
          return;
        }
      } catch(err) {
        console.log('No ProjectsView to re-create. Creating...');
      }

      // Kill the open view.
      App.kill(App.currentView);

      // Create new view.
      App.currentView = new App.Views[name]();
    }
  },

  // MAIN ROUTES
  index: function() {
    console.log('index route');

    // Kill all open views.
    App.kill(App.demoView);
    App.kill(App.currentView);

    // Render the homepage.
    if(!App.homePage) App.homePage = new App.Views.HomeView();
  },
  about: function() {
    console.log('about route');
    this.checkHomePage();
    this.createView('AboutView');
  },
  projects: function(id) {
    // Single-project routes.
    if(id) {
      console.log('projects/' + id + ' route');
      var project;
      var route;
      ['typer', 'time-calculator', 'deck-grid', 'background-gallery'].some(function(name) {
        if(id === name) {
          route = name;
          if(id === 'typer')              project = 'TyperDemoView';
          if(id === 'time-calculator')    project = 'TimeCalcView';
          if(id === 'deck-grid')          project = 'DeckGridView';
          if(id === 'background-gallery') project = 'BackgroundGalleryView';
        }
      });

      if(project) {
        this.checkHomePage();
        return this.createView(project, true);
      }

      return this.fourZeroFour();
    }

    // Projects route.
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

  // 404
  fourZeroFour: function() {
    console.log('404 route');
    App.currentView = new App.Views.FourZeroFourView();
  }
});
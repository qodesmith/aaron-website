app.Router = Backbone.Router.extend({

  // Adding the '(/)' allows for trailing slashes in the url.
  routes: {
    // MAIN ROUTES
    '': 'index',
    'about(/)': 'about',
    'projects(/)': 'projects',
    'blog(/)': 'blog',
    'contact(/)': 'contact',

    // DEMO ROUTES
    'typer(/)': 'typerDemo',
    'thing-to-html(/)': 'thingDemo',
    'time-calculator(/)': 'calcDemo',
    'deck-grid(/)': 'deckDemo',
    'background-gallery(/)': 'bgDemo',

    // DYNAMIC ROUTES
    'blog/:tag/:tagName(/)': 'blog',
    'blog/:id(/)': 'blog',

    // OTHER ROUTES
    'edit-post(/)': 'editPost',
    'create-post(/)': 'createPost',
    'login(/)': 'login',

    // 404 ROUTE
    '*404': 'fourZeroFour'
  },
  navAndView: function(view, data) {
    // `data`:
    // {model: model}
    // {tag: tag}

    app.removeCurrentView();

    if (!views.NavigationView) {
      views.NavigationView = new app.NavigationView(view, data);
    } else {
      views.currentView = new app[view](data);
    }
  },

  // Route functions are only triggered by browser actions,
  // not manual `.navigate` calls. Back & fwd buttons are triggers.

  // MAIN ROUTES
  index: function() {
    app.removeCurrentView();
    views.currentView = null;

    if (!views.HomeView) {
      views.HomeView = new app.HomeView();
    } else {
      views.HomeView.render();
    }
  },
  about: function() {
    this.navAndView('AboutView');
  },
  projects: function() {
    this.navAndView('ProjectsView');
  },
  blog: function(id, tag) {
    var _this = this;
    var model;

    // TAGGED POSTS PAGE
    if (tag) {
      this.navAndView('BlogView', {tag: tag});

    // SINGLE-POST PAGE
    } else if (id) {

      // If the post is in the collection...
      if (posts.where({_id: id}).length) {
        model = posts.where({_id: id})[0];
        this.navAndView('BlogPostView', {model: model});

      // If the post is *not* in the collection...
      } else {
        $.get('/blog-posts?id=' + id)
          .done(function(post) {

            // If for some reason the post isn't in the db, log an error.
            if (post.length !== 1) {
              $.post('/error-logs', {
                error: 'Single post *not* in collection, also not returned from db'
              });

              return _this.fourZeroFour();
            }

            model = new app.PostModel(post[0]);
            _this.navAndView('BlogPostView', {model: model});
          })
          .fail(function(res) {
            _this.fourZeroFour();
            $.post('/error-logs', {
              responseText: res.responseText,
              statusText: res.statusText,
              status: res.status
            });
          });
      }

    // BLOG PAGE
    } else {
      this.navAndView('BlogView');
    }
  },
  contact: function() {
    this.navAndView('ContactView');
  },

  // PROJECT DEMO ROUTES
  typerDemo: function() {
    this.navAndView('TyperDemoView');
  },
  thingDemo: function() {
    this.navAndView('ThingDemoView');
  },
  calcDemo: function() {
    this.navAndView('TimeCalcDemoView');
  },
  deckDemo: function() {
    this.navAndView('DeckGridDemoView');
  },
  bgDemo: function() {
    this.navAndView('BGGalleryDemoView');
  },

  // OTHER ROUTES
  editPost: function() {
    this.removeCurrentView(true);
    views.currentView = new app.AdminPostView('edit');
  },
  createPost: function() {
    this.removeCurrentView(true);
    views.currentView = new app.AdminPostView('create');
  },
  login: function() {
    this.removeCurrentView(true);
    views.currentView = new app.LoginView();
  },

  // 404
  fourZeroFour: function() {
    if (views.HomeView) views.HomeView.remove(true);
    if (views.NavigationView) views.NavigationView.remove(true);

    views.HomeView = null;
    views.NavigationView = null;

    this.removeCurrentView(true);
    views.currentView = new app.FourZeroFourView();
  }
});

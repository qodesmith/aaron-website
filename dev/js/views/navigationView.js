app.NavigationView = Backbone.View.extend({
  id: 'navigation',
  className: 'absolute top right no-overflow',
  initialize: function(view, data) {
    // `view`: a view to create after navigation is created.
    if (view) this.view = view;
    if (data) this.data = data.tag ? {tag: data.tag} : {model: data.model};

    this.event = new Event('killTyper');
    this.$el.html(templates.navigation());
    this.render();
  },
  render: function() {
    var data;
    $body.append(this.$el);

    setTimeout(function() {
      this.$el.addClass('attached');
    }.bind(this), 10);

    if (this.view) {
      setTimeout(function() {
        views.currentView = new app[this.view](this.data);
        delete this.view;
      }.bind(this), 400);
    }
  },
  events: {
    'click .hamburger': 'open',
    'click .nav-item': 'newView',
    'mouseenter .nav-item': 'mouseenter',
    'mouseleave .nav-item': 'mouseleave'
  },
  open: function() {
    this.$el.toggleClass('open');
  },
  mouseenter: function(e) {
    // Instead of checking the window width, check the body's width.
    var width = document.body.getBoundingClientRect().width;

    if (width <= 1024) return;

    $(e.currentTarget)
      .addClass('focused')
      .siblings()
      .addClass('not-focused');

    typer('.focused .description', 10)
      .cursor({block: true})
      .line({el: '.focused .description-content'});
  },
  mouseleave: function(e) {
    var width = document.body.getBoundingClientRect().width;

    if (width <= 1024) return;

    document.body.dispatchEvent(this.event);

    $(e.currentTarget)
      .removeClass('focused')
      .find('.description')
      .empty()
      .end()
      .siblings()
      .removeClass('not-focused');
  },
  newView: function(e) {
    var view = $(e.currentTarget).data('view');

    // This could be the case if the user navigates
    // back to the home page via the browsers buttons.
    if (!views.currentView) {
      views.currentView = new app[view]();
      this.$el.removeClass('open');

    // Views accessible from the navigation will have
    // a 'this.name' property equal to `view` above.
    } else if (view === views.currentView.name) {
      this.$el.removeClass('open');
    } else {
      app.removeCurrentView();
      views.currentView = new app[view]();
      this.$el.removeClass('open');
    }
  }
});

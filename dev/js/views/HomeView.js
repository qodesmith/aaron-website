app.HomeView = Backbone.View.extend({
  id: 'menu',
  className: 'full-size flex centered col no-overflow',
  initialize: function() {
    this.$el.html(templates.home());
    this.firstRender();
  },
  firstRender: function() {
    $body.append(this.$el);

    typeMenu('#menu-container');

    setTimeout(function() {
      this.$el
        .find('#menu-heading')
        .addClass('show');
    }.bind(this), 10);
  },
  render: function() {
    // This function called on subsequent visits to the homapage.
    this.$el.empty();
    this.el.className = this.className;
    this.$el.html(this.html);
    this.menuClickable = true;
  },
  events: {
    'click .link': 'link',
    'transitionend .typer': 'removeCursor'
  },
  link: function(e) {
    var view;
    var num = app.randomNum(1, 2);

    if (!this.menuClickable) return;

    this.menuClickable = false;
    view = $(e.target).attr('data-view');

    if (num === 1) {
      blowUpMenu('#menu-container', '#menu');
    } else {
      linksDisappear(this.$el, '#menu-container', 'span', 'disappear');
    }

    // Event emitted from `blowUpMenu.js` and `linksDisappear.js`.
    $body.one('menuAnimationComplete', function() {
      // Only create the navigation view once.
      if (!views.NavigationView) {
        // Passing `view` into `NavigationView` so it can be responsible
        // for creating the view when it itself is has rendered.
        views.NavigationView = new app.NavigationView(view);
      } else {
        views.currentView = new app[view]();
      }
    }.bind(this));
  },
  removeCursor: function(e) {
    // This function will be triggered by multiple `transitionend` events.
    // Ensure this logic only executes once.
    if (e.originalEvent.propertyName === 'margin-top') {

      this.$el
        // Change the color of the links and remove the `typer` cursor.
        .find('#menu-container')
        .addClass('clickable')
        .end()
        .find('.typer')
        .attr('class', 'white-space')

        // Remove all attributes from `typer-js` so we
        // can store the clean HTML for later use.
        .end()
        .find('[data-typer-child]')
        .removeAttr('data-typer-child')
        .end()
        .find('[data-typer]')
        .removeAttr('data-typer');

      this.html = this.$el.html();
      this.menuClickable = true;
    }
  }
});

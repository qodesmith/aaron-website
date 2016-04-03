App.Views.JSONMenuView = Backbone.View.extend({
  id: 'menu-json',
  className: 'mono',
  initialize: function() {
    App.homePageRendered = true;
    this.render();
  },
  render: function() {
    console.log('JSONMenuView.js');
    var $name = $('<div class="my-name center mono">Aaron Cordova</div>');
    var $phrase = $('<div class="phrase">WEB DEVELOPER</div>');

    $name.append($phrase);
    $('#container').append($name).append(this.$el);
    // $('#container').append(this.$el);

    typeJSONmenu();
    setTimeout(function() {
      $name.addClass('show');
    }, 10);
  },
  events: {
    'transitionend .typer': 'removeCursor',
    'click a': 'menuClicked'
  },
  menuClicked: function(e) {
    // Menu is clickable only after the cursor drops.
    if(!App.menuClickable) return;

    // Prevent multiple views being generated by
    // clicking a menu item more than once.
    App.menuClickable = false;

    var view = $(e.target).data('view');

    // Allow regular links to work, then quickly exit.
    if(!view) return;

    e.preventDefault();

    App.currentView = new App.Views[view]();
  },
  removeCursor: function(e) {
    $('.typer').removeClass('typer cursor-hard cursor-block drop');
    $('body').removeClass('no-overflow');

    this.showLinks();
    App.menuClickable = true;
  },
  showLinks: function() {
    this.$el.addClass('enabled');
    $('.phrase').addClass('light-change');
  }
});
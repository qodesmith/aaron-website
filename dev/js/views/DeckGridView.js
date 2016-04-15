App.Views.DeckGridView = Backbone.View.extend({
  id: 'deck-grid',
  className: 'full-size',
  initialize: function() {
    App.router.navigate('projects/deck-grid');
    this.html = App.templates.DeckGridView();
    this.render();
  },
  render: function() {
    var _this = this;
    this.$el.html(this.html);

    // Create & append a close button.
    var close = $('<div class="close dark">&times;</div>');
    this.$el.append(close);

    $('body').append(this.$el);

    // Both executes the deckGrid function and stores its
    // return value, which is an obj with the event listeners.
    this.tracker = deckGrid();

    setTimeout(function() {
      _this.$el.addClass('show');
    }, 10);
  },
  events: {
    'click .close': 'close',
  },
  close: function() {
    var _this = this;
    App.menuClickable = true;

    this.removeDeckListeners();
    this.$el.removeClass('show');

    setTimeout(function() {
      App.kill(_this, 'projects', 1);
    }, 1000);
  },
  removeDeckListeners: function() {
    for(var i in this.tracker.listeners) {
      if(i === 'saveClick') {
        document.body.removeEventListener('click', this.tracker.listeners[i]);
      } else {
        document.body.removeEventListener(i, this.tracker.listeners[i]);
      }
    }
  }
});
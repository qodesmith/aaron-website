App.Views.DeckGridView = Backbone.View.extend({
  id: 'deck-grid',
  className: 'full-size',
  initialize: function() {
    App.router.navigate('//deck-grid');
    this.transitions = 0;
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
    'transitionend *': 'noBubble',
    'transitionend': 'removeMe'
  },
  close: function() {
    this.removeDeckListeners();
    this.$el.removeClass('show');
  },
  noBubble: function(e) {
    e.stopPropagation();
  },
  removeMe: function() {
    if(this.transitions === 1) App.kill(this);
    this.transitions++;
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
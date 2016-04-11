App.Views.TimeCalcView = Backbone.View.extend({
  id: 'time-calc',
  className: 'full-size flex-centered',
  initialize: function() {
    App.router.navigate('time-calculator');
    this.transitions = 0;
    this.html = App.templates.TimeCalcView();
    this.render();
  },
  render: function() {
    var _this = this;

    this.$el.html(this.html);

    // Create & append a close button.
    var closer = $('<div class="close light">&times;</div>');
    this.$el.append(closer);

    $('body').append(this.$el);

    timeCalculator();
    afterTimeCalculator();

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
    this.$el.removeClass('show');
  },
  noBubble: function(e) {
    e.stopPropagation();
  },
  removeMe: function() {
    if(this.transitions === 1) App.kill(this);
    this.transitions++;
  }
});
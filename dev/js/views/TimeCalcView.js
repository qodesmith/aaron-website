App.Views.TimeCalcView = Backbone.View.extend({
  id: 'time-calc',
  className: 'full-size flex-centered',
  initialize: function() {
    App.router.navigate('projects/time-calculator');
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
    'click .close': 'close'
  },
  close: function() {
    var _this = this;
    App.menuClickable = true;

    this.$el.removeClass('show');

    setTimeout(function() {
      App.kill(_this, 'projects', 1);
    }, 1000);
  }
});
App.Views.TyperDemoView = Backbone.View.extend({
  id: 'typer-demonstration',
  className: 'full-size',
  initialize: function() {
    App.router.navigate('projects/typer');
    this.typer = true;
    this.html = App.templates.TyperDemoView();
    this.render();
  },
  render: function() {
    this.$el.html(this.html);

    // Create & append a close button.
    var close = $('<div class="typer-demo-close">close</div>');
    this.$el.append(close);

    $('body').append(this.$el)

    this.$el.fadeIn(1000, typerDemonstration);
  },
  events: {
    'click .typer-demo-close': 'close'
  },
  close: function() {
    var _this = this;
    document.body.dispatchEvent(new CustomEvent('killTyper'));

    this.$el.fadeOut(1000, function() {
      App.kill(_this, 'projects');
      App.router.navigate('projects');
    });
  }
});
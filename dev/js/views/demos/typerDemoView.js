app.TyperDemoView = Backbone.View.extend({
  id: 'typer-demo',
  className: 'page no-overflow flex col',
  initialize: function() {
    router.navigate('typer');
    this.typer = true;
    this.killTyper = new Event('killTyper');
    this.$el.html(templates.typerDemo());

    // Cache some elements.
    this.$stopPlay = this.$el.find('.stop-play');
    this.$progressBar = this.$el.find('.progress-bar');

    // Set ready status when typer demo has begun:
    // `typerJs` method in `typerDemo.js`.
    $body.one('typer-demo-started', function() {
      this.ready = true;
    }.bind(this));

    app.typicalRender(this);
  },
  events: {
    transitionend: 'begin',
    'click .previous': 'previousNext',
    'click .next': 'previousNext',
    'click .stop-play': 'stopPlay',
    'click .progress-item': 'progressItem'
  },
  begin: function(e) {
    if (this.typerDemoBegan) return;

    var opacity = e.originalEvent.propertyName === 'opacity';
    var source = e.originalEvent.srcElement.id === 'typer-demo';

    this.typerDemoBegan = true;

    if (opacity && source) {
      typerDemo.init();
      typerDemo.intro(this.$el);
    }
  },
  previousNext: function(e) {
    if (!this.ready) return;

    var button = $(e.currentTarget).hasClass('next') ? 'next' : 'prev';
    var $active = this.$progressBar.find('.active');
    var $direction = $active[button]();
    var item;

    if (!$direction.length) return;

    document.body.dispatchEvent(this.killTyper);

    item = $direction.data('item');
    $active.removeClass('active');
    $direction.addClass('active');
    this.$stopPlay
      .addClass('stop')
      .removeClass('play');

    typerDemo[item]();
  },
  stopPlay: function(e) {
    var $sp = $(e.currentTarget);
    var item;

    if (!this.ready) return;

    $sp.toggleClass('play');
    $sp.toggleClass('stop');

    if ($sp.hasClass('stop')) {
      item = this.$el
        .find('.active')
        .data('item');

      typerDemo[item]();
    } else {
      document.body.dispatchEvent(this.killTyper);
    }
  },
  progressItem: function(e) {
    var $item = $(e.currentTarget);
    var item = $item.data('item');

    if (!this.ready || $item.hasClass('active')) return;

    document.body.dispatchEvent(this.killTyper);

    $item
      .parent()
      .find('.active')
      .removeClass('active');

    $item.addClass('active');

    this.$stopPlay
      .addClass('stop')
      .removeClass('play');

    typerDemo[item]();
  }
});

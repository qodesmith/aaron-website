App.Views.RegularResumeView = Backbone.View.extend({
  id: 'regular-resume',
  className: 'page full-size',
  initialize: function() {
    App.router.navigate('regular-resume');
    this.$el.html(App.templates.RegularResume());
    this.render();
  },
  render: function() {
    var _this = this;

    App.randomDir(this.$el);
    $('body').append(this.$el);

    setTimeout(function() {
      _this.$el.addClass('show');
    }, 10);
  },
  events: {
    'transitionend': 'close',
    'click .close': 'hide',
    'mouseover .pdf': 'pdf',
    'mouseout .pdf': 'pdf',
    'click .pdf': 'pdf'
  },
  hide: function() {
    this.$el.removeClass('show');
    this.closing = true;
  },
  close: function(e) {
    var close = App.dirCheck(e.originalEvent.propertyName);

    if(this.closing && close) {
      App.menuClickable = true;
      App.kill(this, '', 1);
    }
  },
  pdf: function(e) {
    if(e.type === 'click') {
      $.post('/resume', function(x) {
        console.log('DOWNLOADING RESUME');
        console.log(x);
      });
    } else if(e.type === 'mouseover') {
      $('.pdf').addClass('active');
    } else {
      $('.pdf').removeClass('active');
    }
  }
})
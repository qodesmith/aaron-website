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
    'transitionend *': 'noBubble',
    'transitionend': 'close',
    'click .close': 'hide',
    'mouseover .pdf': 'pdf',
    'mouseout .pdf': 'pdf',
    'click .pdf': 'pdf'
  },
  noBubble: function(e) {
    e.stopPropagation();
  },
  hide: function() {
    this.$el.removeClass('show');
  },
  close: function() {
    if(this.isOpen) { // Rejects the opening transition.
      App.menuClickable = true;
      App.kill(this);
      App.router.navigate('');
    }

    this.isOpen = true;
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
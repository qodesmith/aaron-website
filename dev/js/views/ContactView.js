App.Views.ContactView = Backbone.View.extend({
  id: 'contact',
  className: 'full-size page',
  initialize: function() {
    App.router.navigate('contact');
    this.html = App.templates.ContactView();
    this.render();
  },
  render: function() {
    var _this = this;
    var closer = $('<div class="close light">&times;</div>');

    App.randomDir(this.$el);

    this.$el.html(this.html);
    this.$el.append(closer);
    $('body').append(this.$el);

    setTimeout(function() {
      _this.$el.addClass('show');
    }, 10);
  },
  events: {
    'click .close': 'hide',
    'click #submit': 'submit',
    'input .form-field': 'removeError',
    'transitionend': 'close'
  },
  submit: function(e) {
    e.preventDefault();
    if(!this.checkForm()) return;

    var _this = this;
    var form = $('#contact-form');

    $.post('/contact', form.serializeArray())
      .success(function(data) {
        console.log('success');
        _this.success();
      })
      .fail(function(err) {
        console.log(err);
      });
  },
  checkForm: function() {
    var $invalid = $('.form-field:invalid');
    if($invalid.length) {
      $invalid.addClass('error');
      return false;
    }

    return true;
  },
  removeError: function(e) {
    $(e.target).removeClass('error');
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
  success: function() {
    var _this = this;

    this.$el.addClass('flex-centered');
    this.$el.html('<div class="success">Success!</div>');
    setTimeout(function() {
      $('.success').addClass('animate');

      setTimeout(function() {
        App.menuClickable = true;
        App.kill(_this, '');
      }, 2500);
    }, 0);
  }
});
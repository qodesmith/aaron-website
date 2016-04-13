App.Views.ContactView = Backbone.View.extend({
  id: 'contact',
  className: 'full-size page',
  initialize: function() {
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
    'transitionend *': 'noBubble',
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
  },
  noBubble: function(e) {
    e.stopPropagation();
  },
  close: function() {
    if(this.isOpen) {
      var _this = this;

      App.menuClickable = true;
      this.$el.fadeOut(500, function() {
        App.kill(_this);
      });
    }
    this.isOpen = true;
  },
  success: function() {
    var _this = this;

    this.$el.addClass('flex-centered');
    this.$el.html('<div class="success">Success!</div>');
    setTimeout(function() {
      $('.success').addClass('animate');

      setTimeout(function() {
        _this.close();
      }, 2500);
    }, 0);
  }
});
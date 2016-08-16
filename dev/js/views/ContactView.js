app.ContactView = Backbone.View.extend({
  id: 'contact',
  className: 'page overflow y',
  initialize: function() {
    router.navigate('contact');
    this.name = 'ContactView';
    this.$el.html(templates.contact());
    this.$name = this.$el.find('.name');
    this.$email = this.$el.find('.email');
    this.$message = this.$el.find('.message');
    this.$submit = this.$el.find('.submit');
    app.typicalRender(this);
  },
  events: {
    'click .submit': 'submit',
    'keypress .input': 'checkErrorState',
    'keypress .submit': 'enter'
  },
  submit: function() {
    var data = {
      name: this.$name.val(),
      email: this.$email.val(),
      message: this.$message.val()
    };
    var check = this.checkData(data);

    check === 'ok' ? this.submitForm(data) : this.showErrors(check);
  },
  checkData: function(data) {
    // Check for proper email: http://goo.gl/O6ctPN.
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/;
    var errors = [];

    // Check for missing fields.
    if (!data.name.length) errors.push('$name');
    if (!data.email.length || !emailRegex.test(data.email)) errors.push('$email');
    if (!data.message.length || data.message.length > 10000) errors.push('$message');

    return errors.length ? errors : 'ok';
  },
  showErrors: function(errors) {
    errors.map(function(error) {
      this[error].addClass('error');
    }.bind(this));

    this.$submit.addClass('error');
  },
  checkErrorState: function(e) {
    $(e.currentTarget).removeClass('error');
    this.$submit.removeClass('error');
  },
  enter: function(e) {
    if (e.which === 13) this.submit();
  },
  submitForm: function(data) {
    var _this = this;

    $.post('/contact', data)
      .done(function() {
        _this.response('Success!');
      })
      .fail(function(err) {
        // WEIRD: Unless this variable is declared with the contents
        // of 'err', passing 'err' to the ajax call below doesn't work.
        var error = {
          type: 'contact form error',
          status: err.status,
          statusText: err.statusText,
          responseText: err.responseText,
          responseJSON: err.responseJSON
        };

        _this.response('Error - try again');

        // Log the error to the database.
        $.post('/error-logs', error);
      });
  },
  response: function(msg) {
    var _this = this;
    var $response = $('<div class="response page flex centered">');
    var $text = $('<div class="response-text">');

    $text.text(msg);
    $response.append($text);

    if (msg !== 'Success!') $text.addClass('error');

    this.$el.append($response);

    setTimeout(function() {
      $response.addClass('show');

      setTimeout(function() {
        $text.addClass('animate');

        setTimeout(function() {
          $response.remove();

          if (msg === 'Success!') _this.clearForm();
        }, 2500);
      }, 500);
    }, 10);
  },
  clearForm: function() {
    this.$name.val('');
    this.$email.val('');
    this.$message.val('');
    this.el.scrollTop = 0;
  }
});

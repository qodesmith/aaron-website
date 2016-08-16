app.LoginView = Backbone.View.extend({
  id: 'login',
  className: 'full-size absolute top left flex col',
  initialize: function() {
    var _this = this;

    router.navigate('login');
    this.html = templates.login();

    $.ajax({
      url: '/am-i-logged-in',
      cache: false,
      success: function(loggedIn) {
        var $message = $('<div>Already logged in.</div>');
        var $logout = $('<div class="field logout">LOG OUT</div>');

        if (loggedIn) {
          _this.$el
            .append($message)
            .append($logout);
          $body.append(_this.$el);
        } else {
          _this.$el.html(_this.html);
          $body.append(_this.$el);
        }
      }
    });
  },
  events: {
    'click .submit': 'submit',
    'click .logout': 'logout'
  },
  submit: function(e) {
    var _this = this;
    var email = $('.email').val();
    var pw = $('.password').val();

    if (!email || !pw) return;

    $.post('/login', {email: email, password: pw})
      .done(function(res) {
        _this.$el.html('Logged in.');
      })
      .fail(function(err) {
        var error = {
          type: 'login',
          status: err.status,
          statusText: err.statusText,
          responseText: err.responseText,
          date: new Date()
        };

        $('.email').val('');
        $('.password').val('');

        $.post('/error-logs', error);
      });

  },
  logout: function() {
    var _this = this;
    $.post('/logout', function() {
      _this.$el.html(_this.html);
    });
  }
});

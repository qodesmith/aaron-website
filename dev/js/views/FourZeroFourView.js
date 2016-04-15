App.Views.FourZeroFourView = Backbone.View.extend({
  id: 'four-zero-four',
  className: 'full-size flex-centered',
  initialize: function() {
    var num = Math.floor(Math.random() * App.f0f.length);
    var content = $('<div class="content">');
    var home = $('<a class="home">HOME PAGE</a>');

    this.typer = true;
    this.$el.append(home);
    this.$el.append(content);

    $('#container').remove();
    $('body').append(this.$el);

    setTimeout(function() {
      // Found in type404.js
      App.f0f[num]();
    }, 1000);
  },
  events: {
    'click a': 'goHome'
  },
  goHome: function(e) {
    e.preventDefault;
    App.kill(this, '');
    App.homePage = new App.Views.HomeView();
  }
});
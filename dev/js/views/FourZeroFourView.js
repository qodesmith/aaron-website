app.FourZeroFourView = Backbone.View.extend({
  id: 'four-zero-four',
  className: 'absolute top left full-size flex col centered mono overflow y',
  initialize: function() {
    var num = app.randomNum(0, f0f.length - 1);
    var $home = $('<a href="/">HOME PAGE</a>');
    var $content = $('<div class="content sans">');

    this.typer = true;
    this.$el.append($home);
    this.$el.append($content);

    $home.addClass('home absolute top left pointer');
    $body.append(this.$el);

    setTimeout(function() {
      // Found in type404.js
      f0f[num]();
    }, 1000);
  }
});

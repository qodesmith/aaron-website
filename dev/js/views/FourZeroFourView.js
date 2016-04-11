App.Views.FourZeroFourView = Backbone.View.extend({
  id: 'four-zero-four',
  className: 'full-size flex-centered',
  initialize: function() {
    var num = Math.floor(Math.random() * 2);
    var content = $('<div class="content">');
    var home = $('<a href="/" class="home">home page</a>');

    this.$el.append(home);
    this.$el.append(content);

    $('body').append(this.$el);

    type404(num, '.content');
  }
});
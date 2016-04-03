App.Views.RegularMenuView = Backbone.View.extend({
  clasName: '',
  id: '',
  initialize: function() {

  },
  render: function() {
    App.randomDir(this.$el);
  }
});
App.Views.ProjectsView = Backbone.View.extend({
  id: 'projects-page',
  className: 'page full-size center',
  initialize: function() {
    // this.template = Handlebars.compile($('#projects-template').html());
    this.html = App.templates.ProjectsPageView();
    this.render();
  },
  render: function() {
    var _this = this;

    App.randomDir(this.$el);

    this.$el.html(this.html);
    $('body').append(this.$el);

    // Apply first and last classes to the first and last projects.
    var projects = this.$el.find('.project');
    $(projects[0]).addClass('first');
    $(projects[projects.length - 1]).addClass('last');

    setTimeout(function() {
      _this.$el.addClass('show');
    }, 10);
  },
  events: {
    'transitionend *': 'noBubble',
    'transitionend': 'close',
    'click .close': 'hide',
    'click .demo': 'demoLaunch',
    'mouseover .demo': 'demoMouseOver',
    'mouseout .demo': 'demoMoveOut'
  },
  noBubble: function(e) {
    e.stopPropagation();
  },
  hide: function() {
    this.$el.removeClass('show');
  },
  close: function(e) {
    if(this.isOpen) { // Rejects the opening transition.
      App.menuClickable = true;
      if(App.demoView) App.demoView.remove();
      App.kill(this);
    }

    this.isOpen = true;
  },
  demoLaunch: function(e) {
    var demo = $(e.target).closest('.demo').data('demo');

    if(demo) {
      e.preventDefault();
      App.demoView = new App.Views[demo]();
    }
  },
  demoMouseOver: function(e) {
    $(e.target).closest('.demo').addClass('transform');
  },
  demoMoveOut: function(e) {
    $(e.target).closest('.demo').removeClass('transform');
  }
});
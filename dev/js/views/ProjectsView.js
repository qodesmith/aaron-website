
App.Views.ProjectsView = Backbone.View.extend({
  id: 'projects-page',
  className: 'page full-size center',
  initialize: function() {
    App.router.navigate('projects');
    this.projects = true;
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
      App.projectsRendered = false;
      App.menuClickable = true;
      App.kill(this);
      App.router.navigate('');
    }

    this.isOpen = true;
  },
  demoLaunch: function(e) {
    var demo = $(e.currentTarget).data('demo');

    if(demo) {
      e.preventDefault();
      App.demoView = new App.Views[demo + 'View']();
    }
  },
  demoMouseOver: function(e) {
    $(e.target).closest('.demo').addClass('transform');
  },
  demoMoveOut: function(e) {
    $(e.target).closest('.demo').removeClass('transform');
  }
});
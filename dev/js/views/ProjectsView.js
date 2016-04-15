
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
    'transitionend': 'close',
    'click .close': 'hide',
    'click .demo': 'demoLaunch',
    'mouseover .demo': 'demoMouseOver',
    'mouseout .demo': 'demoMoveOut'
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
  demoLaunch: function(e) {
    var demo = $(e.currentTarget).data('demo');

    if(demo) {
      e.preventDefault();
      if(App.demoView) return console.log('Demo view already open');
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
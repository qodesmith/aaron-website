app.ProjectsView = Backbone.View.extend({
  id: 'projects',
  className: 'page overflow x flex',
  initialize: function() {
    var _this = this;

    router.navigate('projects');
    this.name = 'ProjectsView';

    this.$el.html(templates.projects(projectData));
    app.typicalRender(this);
  },
  events: {
    // wheel: 'wheel',
    // mousemove: 'mousemove',
    'click [data-view]': 'demo'
  },
  wheel: function(e) {
    // Prevents scrolling with the mouse wheel or trackpad swipes.
    e.preventDefault();
  },
  mousemove: function(e) {
    if (app.breakPoint() !== 'DESKTOP') return;

    // 1. Calculate the width of the page.
    var windowWidth = window.innerWidth;

    // 2. Calculate the metrics of the scroll-triggering area
    // (buffered by a percentage on no-scrolling area on either side).
    var buffer = windowWidth * .2;
    var start = buffer;
    var end = windowWidth - buffer;
    var spread = end - start;

    // 3. Calculate the %age of the mouse location to the left of the buffered zone.
    var mouseLoc = e.clientX;
    var percentage = (function() {
      if (mouseLoc < start) {
        return 0;
      } else if (mouseLoc > end) {
        return 1;
      } else {
        return (mouseLoc - buffer) / spread;
      }
    })();

    // 4. Calculate the el's scroll amount.
    var elScrollWidth = this.el.scrollWidth; // How wide the element is.
    var maxScroll = elScrollWidth - windowWidth; // Maximum scrollLeft amount.

    // 5. Scroll the el accordingly.
    this.el.scrollLeft = maxScroll * percentage;
  },
  demo: function(e) {
    var view = $(e.currentTarget).data('view');

    views.currentView.remove();
    views.currentView = new app[view]();
  }
});

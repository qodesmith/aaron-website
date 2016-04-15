// Front End libraries.
$ = jQuery  = require('jquery');
Handlebars  = require('handlebars/runtime.js'); // Only the runtime is needed, much smaller file.
_           = require('underscore'); // Backbone dependency.
Backbone    = require('backbone');
typer       = require('typer-js');
thingToHTML = require('thing-to-html');

App = {
  Models: {},
  Collections: {},
  Views: {},
  templates: {},

  // Generate & add a random class as a direction for the view to slide in from.
  randomDir: function(el) {
    var dir = ['left', 'right', 'top', 'bottom'];
    var num = Math.floor(Math.random() * 4);
    $(el).addClass(dir[num]);
  },

  // Prevent Backbone zombie views from forming: http://goo.gl/OJEqsr
  kill: function(view, route, time) {
    if(!view) return;
    if(view.typer) document.body.dispatchEvent(new CustomEvent('killTyper'));
    if(view === App.demoView) App.demoView = '';
    if(view === App.currentView) App.currentView = '';
    if(route !== undefined) this.router.navigate(route);

    view.$el.fadeOut(time || 250, function() {
      view.remove(); // Remove the view from the DOM. Will also undelegate events.
    });
  },
  dirCheck: function(property) {
    return ['top', 'bottom', 'left', 'right'].some(function(dir) {
      return property === dir;
    });
  }
};
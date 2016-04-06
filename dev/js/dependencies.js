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
  kill: function(view) {
    view.remove(); // Remove the view from the DOM.
    view.undelegateEvents(); // Unbind the view's delegated events.
    App.router.navigate(''); // Update the router to reflect the home page.
  }
};
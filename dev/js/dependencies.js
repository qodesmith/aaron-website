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

  // Check the url - decipher between direct page visits & other.
  checkUrl: function() {
    var pathname = window.location.pathname.slice(1); // Remove preceding '/';
    if(pathname[pathname.length - 1] === '/') pathname = pathname.slice(0, -1); // Remove trailing '/';
    console.log('pathname:', pathname);
  },

  // Generate & add a random class as a direction for the view to slide in from.
  randomDir: function(el) {
    var dir = ['left', 'right', 'top', 'bottom'];
    var num = Math.floor(Math.random() * 4);
    $(el).addClass(dir[num]);
  },

  // Prevent Backbone zombie views from forming: http://goo.gl/OJEqsr
  kill: function(view, route) {
    if(view.typer) document.body.dispatchEvent(new CustomEvent('killTyper'));
    if(App.demoView) App.demoView = '';
    view.remove(); // Remove the view from the DOM.
    view.undelegateEvents(); // Unbind the view's delegated events.
    App.router.navigate(route ? route : ''); // Update the router to reflect a given route or the home page.
  }
};
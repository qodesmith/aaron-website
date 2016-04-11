// HANDLEBARS HELPERS
Handlebars.registerHelper('lowerCase', function(input) {
  return input.toLowerCase();
});

// This will only ever run once. We're checking the url in the
// browser to see if the user is coming from a page served by
// the server (as oppsed to having navigated via clicking, etc.).
// If so, then determine what view to render.
App.checkUrl();

App.router = new App.Router();
Backbone.history.start({pushState: true});
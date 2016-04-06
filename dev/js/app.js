// HANDLEBARS HELPERS
Handlebars.registerHelper('lowerCase', function(input) {
  return input.toLowerCase();
});

App.router = new App.Router();
Backbone.history.start();
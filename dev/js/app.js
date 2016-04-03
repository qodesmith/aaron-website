// Add a random class to the views to trigger
// different transition-in directions each time.
App.randomDir = function(el) {
  var dir = ['left', 'right', 'top', 'bottom'];
  var num = Math.floor(Math.random() * 4);
  $(el).addClass(dir[num]);
}

// HANDLEBARS HELPERS
Handlebars.registerHelper('lowerCase', function(input) {
  return input.toLowerCase();
});

// var loc = window.location.href;
// console.log('loc1:', loc);
// loc = loc.substr(-4) === '.com' || loc.substr(-5) === '.com/' || loc.substr(-5) === '9001/';
// console.log('loc2', loc);
// loc ? App.jsonMenu = new App.Views.JSONMenuView() : App.jsonMenu = new App.Views.HomePageView();

// if(window.location.href.indexOf('test') > -1) App.jsonMenu = new App.Views.HomePageView();

// new App.Router();
// Backbone.history.start();

App.jsonMenu = new App.Views.JSONMenuView();
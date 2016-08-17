var $body = $('body');
var bgs = ['code', 'hadron', 'space-quest', 'hq1', 'doom', 'contra'];
var num;
var posts;
var taggedPosts;
var router;


////////////////////////////
// APP-WIDE FUNCTIONALITY //
////////////////////////////

app.randomNum = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Returns the current breakpoint based on pre-defined sizes.
app.breakPoint = function() {
  var width = window.innerWidth;

  if (width < 768) return 'MOBILE';
  if (width < 1024) return 'TABLET';
  return 'DESKTOP';
};

// All views except home & navigation will check if the
// navigation view has been created prior to rendering themselves.
app.checkNav = function(view) {
  if (!views.NavigationView) {
    views.NavigationView = new app.NavigationView(view);
  }
};

// Most views' render function will be this.
app.typicalRender = function(view) {
  $body.append(view.$el);

  setTimeout(function() {
    view.$el.addClass('show');
  }, 10);
};

// http://goo.gl/Q3cesP
app.randomizeArray = function(array) {
  var len = array.length;

  for (var j = 0; j < len; j++) {
    var random = Math.floor(Math.random() * len);
    var original = array[random];
    var current = array[j];

    array[j] = original;
    array[random] = current;
  }

  return array;
};


////////////////////////
// HANDLEBARS HELPERS //
////////////////////////

Handlebars.registerHelper('date', function(dateNumber) {
  return dateConversion(new Date(dateNumber));
});

Handlebars.registerHelper('tagList', function(tagsArray) {
  var tags = tagsArray.map(function(tag) {
    return [
      '<a href="#">',
      tag,
      '</a>'
    ].join('');
  });

  return tags.join(', ');
});


//////////
// MISC //
//////////

// Override the 'remove' method on ALL views.
Backbone.View.prototype.remove = function(original) {
  if (original) {
    this._removeElement();
    this.stopListening();
    return;
  }

  this.el.style.opacity = 0;

  setTimeout(function() {
    // The original 'remove' fxn did these two things.
    this._removeElement();
    this.stopListening();
  }.bind(this), 500);
};

// Prevent the 'backspace/delete' key default
// behavior on the calculator page.
$body.on('keydown', function(e) {
  if (e.which === 8 && views.currentView && views.currentView.calculator) {
    e.preventDefault();
  }
});

// Log errors to the database.
window.onerror = function(msg, file, line, col, error) {
  var data = {
    message: msg,
    file: file,
    url: window.location.href,
    line: line,
    col: col,
    error: error,
    stack: error.stack
  };

  $.post('/error-logs', data)
    .fail(function() {
      // Try a 2nd time.
      $.post('/error-logs', data);
    });

  // 'true' = don't display errors in the console.
  // 'false' = display errors in the console.
  return false;
};


///////////////////
// BEGIN THE APP //
///////////////////

num = app.randomNum(0, bgs.length - 1);
$body.addClass(bgs[num]);
posts = new app.PostsCollection();
taggedPosts = new app.PostsCollection();
router = new app.Router();
Backbone.history.start({pushState: true});

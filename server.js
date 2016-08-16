if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load(); // Always on top.
}

// Express things.
var express = require('express');
var compression = require('compression');
var bp = require('body-parser');
var helmet = require('helmet'); // http://goo.gl/LBmJXK
var favicon = require('serve-favicon');

// Mongodb.
var MongoClient = require('mongodb').MongoClient;
var session = require('express-session');
var MongoStore  = require('connect-mongodb-session')(require('express-session'));
var assert = require('assert');

// General / other.
var path = require('path');
var fs = require('fs');
var bcrypt = require('bcrypt');
var mailgun = require('mailgun-js')({
  apiKey: process.env.mailgun_api_key,
  domain: process.env.mailgun_domain
});

var app = express();
var store = new MongoStore({
  uri: process.env.mongoURI,
  collection: process.env.mongoSession
});

// Catch errors
store.on('error', function(error) {
  assert.ifError(error);
  assert.ok(false);
});

// TODO: implement no-leeching for fonts with 'express-anti-leech'?
// https://goo.gl/vMJgPk

app.use(helmet());
app.use(compression()); // http://goo.gl/uCh33Z
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bp.urlencoded({extended: false}));
app.use(bp.json()); // http://goo.gl/ixEWAa
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ // in case of 'deprecation error' - http://goo.gl/vgcFih
  name: 'aaroncordova.xyz', // Needed if multiple apps running on same host.
  resave: false, // Forces cookie to be resaved back to the session store even if no changes.
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store.
  secret: process.env.secret, // The secret used to sign the session ID cookie.
  cookie: { maxAge: 3600000 }, // Default = `null` - closing browser removes cookie & session.
  store: store
}));

app.disable('x-powered-by');


///////////////////////
// CUSTOM MIDDLEWARE //
///////////////////////

function adminCheck(req, res, next) {
  if(req.session.admin) {
    next();
  } else {
    res.status(403).send('Dispatching the FBI surveillance van...');
  }
}


// TODO: are these api end-points RESTful?

/////////
// GET //
/////////

// Used internally by the front-end via AJAX.
// Route not included in Backbone router.
app.get('/am-i-logged-in', function(req, res) {
  req.session.admin ? res.send(true) : res.send(false);
});

// Used internally by the front-end via AJAX.
// Route not included in Backbone router.
app.get('/blog-posts', function(req, res) {
  MongoClient.connect(process.env.mongoURI, function(err, db) {
    if (err) {
      res.status(500).send(err);
      return db.close();
    }


    var q = req.query;
    var tag = q.tag;
    var id = q.id;
    var filter = (function() {
      if (tag) return {'tags': {$in: [tag]}};
      if (id) return {'_id': id};
      return {};
    })();
    var limit = (function() {
      if (q.limit === undefined || q.limit === null) return 4;
      return +q.limit;
    })();

    var blogPosts = db.collection('posts').find(filter).sort({createdAt: -1});

    if(q.start) blogPosts.skip(+q.start); // Convert string to a number with '+'.

    blogPosts.limit(limit);
    blogPosts.toArray(function(error, posts) {
      error ? res.status(500).send(error) : res.send(posts);
      db.close();
    });
  });
});

app.get('*', function (req, res) {
  fs.readFile('./public/index.html', 'utf-8', function(err, file) {
    if (err) {
      res.status(500).send('Oops! Try reloading your browser...');
      return;
    }

    res.send(file);
  });
});


//////////
// POST //
//////////

app.post('/login', function(req, res) {
  var email = req.body.email;
  var pw = req.body.password;

  // If we're logged in already, just exit.
  if(req.session.admin) {
    return res.send('Already logged in :)');
  }

  MongoClient.connect(process.env.mongoURI, function(err, db) {
    if (err) {
      res.status(500).send(err);
      return db.close();
    }

    db.collection(process.env.adminCollection)
      .find({email: email})
      .toArray(function(collectionErr, arr) {
        // No document found.
        if (!arr.length || collectionErr) {
          res.status(403).send('Not a chance');
          db.close();

        // Document found.
        } else {
          bcrypt.compare(pw, arr[0].password, function(bcryptErr, result) {

            // Bcrypt error.
            if (bcryptErr) {
              res.status(500).send(bcryptErr);

            // Password match.
            } else if (result) {
              req.session.admin = true;
              res.send('logged in!');

            // Wrong password.
            } else {
              res.status(403).send('Not a chance.');
            }

            db.close();
          });
        }
      });
  });
});

app.post('/logout', function(req, res) {
  delete req.session.admin;
  res.send(true);
});

app.post('/create-post', adminCheck, function(req, res) {

  // Hyphenize the title.
  // Example: 'News: Hello World!' => 'news-hello-world'
  function titleToRoute(name) {
    // Regex: alphanumeric & spaces only.
    var regx = /[^A-Za-z0-9 ]/; // http://goo.gl/OAoHr0

    var route = name
      .split('')
      .map(function(char) {
        if(char === ' ' || char === '-' || char === '_') {
          return '-';
        } else if(!regx.test(char)) {
          return char;
        }
      })
      .join('')
      .toLowerCase();

    // Remove trailing '-'.
    if (route[route.length - 1] === '-') route = route.slice(0, -1);

    return route;
  }

  // Removes redundant spaces and converts to title-case.
  // Example: 'hElLo    wOrLd' => 'Hello World'
  function sanitizeTitle(title) {
    return title
      .split(' ')
      .filter(function(word) {
        return !(word === '');
      })
      .map(function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }

  var body = req.body;
  var sanitizedTitle;

  // Must have all fields, otherwise send error.
  if (!body.title || !body.tags || !body.image || !body.content) {
    // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    return res.status(400).send('Fields cannot be empty.');
  }

  sanitizedTitle = sanitizeTitle(body.title);

  MongoClient.connect(process.env.mongoURI, function(err, db) {
    if (err) {
      res.status(500).send(err);
      return db.close();
    }

    // The '_id' field is has an enforced unique rule in mongodb.
    // This will prevent duplicate posts from being created.
    var post = {
      _id: titleToRoute(sanitizedTitle),
      createdAt: Date.now(),
      title: sanitizedTitle,
      image: body.image,
      content: body.content,
      tags: body.tags
    };

    db.collection('posts').insert(post, function(error, success) {
      error ? res.status(500).send(error) : res.send(success);
      db.close();
    });
  });
});

app.post('/contact', function(req, res) {
  var name = req.body.name;
  var who  = req.body.email;
  var msg  = req.body.message;
  var data = {
    from: name + ' <' + who + '>',
    to: process.env.email,
    subject: 'website inquiry',
    text: msg
  };

  // TODO: use production 'mailgun_domain' in the `.env` file.
  mailgun.messages().send(data, function (error, body) {
    error ? res.status(500).send(error) : res.send(true);
  });
});

app.post('/error-logs', function(req, res) {
  MongoClient.connect(process.env.mongoURI, function(err, db) {
    if (err) {
      res.status(500).send(err);
      return db.close();
    }

    req.body.ip = req.ip;
    req.body.headers = req.headers;
    req.body.date = Date.now();

    db.collection('error-logs').insert(req.body, function(error, success) {
      error ? res.status(500).send(error) : res.send(true);
      db.close();
    });
  });
});


///////////
// PATCH //
///////////

app.patch('/blog-posts/:_id', adminCheck, function(req, res) {
  // TODO: update post in database.
  MongoClient.connect(process.env.mongoURI, function(err, db) {
    if (err) {
      res.status(500).send(err);
      return db.close();
    }

    db.collection('posts')
      .updateOne(req.params, {$set: req.body}, function(error, results) {
        error ? res.status(500).send(error) : res.send(results);
        db.close();
      });
  });
});


////////////
// DELETE //
////////////

app.delete('/blog-posts/:_id', adminCheck, function(req, res) {
  MongoClient.connect(process.env.mongoURI, function(err, db) {
    if (err) {
      res.status(500).send(err);
      return db.close();
    }

    db.collection('posts')
      .remove(req.params, function(error, results) {
        error ? res.status(500).send(error) : res.send(results);
        db.close();
      });
  });
});


/*****************************************************/
/*****************************************************/
/*****************************************************/


app.listen(process.env.PORT, function() {
  console.log('Listening on port ' + process.env.PORT);
});
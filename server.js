var dotenv  = require('dotenv').load();
var express = require('express');
var bp      = require('body-parser');
var path    = require('path');
var mailgun = require('mailgun-js')({
  apiKey: process.env.mailgun_api_key,
  domain: process.env.mailgun_domain
});

var app = express();

app.use(bp.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

// Send the JavaScript & styles. Let the front-end worry about what to render.
var meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
var styles = '<link rel="stylesheet" href="/styles.css">';
var scripts = '<script src="/all.min.js"></script>';
var homepage = meta + '<body class="sans full-size">' + styles + scripts + '</body>';

// app.get('/about', function(req, res) {
//   console.log(req.url + ' route');
//   res.send(homepage);
// });

// app.get('/projects', function(req, res) {
//   console.log(req.url + ' route');
//   res.send(homepage);
// });

// app.get('/projects/:id', function(req, res) {
//   console.log(req.url + ' route');
//   res.send(homepage);
// });

// app.get('/regular-resume', function(req, res) {
//   console.log(req.url + ' route');
//   res.send(homepage);
// });

// app.get('/nerdy-resume', function(req, res) {
//   console.log(req.url + ' route');
//   res.send(homepage);
// });

// app.get('/contact', function(req, res) {
//   console.log(req.url + ' route');
//   res.send(homepage);
// });

app.get('*', function(req, res) {
  console.log('Catch all route');
  res.send(homepage);
});

app.post('/contact', function(req, res) {
  console.log(req.body);
  var name = req.body.name;
  var who = req.body.email;
  var msg = req.body.message;

  var data = {
    from: name + ' <' + who + '>',
    to: process.env.email,
    subject: 'website inquiry',
    text: msg
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if(error) console.log(error);
  });

  res.send(true);
});

/***************************************************************/

app.listen(process.env.PORT || 9001, '0.0.0.0', function() {
  console.log('Listening on port ' + (process.env.PORT || 9001));
});
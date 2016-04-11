var dotenv  = require('dotenv').load();
var express = require('express');
var bp      = require('body-parser');
var mailgun = require('mailgun-js')({
  apiKey: process.env.mailgun_api_key,
  domain: process.env.mailgun_domain
});

var app = express();

app.use(bp.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));


////////////////
// GET routes //
////////////////

app.get('*', function(req, res) {
  console.log('catch-all route hit');
  // Build a set of '../' according to the route requested.
  var path = '';
  var num = req.params[0].split('/').length - 2;
  for(var i = 0; i < num; i++) {
    path += '../';
  }

  // Send the JavaScript & styles. Let the front-end worry about what to render.
  var styles = '<link rel="stylesheet" href="' + path + 'styles.css">';
  var scripts = '<script src="' + path + 'all.min.js"></script>';
  var homepage = '<body class="sans full-size">' + styles + scripts + '</body>';
  res.send(homepage);
});

// app.get(/(about|projects|nerdy-resume|regular-resume)/, function(req, res) {
//   console.log('multi-route was hit!');
//   res.send(homepage);
// });


/////////////////
// POST routes //
/////////////////

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

app.listen(process.env.PORT || 9001, '0.0.0.0', function() {
  console.log('Listening on port ' + (process.env.PORT || 9001));
});
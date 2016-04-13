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

function sendData(req) {
  // Build a set of '../' according to the route requested.
  var path = '';
  var num = req.url.split('/').length - 2;
  for(var i = 0; i < num; i++) {
    path += '../';
  }

  // Send the JavaScript & styles. Let the front-end worry about what to render.
  var meta = '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  var styles = '<link rel="stylesheet" href="' + path + 'styles.css">';
  var scripts = '<script src="' + path + 'all.min.js"></script>';
  var homepage = meta + '<body class="sans full-size">' + styles + scripts + '</body>';

  return homepage;
}


// app.get('(/about|/projects|/regular-resume|/nerdy-resume|/contact)', function(req, res) {
//   console.log('multi-options route hit');
//   res.send(sendData(req));
// });

// app.get('/projects/:id', function(req, res) {
//   console.log('projects/:id route hit');
//   res.send(sendData(req));
// });

// var num = 0;
// app.get('*', function(req, res) {
//   console.log('catch-all route hit');
//   console.log(req.url);
//   // console.log(req.params);
//   // var homepage = sendData(req);
//   // res.send(homepage);
//   res.send(num.toString());
//   num++;
// });

app.get('*', function(req, res) {
  console.log("Catch all 'get' route");
  res.send(sendData(req));
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
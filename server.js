var dotenv  = require('dotenv').load();
var express = require('express');
var bp      = require('body-parser');
var mailgun = require('mailgun-js')({
  apiKey: process.env.mailgun_api_key,
  domain: process.env.mailgun_domain
});

var app = express();

app.use(bp.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public', {extensions: false}));

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

app.all('*', function(req, res) {
  // res.send('catch-all route hit!');
  res.send('');
});

app.listen(process.env.PORT || 9001, '0.0.0.0', function() {
  console.log('Listening on port ' + (process.env.PORT || 9001));
});
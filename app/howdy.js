require('when-dom-ready');

const express       = require('express');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash         = require('connect-flash');
const fs            = require('fs');
const https         = require('https');
const http          = require('http');
const node_port     = 1701;

// Include Authentication Strategies
require('./config/passport/passport');

var app = express();


// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');


app.set('view engine', 'jade');
app.set('views', './app/views');
app.use(express.static('./app/public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'n0d3castz secret cat key', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res,next) {
    if(req.headers["x-forwarded-proto"] == "http") {
        res.redirect("https://localhost" + req.url);
    } else {
        return next();
    }
});

// Include all Routes
require('./config/routes/routes')(app);

// Change port if you'd like here
//const server = app.listen(node_port, function () {
//  const port = server.address().port;
//  console.log('Listening at http://localhost:%s', port);
//});

var sslOptions = {
  key: fs.readFileSync('./app/ssl/key.pem'),
  cert: fs.readFileSync('./app/ssl/cert.pem'),
  passphrase: 'datadata'
};

var net=require('net');
var handle=net.createServer().listen(8000);

https.createServer(sslOptions, app).listen(handle);

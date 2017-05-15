require('when-dom-ready');

const express       = require('express');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash         = require('connect-flash');
const fs            = require('fs');
const jade          = require('jade');
const multipart     = require('multipart');
const node_port     = 8000;
const chat_port     = 42000;

// Include Authentication Strategies
require('./config/passport/passport');

var app = express();
const http = require('http').Server(app);
const https = require('https');
const io = require('socket.io')(http);

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

app.locals.saveChanges = function(req, res) {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  alert(username);
  alert(email);
}

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
var handle=net.createServer().listen(node_port);

https.createServer(sslOptions, app).listen(handle);

// Socket.io stuff
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message: ', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(chat_port, function(){
  console.log('http chat server listening on *:' + chat_port);
});

const express       = require('express');
const express_session = require('express-session');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash         = require('connect-flash');
const fs            = require('fs');
const jade          = require('jade');
const bodyparser    = require('body-parser');
const path          = require('path');
const node_port     = 8000;
const config        = require('./config.json');
const log           = require('log');
// Include Authentication Strategies
require('./config/passport/passport');
const connection    = require('./config/connection.js');
const mysql = require('mysql');

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

const axios = require('axios');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static('./app/public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(require('express-session')({ secret: 'n0d3castz secret cat key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Include all Routes
require('./config/routes/routes')(app);


// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });

    var connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Lacsap',
      database: 'HowdyDB'
    });

    var post  = {
      username: socket.username,
      message: data
    };

    console.log(post);

    if(post.username) {
      connection.query('INSERT INTO messages SET ?', post, function (error, results, fields) {
        if (error) throw error;
      });
    }

  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

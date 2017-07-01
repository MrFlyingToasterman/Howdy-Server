const express       = require('express');
const express_session = require('express-session');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash         = require('connect-flash');
const fs            = require('fs');
const jade          = require('jade');
const bodyparser    = require('body-parser');
const path          = require('path');
const config        = require('./config.json');
const log           = require('log');
// Include Authentication Strategies
require('./config/passport/passport');
const connection    = require('./config/connection.js');
const mysql = require('mysql');

var app = express();
const port = 3000;

var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(require('express-session')({ secret: 'n0d3castz secret cat key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Include all Routes
require('./config/routes/routes')(app);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var write2DB = function(username, message) {

  connection.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            var post = {username: username, message: message};

            connection.query('INSERT INTO messages SET ?', post, function (error, results, fields) {
                 // And done with the connection.
                 connection.release();

                 // Handle error after the release.
                 if (error) throw error;
               });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
}

var readFromDB = function() {

    var results;

    connection.getConnection(function (err, connection) {

        if(err) {
          connection.release();
          callback(null, err);
          throw err;
        }

        connection.query('SELECT * FROM messages', function (error, results, fields) {

            console.log(results);
            this.results = results;

            if (error) throw error;
        })

    });

    return results;

}


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

    write2DB(socket.username,data);

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


    //readFromDB();


    socket.broadcast.emit('new message', {
       username: 'Server',
       message: 'Willkommen Nutzer ' + socket.username
    });

    socket.to(socket.username).emit('new message', {
      username: 'testnutzer',
      message: 'testnachricht'
    })


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

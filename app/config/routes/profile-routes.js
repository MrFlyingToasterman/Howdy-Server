module.exports = function(app) {
/**
 * Display Profile
**/
app.get('/profile', function(req, res) {
  if(req.user) {
    res.render('profile', {
      title: 'Profile',
      message: 'Profile',
      userName: (req.user) ? req.user.username : undefined,
      email: (req.user) ? req.user.email : undefined,
      password: (req.user) ? req.user.password : undefined
    });
  }
  else {
    res.redirect('/');
    flashMessage: req.flash('not logged in.');
  }
});

app.get('/saveProfile', function(req, res) {
  if(req.user) {
    userName = req.user.userName;
    email = req.user.email;
    password = req.user.password;
    sql_stmt = "SELECT * FROM users";
    var values = [userName, password, email];
    sql_stmt = mysql.format(sql_stmt, values);
    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Updated username with id ' + id);
    })

    sql_stmt = "UPDATE users SET username = ?,email = ?,password = ? WHERE id = ?";
    var values = [userName, password, email];
    sql_stmt = mysql.format(sql_stmt, values);
    connection.query(sql_stmt, function (error, result) {
        if (error) {
            console.log('The following error occured while trying to insert a new record ' + error.message);
        }
        console.log();
        console.log('Updated username with id ' + id);
    })

    res.redirect('/profile');
  }
});

}

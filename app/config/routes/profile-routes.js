module.exports = function(app) {
/**
 * Display Profile
**/
app.get('/profile', function(req, res) {
      res.render('profile', {
      title: 'Profile',
      message: 'Profile',
      userName: (req.user) ? req.user.username : undefined,
      email: (req.user) ? req.user.email : undefined,
      password: (req.user) ? req.user.password : undefined
    });
  });

app.get('/saveProfile', function(req, res) {
  
});

}

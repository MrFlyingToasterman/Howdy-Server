module.exports = function(app) {
/**
 * Display Chat
**/
app.get('/chat', function(req, res) {
      res.render('chat', {
      title: 'Chat',
      message: 'Chat',
      userName: (req.user) ? req.user.username : undefined,
      email: (req.email) ? req.user.email : undefined
    });
  });
}

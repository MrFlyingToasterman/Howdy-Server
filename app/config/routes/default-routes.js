module.exports = function(app) {
  /**
   * Display Home Page
  **/
  app.get('/', function(req, res) {
    res.render('index', {
      title: 'Howdy',
      message: 'Howdy is a simple, modern and secure web based messenger',
      userName: (req.user) ? req.user.username : undefined,
      flashMessage: req.flash('flashMessage')
    });
  });

}

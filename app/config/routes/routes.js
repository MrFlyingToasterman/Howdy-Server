module.exports = function(app) {
  // All default routes
  require('./default-routes')(app);

  // All signup / signin routes
  require('./signup-routes')(app);

  // include chat routes
  require('./chat-routes')(app);

  // include profile routes
  require('./profile-routes')(app);
}

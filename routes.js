/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var controllers = require('./controllers'),
    homeContriller = controllers.Home,
    userContriller = controllers.User


module.exports = function (app) {
  // home page
  app.get('/', homeContriller.home);

  app.get('/reg', userContriller.reg);

  app.post('/reg', userContriller.reg_post);

  app.get('/login', userContriller.login);

  app.post('/login', userContriller.login_post);

  app.get('/active_account', userContriller.active_account);

};

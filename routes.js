/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var controllers = require('./controllers'),
    homeController = controllers.Home,
    userController = controllers.User,
    teamController = controllers.Team,
    ajaxServicesController = controllers.AjaxServices;


module.exports = function (app) {
  // home page
  app.get('/', homeController.home);

  app.get('/reg', userController.reg);

  app.post('/reg', userController.reg_post);

  app.get('/login', userController.login);

  app.post('/login', userController.login_post);

  app.get('/active_account', userController.active_account);

  app.get('/showteam/:tid', teamController.index);

  app.get('/team/create', teamController.create);

  app.get('/team/list', teamController.list);

  app.post('/team/create', teamController.create_post);

  app.post('/ajaxservices/upload', ajaxServicesController.upload);

  app.post('/ajaxservices/remove', ajaxServicesController.remove);

};


/*
 * GET users listing.
 */


var check = require('validator').check,
    sanitize = require('validator').sanitize,
    viewmodels = require('../viewmodels'),
    config = require('../config').config,
    userRegisterModel = viewmodels.userRegisterModel,
    userLoginModel = viewmodels.userLoginModel,
    services = require('../services'),
    crypto = require('crypto'),
    User = require('../context').User,
    SITE_ROOT_URL = 'http://' + config.host + (config.port !== 80 ? ':' + config.port : '');

exports.reg = function (req, res) {
  res.render('user/reg', { title: '用户注册', model: userRegisterModel });
};

exports.reg_post = function (req, res, next) {
  var status = services.getModels(req, userRegisterModel);
  if (status.error.length > 0) {
    req.flash('error', status.error);
    return res.redirect('/reg');
  }
  var model = status.model;
  User.getUsersByQuery({ '$or': [{ 'loginname': model.username }, { 'email': model.email }] }, {}, function (err, users) {
    if (err) {
      return next(err);
    }
    if (users.length > 0) {
      req.flash('error', '用户名或邮箱已被使用。');
      return res.redirect('/reg');
    }
    var pass = services.md5(model.password);
    var avatar_url = 'http://www.gravatar.com/avatar/' + services.md5(model.email.toLowerCase()) + '?size=48';
    User.newAndSave(model.username, model.username, pass, model.email, avatar_url, false, function (err) {
      if (err) {
        return next(err);
      }
      services.sendActiveMail(model.email, services.md5(model.email + config.session_secret), model.username);
      req.flash('success', '注册成功');
      return res.redirect('/reg');
    });
  });
};


exports.login = function (req, res) {
  res.render('user/login', { title: '用户登录', model: userLoginModel });
};

exports.login_post = function (req, res, next) {

  var status = services.getModels(req, userLoginModel);

  if (status.error.length > 0) {
    req.flash('error', status.error);
    return res.redirect('/login');
  }
  var model = status.model;

  User.getUserByMail(model.email, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', '这个用户不存在。');
      return res.redirect('/login');
    }
    var pass = services.md5(model.password);
    if (pass !== user.pass) {
      req.flash('error', '密码错误。');
      return res.redirect('/login');
    }
    if (!user.active) {
      // 从新发送激活邮件
      services.sendActiveMail(user.email, services.md5(user.email + config.session_secret), user.name, user.email);
      req.flash('error', '此帐号还没有被激活，激活链接已发送到 ' + user.email + ' 邮箱，请查收。');
      return res.redirect('/login');
    }
    // store session cookie
    services.gen_session(user, res);
    //check at some page just jump to home page
    //var refer = req.session._loginReferer || 'home';
    //for (var i = 0, len = notJump.length; i !== len; ++i) {
    //  if (refer.indexOf(notJump[i]) >= 0) {
    //    refer = 'home';
    //    break;
    //  }
    //}
    req.flash('success', '登陆成功。');
    res.redirect('/login');
  });
};

exports.active_account = function (req, res, next) {

  var key = req.query.key;

  var name = req.query.name;

  User.getUserByName(name, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user || services.md5(user.email + config.session_secret) !== key) {
      return res.send('<script>alert("信息有误，帐号无法被激活。");window.top.location.href="' + SITE_ROOT_URL + '"</script>');
    }
    if (user.active) {
      return res.send('<script>alert("帐号已经是激活状态。");window.top.location.href="' + SITE_ROOT_URL + '"</script>');
    }
    user.active = true;
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      return res.send('<script>alert("帐号已被激活，请登录。");window.top.location.href="' + SITE_ROOT_URL + '"</script>');
    });
  });
};
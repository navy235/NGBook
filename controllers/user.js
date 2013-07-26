
/*
 * GET users listing.
 */


var check = require('validator').check,
    sanitize = require('validator').sanitize,
    viewmodels = require('../viewmodels'),
    userViewModel = viewmodels.userViewModel;

exports.reg = function (req, res) {
  console.log(userViewModel);
  res.render('reg', { title: 'Register Member', model: userViewModel });
};



exports.reg_post = function (req, res, next) {

  //req.onValidationError(function (msg) {
  //  //Redirect the user with error 'msg'
  //});
  //req.checkBody('username', '用户名输入有误').notEmpty().is('^[\\u4e00-\\u9fa5|A-Za-z|0-9|_]+$');
  //req.checkBody('email', '电子邮箱输入有误').notEmpty().isEmail();
  //req.checkBody('password', '密码输入有误').notEmpty().len(6,24);

  //req.onValidationError(function (msg) {
  //  req.flash('error', '信息不完整');
  //  return res.redirect('/reg');
  //});

  //req.flash('success', '注册成功');

  //return res.redirect('/reg');

  var name = sanitize(req.body.username).trim(),
      name = sanitize(name).xss(),
      loginname = name.toLowerCase(),
      pass = sanitize(req.body.password).trim(),
      pass = sanitize(pass).xss(),
      email = sanitize(req.body.email).trim(),
      email = email.toLowerCase(),
      email = sanitize(email).xss(),
      re_pass = sanitize(req.body.password1).trim(),
      re_pass = sanitize(re_pass).xss();

  if (name === '' || pass === '' || re_pass === '' || email === '') {
    req.flash('error', '信息不完整');
    return res.redirect('/reg');
  }

  if (name.length < 5) {
    req.flash('error', '用户名至少需要5个字符');
    return res.redirect('/reg');
  }

  try {
    check(name, '用户名只能使用0-9，a-z，A-Z。').isAlphanumeric();
  } catch (e) {
    req.flash('error', '用户名含有非法字符');
    return res.redirect('/reg');
  }

  if (pass !== re_pass) {
    req.flash('error', '两次密码输入不一致');
    return res.redirect('/reg');
  }

  try {
    check(email, '不正确的电子邮箱。').isEmail();
  } catch (e) {
    req.flash('error', '输入的电子邮箱格式不正确');
    return res.redirect('/reg');
  }

  req.flash('success', '验证全部通过');
  return res.redirect('/reg');

  User.getUsersByQuery({ '$or': [{ 'loginname': loginname }, { 'email': email }] }, {}, function (err, users) {
    if (err) {
      return next(err);
    }
    if (users.length > 0) {
      res.render('sign/signup', { error: '用户名或邮箱已被使用。', name: name, email: email });
      return;
    }

    // md5 the pass
    pass = md5(pass);
    // create gavatar
    var avatar_url = 'http://www.gravatar.com/avatar/' + md5(email.toLowerCase()) + '?size=48';

    User.newAndSave(name, loginname, pass, email, avatar_url, false, function (err) {
      if (err) {
        return next(err);
      }
      // 发送激活邮件
      mail.sendActiveMail(email, md5(email + config.session_secret), name, email);
      res.render('sign/signup', {
        success: '欢迎加入 ' + config.name + '！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
      });
    });
  });
};


exports.login = function (req, res) {
  res.send("respond with a resource");
};
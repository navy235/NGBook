var check = require('validator').check,
    sanitize = require('validator').sanitize,
    crypto = require('crypto'),
    mailer = require('nodemailer'),
    config = require('../config').config,
    transport = mailer.createTransport('SMTP', config.mail_opts),
    SITE_ROOT_URL = 'http://' + config.host + (config.port !== 80 ? ':' + config.port : '');

exports.getModels = function (req, viewmodels) {
  var model = {},
      error = [];
  for (var m in viewmodels) {
    var rule = viewmodels[m],
        input = req.body[m];
    model[m] = sanitize(req.body[m]).trim();
    model[m] = sanitize(model[m]).xss();
    if (rule) {
      if (rule.require) {
        if (input === '') {
          error.push(rule.require);
        }
      }
      if (rule.regularExpression) {
        var reg = new RegExp(rule.regularExpression.regx);
        if (!reg.test(input)) {
          error.push(rule.regularExpression.message);
        }
      }
      if (rule.length) {
        if (input.length < rule.length.range[0] || input.length > rule.length.range[1]) {
          error.push(rule.length.message);
        }
      }
      if (rule.equalto) {
        if (input !== model[rule.equalto.id]) {
          error.push(rule.length.message);
        }
      }
    }
  }
  return {
    model: model,
    error: error
  };
}

exports.md5 = function (str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

/**
 * Send an email
 * @param {Object} data 邮件对象
 */
var sendMail = function (data) {
  if (config.debug) {
    console.log('******************** 在测试环境下，不会真的发送邮件*******************');
    for (var k in data) {
      console.log('%s: %s', k, data[k]);
    }
    return;
  }
  // 遍历邮件数组，发送每一封邮件，如果有发送失败的，就再压入数组，同时触发mailEvent事件
  transport.sendMail(data, function (err) {
    if (err) {
      // 写为日志
      console.log(err);
    }
  });
};

/**
 * 发送激活通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 * @param {String} email 接受人的邮件地址
 */
exports.sendActiveMail = function (who, token, name) {
  var from = config.mail_opts.auth.user;
  var to = who;
  var subject = config.name + '社区帐号激活';
  var html = '<p>您好：<p/>' +
    '<p>我们收到您在' + config.name + '社区的注册信息，请点击下面的链接来激活帐户：</p>' +
    '<a href="' + SITE_ROOT_URL + '/active_account?key=' + token + '&name=' + name + '">激活链接</a>' +
    '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + config.name + '社区 谨上。</p>';

  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

/**
 * 发送密码重置通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 */
exports.sendResetPassMail = function (who, token, name) {
  var from = config.mail_opts.auth.user;
  var to = who;
  var subject = config.name + '社区密码重置';
  var html = '<p>您好：<p/>' +
    '<p>我们收到您在' + config.name + '社区重置密码的请求，请在24小时内单击下面的链接来重置密码：</p>' +
    '<a href="' + SITE_ROOT_URL + '/reset_pass?key=' + token + '&name=' + name + '">重置密码链接</a>' +
    '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
    '<p>' + config.name + '社区 谨上。</p>';

  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

/**
 * 发送回复通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {Object} msg 发送的消息对象
 */
exports.sendReplyMail = function (who, msg) {
  var from = config.mail_opts.auth.user;
  var to = who;
  var subject = config.name + ' 新消息';
  var url = SITE_ROOT_URL + '/topic/' + msg.topic._id + '#' + msg.reply._id;
  var html = '<p>您好：<p/> \
    <p> \
      <a href="' + SITE_ROOT_URL + '/user/' + msg.author.name + '">' + msg.author.name + '</a> \
      在话题 ' + '<a href="' + url + '">' + msg.topic.title + '</a> \
      中回复了你: \
    </p> \
    <hr/> \
    <p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p> \
    <p>' + config.name + '社区 谨上。</p>';

  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

/**
 * 发送at通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {Object} msg 发送的消息对象
 */
exports.sendAtMail = function (who, msg) {
  var from = config.mail_opts.auth.user;
  var to = who;
  var subject = config.name + ' 新消息';
  var url = SITE_ROOT_URL + '/topic/' + msg.topic._id + '#' + msg.reply._id;
  var html = '<p>您好：<p/> \
    <p> \
      <a href="' + SITE_ROOT_URL + '/user/' + msg.author.name + '">' + msg.author.name + '</a> \
      在话题 ' + '<a href="' + url + '">' + msg.topic.title + '</a> \
      中@了你: \
    </p> \
    <hr/> \
    <p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p> \
    <p>' + config.name + '社区 谨上。</p>';

  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};



function encrypt(str, secret) {
  var cipher = crypto.createCipher('aes192', secret);
  var enc = cipher.update(str, 'utf8', 'hex');
  enc += cipher.final('hex');
  return enc;
}

function decrypt(str, secret) {
  var decipher = crypto.createDecipher('aes192', secret);
  var dec = decipher.update(str, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

function gen_session(user, res) {
  var auth_token = encrypt(user._id + '\t' + user.name + '\t' + user.pass + '\t' + user.email, config.session_secret);
  res.cookie(config.auth_cookie_name, auth_token, { path: '/', maxAge: 1000 * 60 * 60 * 24 * 30 }); //cookie 有效期30天
}

function randomString(size) {
  size = size || 6;
  var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var max_num = code_string.length + 1;
  var new_pass = '';
  while (size > 0) {
    new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
    size--;
  }
  return new_pass;
}


exports.gen_session = gen_session;

exports.encrypt = encrypt;

exports.decrypt = decrypt;

exports.randomString = randomString;


var viewmodels = require('../viewmodels'),
    config = require('../config').config,
    teamAddModel = viewmodels.teamAddModel,
    services = require('../services'),
    crypto = require('crypto'),
    Team = require('../context').Team,
    SITE_ROOT_URL = 'http://' + config.host + (config.port !== 80 ? ':' + config.port : '');



exports.list = function (req, res) {
  Team.findAll(function (err, teams) {
    res.render('team/list', { title: '战队列表', teams: teams })
  })
}


exports.index = function (req, res) {
  var tid = req.params.tid;
  if (tid.length !== 24) {
    req.flash('error', '此战队不存在或已被删除!');
    return res.redirect('team/create');
  }
  Team.find(tid, function (err, team) {

    res.render('team/index', { title: team.name, team: team })
  })
}



exports.create = function (req, res) {
  res.render('team/create', { title: '添加战队信息', model: teamAddModel });
};

exports.create_post = function (req, res) {
  var status = services.getModels(req, teamAddModel);
  if (status.error.length > 0) {
    req.flash('error', status.error);
    return res.redirect('team/create');
  }
  var model = status.model;

  Team.create(model, function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', '添加战队成功!');
    return res.redirect('team/create');
  })
};


exports.edit = function (req, res) {
  var tid = req.params.tid;
  if (tid.length !== 24) {
    req.flash('error', '此战队不存在或已被删除!');
    return res.redirect('team/create');
  }
  Team.find(tid, function (err, team) {
    teamAddModel.name.value = team.name;
    teamAddModel.logo_url.value = team.logo_url;
    teamAddModel.description.value = team.description;
    res.render('team/create', { title: '编辑战队信息', model: teamAddModel });
  })

};

exports.create_post = function (req, res) {
  var tid = req.params.tid;
  if (tid.length !== 24) {
    req.flash('error', '此战队不存在或已被删除!');
    return res.redirect('team/create');
  }
  var status = services.getModels(req, teamAddModel);
  if (status.error.length > 0) {
    req.flash('error', status.error);
    return res.redirect('team/edit/' + tid);
  }
  var model = status.model;

  model._id = tid;

  Team.create(model, function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', '添加战队成功!');
    return res.redirect('team/create');
  })
};

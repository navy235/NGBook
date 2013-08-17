
var viewmodels = require('../viewmodels'),
    config = require('../config').config,
    services = require('../services'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    util = require('util'),
    path = require('path'),
    SITE_ROOT_URL = 'http://' + config.host + (config.port !== 80 ? ':' + config.port : '');


exports.upload = function (req, res) {
  var file = req.files.attachments,
      result = {
        err: ''
      },
      upload_maxlength = config.upload_maxlength,
      fName = file.name,
      fSize = file.size,
      fType = file.type,
      fPath = file.path;
  if (fSize > upload_maxlength) {
    result.err = '上传文件大小不能超过' + parseInt(upload_maxlength / 1000, 10) + 'K';
    res.send(result);
  }
  fs.readFile(fPath, function (err, data) {
    var filepath = getImgSaveFolder();
    var newfileName = Date.now() + fName.substr(fName.indexOf('.'));
    var uploadFolder = './public' + filepath;
    mkdirp(uploadFolder, function (err) {
      var newPath = path.resolve('./public' + filepath + newfileName);
      fs.writeFile(newPath, data, function (err) {
        result.imgurl = filepath + newfileName;
        result.status = 'upload';
        res.send(result);
      });
    });
  });
};

exports.remove = function (req, res) {
  var result = {
    err: '',
    status: 'remove'
  };
  //res.send(util.inspect(result));
  res.send(result);
}

function getImgSaveFolder() {
  var basePath = '/uploads/',
      data = new Date();
  var datapath = data.getFullYear() + '/' + (data.getMonth() + 1) + '/' + data.getDate() + '/';
  return basePath + datapath;
}

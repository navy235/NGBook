var userModel = require('./user').model;
var teamModel = require('./team').model;
var sportsmanModel = require('./sportsman').model;
exports.userRegisterModel = userModel.userRegisterModel;
exports.userLoginModel = userModel.userLoginModel;
exports.teamAddModel = teamModel.teamAddModel;
exports.sportsmanAddModel = sportsmanModel.sportsmanAddModel;
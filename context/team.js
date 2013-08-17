var models = require('../models'),
    Team = models.Team,
    viewmodels = require('../viewmodels'),
    teamAddModel = viewmodels.teamAddModel;


exports.create = function (model, callback) {
  var team = new Team();
  team.name = model.name;
  team.description = model.description;
  team.logo_url = model.logo_url;
  team.save(callback);
};


exports.find = function (id, callback) {
  Team.findOne({ _id: id }, callback);
};

exports.findAll = function (callback) {
  Team.find({}, callback);
}
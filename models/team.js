var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../config').config;

var TeamSchema = new Schema({

  name: { type: String, index: true },
  description: { type: String },
  logo_url: { type: String },
  topic_count: { type: Number, default: 0 },
  reply_count: { type: Number, default: 0 },
  follower_count: { type: Number, default: 0 },
  following_count: { type: Number, default: 0 },
  collect_tag_count: { type: Number, default: 0 },
  collect_topic_count: { type: Number, default: 0 },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }

});

mongoose.model('Team', TeamSchema);
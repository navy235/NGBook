var models = require('../models');
var User = models.User;

/**
 * �����û����б�����û��б�
 * Callback:
 * - err, ���ݿ��쳣
 * - users, �û��б�
 * @param {Array} names �û����б�
 * @param {Function} callback �ص�����
 */
exports.getUsersByNames = function (names, callback) {
  if (names.length === 0) {
    return callback(null, []);
  }
  User.find({ name: { $in: names } }, callback);
};

/**
 * ���ݵ�¼�������û�
 * Callback:
 * - err, ���ݿ��쳣
 * - user, �û�
 * @param {String} loginName ��¼��
 * @param {Function} callback �ص�����
 */
exports.getUserByLoginName = function (loginName, callback) {
  User.findOne({ 'loginname': loginName }, callback);
};

/**
 * �����û�ID�������û�
 * Callback:
 * - err, ���ݿ��쳣
 * - user, �û�
 * @param {String} id �û�ID
 * @param {Function} callback �ص�����
 */
exports.getUserById = function (id, callback) {
  User.findOne({ _id: id }, callback);
};

/**
 * �����û����������û�
 * Callback:
 * - err, ���ݿ��쳣
 * - user, �û�
 * @param {String} name �û���
 * @param {Function} callback �ص�����
 */
exports.getUserByName = function (name, callback) {
  User.findOne({ name: name }, callback);
};

/**
 * �������䣬�����û�
 * Callback:
 * - err, ���ݿ��쳣
 * - user, �û�
 * @param {String} email �����ַ
 * @param {Function} callback �ص�����
 */
exports.getUserByMail = function (email, callback) {
  User.findOne({ email: email }, callback);
};

/**
 * �����û�ID�б���ȡһ���û�
 * Callback:
 * - err, ���ݿ��쳣
 * - users, �û��б�
 * @param {Array} ids �û�ID�б�
 * @param {Function} callback �ص�����
 */
exports.getUsersByIds = function (ids, callback) {
  User.find({ '_id': { '$in': ids } }, callback);
};

/**
 * ���ݹؼ��֣���ȡһ���û�
 * Callback:
 * - err, ���ݿ��쳣
 * - users, �û��б�
 * @param {String} query �ؼ���
 * @param {Object} opt ѡ��
 * @param {Function} callback �ص�����
 */
exports.getUsersByQuery = function (query, opt, callback) {
  User.find(query, [], opt, callback);
};

/**
 * ���ݲ�ѯ��������ȡһ���û�
 * Callback:
 * - err, ���ݿ��쳣
 * - user, �û�
 * @param {String} name �û���
 * @param {String} key ������
 * @param {Function} callback �ص�����
 */
exports.getUserByQuery = function (name, key, callback) {
  User.findOne({ name: name, retrieve_key: key }, callback);
};

exports.newAndSave = function (name, loginname, pass, email, avatar_url, active, callback) {
  var user = new User();
  user.name = name;
  user.loginname = loginname;
  user.pass = pass;
  user.email = email;
  user.avatar = avatar_url;
  user.active = false;
  user.save(callback);
};


var model = {};

model.sportsmanAddModel = {
  name: {
    name: 'name',
    display: '选手名称',
    require: '请输入选手名称',
    type: 'text',
    length: {
      range: [6, 14],
      message: '选手名称长度位于6~14位之间'
    }
  },
  description: {
    name: 'description',
    display: '选手简介',
    datatype: 'richtext',
    require: '请输入选手简介'
  },
  logo_url: {
    name: 'avtar_url',
    display: '选手头像',
    datatype: 'upload',
    require: '请上传选手头像'
  }
};
exports.model = model;

var model = {};

model.teamAddModel = {
  name: {
    name: 'name',
    display: '战队名称',
    require: '请输入战队名称',
    type: 'text',
    length: {
      range: [6, 24],
      message: '战队名称长度位于6~24位之间'
    }
  },
  description: {
    name: 'description',
    display: '战队简介',
    datatype: 'richtext',
    require: '请输入战队简介'
  },
  logo_url: {
    name: 'logo_url',
    display: '战队logo',
    datatype: 'upload',
    require: '请上传战队logo'
  }
};
exports.model = model;

var model = {};

model.userRegisterModel = {
  username: {
    name: 'username',
    display: '用户名',
    require: '请输入用户名',
    regularExpression: {
      regx: '^[\\u4e00-\\u9fa5|A-Za-z|0-9|_]+$',
      message: '用户名含有非法字符'
    },
    type: 'text',
    length: {
      range: [6, 14],
      message: '用户长度位于6~14位之间'
    },
    //remote: {
    //  url: 'ajax/check_user_name',
    //  message: '该用户名已经被注册'
    //},
    hintlabel: '请输入4-14位昵称，英文、数字或中文均可（中文占2个字符）。'
  },
  email: {
    name: 'email',
    display: '电子邮箱',
    type: 'text',
    require: '请输入电子邮箱',
    length: {
      range: [6, 24],
      message: '邮箱地址长度位于6~24位之间'
    },
    regularExpression: {
      regx: '^[0-9a-z_][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$',
      message: '输入的电子邮箱格式不正确.'
    }
    //remote: {
    //  url: 'ajax/check_user_email',
    //  message: '该邮箱已经被注册'
    //}
  },
  password: {
    name: 'password',
    display: '密码',
    type: 'password',
    require: '请输入密码',
    length: {
      range: [6, 24],
      message: '密码长度位于6~24位之间'
    },
  },
  password1: {
    name: 'password1',
    display: '确认密码',
    require: '请确认密码',
    equalto: {
      id: 'password',
      message: '两次密码不一致'
    },
    type: 'password',
    length: {
      range: [6, 24],
      message: '密码长度位于6~24位之间'
    },
  }
};

model.userLoginModel = {
  email: {
    name: 'email',
    display: '电子邮箱',
    type: 'text',
    require: '请输入电子邮箱',
    length: {
      range: [6, 24],
      message: '邮箱地址长度位于6~24位之间'
    },
    regularExpression: {
      regx: '^[0-9a-z_][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}\.){1,4}[a-z]{2,4}$',
      message: '输入的电子邮箱格式不正确.'
    }
    //remote: {
    //  url: 'ajax/check_user_email',
    //  message: '该邮箱已经被注册'
    //}
  },
  password: {
    name: 'password',
    display: '密码',
    type: 'password',
    require: '请输入密码',
    length: {
      range: [6, 24],
      message: '密码长度位于6~24位之间'
    },
  },
};

exports.model = model;
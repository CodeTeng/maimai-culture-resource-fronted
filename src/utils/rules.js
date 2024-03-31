// 表单校验
const mobileRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' }
]

const usernameRules = [
  { required: true, message: '请输入用户账号' },
  { pattern: /^\w{4,32}$/, message: '用户账号需4-32个字符' }
]

const userPasswordRules = [
  { required: true, message: '请输入密码' },
  { pattern: /^\w{6,32}$/, message: '密码需6-32个字符' }
]

const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码6个数字' }
]

const nameRules = [
  { required: true, message: '请输入姓名' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文2-16个字符' }
]

const idCardRules = [
  { required: true, message: '请输入身份证号' },
  {
    pattern:
      /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '身份证号不正确'
  }
]

const replyRules = [
  { required: true, message: '请输入评论内容' }
]

export {
  mobileRules,
  usernameRules,
  userPasswordRules,
  codeRules,
  nameRules,
  idCardRules,
  replyRules
}

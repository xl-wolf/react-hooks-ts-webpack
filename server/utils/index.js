const fs = require('fs')
// 手机正则校验
const checkPhoneRegExp = (phoneNumber) => {
  const phoneRegExp = /^1[3456789]\d{9}$/;
  return !phoneRegExp.test(phoneNumber);
};
const isExistsDirOrFile = path => {
  return fs.existsSync(path)
}
module.exports = { checkPhoneRegExp, isExistsDirOrFile };

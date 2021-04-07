const router = require("express").Router();
const fs = require('fs')
const path = require('path')
const bodyParser = require("body-parser");
const { isExistsDirOrFile, checkPhoneRegExp } = require("../../utils/index");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
const localUserJsonPath = path.join(__dirname, '../../localdb/user.json')
let currentUserList = []
const createUserJson = () => { !isExistsDirOrFile(localUserJsonPath) && writeUserJsonFile(currentUserList) }
const writeUserJsonFile = (content) => { fs.writeFileSync(localUserJsonPath, JSON.stringify(content, null, 2), 'utf8') }
// 注册
router.post("/user/register", (req, res) => {
  // console.log(req)
  createUserJson()
  const { userName, password } = req.query;
  if (!userName || !password) { return res.json({ status: "400", msg: "用户名和密码不能为空" }); }
  if (checkPhoneRegExp(userName)) { return res.json({ status: "400", msg: "手机格式不正确" }); }
  if (currentUserList.some((currentUserItem) => { return userName === currentUserItem.userName })) {
    return res.status(400).send({ msg: "用户名已存在" })
  }
  currentUserList.push({ id: currentUserList.length + 1, userName, password })
  writeUserJsonFile(currentUserList)
  res.status(200).send({ status: 200, msg: "注册成功" });
});

// 登录
router.get("/user/login", (req, res) => {
  // console.log("req.body", req);
  currentUserList = isExistsDirOrFile(localUserJsonPath) ? require(localUserJsonPath) : []
  const { userName, password } = req.query;
  if (!currentUserList.length) { return res.status(202).send({ status: 202, msg: "已转注册接口" }) }
  if (currentUserList.some(item => (item.userName === userName && item.password === password))) {
    res.status(200).send({ status: 200, msg: "登录成功" })
  } else {
    if (currentUserList.every(item => (item.userName !== userName))) {
      return res.status(203).send({ status: 203, msg: "已转注册接口" })
    }
    res.status(400).send({ status: 400, msg: "用户名或密码错误" })
  }
})

// 登出
router.post("/user/logout", (req, res) => {
  res.status(200).send({ status: 200, msg: "登出成功" })
});

module.exports = router;

const router = require("express").Router();
const bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')
const { isExistsDirOrFile } = require("../../utils/index");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// 
const localMenuAuthJsonPath = path.join(__dirname,'../../localdb/menuAuth.json')
const writeMenuAuthJsonFile = (content) => { fs.writeFileSync(localMenuAuthJsonPath, JSON.stringify(content, null, 2), 'utf8') }

router.get("/menu", (req, res) => {
  // console.log(req.query)
  const menuAuth = require(localMenuAuthJsonPath)
  res.status(200).send({ status: 200, msg: "获取菜单成功", data: menuAuth });
});

router.put("/menu/:key", (req, res) => {
  const {key} = req.params
  const menuAuth = require(localMenuAuthJsonPath)
  menuAuth[key] = !menuAuth[key]
  isExistsDirOrFile(localMenuAuthJsonPath)&&writeMenuAuthJsonFile(menuAuth)
  res.status(200).send({ status: 200, msg: "修改权限成功", data: menuAuth[key] });
});

module.exports = router;

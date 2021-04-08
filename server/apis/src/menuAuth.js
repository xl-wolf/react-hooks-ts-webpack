const router = require("express").Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
// 
router.get("/menu", (req, res) => {
  // console.log(req.query)
  const menuAuth = require('../../localdb/menuAuth.json')
  res.status(200).send({ status: 200, msg: "获取菜单成功", data: menuAuth });
});

module.exports = router;

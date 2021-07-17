const app = require("express")();
const router = require("./apis/index");
const path = require('path')
const fs = require('fs')
const cors = require("cors")();
const requestInterceptor = require("./middlewares/requestInterceptor");
const { isExistsDirOrFile } = require('./utils/index')
const localdbPath = path.join(__dirname, './localdb')
const createlocaldbDir = () => { !isExistsDirOrFile(localdbPath) && fs.mkdirSync(localdbPath) }

app.use(cors);
// 自定义中间件
app.use(requestInterceptor(createlocaldbDir))
app.use("", router);

app.listen(6066, () => { console.log("服务已经开启，运行端口6066") });

const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

const relativeRoot = "src";
const root = path.join(__dirname, relativeRoot);

readDirSync(root);

/***
 * 递归读取scr文件夹以及src子文件夹下的.js文件
 */
function readDirSync(filePath) {
  const pathList = fs.readdirSync(filePath);
  pathList.forEach((fileType, index) => {
    const info = fs.statSync(filePath + "/" + fileType);
    if (info.isDirectory()) {
      const NewFilePath = filePath + "/" + fileType;
      readDirSync(NewFilePath);
    } else {
      if (path.extname(fileType) === ".js") {
        router.use("/", require(filePath + `/${fileType}`));
      }
    }
  });
}

module.exports = router;

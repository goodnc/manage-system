// 引入mongoose第三方模块
import mongoose from "mongoose";
import config from "config";

// console.log("config", config.get("db"));
// 连接数据库
export function openConnectDb() {
  const url = `mongodb://${config.get("db.user")}:${config.get("db.pwd")}@${config.get("db.host")}:${config.get("db.port")}/${config.get("db.name")}`;
  mongoose
    .connect(url)
    .then(() => {
      console.log("数据库连接成功");
    })
    .catch((err) => {
      console.error("数据库连接失败", err);
    });
}

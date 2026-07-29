// app.ts
import express, { Application } from "express";
// 引入body-parser中间件，用于解析请求体中的json数据
import bodyParser from "body-parser";
import path from "path";
// 数据库
import { openConnectDb } from "./models/conn";
openConnectDb();
const app: Application = express();
// 解析application/json
app.use(bodyParser.json());
// 处理post请求的表单数据
app.use(bodyParser.urlencoded({ extended: false }));
// 添加路由
import routes from "./routes";
routes(app);
app.listen(8082, () => {
  console.log("服务器启动成功, 请访问：http://localhost:8082/");
});

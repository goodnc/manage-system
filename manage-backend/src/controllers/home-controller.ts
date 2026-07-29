//home-controller.ts
import { Application, Request, Response } from "express";
import { HomeModel } from "../models/home";
// 将接口对象注册到路由中
// 当前端请求 http://域名/home 时，自动执行 getHomeData 函数处理逻辑；
const registerRoutes = (app: Application) => {
  app.get("/home", getHomeData);
};

const getHomeData = async (req: Request, res: Response) => {
  let homeData = await HomeModel.findOne();
  let resData = {
    code: 200, //业务状态码，200 = 成功，400 = 业务失败；500 = 服务器内部错误；
    data: {},
    msg: "",
  };
  // 判断数据库查询结果：
  // - 查到首页数据：把数据库数据赋值给 `resData.data`，code 保持 200；
  // - 无数据（数据库空）：修改 code=400，提示「数据不存在」；
  if (homeData) {
    resData.data = homeData;
  } else {
    resData.code = 400;
    resData.msg = "数据不存在";
  }
  res.send(resData);
};

export default {
  registerRoutes,
  getHomeData,
};

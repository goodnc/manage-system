import { Application, Request, Response } from "express";
import { HomeModel } from "../models/home";
// 将接口对象注册到路由中
const registerRoutes = (app: Application) => {
  app.get("/home", getHomeData);
};

const getHomeData = async (req: Request, res: Response) => {
  let homeData = await HomeModel.findOne();
  let resData = {
    code: 200,
    data: {},
    msg: "",
  };
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

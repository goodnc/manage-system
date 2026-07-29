//user-controller.ts
import { Application, Request, Response, NextFunction } from "express";
// 导入用户集合构造函数
import { UserModel, validateUser } from "../models/user";
import bcrypt from "bcryptjs";

const pagination = require("mongoose-sex-page");
// 用户列表
// 根据用户名 / 邮箱模糊搜索，带分页、按创建时间倒序返回用户列表
const list = async (req: Request, res: Response) => {
  let { email, username } = req.body;
  let pagerData = req.body.pagination;
  // 接受客户端传递过来的当前页码和每页显示条数，如果没有传递则默认为1和10
  let page = pagerData ? pagerData.page : 1;
  let size = pagerData ? pagerData.pageSize : 10;
  let searchObj: any = {};
  // 拼接搜索条件，有传参才加入过滤条件
  if (username) {
    searchObj.username = username;
  }
  if (email) {
    searchObj.email = email;
  }
  // 将用户列表从数据库中查询出来
  // 分页查询逻辑
  let users = await pagination(UserModel)
    .find(searchObj)
    .sort({ createTime: -1 }) // 创建时间倒序（最新用户在前）
    .page(page) // 指定当前页
    .size(size) // 指定每页显示条数
    .display(7) // 指定显示的分页条数
    .exec(); // exec 向数据库中发送查询请求
  let resData = { code: 200, data: users, message: "" };
  return res.send(resData);
};

// 表单校验 + 邮箱唯一性校验 + 密码加盐加密入库操作
// 加密原理：bcrypt 每次盐值随机，相同明文加密结果不同，盐值内置在密文字符串中，无需单独存储。
const add = async (req: Request, res: Response, next: NextFunction) => {
  let resData = {
    code: 200,
    data: {},
    message: "",
  };
  try {
    await validateUser(req.body);
  } catch (err) {
    // 如果校验不通过，则抛出异常
    resData.code = 500;
    resData.message = "数据格式有误";
    return res.send(resData);
  }
  // 根据邮箱地址查询用户是否存在
  let user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    resData.code = 500;
    resData.message = "邮箱地址已存在";
    return res.send(resData);
  }
  // 对密码进行加密处理--生成随机字符串
  const salt = await bcrypt.genSalt(10);
  // 对密码进行加密
  const password = await bcrypt.hash(req.body.password, salt);
  // 替换密码
  req.body.password = password;
  // 将用户信息保存到数据库中
  await UserModel.create(req.body);
  return res.send(resData);
};

// 详情
const detail = async (req: Request, res: Response) => {
  // 获取地址栏中的id参数
  const { id, message } = req.query;
  let resData: any = {
    code: 200,
    data: {},
    message: "",
  };
  try {
    await validateUser(req.body);
  } catch (err) {
    // 如果校验不通过，则抛出异常
    resData.code = 500;
    resData.message = "数据格式有误";
    return res.send(resData);
  }
  // 如果当前传递了id参数
  if (id) {
    // 根据id查询用户详情
    let user: any = await UserModel.findOne({ _id: id });
    resData.data = user;
  }
  return res.send(resData);
};
// 编辑
const edit = async (req: Request, res: Response, next: NextFunction) => {
  // 接收客户端传递过来的请求参数
  const { username, email, role, status, password, id } = req.body;
  let resData = {
    code: 200,
    data: {},
    message: "",
  };
  // 根据id查询用户信息
  let user: any = await UserModel.findOne({ _id: id });
  // 密码比对
  const isValid = await bcrypt.compare(password, user.password);
  // 密码比对成功
  if (isValid) {
    // 更新用户信息
    await UserModel.updateOne({ _id: id }, { username, email, role, status });
  } else {
    resData.code = 500;
    resData.message = "密码比对失败";
  }
  return res.send(resData);
};

// 删除
const remove = async (req: Request, res: Response) => {
  const resData = {
    code: 200,
    data: {},
    message: "",
  };
  // 根据id删除用户
  const result = await UserModel.findOneAndDelete({ _id: req.query.id });
  if (result) {
    resData.message = "删除成功";
  } else {
    resData.code = 500;
    resData.message = "删除失败";
  }
  return res.send(resData);
};
const registerRoutes = (app: Application) => {
  app.post("/user/list", list); // 用户列表
  app.get("/user/detail", detail); // 用户详情
  app.post("/user/add", add); // 添加用户
  app.post("/user/edit", edit); // 编辑用户
  app.get("/user/delete", remove); // 删除用户
};
export default { registerRoutes, list, add, detail, edit, remove };

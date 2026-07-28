// 创建用户集合
// 引入mongoose第三方模块
import { Document, Schema, model } from "mongoose";
// 引入bcryptjs第三方模块，用于密码加密和解密操作
import bcrypt from "bcryptjs";
// 引入joi第三方模块，用于数据校验
import Joi from "joi";

// 创建用户集合规则
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // 用户名唯一
    minlength: 2,
    maxlength: 16,
  },
  email: {
    type: String,
    unique: true, // 邮箱唯一
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // admin: 超级管理员
  // normal: 普通用户
  role: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0, // 0: 启用状态，1：禁用状态
  },
  // 创建时间
  createTime: {
    type: Date,
    default: Date.now,
  },
});

// 创建集合模型
const UserModel = model("User", userSchema);
// 创建用户记录
async function createUser(params: any) {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash(params.password, salt);
  return await UserModel.create({
    username: params.username,
    email: params.email,
    password: pass,
    role: params.role,
    status: params.status,
  });
}

async function createUserTestData() {
  for (let i = 0; i < 30; i++) {
    await createUser({
      username: `test${i}`,
      email: `test${i}@163.com`,
      password: "123456",
      role: i % 2 == 0 ? "admin" : "user",
      status: 0,
    });
  }
}

// createUserTestData(); //调用初始化数据方法
const validateUser = (user: any) => {
  const schema = Joi.object({
    username: Joi.string()
      .min(4)
      .max(12)
      .required()
      .error(new Error("用户名不符合验证规则")),
    email: Joi.string()
      .email()
      .required()
      .error(new Error("邮箱格式不符合要求")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("密码格式不符合要求")),
    role: Joi.string()
      .valid("admin", "normal")
      .required()
      .error(new Error("角色值非法")),
    status: Joi.number().valid(0, 1).required().error(new Error("状态值非法")),
  });
  return schema.validate(user);
};

export { UserModel, validateUser };

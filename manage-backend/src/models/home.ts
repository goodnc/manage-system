// 引入mongoose模块
import { Schema, model } from "mongoose";

// 创建首页集合规则
const homeSchema = new Schema({
  login_user: { type: String, required: true }, // 登录用户数
  new_register: { type: String, required: true }, // 新增注册数
  new_stu_course: { type: String, required: true }, // 课程新增学员
  new_stu_class: { type: String, required: true }, // 班级新增学员
  new_number: { type: String, required: true }, // 新增会员
  new_reply: { type: String, required: true }, // 未回复问答
  order_counter: { type: Object, required: true }, // 订单总数
});

// 根据规则创建集合模型
const HomeModel = model("Home", homeSchema);

function initHomeData() {
  HomeModel.create({
    login_user: "1024",
    new_register: "12",
    new_stu_course: "27",
    new_stu_class: "64",
    new_number: "31",
    new_reply: "11",
    order_counter: 20,
  });
}

// initHomeData(); // 初始化执行，执行后要注释此方法
// 3.将集合作为模块成员进行导出
export { HomeModel };

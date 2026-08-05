<template>
  <div class="main">
    <a-row :gutter="25">
      <a-col :span="8">
        <div class="cell s1">
          <i class="iconfont icon-yonghu"></i>
          <h4>登录用户</h4>
          <h5>{{ login_user }}</h5>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="cell s2">
          <i class="iconfont icon-zhuce"></i>
          <h4>新增注册</h4>
          <h5>{{ new_register }}</h5>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="cell s3">
          <i class="iconfont icon-xinzeng"></i>
          <h4>课程新增学员</h4>
          <h5>{{ new_stu_course }}</h5>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="cell s4">
          <i class="iconfont icon-banjiguanli"></i>
          <h4>班级新增学员</h4>
          <h5>{{ new_stu_classes }}</h5>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="cell s5">
          <i class="iconfont icon-huiyuan"></i>
          <h4>新增会员</h4>
          <h5>{{ new_member }}</h5>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="cell s6">
          <i class="iconfont icon-yiwen"></i>
          <h4>未回复问答</h4>
          <h5>{{ not_reply }}</h5>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { getHomeData } from "@/api/index";
import { reactive, toRefs } from "vue";
const state = reactive<any>({
  login_user: 0,
  new_register: 0,
  new_stu_course: 0,
  new_stu_classes: 0,
  new_member: 0,
  not_reply: 0,
});
const initData = () => {
  getHomeData().then((res: any) => {
    const {
      login_user,
      new_member,
      new_register,
      not_reply,
      new_stu_classes,
      new_stu_course,
    } = res.data;
    state.login_user = login_user;
    state.new_register = new_register;
    state.new_stu_course = new_stu_course;
    state.new_stu_classes = new_stu_classes;
    state.new_member = new_member;
    state.not_reply = not_reply;
  });
};

initData();
const {
  login_user,
  new_register,
  new_stu_course,
  new_stu_classes,
  new_member,
  not_reply,
} = toRefs(state);
</script>

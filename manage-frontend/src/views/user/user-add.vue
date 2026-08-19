<template>
  <a-modal
    :title="state.winTitle"
    :open="state.winVisible"
    @ok="handleOk"
    :confirmLoading="state.winLoading"
    @cancel="handleCancel"
    cancelText="取消"
    okText="取消"
    okText="确定">
    <a-form
      ref="formRef"
      :model="formData"
      name="basic"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="onFinish">
      <a-form-item
        label="用户名"
        name="username"
        :rules="[
          {
            required: true,
            message: '请输入用户名',
          },
          {
            min: 4,
            message: '用户名长度少于4个字符',
          },
          {
            max: 20,
            message: '用户名长度大于20个字符',
          },
        ]">
        <a-input v-model:value="formData.username" placeholder="用户名">
          <template #prefix><user-outlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="邮箱"
        name="email"
        :rules="[
          {
            required: true,
            message: '请输入邮箱',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱格式',
          },
        ]">
        <a-input v-model:value="formData.email" placeholder="邮箱">
          <template #prefix><mail-outlined /></template>
        </a-input>
      </a-form-item>
      <a-form-item
        label="密码"
        name="password"
        :rules="[
          {
            required: true,
            message: '请输入邮箱',
          },
        ]">
        <a-input-password v-model:value="formData.password" placeholder="密码">
          <template #prefix><lock-outlined /></template>
        </a-input-password>
      </a-form-item>
      <a-form-item label="角色" name="role" :rules="[{}]">
        <a-select v-model:value="formData.role" placeholder="请选择角色">
          <a-select-option
            v-for="(value, key) in UserRoleObj"
            :key="key"
            :value="key"
            >{{ value }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-radio-group v-model:value="formData.status">
          <a-radio
            v-for="(value, key) in UserStatusObj"
            :key="key"
            :value="Number(key)"
            >{{ value.text }}</a-radio
          >
        </a-radio-group>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script setup lang="ts"></script>

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
    </a-form>
  </a-modal>
</template>
<script setup lang="ts"></script>

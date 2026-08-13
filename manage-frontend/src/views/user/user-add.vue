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
  </a-modal>
</template>
<script setup lang="ts"></script>

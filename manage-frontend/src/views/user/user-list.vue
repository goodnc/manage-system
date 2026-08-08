<template>
  <div>
    <div class="search-bar">
      <a-form
        ref="formRef"
        layout="inline"
        @finish="handleFinish"
        :model="formState">
        <a-form-item name="username" label="用户名">
          <a-input
            v-model:value="formState.username"
            placeholder="用户名"
            allowClear>
            <template #prefix>
              <UserOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="email" label="邮箱">
          <a-input
            v-model:value="formState.email"
            placeholder="邮箱"
            allowClear>
            <template #prefix>
              <MailOutlined class="site-form-item-icon" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :icon="h(SearchOutlined)">
            查询
          </a-button>
          <a-button
            style="margin-left: 10px"
            @click="resetForm"
            :icon="h(ClearOutlined)">
            清空
          </a-button>
        </a-form-item>
        <a-button :icon="h(PlusCircleOutlined)" @click="onAdd"> 新增 </a-button>
      </a-form>
    </div>
    <a-table
      :columns="state.columns"
      :data-source="state.tableData"
      :pagination="state.pagination"
      :loading="state.loading"
      @change="handleTableChange"
      row-key="id">
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <a> {{ text }} </a>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <a-tag :color="getStatus(record.status).color">
            {{ getStatus(record.status).txt }}
          </a-tag>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ getTimeFormat(record.createTime) }}
        </template>
        <template v-if="column.key === 'action'">
          <a-space size="middle">
            <a-button type="link" @click="onEdit(record)">编辑</a-button>
            <a-popconfirm
              title="确定删除这条记录吗?"
              @confirm="onDelete(record.id)">
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
    <user-add ref="userAddRef" @refreshData="refreshData"></user-add>
  </div>
</template>

<script lang="ts" setup>
import { h } from "vue";
import {
  UserOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  MailOutlined,
  ClearOutlined,
} from "@ant-design/icons-vue";
import UserAdd from "./user-add.vue";
import type { TableProps, TableColumnType } from "ant-design-vue";
import { message } from "ant-design-vue";
import { getTimeFormat } from "@/common/date";
import { getUserListData, delUserRecord } from "@/api/index";
import type { FormInstance } from "ant-design-vue";
import { UserStatusObj, UserRoleObj, UserRoleType } from "@/common/comObj";
import { ref } from "process";
const { messageApi } = message.useMessage();
interface FormState {
  username: string; // 用户名
  email: string; // 邮箱
}
// 表单查询参数
const formState = reactive<FormState>({
  username: "",
  email: "",
});

const state: any = reactive({
  columns: [
    {
      title: "序号",
      customRender: ({ text }: { text: string }) => {
        return `${(state.pagination.current - 1) * state.pagination.pageSize + index + 1}`;
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "邮箱",
      dataIndex: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
      customRender: ({ record }) => {
        return UserRoleObj[record.role as keyof Record<UserRoleType, string>];
      },
    },
    {
      title: "用户状态",
      dataIndex: "status",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "操作",
      key: "action",
    },
  ] as TableColumnType[],
  tableData: [],
  loading: false,
  pagination: {
    current: 1,
    pageSize: 10,
    total: 0,
  },
});

// 根据状态值获取状态对象（状态名称、状态颜色）
const getStatus = (status: number) => {
  return {
    txt: UserStatusObj[status].text,
    color: UserStatusObj[status].color,
  };
};

// 编辑
const onEdit = (record: any) => {
  userAddRef.value!.showWin(record);
};

const userAddRef = ref();

// 查询
const onSearch = (params: any = {}) => {
  state.loading = true;
  getUserListData(params)
    .then((res: any) => {
      if (res.code === 200) {
        state.tableData = res.data.records;
        state.pagination = {
          ...state.pagination,
          total: res.data.total,
        };
      }
    })
    .finally(() => {
      state.loading = false;
    });
};

const formRef = ref<FormInstance>();

// 重置表单
const resetForm = () => {
  formRef.value?.resetFields();
};

// 提交搜索表单
const handleFinish = (values: FormState) => {
  onSearch({
    ...values,
    pagination: state.pagination,
  });
};

// 表格变化
const handleTableChange: TableProps["onChange"] = (pagination, filters, sorter: any) => {
  state.pagination = {
    ...state.pagination
  };
  console.log('pagination', pagination)
  onSearch({
    pagination,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

// 删除用户
const onDelete = (id: number) => {
  delUserRecord(id).then((res: any) => {
    if (res.code === 200) {
      messageApi
}

const userAddRef= ref();

//新增
const onAdd = () => {
  userAddRef.value!.showWin();
};
</script>

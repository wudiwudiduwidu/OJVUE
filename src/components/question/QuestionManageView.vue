0
<template>
  <div id="questionManageView">
    <a-button
      @click="listDeleteQuestion"
      status="danger"
      style="margin-bottom: 10px"
      size="medium"
      >删除所选题目
    </a-button>
    <a-table
      row-key="id"
      :columns="columns"
      :data="dataList"
      stripe="stripe"
      :pagination="{
        total: total,
        current: pageParams.current,
        pageSize: pageParams.pageSize,
        showTotal: true,
        showPageSize: true,
      }"
      :row-selection="rowSelection"
      @select="listRowKeys"
      @selectAll="selectAll"
      @page-change="pageChange"
      :table-layout-fixed="false"
      :scrollbar="true"
      :fixedSize="false"
    >
      <!--      record 记录了当前行的数据-->
      <template #createTime="{ record }">
        {{ moment(record.createtime).format("YYYY-MM-DD") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button status="success" @click="changeQuestion(record)"
            >修改
          </a-button>
          <a-button status="danger" @click="deleteQuestion(record)"
            >删除
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { Question, QuestionControllerService } from "../../../generated";
import { onMounted, reactive, ref, watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRoute, useRouter } from "vue-router";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment"); // require
const isSelect = ref(false);
const selectAll = (bool: boolean) => {
  isSelect.value = bool;
  if (bool) {
    rowKeys.value = dataList.value.map((item) => item.id);
  } else {
    rowKeys.value = [];
  }
};
const rowKeys = ref([] as string[]);
const listRowKeys = (rowkeys: string[]) => {
  rowKeys.value = rowkeys;
};
const rowSelection = reactive({
  type: "checkbox",
  showCheckedAll: true,
  onlyCurrent: false,
});
const listDeleteQuestion = async () => {
  console.log(rowKeys.value);
  const res = await QuestionControllerService.listDeleteQuestionUsingPost(
    rowKeys.value
  );
  if (res.code === 0) {
    await LocalDate();
    Message.success("删除成功");
  } else Message.error("删除题目失败", res.message);
};
const deleteQuestion = async (record: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: record.id,
  });
  if (res.code === 0) {
    await LocalDate();
    Message.success("删除成功");
  } else Message.error("删除题目失败", res.message);
};
const router = useRouter();
const route = useRoute();
const changeQuestion = async (record: any) => {
  await router.push({
    path: "/add/question",
    query: {
      id: record.id,
    },
  });
  console.log(route.path);
};
const stripe = ref(true);
const dataList = ref([]);
const total = ref(0);
const pageParams = ref({
  current: 1,
  pageSize: 2,
});
const LocalDate = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    pageParams.value
  );
  if (res.code === 0) {
    console.log(res.data);
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else Message.error("获取题目失败", res.message);
};
onMounted(() => {
  LocalDate();
});
const pageChange = (page: number) => {
  pageParams.value.current = page;
};
watchEffect(() => {
  LocalDate();
});
const columns = [
  {
    title: "题目id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

// todo 一个一个删除题目的时候先在前端删除再离开页面的时候发请求给后端

//完善行选择器删除按钮
</script>

<style scoped>
#questionManageView {
}
</style>

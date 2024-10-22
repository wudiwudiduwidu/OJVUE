<template>
  <h3 style="text-align: center">开始做题(let's do it)</h3>
  <div style="text-align: center">
    <a-space direction="vertical" size="large" :style="{ width: '1300px' }">
      <a-form :model="pageQuery" layout="inline">
        <a-form-item field="title" label="标题">
          <a-input v-model="pageQuery.title" style="width: 200px" />
        </a-form-item>
        <a-form-item field="tags" label="标签">
          <a-input-tag v-model="pageQuery.tags" style="width: 200px" />
        </a-form-item>
        <a-form-item field="id" label="题目id">
          <a-input v-model="pageQuery.id" style="width: 200px" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="Search">搜索</a-button>
        </a-form-item>
      </a-form>
    </a-space>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        total: total,
        current: pageParams.current,
        pageSize: pageParams.pageSize,
        showTotal: true,
      }"
      :bordered="false"
      :stripe="true"
      style="width: 1300px; margin: 0 auto"
      @page-change="pageChange"
    >
      <template #id="{ record }">
        <div @click="todoQuestion(record)" class="todoQuestion">
          {{ record.id }}
        </div>
      </template>
      <template #title="{ record }">
        <div @click="todoQuestion(record)" class="todoQuestion">
          {{ record.title }}
        </div>
      </template>
      <template #tags="{ record }">
        <a-space>
          <a-tag v-for="tag in record.tags" :key="tag" color="green"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <template #acceptRate="{ record }">
        {{
          record.submitnum !== 0
            ? (record.acceptednum / record.submitnum).toFixed(2) +
              "%" +
              `(${record.acceptednum} / ${record.submitnum})`
            : "0" + "%"
        }}
      </template>
    </a-table>
  </div>
</template>
<style scoped>
.todoQuestion {
  width: 75px;
}

.todoQuestion:hover {
  cursor: pointer;
  color: #1890ff;
}
</style>
<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { QuestionControllerService, QuestionVO } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
// acceptednum?: number;
// content?: string;
// favournum?: number;
// id?: number;
// judgeconfig?: JudgeConfig;
// submitnum?: number;
// tags?: Array<string>;
// thumbnum?: number;
// title?: string;
// user?: UserVO;

const columns = [
  {
    title: "id",
    slotName: "id",
  },
  {
    title: "题目",
    slotName: "title",
  },
  {
    title: "标签",
    // todo 润色表格数据渲染
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptRate",
  },
];
const dataList = ref([]);
const total = ref(0);
const pageParams = ref({
  current: 1,
  pageSize: 10,
});
const pageQuery = ref({
  current: 1,
  pageSize: 10,
  title: "",
  tags: [],
  id: "",
});
const Search = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    pageQuery.value
  );
  if (res.code === 0) {
    console.log(res.data);
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else Message.error("获取题目失败", res.message);
};
const LocalDate = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
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
// 根据函数请求参数变化触发
watchEffect(() => {
  LocalDate();
});
const router = useRouter();
const todoQuestion = (record: QuestionVO) => {
  router.push({
    path: `question/view/${record.id}`,
  });
};
</script>

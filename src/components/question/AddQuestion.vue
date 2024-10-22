<template>
  <a-form :model="form" :layout="layout">
    <a-form-item field="title" label="标题">
      <a-input
        v-model="form.title"
        placeholder="输入题目标题"
        style="width: 600px"
      />
    </a-form-item>

    <a-form-item field="tags" label="标签">
      <a-input-tag
        v-model="form.tags"
        placeholder="输入题目标签"
        style="width: 600px"
      />
    </a-form-item>

    <a-form-item field="content" label="内容" class="md">
      <MdEditor :value="form.content" :handle-change="ContentChange"></MdEditor>
    </a-form-item>
    <a-form-item field="answer" label="答案" class="md">
      <MdEditor :value="form.answer" :handle-change="AnswerChange"></MdEditor>
    </a-form-item>
    <!-- todo 嵌套表单和增减表单-->
    <a-form-item label="判题用例" :content-flex="false" :merge-props="false">
      <a-space direction="vertical" fill style="width: 370px">
        <a-form-item field="memoryLimit" label="内存限制(kb)">
          <a-input-number
            v-model="form.judgeConfig.memoryLimit"
            placeholder="输入（kb）"
            min="0"
          />
        </a-form-item>
        <a-form-item field="stackLimit" label="栈限制(kb)">
          <a-input-number
            min="0"
            v-model="form.judgeConfig.stackLimit"
            placeholder="输入（kb）"
          />
        </a-form-item>
        <a-form-item field="timeLimit" label="时间限制(ms)">
          <a-input-number
            min="0"
            v-model="form.judgeConfig.timeLimit"
            placeholder="输入(ms)"
          />
        </a-form-item>
      </a-space>
    </a-form-item>
    <a-form-item style="width: 1500px" label="用例">
      <a-form-item label="输入用例" style="width: 450px">
        <a-input
          placeholder="案例输入（仅作为展示，请在下方添加输入输出）"
          style="width: 459px"
        />
      </a-form-item>
      <a-form-item label="输出用例" style="width: 450px">
        <a-input
          placeholder="案例输出（仅作为展示，请在下方添加输入输出）"
          style="width: 450px"
        />
      </a-form-item>
    </a-form-item>
    <a-form-item
      v-for="(item, index) of form.judgeCase"
      style="width: 1500px"
      :key="index"
      label="用例"
    >
      <a-form-item
        :field="`item[${index}].value`"
        :label="`输入用例-${index}`"
        style="width: 450px"
      >
        <a-input
          v-model="item.input"
          placeholder="案例输入"
          style="width: 450px"
        />
      </a-form-item>
      <a-form-item
        :field="`item[${index}].value`"
        :label="`输出用例-${index}`"
        style="width: 450px"
      >
        <a-input
          v-model="item.ouput"
          placeholder="案例输出"
          style="width: 450px"
        />

        <a-button
          @click="handleDelete(index)"
          :style="{ marginLeft: '10px' }"
          status="danger"
          >删除
        </a-button>
      </a-form-item>
    </a-form-item>
    <a-form-item>
      <a-button @click="handleAdd">新增测试用例</a-button>
    </a-form-item>
    <a-form-item>
      <a-button @click="submitQuestion" status="success">提交</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const updatePage = ref(false);
const router = useRouter();
onMounted(async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  updatePage.value = true;
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(
    id as any
  );
  console.log(res);
  if (res.code === 0) {
    form.value = res.data as any;
    console.log(form.value);
    form.value.judgeConfig = JSON.parse(res.data?.judgeConfig as any) || {
      memoryLimit: 0,
      stackLimit: 0,
      timeLimit: 0,
    };
    form.value.judgeCase = JSON.parse(res.data?.judgeCase as any) || [
      {
        input: "",
        ouput: "",
      },
    ];
    form.value.tags = JSON.parse(res.data?.tags as any) || [];
  } else Message.error("获取题目失败", res.message as any);
});
const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    ouput: "",
  });
};
const handleDelete = (index: any) => {
  form.value.judgeCase.splice(index, 1);
};
const ContentChange = (v: string) => {
  form.value.content = v;
};
const AnswerChange = (v: string) => {
  form.value.answer = v;
};
const layout = ref("horizontal");
let form = ref({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "",
      ouput: "",
    },
  ],
  judgeConfig: {
    memoryLimit: 0,
    stackLimit: 0,
    timeLimit: 0,
  },
  tags: [],
  title: "",
});
const submitQuestion = async () => {
  if (updatePage.value) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      Message.success("更新成功");
      router.push("/question/manage");
      console.log(route.path);
    } else Message.error("更新失败", res.message);
  } else {
    console.log(form.value);
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) Message.success("添加成功");
    else Message.error("添加失败", res.message);
  }
};
</script>

<style scoped>
#addQuestion {
}

.md {
  min-width: 1000px;
}
</style>

<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue";

import { ref } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";

const MdValue = ref("");
const MdChange = (v: string) => {
  MdValue.value = v;
};

const CodeValue = ref("");
const CodeChange = (v: string) => {
  CodeValue.value = v;
};
</script>

<template>
  <!--   todo 11-->
  <div>HZU</div>
  <MdEditor :value="MdValue" :handle-change="MdChange"></MdEditor>
  <CodeEditor :value="CodeValue" :handle-change="CodeChange"></CodeEditor>
</template>

<style scoped></style>

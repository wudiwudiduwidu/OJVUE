<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 600px" />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, toRaw, watch, onMounted } from "vue";

const codeEditorRef = ref();
const codeEditor = ref();

interface Props {
  value: string;
  handleChange: (v: string) => void;
  language: string;
}

// 使用 defineProps 定义 props
// eslint-disable-next-line no-undef
const props = defineProps<Props>();
console.log("传值", props.value);
const fillValue = () => {
  if (!codeEditor.value) {
    return;
  }
  toRaw(codeEditor.value).setValue("新的值");
};

watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }

  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    theme: "vs-dark",
  });

  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<style scoped></style>

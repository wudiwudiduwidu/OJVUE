<template>
  <Editor
    :value="value"
    :plugins="plugins"
    @change="handleChange"
    class=".bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child { display: none; }"
    mode="split"
  />
</template>

<script setup lang="ts">
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import hljs from "highlight.js";
import java from "highlight.js/lib/languages/java";
hljs.registerLanguage("java", java);
const plugins = [
  gfm(),
  highlight(),
  hljs,
  // Add more plugins here
];

/**
 * 定义组件属性类型
 */
interface Props {
  // 自定义事件 传递父组件提供方法和值给子组件 父组件也能拿到值
  value: string;
  handleChange: (v: string) => void;
}

/**
 * 给组件指定初始值
 */
// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
</script>

<style scoped></style>

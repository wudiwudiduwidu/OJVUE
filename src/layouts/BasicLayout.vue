<template>
  <div id="app">
    <!--     取百分百页面高度-->
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <global-header />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a
          href="https://www.code-nav.cn/course/1790980707917017089"
          target="_blank"
          >2955475357@qq.com
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#app {
}

#app .header {
  margin-bottom: 5px;
  box-shadow: #eee 1px 1px 5px;
}

#app .content {
  /* 透明白色 */
  margin-bottom: 16px;
  padding: 10px;
}

#app .footer {
  text-align: center;
  padding: 14px;
}
</style>
<script setup lang="ts">
import GlobalHeader from "@/components/globalHeader.vue";
</script>

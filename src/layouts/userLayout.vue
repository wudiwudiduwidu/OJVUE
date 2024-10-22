<template>
  <div id="app">
    <!--     取百分百页面高度-->
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="@/assets/ojlogo.png" style="height: 75px" alt="" />
          <div>DreamOJ</div>
        </a-space>
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
  margin-bottom: 30px;
  box-shadow: #eee 1px 1px 5px;
  font-size: 24px;
}

#app .content {
  margin-bottom: 16px;
  padding: 10px;
}

#app .footer {
  position: sticky;
  bottom: 0;
  left: 0;
  text-align: center;
  padding: 14px;
  right: 0;
}
</style>
<script setup lang="ts"></script>

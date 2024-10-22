<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const router = useRouter();
const store = useStore();
const handleSubmit = async (form: any) => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    Message.success("登录成功");
    await store.dispatch("user/getLoginUser");
    store.state.user.user = res.data;
    console.log(store.state.user.user.userName);
    await router.push({
      path: "/",
      replace: true, // 让缓存不存入登录页面，因为登陆后登录页面不需要返回
    });
  } else {
    Message.error("登录失败：" + res.message);
  }
};
const changeToRegister = () => {
  router.push("/user/register");
};
</script>

<template>
  <div id="app" style="display: flex; align-items: center; height: 450px">
    <a-form
      :model="form"
      :style="{ width: '500px' }"
      @submit="handleSubmit(form)"
    >
      <a-form-item style="margin-left: 21vh">
        <h2>用户登录</h2>
      </a-form-item>
      <a-form-item field="userAccount" tooltip="请输入你的账号" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入你的账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入你的密码"
        />
      </a-form-item>
      <div class="bottom">
        <a-button html-type="submit" style="background: lightskyblue"
          >登录
        </a-button>
        <div
          style="display: flex; margin-left: 45px; align-items: center"
          @click="changeToRegister"
        >
          <div>去注册</div>
          <icon-arrow-right size="26" stroke-width="2" />
        </div>
      </div>
    </a-form>
  </div>
</template>

<style scoped>
body {
  background-color: #333; /* 深色背景以突出透明白色 */
}

#app {
  height: 450px;
  width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.3); /* 透明白色 */
  border: 1px solid white; /* 透明绿色边框 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); /* 阴影 */
  border-radius: 10px;
}

.bottom {
  display: flex;
  margin-left: 35vh;
}
</style>

<template>
  <div id="app" style="display: flex; align-items: center; height: 450px">
    <a-form
      :model="form"
      :style="{ width: '500px' }"
      @submit="handleSubmit(form)"
    >
      <a-form-item style="margin-left: 21vh">
        <h2>用户注册</h2>
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
      <a-form-item field="checkPassword" label="确认密码">
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入你的密码"
        />
      </a-form-item>
      <div class="bottom">
        <a-button html-type="submit" style="background: lightskyblue"
          >注册
        </a-button>
        <div
          style="display: flex; align-items: center; margin-left: 45px"
          @click="changeToLogin"
        >
          <div>返回登录</div>
          <icon-arrow-right size="26" stroke-width="2" />
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { UserControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
});
const handleSubmit = async (form) => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    // 注册成功
    Message.success("注册成功");
    await router.push("/user/login");
  } else {
    Message.error("注册失败：" + res.message);
  }
};
const changeToLogin = () => {
  router.push("/user/login");
};
</script>

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

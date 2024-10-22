// 权限管理包
import { router } from "@/router";
import store from "@/store";
import accessEUMN from "@/access/accessEUMN";
import checkAccess from "@/access/checkAccess";
import { useStore } from "vuex";
// 这里无法使用const router = useRouter() 直接拿到路由信息了
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  // 用户没有登陆过，自动登录
  if (!store.state.user.user.userRole) {
    // 如果用户重来没有登陆过，这里拿到的还是未登录
    await store.dispatch("user/getLoginUser");
  }
  const User = store.state.user.user;
  const needAccess = to.meta.access ?? accessEUMN.NOT_LOGIN;
  if (needAccess && needAccess !== accessEUMN.NOT_LOGIN) {
    if (!User.userRole) {
      // 如果用户重来没有登陆过
      next(`/user/login?redirect=${to.path}`);
      return;
    }
    if (!checkAccess(User.userRole, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});

// todo 用户一进入页面或者刷新都会获取用户登录信息

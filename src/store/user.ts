import accessEUMN from "@/access/accessEUMN";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  state: () => ({
    user: {
      userName: accessEUMN.NOT_LOGIN,
      userRole: "",
      userAvatar: "",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }: any) {
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("update", res.data);
      } else {
        commit("update", {
          userName: accessEUMN.NOT_LOGIN,
        });
      }
    },
    // 这行代码的目的是在用户未登录的情况下，将 user 对象的状态更新为一个新的对象，解构
    // 这个对象包含了 state.user 中的所有属性，但将 role 属性强制设置为 accessEUMN.NOT_LOGIN。
    // 这样做的好处是，可以保持其他属性（如 loginUser）的值不变，同时明确地设置 role 属性为未登录状态。
  },
  mutations: {
    update(state: any, newUser: any) {
      state.user = newUser;
    },
  },
};

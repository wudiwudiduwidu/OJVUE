import { RouteRecordRaw } from "vue-router";
import HomeOJ from "@/components/HomeOJ.vue";
import adminView from "@/components/adminView.vue";
import noAuth from "@/components/noAuth.vue";
import userLayout from "@/layouts/userLayout.vue";
import LoginView from "@/components/user/LoginView.vue";
import RegisterView from "@/components/user/RegisterView.vue";
import myTitle from "@/components/myTitle.vue";
import accessEUMN from "@/access/accessEUMN";
import AddQuestion from "@/components/question/AddQuestion.vue";
import QuestionManageView from "@/components/question/QuestionManageView.vue";
import QuestionsView from "@/components/question/QuestionsView.vue";
import ViewQuestion from "@/components/question/ViewQuestion.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: userLayout, // 确保这里的组件名是正确的
    children: [
      {
        path: "/user/login",
        name: "登录",
        component: LoginView, // 主页组件
      },
      {
        path: "/user/register",
        name: "注册",
        component: RegisterView, // 主页组件
      },
    ],
    meta: {
      ViewOnMenu: false,
    },
  },
  {
    path: "/",
    name: "主页",
    component: HomeOJ, // 主页组件
    meta: {
      ViewOnMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestion, // 主页组件
    meta: {
      access: accessEUMN.ADMIN,
      ViewOnMenu: true,
    },
  },

  {
    path: "/question/view/:id",
    name: "做题页面",
    component: ViewQuestion, // 主页组件
    props: true,
    meta: {
      access: accessEUMN.USER,
      ViewOnMenu: false,
    },
  },
  {
    path: "/question/manage",
    name: "管理题目",
    component: QuestionManageView, // 主页组件
    meta: {
      access: accessEUMN.ADMIN,
      ViewOnMenu: true,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView, // 主页组件
    meta: {
      ViewOnMenu: true,
    },
  },
  {
    // 表示仅管理员可见
    path: "/admin",
    name: "管理员",
    component: adminView,
    meta: {
      access: accessEUMN.ADMIN,
      ViewOnMenu: true,
    },
  },
  {
    path: "/noAuth",
    name: "404",
    component: noAuth,
    meta: {
      ViewOnMenu: false,
    },
  },
];

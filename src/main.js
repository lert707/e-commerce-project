import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import Moment from "moment";
import axios from "axios";
import VueLazyLoad from "vue-lazyload";
import Vuex from "vuex";

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  loading: require("./statics/site/images/loading.gif"),
  attempt: 1
});

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuex);

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://47.106.148.205:8899/";

Vue.filter("dateFmt", (input, dateFmtStr = "YYYY-MM-DD") => {
  return Moment(input).format(dateFmtStr);
});

import "./statics/site/css/style.css";
import "element-ui/lib/theme-chalk/index.css";

import goodslist from "./components/goods/goodslist.vue";
import shopcart from "./components/shopcart/shopcart.vue";
import goodsdetail from "./components/goods/goodsdetail.vue";

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/goodslist" },
    { path: "/goodslist", component: goodslist },
    { path: "/shopcart", component: shopcart },
    { path: "/goodsinfo/:id", component: goodsdetail }
  ]
});

import {addLocalGoods,getLocalTotalCount,getLocalGoods} from './common/localstorageHelper.js'

const store = new Vuex.Store({
  state: {
    totalCount: getLocalTotalCount(),
    cart: null
  },
  getters: {
    // 获取购物车的总数量
    getTotalCount(state) {
      return state.totalCount
    },
    // 获取本地存储中的数据
    getLocalCart(state) {
      return state.cart
    }
  },
  mutations: {
    /**
     * 新增商品
     * @param {*} state 指的就是核心概念state，必须是第一个参数
     * @param {*} goods 载荷
     */
    addGoods(state, goods) {
      // 存储到localstorage中去，并返回商品的总数量
      state.totalCount = addLocalGoods(goods)

      // let obj = {}
      // if (window.localStorage.getItem("cart")) {
      //   obj = JSON.parse(window.localStorage.getItem("cart"));
      //   obj[goods.goodsId] = parseInt(goods.count) + (parseInt(obj[goods.goodsId]) || 0);
      // } else {
      //   obj[goods.goodsId] = goods.count;
      // }
      // window.localStorage.setItem("cart", JSON.stringify(obj));
    },
    getLocalCart(state) {
      state.cart =  getLocalGoods()
    }
  }
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

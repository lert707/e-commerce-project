import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import Moment from 'moment'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad,{
    preLoad: 1.3,
    loading: require('./statics/site/images/loading.gif'),
    attempt: 1
})

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://47.106.148.205:8899/'

Vue.filter('dateFmt',(input,dateFmtStr='YYYY-MM-DD')=>{
  return Moment(input).format(dateFmtStr)
})

import './statics/site/css/style.css'
import 'element-ui/lib/theme-chalk/index.css'

import goodslist from './components/goods/goodslist.vue'
import shopcart from './components/shopcart/shopcart.vue'
import goodsdetail from './components/goods/goodsdetail.vue'

const router = new VueRouter({
  routes: [
    {path: '/',redirect: '/goodslist'},
    {path:'/goodslist',component: goodslist},
    {path:'/shopcart',component: shopcart},
    {path:'/goodsinfo/:id',component: goodsdetail}
  ]
})


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

<template>
    <div>
        <div class="section">
        <div class="location">
            <span>当前位置：</span>
            <a href="/index.html">首页</a> &gt;
            <a href="/cart.html">购物车</a>
        </div>
    </div>

    <div class="section" v-if="cartGoods.length">
        <div class="wrapper">
            <div class="bg-wrap">
                <!--购物车头部-->
                <div class="cart-head clearfix">
                    <h2>
                        <i class="iconfont icon-cart"></i>我的购物车</h2>
                    <div class="cart-setp">
                        <ul>
                            <li class="first active">
                                <div class="progress">
                                    <span>1</span>
                                    放进购物车
                                </div>
                            </li>
                            <li>
                                <div class="progress">
                                    <span>2</span>
                                    填写订单信息
                                </div>
                            </li>
                            <li class="last">
                                <div class="progress">
                                    <span>3</span>
                                    支付/确认订单
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!--购物车头部-->
                <!--商品列表-->
                <div class="cart-box">
                    <input id="jsondata" name="jsondata" type="hidden">
                    <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                        <tbody>
                            <tr>
                                <th width="48" align="center">
                                    <a>选择</a>
                                </th>
                                <th align="left" colspan="2">商品信息</th>
                                <th width="84" align="left">单价</th>
                                <th width="104" align="center">数量</th>
                                <th width="104" align="left">金额(元)</th>
                                <th width="54" align="center">操作</th>
                            </tr>
                            <tr v-show="!cartGoods.length">
                                <td colspan="10">
                                    <div class="msg-tips">
                                        <div class="icon warning">
                                            <i class="iconfont icon-tip"></i>
                                        </div>
                                        <div class="info">
                                            <strong>购物车没有商品！</strong>
                                            <p>您的购物车为空，
                                                <router-link to="/">马上去购物</router-link>吧！</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr v-show="cartGoods.length" v-for="item in cartGoods" :key="item.id">
                                <td width='48' >
                                    <el-switch v-model="item.selected"></el-switch>
                                </td>
                                <td colspan="2">
                                    <div class="shopInfo">
                                        <img :src="item.img_url" alt="" width="50" height="50">
                                        <span>{{item.title}}</span>
                                    </div>
                                </td>
                                <td width="84" align="left">{{item.sell_price}}</td>
                                <td width="104" align="center">
                                    <!-- <el-input-number size="mini" v-model="item.buycount" :min="1" :max="10"></el-input-number> -->
                                    <inputnumber :inputCount="item.buycount" v-on:sub="subCount" v-on:sum="sumCount"></inputnumber>
                                </td>
                                <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                <td width="54" align="center">
                                    <router-link to="">删除</router-link>
                                </td>
                            </tr>
                            <tr>
                                <th align="right" colspan="8">
                                    已选择商品
                                    <b class="red" id="totalQuantity">{{getTotalData.totalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                    <span class="red">￥</span>
                                    <b class="red" id="totalAmount">{{getTotalData.totalPrice}}</b>元
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!--/商品列表-->
                <!--购物车底部-->
                <div class="cart-foot clearfix">
                    <div class="right-box">
                        <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                        <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                    </div>
                </div>
                <!--购物车底部-->
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import inputnumber from '../subcomponents/inputnumber'
export default {
    components: {
        inputnumber
    },
    data() {
        return {
            cartGoods: {},
            selected: true
        }
    },
    computed: {
        // 获取总数量与总价格
        getTotalData() {
            let totalCount = 0
            let totalPrice = 0

            this.cartGoods.forEach(item=>{
                if (item.selected) {
                    totalCount += item.buycount
                    totalPrice += item.buycount * item.sell_price
                }
            })

            return {totalCount,totalPrice}
        }
    },
    created() {
        this.getCartData()
    },
    methods: {
        // 获取购物车数据
        getCartData() {
            // 通过本地存储
            // if (window.localStorage.getItem("cart")) {
            //     const cart = JSON.parse(window.localStorage.getItem("cart"))
            //     this.$axios.get(`site/comment/getshopcargoods/${Object.keys(cart).join(",")}`).then(res=>{
            //         res.data.message.forEach((element,index) => {
            //             element.selected = true
            //             element.buycount = (Object.values(cart))[index]
                        
            //         });
            //         this.cartGoods = res.data.message
            //     })
            // }

            // 通过vuex获取本地存储中的购物车数据
            this.$store.commit('getLocalCart')
            const cart = this.$store.getters.getLocalCart
            // 如果没有数据，结束
            if (Object.keys(cart).length === 0) return
            // 发送请求接收数据渲染
            this.$axios.get(`site/comment/getshopcargoods/${Object.keys(cart).join(",")}`).then(res=>{
                res.data.message.forEach((item,index) => {
                    item.selected = true
                    item.buycount = cart[item.id]  
                });
                this.cartGoods = res.data.message
            })

        },

        subCount(childValue) {
            // console.log(childValue)
        },
        sumCount(childValue) {
            // console.log(childValue)
        }
    }
};
</script>

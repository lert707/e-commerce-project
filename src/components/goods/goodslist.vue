<template>
    <div>
        <!-- 轮播图部分 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item,index) in goods.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="subitem in item.subcates" :key="subitem.id" href="/goods/43.html">{{subitem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <el-carousel height="341px" :interval="2000" arrow="always">
                                <el-carousel-item v-for="item in goods.sliderlist" :key="item.id">
                                    <img :src="item.img_url" alt="">
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goods.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index + 1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | dateFmt}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- 楼层分类部分 -->
        <div class="section" v-for="(item,index) in goodsGroup" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="subitem in item.level2catelist" :key="subitem.subcateid" href="/goods/43.html">{{subitem.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="list in item.datas" :key="list.artID">
                            <router-link :to="'/goodsinfo/'+list.artID" class="">
                                <div class="img-box">
                                    <img :src="list.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{list.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{list.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{list.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{list.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'

// var method = require('../../utils/method.js')

export default {
    data() {
        return {
            goods: {},
            goodsGroup: {}
        }
    },
    created() {
        this.getGoodsData()
        this.getGoodsgroup()
    },
    methods: {
        getGoodsData() {
            // const url = 'http://47.106.148.205:8899/site/goods/gettopdata/goods'
            // axios.get(url).then(res=>{
            //     this.goods = res.data.message
            // })
            // method.request({
            //     url: 'site/goods/gettopdata/goods',
            //     success: res => {
            //         this.goods = res.data.message
            //     }
            // })
            this.$axios.get('site/goods/gettopdata/goods').then(res=>{
                this.goods = res.data.message
            })
        },
        getGoodsgroup() {
            // method.request({
            //     url: 'site/goods/getgoodsgroup',
            //     success: res => {
            //         this.goodsGroup = res.data.message
            //     }
            // })
            this.$axios.get('site/goods/getgoodsgroup').then(res=>{
                this.goodsGroup = res.data.message
            })
        }
    }
}
</script>

<style scoped>
    .banner-img img {
        width: 100%;
        height: 100%;
    }
</style>



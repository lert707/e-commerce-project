<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div v-if="goodsdetail.goodsinfo" class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsdetail.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.thumb_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsdetail.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsdetail.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsdetail.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsdetail.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsdetail.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <el-input-number v-model="buyCount" :min="1" :max="goodsdetail.goodsinfo.stock_quantity" size='small'></el-input-number>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsdetail.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button ref="startIndex" @click="addCart" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a :class="{selected: isShow}" href="javascript:;" @click='isShow = true'>商品介绍</a>
                                        </li>
                                        <li>
                                            <a :class="{selected: !isShow}" href="javascript:;" @click="isShow = false">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!-- 商品介绍 -->
                            <div v-show="isShow" v-html="goodsdetail.goodsinfo.content" class="tab-content entry" style="display: block;">
                                
                            </div>
                            <!-- 商品评论 -->
                            <div v-show="!isShow" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea ref='textarea' id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="subComment" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="!goodsComments.message" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in goodsComments.message" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | dateFmt("YYYY-MM-DD HH:mm:ss")}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="1"
                                                :page-sizes="[3, 6, 10]"
                                                :page-size="3"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="goodsComments.totalcount">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 右边热搜 -->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item,index) in goodsdetail.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | dateFmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition v-on:before-enter="beforeEnter"
                    v-on:enter="enter"
                    v-on:after-enter="afterEnter">
            <div v-show="isShowCart" class="smallCart" ref="animateCart">
                <img v-if="goodsdetail.imglist" :src="goodsdetail.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>

<script>
import '../../statics/site/js/jqimgzoom/js/magnifier.js'
// 按需引入
import { Affix } from 'iview';

export default {
    // 组件局部注册
    components: {
        Affix
    },
    data() {
        return {
            goodsdetail: {},
            goodsComments: {},
            buyCount: 1,
            isShow: true,
            pageIndex: 1,
            pageSize: 3,
            isShowCart: false,
            startIndex: null,
            endIndex: null
        }
    },
    created() {
        this.getData()
        this.getCommentsData()
    },
    updated() {
        $('#magnifier1').imgzoon({magnifier:'#magnifier1'});
    },
    methods: {
        // 获取商品详情
        getData() {
            this.$axios.get(`site/goods/getgoodsinfo/${this.$route.params.id}`).then(res=>{
                this.goodsdetail = res.data.message

                setTimeout(()=>{
                    this.startIndex = $(this.$refs.startIndex).offset()
                    $(this.$refs.animateCart).css(this.startIndex)
                    this.endIndex = $("#shoppingCart").offset()
                },200)
            })
        },
        // 获取评论
        getCommentsData() {
            this.$axios.get(`site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=>{
                this.goodsComments = res.data
            })
        },
        // 实时更改pageSize
        handleSizeChange(val) {
            this.pageSize = val
            this.getCommentsData()
        },
        // 实时更改pageIndex
        handleCurrentChange(val) {
            this.pageIndex = val
            this.getCommentsData()
        },
        // 提交评论
        subComment() {
            const comment = this.$refs.textarea.value
            if (comment.trim() === '') {
                this.$message({
                    showClose: true,
                    message: '评论不能为空',
                    type: 'warning'
                });
                return
            }
            const url = `site/validate/comment/post/goods/${this.$route.params.id}`
            this.$axios.post(url,{commenttxt: comment}).then(res=>{
                if(res.data.status == 0) {
                    this.$refs.textarea.value = ''
                    this.$message({
                        showClose: true,
                        message: '评论成功',
                        type: 'success'
                    })
                }
                this.pageIndex = 1
                this.getCommentsData()
            })
        },
        //  添加购物车
        addCart() {
            // 购物车动画显示
            this.isShowCart = true
            // vuex
            const goods = {
                goodsId: this.$route.params.id,
                count: this.buyCount
            }
            this.$store.commit('addGoods',goods)
            // const id = this.$route.params.id
            // let obj = {}
            // if (window.localStorage.getItem("cart")) {
            //     obj= JSON.parse(window.localStorage.getItem("cart"));
            //     obj[id] = parseInt(this.buyCount) + ( parseInt(obj[id]) || 0)
            // } else {
            //     obj[id] = this.buyCount
            // }
            // window.localStorage.setItem("cart",JSON.stringify(obj))
        },
        // 购物车动画
        beforeEnter: function(el) {
            el.style.left = this.startIndex.left + "px"
            el.style.top = this.startIndex.top + "px"
            el.style.transform = "scale(1)"
        },
        enter:function(el,done) {
            el.offsetWidth
            el.style.transition = "all .8s"
            el.style.left = this.endIndex.left + "px"
            el.style.top = this.endIndex.top + "px"
            el.style.transform = "scale(.5)"
            done()
        },
        afterEnter:function(el) {
            this.isShowCart = false
        },
    },
    // 监听路径变化
    watch: {
        $route: function(newValue) {
            this.getData()
        }
    }
};
</script>

<style scoped>
@import url('../../statics/site/js/jqimgzoom/css/magnifier.css');
.smallCart {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 50px;
}
.smallCart img {
    width: 100%;
    height: 100%;
}
</style>


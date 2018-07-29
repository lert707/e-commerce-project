<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <router-link to="/goodslist">首页</router-link> &gt;
                <router-link to="/shopcart">购物车</router-link>
            </div>
        </div>

        <div class="section">
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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <div class="form-box address-info">
                                <el-form :model="orderForm" :rules="rules" ref="orderForm" label-width="150px" class="demo-ruleForm">
                                    <el-form-item label="收货人姓名：" prop="accept_name" style="width: 350px;">
                                        <el-input v-model="orderForm.accept_name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="所属地区：" prop="area" style="width: 800px;">
                                        <v-distpicker :province="orderForm.area.province.value" 
                                        :city="orderForm.area.city.value" 
                                        :area="orderForm.area.area.value"
                                        @selected="onSelected"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址：" prop="address" style="width: 350px;">
                                        <el-input v-model="orderForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码：" prop="mobile" style="width: 350px;">
                                        <el-input v-model="orderForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱：" prop="email" style="width: 350px;">
                                        <el-input v-model="orderForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码：" prop="post_code" style="width: 350px;">
                                        <el-input v-model="orderForm.post_code"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <label>
                                        <el-radio v-model="payment_id" label="6">在线支付</el-radio>
                                        <em>手续费：0.00元</em>
                                    </label>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio-group @change="expressChange" v-model="express_id">
                                        <el-radio :label="1">顺丰快递(20元)</el-radio>
                                        <el-radio :label="2">韵达快递(10元)</el-radio>
                                        <el-radio :label="3">EMS(8元)</el-radio>
                                    </el-radio-group>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="117" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in orderData" :key="item.id">
                                        <td width="68">
                                            <router-link target="_blank" :to="'/goodsinfo/'+item.id">
                                                <img :src="item.img_url" class="img">
                                            </router-link>
                                        </td>
                                        <td>
                                            <router-link target="_blank" :to="'/goodsinfo/'+item.id">{{item.title}}</router-link>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">
                                            <!-- <inputnumber :goodsId="item.id" :inputCount="item.buycount" @changeCount="changeCount"></inputnumber> -->
                                            {{item.buycount}}
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price * item.buycount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea v-model="message" name="message" class="input" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{getPayPrice}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <router-link to="/shopcart" class="btn button">返回购物车</router-link>
                                        <a id="btnSubmit" class="btn submit" @click="submitForm('orderForm')">确认提交</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import inputnumber from "../subcomponents/inputnumber";
import Distpicker from "v-distpicker";
export default {
  components: {
    inputnumber,
    "v-distpicker": Distpicker
  },
  data() {
    return {
      orderData: [],
      orderForm: {
        accept_name: "admin",
        area: {
          province: { code: "140000", value: "山西省" },
          city: { code: "140100", value: "太原市" },
          area: { code: "140106", value: "迎泽区" }
        },
        address: "城区",
        mobile: "18812345678",
        email: "qq@qq.com",
        post_code: "516000"
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" }
        ],
        area: [{ required: true, message: "请输入所属地区", trigger: "blur" }],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      },
      payment_id: "6",
      express_id: 1,
      expressMoment: 20,
      message: '请尽快发货',
      totalCount: 0,
      totalPrice: 0,
      goodsAmount: 0
    };
  },
  computed: {
    getPayPrice() {
        this.goodsAmount = this.totalPrice + this.expressMoment
        return this.goodsAmount
    }
  },
  created() {
    this.getOrderData();
  },
  methods: {
    // 获取订单数据
    getOrderData() {
      this.$axios
        .get(`site/validate/order/getgoodslist/${this.$route.query.ids}`)
        .then(res => {
          this.orderData = res.data.message;
          this.orderData.forEach(item => {
            this.totalCount += item.buycount;
            this.totalPrice += item.buycount * item.sell_price;
          });
        });
    },

    // 地址更改
    onSelected(newArea) {
      this.orderForm.area = newArea;
    },

    // 快递选择
    expressChange(value) {
      this.expressRadio = value;
      switch (value) {
        case 1:
          this.expressMoment = 20;
          break;
        case 2:
          this.expressMoment = 10;
          break;
        case 3:
          this.expressMoment = 8;
          break;
      }
    },

    // 确认订单
    submitForm(orderForm) {
      this.$refs[orderForm].validate(valid => {
        if (valid) {
            let cargoodsobj = {}
            for(const item of this.orderData) {
                for(const key in item) {
                    cargoodsobj[item["id"]] = item["buycount"]
                }
            }
            let data = {
                goodsAmount: this.goodsAmount,
                expressMoment: this.expressMoment,
                accept_name: this.orderForm.accept_name,
                area: this.orderForm.area,
                address: this.orderForm.address,
                mobile: this.orderForm.mobile,
                email: this.orderForm.email,
                post_code: this.orderForm.post_code,
                payment_id: this.payment_id,
                express_id: this.express_id,
                message: this.message,
                goodsids: this.$route.query.ids,
                cargoodsobj: cargoodsobj
            }
            this.$axios.post("site/validate/order/setorder",data).then(res=>{
                console.log(res)
                if (res.data.status === 0) {
                    this.$router.push({
                        path: 'payOrder',
                        query: {
                            orderId: res.data.message.orderid
                        }
                    })
                }
            })
        } else {
          this.$message({});
        }
      });
    }
  }
};
</script>


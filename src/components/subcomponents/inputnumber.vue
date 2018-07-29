<template>
    <div>
        <div @click="subCount" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="sumCount" class="right">+</div>
    </div>
</template>

<script>
export default {
  props: {
    inputCount: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: Number
    }
  },
  data() {
    return {
      count: 1
    };
  },
  created() {
    this.count = this.inputCount;
  },
  methods: {
    subCount() {
      if (this.count <= 1) return;
      this.count--;
      this.notify()
    },
    sumCount() {
      this.count++;
      this.notify()
    },
    notify() {
      const goods = {
        id: this.goodsId,
        buycount: this.count
      };
      this.$emit("changeCount", goods);
    }
  }
};
</script>

<style scoped>
.left,
.middle,
.right {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>



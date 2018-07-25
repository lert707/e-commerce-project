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
        }
    },
    data() {
        return {
            count: 1
        }
    },
    created() {
        this.count = this.inputCount
    },
    methods: {
        subCount() {
            this.$emit('sub',this.count--);
        },
        sumCount() {
            this.$emit('sum',this.count++);
        }
    }
}
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
    }
</style>



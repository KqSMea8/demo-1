<template>
    <div class="container">
        <div class="title">注册</div>
        <input type="text" class="input" v-model="name" placeholder="请输入用户名">
        <input type="password" class="input" v-model="password" placeholder="请输入密码">
        <div class="btn-register" @click="registerHandler">注册</div>
    </div>
</template>

<script>
    export default {
        mixins: [],
        data() {
            return {
                name: '',
                password: ''
            }
        },
        props: {},
        watch: {},
        computed: {},
        components: {},
        created() {},
        activated() {},
        mounted() {},
        updated() {},
        methods: {
            registerHandler() {
                // this.axios.post()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin: rem(40);
        padding: rem(50);
        background: #fff;
        box-shadow: 0 15px 50px 0 rgba(0,34,77,.08);
    }
    .title {
        margin: rem(80) auto;
        width: 100%;
        text-align: center;
        font-size: 26px;
        line-height: 37px;
    }
    .input {
        display: block;
        margin-top: rem(24);
        border: 0;
        border-bottom: 1px solid #ebeef5;
        padding: rem(28) 0;
        width: 100%;
        line-height: 20px;
        font-size: 14px;
    }
    .btn-register {
        display: block;
        margin-top: rem(40);
        padding: 0;
        width: 100%;
        text-align: center;
        font-size: 15px;
        line-height: 36px;
        border: 1px solid #0f88eb;
        text-shadow: none;
        color: #0f88eb;
    }
</style>

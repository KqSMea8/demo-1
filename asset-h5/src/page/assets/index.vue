<template>
    <div class="container">
        <div class="res-container">
            <h2 class="total-title">我的净资产</h2>
            <p class="num">{{totalMoney}}</p>
        </div>
        <ul class="money-detail">
            <li class="item" v-for="(item, index) in money" :key="index">
                <span>{{item.name}}：</span><span>{{item.value}}元</span>
            </li>
        </ul>
        <div class="add-input-container" v-if="addStatus" @keyup.enter="saveMoney">
            <label class="input-item">名称:<input class="input" placeholder="请输入" v-model="name" /></label>
            <label class="input-item">资产金额:<input class="input" type="number" placeholder="0" v-model="value" /></label>
            <button class="save-btn" @click="saveMoney">确定保存资产</button>
        </div>
        <button class="add-btn" @click="addMoney">增加资产</button>
    </div>
</template>
<script>
import Config from '../../utils/config'
export default {
    data () {
        return {
            money: [],
            addStatus: false,
            name: '',
            value: 0
        }
    },
    watch: {
    },
    computed: {
        totalMoney() {
            let sum = 0;
            let money = this.money;
            for (let i = 0; i < money.length; i++) {
                sum += money[i].value;
            }
            return sum.toFixed(2);
        }
    },
    components: {
    },
    created () {
    },
    mounted () {
        this.getAllRequestMoney();
    },
    updated() {
    },
    methods: {
        addMoney() {
            this.addStatus = true;
        },
        saveMoney() {
            let optionValue = parseFloat(this.optionValue, 10);
            this.addRequestMoney();
            this.$set(this.money, this.optionKey, optionValue);
            this.addStatus = false;
        },
        addRequestMoney() {
            this.axios.post(Config.api.addAsset, {
                name: this.name,
                value: this.value
            }).then((res) => {
                if (res.status === 0) {
                }
                else {
                    alert(res.msg);
                }
            })
        },
        getAllRequestMoney() {
            this.axios.get(Config.api.assetlist).then(res => {
                if (res.status === 0) {
                    this.money = res.data.list;
                }
                else {
                    alert(res.msg);
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.container {
    padding: 16px;
    font-size: rem(32);
    text-align: center;
    line-height: 1.6;
}
.money-detail {
    .item {
        display: flex;
        justify-content: space-between;
        font-size: 24px;
    }
}
.add-input-container {
    display: flex;
    flex-direction: column;
    margin: 30px 0;
    font-size: 24px;
    .input-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        input {
            text-align: right;
            border: none;
            outline: none;
        }
    }
    .save-btn {
        padding: 10px;
        color: #fff;
        background-color: #0077e6;
    }
}
.add-btn,
.save-btn {
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 14px;
}
.add-btn {
    width: 100%;
    margin-top: 10px;
    border: 1px solid #0084ff;
    color: #0084ff;
    background-color: #fff;
}

.input {
    font-size: 24px;
    border: 1px solid #000;
}
.res-container {
    .total-title {
        margin-top: 10px;
        font-size: 16px;
    }
    .num {
        font-size: 48px;
        font-weight: 700;
        color: #1a1a1a;
    }
}
</style>

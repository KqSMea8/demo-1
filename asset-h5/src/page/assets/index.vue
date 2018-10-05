<template>
    <div class="container">
        <div class="res-container">
            <h2 class="total-title">我的净资产</h2>
            <p class="num">{{totalMoney}}</p>
        </div>
        <ul class="money-detail">
            <li class="item" v-for="(item, index) in money" :key="index" data-type="0">
                <div class="list-item"
                    @touchstart.capture="touchStart"
                    @touchend.capture="touchEnd"
                    @click="skip">
                    <span>{{item.name}}：</span><span>{{item.value}}元</span>
                </div>
                <div class="delete" @click="deleteItem" :data-index="index">删除</div>
            </li>
        </ul>
        <div class="add-input-container" v-show="addStatus" @keyup.enter="saveMoney">
            <div class="input-item">
                <label class="label" for="name">名称:</label>
                <input class="input" placeholder="请输入" v-model="name" id="name" />
            </div>
            <div class="input-item">
                <label class="label" for="value">资产金额:</label>
                <input class="input" type="number" placeholder="0" v-model="value" id="value"/>
            </div>
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
            value: 0,
            startX: 0
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
            this.addStatus = false;
        },
        addRequestMoney() {
            this.axios.post(Config.api.addAsset, {
                name: this.name,
                value: this.value
            }).then(res => {
                if (res.status === 0) {
                    this.money.push({
                        id: res.data.id,
                        name: this.name,
                        value: parseFloat(this.value, 10)
                    });
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
                    console.log(this.money);
                }
                else {
                    alert(res.msg);
                }
            })
        },
        touchStart() {
            this.startX = e.touches[0].clientX;
        },
        touchEnd(e) {
            let parentElement = e.currentTarget.parentElement;
            this.endX = e.changedTouches[0].clientX;

            // 左滑
            if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
                this.restSlide();
                parentElement.dataset.type = 1;
            }

            // 右滑
            if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
                this.restSlide();
                parentElement.dataset.type = 0;
            }

            this.startX = 0;
            this.endX = 0;
        },
        checkSlide() {
            let listItems = document.querySelectorAll('.list-item');
            for (let i = 0; i < listItems.length; i++) {
                if (listItems[i].dataset.type == 1) {
                    return true;
                }
            }

            return false;
        },
        restSlide() {
            let listItems = document.querySelectorAll('.list-item');
            for (let i = 0; i < listItems.length; i++) {
                listItems[i].dataset.type = 0;
            }
        },
        skip() {
            if (this.skipSlide()) {
                this.restSlide();
            }
            else {
                alert('you click the slide!');
            }
        },
        deleteItem(e) {
            let index = e.currentTarget.dataset.index;
            console.log(index);
            this.restSlide();
            if (window.confirm(Config.msg.delete)) {
                this.axios.post(Config.api.deleteasset, {
                    id: this.money[index].id
                }).then(res => {
                    if (res.status === 0) {
                        this.money.splice(index, 1);
                    }
                    else {
                        alert(res.msg);
                    }
                })
            }
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
        line-height: 34px;
    }
}
.add-input-container {
    display: flex;
    flex-direction: column;
    margin: rem(50) 0;
    font-size: 24px;
    line-height: 34px;
    .input-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: rem(20);
        input {
            width: 50%;
            margin-left: rem(30);
            text-align: right;
            border: none;
            outline: none;
        }
    }
    .save-btn {
        padding: rem(20);
        color: #fff;
        background-color: #0077e6;
    }
}
.add-btn,
.save-btn {
    margin-bottom: rem(20);
    padding: rem(10);
    border-radius: rem(4);
    cursor: pointer;
    font-size: 14px;
    line-height: 24px;
}
.add-btn {
    width: 100%;
    margin-top: rem(20);
    border: 1px solid #0084ff;
    color: #0084ff;
    background-color: #fff;
}

.input {
    font-size: 24px;
    line-height: 34px;
    border: 1px solid #000;
}
.res-container {
    .total-title {
        margin-top: rem(20);
        font-size: 16px;
        line-height: 26px;
    }
    .num {
        font-size: 48px;
        line-height: 58px;
        font-weight: 700;
        color: #1a1a1a;
    }
}
</style>

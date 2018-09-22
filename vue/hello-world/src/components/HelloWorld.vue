<template>
    <div class="hello">
        <!-- 失活的组件将会被缓存！-->
        <keep-alive>
            <component v-bind:is="currentTabComponent"></component>
        </keep-alive>
        <keep-alive include="a,b">
            <component :is="view"></component>
        </keep-alive>
        <keep-alive :include="/a|b/">
            <component :is="view"></component>
        </keep-alive>
        <keep-alive :include="['a', 'b']">
            <component :is="view"></component>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "HelloWorld",
        data () {
            return {
                currentTab: 'Posts',
                tabs: ['Posts', 'Archive']
            }
        },
        computed: {
            currentTabComponent () {
                return 'tab-' + this.currentTab.toLowerCase();
            }
        },

    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>

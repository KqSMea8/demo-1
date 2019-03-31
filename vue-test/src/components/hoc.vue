<template>
<div class="hello">
<function-button @click="log">click me</function-button>
</div>
</template>

<script>
import FunctionButton from './FunctionButton'
export default {
    name: 'hoc',
    data () {
        return {
        }
    },
    components: {
        FunctionButton
    },
    methods: {
        log () {
            console.log('click')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
h1,
h2 {
    font-weight: normal;
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

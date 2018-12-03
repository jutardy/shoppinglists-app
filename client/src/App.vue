<template>
    <div id="app">
        <Nav />
        <div class="page-container">
            <router-view />
        </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
    name: 'App',
    components: { Nav }
};
</script>

<style lang="scss">
#app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;*/
    text-align: center;
    color: #2c3e50;
}
.form-control:focus {
    border-color: #999;
    box-shadow: none;
}
.page-container {
    padding-top: 40px;
}
.cursor-pointer {
    cursor: pointer;
}
</style>

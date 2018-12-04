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
    text-align: center;
    color: #2c3e50;
}
.form-control:focus {
    border-color: #999;
    box-shadow: none;
}
.page-container {
    padding-top: 60px;
}
.cursor-pointer {
    cursor: pointer;
}
h1, h2, h3, h4, h5, h6 {
    font-weight: 300 !important;
}
</style>

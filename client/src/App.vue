<template>
    <div id="app">
        <Nav />
        <div class="page-container">
            <router-view />
        </div>
        <Modal />
    </div>
</template>

<script>
import Nav from '@/components/includes/Nav';
import Modal from '@/components/includes/Modal';

export default {
    name: 'App',
    components: { Nav, Modal }
};
</script>

<style lang="scss">
#app {
    text-align: center;
    height: 100vh;
}
.form-control:focus {
    box-shadow: none;
}
.page-container {
    height: calc(100% - 56px);

    .view-container {
        padding-top: 60px;
        padding-bottom: 40px;
        @media #{$xxs-max} {
            padding: 40px 15px;
        }
    }
    .register-page, .login-page {
        background: url('./assets/images/background.jpg');
        background-size: cover;
        background-position: center;
        height: 100%;
    }
}
.block-shadow {
    -webkit-box-shadow: 0px 8px 20px 0px rgba(212, 212, 212, 0.7);
    -moz-box-shadow: 0px 8px 20px 0px rgba(212, 212, 212, 0.7);
    box-shadow: 0px 8px 20px 0px rgba(212, 212, 212, 0.7);
}
h1, h2, h3, h4, h5, h6 {
    font-weight: 300 !important;
}
</style>

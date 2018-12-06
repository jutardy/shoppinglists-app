import './assets/sass/app.scss';
import 'bootstrap';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import './api';

Vue.config.productionTip = false;
Vue.use(VeeValidate);

const eventBus = new Vue();
Vue.prototype.$events = eventBus;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

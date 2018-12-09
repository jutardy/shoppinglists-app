import './assets/sass/app.scss';
import 'bootstrap';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import vueNumeralFilter from 'vue-numeral-filter';
import VueSocketio from 'vue-socket.io';
import './api';


Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(vueNumeralFilter, { locale: 'en-gb' });
Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://localhost:4000',
    // vuex: {
    //     store,
    //     actionPrefix: 'SOCKET_',
    //     mutationPrefix: 'SOCKET_'
    // }
}));

const eventBus = new Vue();
Vue.prototype.$events = eventBus;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

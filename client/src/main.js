import './api';
import './assets/sass/app.scss';
import 'bootstrap';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidate from 'vee-validate';
import Vue from 'vue';
import vueNumeralFilter from 'vue-numeral-filter';
import VueSocketio from 'vue-socket.io';

Vue.config.productionTip = false;
Vue.use(VeeValidate);
Vue.use(vueNumeralFilter, { locale: 'en-gb' });
Vue.use(new VueSocketio({
    debug: true,
    connection: 'http://18.184.106.119:3000'
}));

const eventBus = new Vue();
Vue.prototype.$events = eventBus;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

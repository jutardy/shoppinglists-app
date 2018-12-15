import axios from 'axios';
import Vue from 'vue';

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http.defaults.baseURL = 'http://localhost:4000/api';

Vue.prototype.$http.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token');
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete config.headers.common['Authorization'];
        }
        return config;
    }
);

Vue.prototype.$http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status && error.response.status === 401 &&
            error.response.data && error.response.data.code && error.response.data.code === 35) {
            localStorage.removeItem('token');
            localStorage.removeItem('authUser');
            window.location.href = '/login?session-expired';
        }
        return Promise.reject(error);
    }
);

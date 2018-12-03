import axios from 'axios';
import Vue from 'vue';

Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
Vue.prototype.$http.defaults.baseURL = 'http://localhost:4000/api';

// export default() => {
//     return axios.create({
//         headers: { 'X-Requested-With': 'XMLHttpRequest' },
//         baseURL: 'http://localhost:4000/api'
//     });
// };

// window.axios.interceptors.response.use((response) => { // intercept the global error
//     if (response.data && response.data.error && response.data.error.code &&
//         _.includes(window.global.apiConst.loginErrorCodes, response.data.error.code)) {
//         window.location.href = '/login';
//     }
//     return response;
// }, function (error) {
//     if (error.response && error.response.status && error.response.status == 401 &&
//         error.response.data && error.response.data.error && error.response.data.error == 'Unauthenticated.') {
//         window.location.href = '/login';
//     }
//     return Promise.reject(error);
// });

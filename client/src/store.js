import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        user: localStorage.getItem('authUser') || null,
        modalContent: {
            opened: false,
            title: '',
            body: '',
            cancelCTA: '',
            submitCTA: '',
            submitEvent: '',
            submitEventParam: null
        },
        recentUsers: []
    },
    mutations: {
        authenticate (state, res) {
            state.token = res.token;
            state.user = res.user;
        },
        logout (state) {
            state.token = '';
            state.user = null;
        },
        setModalContent (state, content) {
            state.modalContent = {
                title: content.title ? content.title : '',
                body: content.body ? content.body : '',
                cancelCTA: content.cancelCTA ? content.cancelCTA : '',
                submitCTA: content.submitCTA ? content.submitCTA : '',
                submitEvent: content.submitEvent ? content.submitEvent : '',
                submitEventParam: content.submitEventParam ? content.submitEventParam : null,
                opened: true
            };
        },
        closeModal (state) {
            state.modalContent = {
                opened: false,
                title: '',
                body: '',
                cancelCTA: '',
                submitCTA: '',
                submitEvent: '',
                submitEventParam: null
            };
        }
    },
    actions: {
        login ({ commit }, user) {
            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    email: user.email,
                    password: user.password,
                    extendToken: user.extendToken
                })
                    .then(response => {
                        let token = response.data.token;
                        let user = JSON.stringify(response.data.user);
                        let res = { token: token, user: user };
                        localStorage.setItem('token', token);
                        localStorage.setItem('authUser', user);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                        commit('authenticate', res);
                        resolve(response);
                    })
                    .catch(error => {
                        localStorage.removeItem('token');
                        reject(error);
                    });
            });
        },
        logout ({ commit }) {
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('token');
                localStorage.removeItem('authUser');
                delete axios.defaults.headers.common['Authorization'];
                resolve();
            });
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        getUser: state => JSON.parse(state.user),
        getModalContent: state => state.modalContent
    }
});

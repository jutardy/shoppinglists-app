<template>
    <div class="login-page">
        <div
            v-if="isLoggedIn"
            class="loggedin-block">
            <h5 class="mb-4">You are already logged in, {{ user.username }}!</h5>
            <p class="card-text">It seems you've landed here entering the login url or browsing back.</p>
            <router-link
                class="btn btn-primary mt-2"
                to="/shoppinglist">Go to My List</router-link>
        </div>
        <div
            v-else
            class="unlogged-block">
            <h3 class="mb-0">Welcome back!</h3>
            <div
                v-if="sessionExpired"
                class="small text-danger session-message mt-2">
                Your session expired. Please login again.
            </div>
            <form
                :data-vv-scope="formScope"
                class="form-login mt-4"
                @submit.prevent="validateForm">

                <input
                    v-validate="'required|email'"
                    v-model="email"
                    name="email"
                    type="text"
                    class="form-control"
                    placeholder="Email address">
                <span
                    v-show="errors.has('email', formScope)"
                    class="small text-danger text-left d-block">{{ errors.first('email', formScope) }}</span>
                <span
                    v-show="unregisteredEmailMsg !== ''"
                    class="small text-danger text-left d-block">{{ unregisteredEmailMsg }}</span>

                <input
                    v-validate="'required|min:6'"
                    v-model="password"
                    name="password"
                    type="password"
                    class="form-control mt-2"
                    placeholder="Password">
                <span
                    v-show="errors.has('password', formScope)"
                    class="small text-danger text-left d-block">{{ errors.first('password', formScope) }}</span>
                <span
                    v-show="invalidPasswordlMsg !== ''"
                    class="small text-danger text-left d-block mb-2">{{ invalidPasswordlMsg }}</span>

                <div class="checkbox mt-2 mb-3">
                    <label>
                        <input
                            type="checkbox"
                            v-model="extendToken"> Remember me
                    </label>
                </div>

                <button
                    :disabled="formHasError"
                    class="btn btn-lg btn-primary btn-block"
                    type="submit">Log in</button>

                <p class="small mt-2 mb-0 text-muted">
                    I don't have an account yet. <router-link to="/register">Register.</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            formScope: 'loginScope',
            email: '',
            password: '',
            extendToken: false,
            invalidPasswordlMsg: '',
            unregisteredEmailMsg: '',
            sessionExpired: this.$route.query.hasOwnProperty('session-expired') || false
        };
    },
    computed: {
        formHasError () {
            return this.errors.any() || this.invalidPasswordlMsg !== '' || this.unregisteredEmailMsg !== '';
        },
        isLoggedIn () {
            return this.$store.getters.isLoggedIn;
        },
        user () {
            return this.$store.getters.getUser;
        }
    },
    watch: {
        email () {
            if (this.unregisteredEmailMsg !== '') {
                this.unregisteredEmailMsg = '';
            }
            if (this.invalidPasswordlMsg !== '') {
                this.invalidPasswordlMsg = '';
            }
        },
        password () {
            if (this.invalidPasswordlMsg !== '') {
                this.invalidPasswordlMsg = '';
            }
        }
    },
    methods: {
        validateForm () {
            this.$validator.validateAll(this.formScope).then(() => {
                if (this.errors.any()) return;
                this.submitLogin();
            }).catch(() => {});
        },
        submitLogin () {
            let user = { email: this.email, password: this.password, extendToken: this.extendToken };

            this.$store.dispatch('login', user)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push('/shoppinglist');
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 30) {
                        this.unregisteredEmailMsg = error.response.data.error.message;
                    }
                    if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 32) {
                        this.invalidPasswordlMsg = error.response.data.error.message;
                    }
                    this.isLoading = false;
                });
        }
    }
};
</script>

<style lang="scss" scoped>
    .login-page {
        border: 1px solid $border-block;
        border-radius: 6px;
        background: white;
        width: 330px;
        padding: 20px;
        margin: 0 auto;
    }
</style>

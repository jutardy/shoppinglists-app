<template>
    <div class="register-page view-container">
        <div class="register-block">
            <h2 class="mb-4">Create a new account</h2>
            <form
                :data-vv-scope="formScope"
                class="form-signin"
                @submit.prevent="validateForm">
                <input
                    v-validate="'required|min:2'"
                    v-model="username"
                    name="username"
                    type="text"
                    maxlength="30"
                    class="form-control"
                    placeholder="Username">
                <span
                    v-show="errors.has('username', formScope)"
                    class="small text-danger text-left d-block">{{ errors.first('username', formScope) }}</span>

                <input
                    v-validate="'required|email'"
                    v-model="email"
                    name="email"
                    type="text"
                    class="form-control mt-2"
                    placeholder="Email address">
                <span
                    v-show="errors.has('email', formScope)"
                    class="small text-danger text-left d-block">{{ errors.first('email', formScope) }}</span>
                <span
                    v-show="existingEmailMsg !== ''"
                    class="small text-danger text-left d-block">{{ existingEmailMsg }}</span>

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

                <button
                    :disabled="formHasError"
                    class="mt-4 btn btn-lg btn-primary btn-block"
                    type="submit">Sign in</button>

                <p class="small mt-2 mb-0 text-muted">
                    I already have an account. <router-link to="/login">Log in.</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data () {
        return {
            formScope: 'registerScope',
            username: '',
            email: '',
            password: '',
            isLoading: false,
            existingEmailMsg: ''
        };
    },
    computed: {
        formHasError () {
            return this.errors.any() || this.existingEmailMsg !== '';
        }
    },
    watch: {
        email () {
            if (this.existingEmailMsg !== '') {
                this.existingEmailMsg = '';
            }
        }
    },
    methods: {
        validateForm () {
            this.$validator.validateAll(this.formScope).then(() => {
                if (this.formHasError) return;
                this.submitRegister();
            }).catch(() => {});
        },
        submitRegister () {
            if (!this.isLoading) {
                this.isLoading = true;

                this.$http.post('/register', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                })
                    .then(function (response) {
                        if (response && response.data && response.data._id) {
                            this.$socket.emit('NEW_USER');
                            this.logUserIn();
                        }
                    }.bind(this))
                    .catch(function (error) {
                        if (error.response && error.response.data && error.response.data.error && error.response.data.error.code === 11000) {
                            this.existingEmailMsg = error.response.data.error.message;
                        }
                        this.isLoading = false;
                    }.bind(this));
            }
        },
        logUserIn () {
            let user = { email: this.email, password: this.password };

            this.$store.dispatch('login', user)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push('/shoppinglist');
                })
                .catch(() => {
                    this.isLoading = false;
                });
        }
    }
};
</script>

<style lang="scss">
.register-page {
    .register-block {
        border: 1px solid $border-block;
        border-radius: 6px;
        background: white;
        width: 500px;
        padding: 20px;
        margin: 0 auto;
        @media #{$xxs-max} {
            width: 100%;
        }
    }
}
</style>

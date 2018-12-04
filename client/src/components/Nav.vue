<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a
            class="navbar-brand"
            href="#">ShoppingLists App</a>
        <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"/>
        </button>
        <div
            id="navbarNavAltMarkup"
            class="collapse navbar-collapse">
            <ul class="navbar-nav w-100">
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        class="nav-link"
                        to="/documentation">Documentation</router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        v-if="isLoggedIn"
                        class="nav-link"
                        to="/shoppinglist">My List</router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        v-if="!isLoggedIn"
                        class="nav-link"
                        to="/login">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link
                        v-if="!isLoggedIn"
                        class="nav-link"
                        to="/register">Register</router-link>
                </li>
                <li class="nav-item ml-auto">
                    <span
                        v-if="isLoggedIn"
                        class="nav-link">
                        Hi, {{ user.username }}!
                        <a
                            class="btn-link cursor-pointer"
                            tabindex=""
                            @click="logout">Logout</a>
                    </span>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Nav',
    computed: {
        isLoggedIn () {
            return this.$store.getters.isLoggedIn;
        },
        user () {
            return this.$store.getters.getUser;
        }
    },
    methods: {
        logout () {
            this.$store.dispatch('logout')
                .then(() => {
                    this.$router.push('/login');
                });
        }
    }
};
</script>

<style lang="scss">
    .navbar { height: $navbar-height; }
    .bg-light { background-color: $navbar-bg !important; }
    .navbar-light .navbar-nav {
        .nav-link {
            color: $black !important;
            &:focus, &:hover { color: $blue !important; }
            &.router-link-exact-active { color: $red !important; }
        }
    }
</style>

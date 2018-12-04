<template>
    <div class="list-page">
        <div
            v-if="userNotFound"
            class="message-block">
            <h5 class="mb-4">Shopping list not found.</h5>
            <p class="card-text">The list you've requesetd doesn't exist.</p>
            <a
                class="btn btn-primary mt-2"
                tabindex
                @click="$router.go(-1)">Go back</a>
        </div>
        <div
            v-else
            class="list-content">
            <h1>{{ title }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShoppingList',
    data () {
        return {
            title: '',
            user: null,
            userNotFound: false
        };
    },
    computed: {
        isLoggedIn () {
            return this.$store.getters.isLoggedIn;
        },
        authUser () {
            return this.$store.getters.getUser;
        },
        userId () {
            return this.$route.params.userId || null;
        },
        isMyList () {
            return this.isLoggedIn && (this.userId === null || this.userId === this.authUser._id);
        }
    },
    watch: {
        userId () {
            this.userNotFound = false;
            !this.isMyList ? this.getUsername() : this.setTitle(this.authUser.username);
        }
    },
    mounted () {
        if (!this.isLoggedIn && this.userId === null) {
            this.$router.push('/login');
        }
        !this.isMyList ? this.getUsername() : this.setTitle(this.authUser.username);
    },
    methods: {
        getUsername () {
            this.userNotFound = false;

            this.$http.get(`/users/${this.userId}`)
                .then(response => {
                    if (response.data && response.data.user) {
                        this.user = response.data.user;
                        this.setTitle(this.user.username);
                    } else {
                        this.userNotFound = true;
                    }
                })
                .catch(error => {
                    this.userNotFound = true;
                    console.log(error);
                });
        },
        setTitle (username) {
            this.title = `${username}'s shopping list`;
        }
    }
};
</script>

<style lang="scss" scoped>
    .message-block {
        border: 1px solid $border-block;
        border-radius: 6px;
        background: white;
        width: 330px;
        padding: 20px;
        margin: 0 auto;
    }
</style>

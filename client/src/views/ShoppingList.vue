<template>
    <div class="list-page view-container">
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
            <form
                v-if="isMyList"
                class="form-creation mt-4"
                @submit.prevent="submitCreation"
            >
                <div class="new-item-input-wrapper position-relative">
                    <input
                        class="input-new-item w-100"
                        type="text"
                        :placeholder="createPlaceholder">
                    <button
                        class="btn-new-item position-absolute cursor-pointer"
                        type="submit">
                        <i class="fa fa-plus" aria-hidden="true" />
                    </button>
                </div>
            </form>
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
            userNotFound: false,
            formCreationScope: 'creationScope',
            items: []
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
        },
        createPlaceholder () {
            return this.items.length > 0 ? 'Add another item' : 'Add your first item';
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
        },
        submitCreation () {}
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
    .new-item-input-wrapper { width: 500px; margin: 0 auto; height: 60px; }
    .input-new-item { padding: 12px 20px 12px 80px; }
    .btn-new-item { height: 60px; width: 60px; left: 0; font-size: 24px; }
</style>

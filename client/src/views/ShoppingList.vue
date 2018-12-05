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
            <div class="summary text-muted">
                {{ summary }}
                <a
                    v-if="items.length > 0 && isMyList"
                    class="btn-link cursor-pointer"
                    tabindex
                    @click="emptyList">Empty list.</a>
            </div>
            <form
                v-if="isMyList"
                class="form-creation mt-4 mb-4"
                @submit.prevent="submitCreation"
            >
                <div
                    :class="{ active: isCreating }"
                    class="new-item-input-wrapper position-relative">
                    <input
                        class="input-new-item w-100 form-control"
                        type="text"
                        v-model.trim="newItem"
                        maxlength="100"
                        @focus="isCreating=true"
                        @blur="isCreating=false"
                        :placeholder="createPlaceholder">
                    <button
                        class="btn btn-new-item position-absolute cursor-pointer bg-white"
                        type="submit">
                        <i class="fa fa-plus" aria-hidden="true" />
                    </button>
                </div>
            </form>

            <div class="list-block">
                <table
                    v-if="items.length > 0"
                    class="list-table w-100">
                    <tr
                        v-for="(item, index) in items"
                        :key="index"
                        :data-index="index"
                        class="list-row">
                        <td class="actions-cell text-left">{{ item.name }}</td>
                        <td
                            v-if="isMyList"
                            class="actions-cell text-right">
                            <a
                                class="btn-edit cursor-pointer"
                                @click="updateItem(index)">
                                <i class="fa fa fa-pencil" aria-hidden="true" />
                            </a>
                            <a
                                class="btn-delete cursor-pointer"
                                @click="removeConfirmation(item)">
                                <i class="fa fa fa-times" aria-hidden="true" />
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
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
            newItem: '',
            items: [],
            isCreating: false
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
        },
        summary () {
            return this.items.length !== 1 ? `${this.items.length} items.` : '1 item.';
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
        this.getList();
    },
    created () {
        this.$events.$on('removeItemEvent', this.removeItem);
    },
    beforeDestroy () {
        this.$events.$off('removeItemEvent', this.removeItem);
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
                .catch(() => {
                    this.userNotFound = true;
                });
        },
        setTitle (username) {
            this.title = `${username}'s shopping list`;
        },
        submitCreation () {
            if (this.newItem === '') return;
            const repeatedIndex = this.getItemIndex(this.newItem);

            if (repeatedIndex === -1) {
                this.createItem();
                this.newItem = '';
            } else {
                var repeatedItem = document.querySelector(`tr[data-index="${repeatedIndex}"]`);
                repeatedItem.classList.add('highlight');
                setTimeout(function () {
                    repeatedItem.classList.remove('highlight');
                }, 600);
            }
        },
        getItemIndex (string) {
            return this.items.findIndex(item => string.toLowerCase() === item.name.toLowerCase());
        },
        emptyList () {
            this.items = [];
        },
        removeConfirmation (item) {
            let content = {
                title: 'You\'re about to delete an item permanently',
                body: `Are you sure you want to delete ${item.name}?`,
                submitCTA: 'Delete',
                cancelCTA: 'Cancel',
                submitEvent: 'removeItemEvent',
                submitEventParam: item
            };
            this.$store.commit('setModalContent', content);
        },
        removeItem (item) {
            this.$http.delete('/items', { 
                data: { id: item._id }
            })
                .then(response => {
                    this.$store.commit('closeModal');
                    this.getList();
                })
                .catch(error => {

                });
        },
        updateItem (index) {
            console.log('edit');
        },
        getList () {
            if (!this.userNotFound) {
                const uid = this.isMyList && this.userId === null ? this.authUser._id : this.userId;
                this.$http.get(`/items/${uid}`)
                    .then(response => {
                        this.items = response.data;
                    })
                    .catch(error => {

                    });
            }
        },
        createItem () {
            this.$http.post('/items', {
                user: this.authUser._id,
                name: this.newItem
            })
                .then(response => {
                    this.getList();
                })
                .catch(error => {

                });
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
    .list-content {
        width: 500px;
        margin: 0 auto;
    }
    .new-item-input-wrapper {
        height: 60px;
        border: 1px solid #CCCCCE;
        border-radius: 6px;
        overflow: hidden;
        &.active {
            border: 1px solid $input-focus-border-color;
        }
     }
    .input-new-item {
        padding: 12px 20px 12px 60px;
        height: 60px;
        border: 0;
        display: inline;
    }
    .btn-new-item {
        height: 60px;
        width: 60px;
        left: 0;
        font-size: 24px;
        i { color: $blue; }
        &:hover {
            i { opacity: 0.6; }
        }
    }
    .list-row td {
        border-bottom: 1px solid $border-block;
            height: 40px;
    }
    .actions-cell a {
        padding: 10px;
        color: $input-focus-border-color;
        &.btn-delete:hover { color: $red; }
    }
    .highlight {
        animation-name: colorhighlight;
        animation-duration: 0.5s;
    }

@keyframes colorhighlight {
    0% { background-color: $red; }
    25% { background-color: $red-light; }
    50% { background-color: $red; }
    75% { background-color: $red-light; }
    100% { background-color: $red; }
}
</style>

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
                    :class="{ active: focusCreate }"
                    class="new-item-input-wrapper position-relative">
                    <input
                        class="input-new-item w-100 form-control"
                        type="text"
                        v-model.trim="newItem"
                        maxlength="100"
                        @focus="focusCreate=true"
                        @blur="focusCreate=false"
                        :placeholder="createPlaceholder">
                    <button
                        class="btn btn-new-item position-absolute cursor-pointer bg-white"
                        type="submit">
                        <i class="fa fa-plus" aria-hidden="true" />
                    </button>
                </div>
            </form>

            <div class="list-block">
                <ul
                    v-if="items.length > 0"
                    class="list-table w-100">
                    <li
                        v-for="(item, index) in items"
                        :key="index"
                        :data-index="index"
                        :class="{'is-editing': editedItem !== null && editedItem._id === item._id}"
                        class="list-row d-flex d-flex-row">
                        <div class="text-cell text-left d-inline-block align-self-center">
                            <span v-show="editedItem === null || editedItem._id !== item._id">
                                {{ item.name }}
                            </span>
                            <input
                                v-if="editedItem !== null && editedItem._id === item._id"
                                class="input-edit-item w-100 form-control border-0 p-sides-10"
                                type="text"
                                v-model.trim="editedItem.name"
                                maxlength="100"
                                v-focus
                                @blur="editionCanceled($event, item)"
                                @keyup.enter="updateItem(item)"
                                @keyup.esc="editionCanceled(item)">
                        </div>
                        <div
                            v-if="isMyList"
                            class="actions-cell text-left d-inline-block align-self-top">
                            <a
                                v-show="editedItem === null || editedItem._id !== item._id"
                                class="btn-edit cursor-pointer text-center"
                                @click="editionStart(item)">
                                <i class="fa fa fa-pencil" aria-hidden="true" />
                            </a>
                            <a
                                v-show="editedItem !== null && editedItem._id === item._id"
                                class="btn-edit-done cursor-pointer text-center text-success"
                                @mousedown.prevent
                                @click="updateItem(item)">
                                <i class="fa fa-check-circle" aria-hidden="true" />
                            </a>
                            <a
                                v-show="editedItem === null || editedItem._id !== item._id"
                                class="btn-delete cursor-pointer text-center"
                                @click="removeConfirmation(item)">
                                <i class="fa fa fa-times" aria-hidden="true" />
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ShoppingList',
    data () {
        return {
            canCancelEdition: true,
            editedItem: null,
            focusCreate: false,
            formCreationScope: 'creationScope',
            isLoading: false,
            items: [],
            newItem: '',
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
        },
        createPlaceholder () {
            return this.items.length > 0 ? 'Add another item' : 'Add your first item';
        },
        summary () {
            return this.items.length !== 1 ? `${this.items.length} items.` : '1 item.';
        }
    },
    directives: {
        focus: {
            inserted (el) { el.focus(); }
        }
    },
    watch: {
        userId () {
            this.userNotFound = false;
            this.initUser();
        }
    },
    mounted () {
        if (!this.isLoggedIn && this.userId === null) {
            this.$router.push('/login');
        } else {
            this.initUser();  
        }
    },
    created () {
        this.$events.$on('removeItemEvent', this.removeItem);
    },
    beforeDestroy () {
        this.$events.$off('removeItemEvent', this.removeItem);
    },
    methods: {
        initUser () {
            if (this.isMyList) {
                this.setTitle(this.authUser.username);
                this.getList();
            } else {
                this.getUsername();
            }
        },
        getUsername () {
            this.userNotFound = false;

            this.$http.get(`/users/${this.userId}`)
                .then(response => {
                    if (response.data && response.data.user) {
                        this.user = response.data.user;
                        this.setTitle(this.user.username);
                        this.getList();
                    } else {
                        this.userNotFound = true;
                    }
                })
                .catch(() => {
                    this.isLoading = false;
                    this.openErrorModal('retrieve the user info');
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
                var repeatedItem = document.querySelector(`li[data-index="${repeatedIndex}"]`);
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
                .catch(() => {
                    this.isLoading = false;
                    this.openErrorModal('delete your item');
                });
        },
        editionStart (item) {
            this.editedItem = { ...item };
        },
        editionCanceled (event, item) {
            if (!this.editedItem) return;
            this.editedItem = null;
        },
        updateItem (item) {
            if (!this.editedItem) return;
            if (!this.editedItem.name !== item.name) {
                this.isLoading = true;
                this.$http.put('/items', this.editedItem)
                    .then(response => {
                        this.isLoading = false;
                        this.editedItem = null;
                        this.getList();
                    })
                    .catch(error => {
                        this.isLoading = false;
                        this.openErrorModal('update your item');
                    });
            }

        },
        getList () {
            if (!this.userNotFound) {
                const uid = this.isMyList && this.userId === null ? this.authUser._id : this.userId;
                this.$http.get(`/items/${uid}`)
                    .then(response => {
                        this.items = response.data;
                    })
                    .catch(() => {
                        this.isLoading = false;
                        this.openErrorModal('refresh your shopping list');
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
                    this.isLoading = false;
                    this.openErrorModal('create your item');
                });
        },
        openErrorModal (action) {
            let content = {
                title: 'Oooops something wrong happened!',
                body: `We were not able to ${action}.`,
                cancelCTA: 'Close'

            };
            this.$store.commit('setModalContent', content);
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
            background: none !important;
            i { color: $blue; }
            &:hover {
                i { opacity: 0.6; }
            }
        }
        &.active {
            border: 1px solid $blue;
            .input-new-item { background-color: white !important; }
        }
     }

    .list-row {
        border-bottom: 1px solid $border-block;
        min-height: 39px;
        &.is-editing { padding: 0 !important; }
    }
    .text-cell {
        width: calc(100% - 70px);
        span { 
            display: block; 
            padding: 7px 0 7px 10px;
        }
    }
    .input-edit-item { background-color: rgba(255, 255, 255, 0.4) !important; }
    .actions-cell {
        width: 70px;
        a {
            padding: 7px 0 6px;
            width: 35px;
            color: $input-focus-border-color;
            display: inline-block;
            &.btn-delete:hover { color: $red; }
        }
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

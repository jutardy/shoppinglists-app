<template>
    <div class="list-page view-container">
        <MessageBlock
            v-if="userNotFound"
            title="Shopping list not found."
            body="The list you've requested doesn't exist." />
        <div
            v-else
            class="list-content">
            <Loader
                v-show="userLoading"
                class="m-tb-50" />
            <div v-show="!userLoading">
                <h1>{{ title }}</h1>
                <div class="summary text-muted">
                    {{ summary }}
                    <a
                        v-if="items.length > 0 && isMyList"
                        class="btn-link cursor-pointer"
                        tabindex
                        @click="emptyListConfirmation">Empty list.</a>
                </div>
                <form
                    v-if="isMyList"
                    class="form-creation mt-4"
                    @submit.prevent="submitCreation">
                    <div
                        :class="{ active: focusCreate, 'block-shadow': focusCreate }"
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
            </div>

            <div class="list-block mt-4 block-shadow">
                <div class="list-header text-right">
                    <ListOrderTab
                        v-for="(tab, index) in sortOptions"
                        :class="{disabled: items.length<2, 'text-muted': !tab.active}"
                        :key="index"
                        :option="tab" />
                </div>
                <div class="list-body position-relative p-tb-10">
                    <div
                        v-show="listLoading"
                        class="loading-overlay position-absolute w-100">
                        <Loader
                            :options="{size: '40px'}"
                            class="align-self-center" />
                    </div>
                    <ul class="list-table">
                        <li
                            v-show="items.length === 0"
                            class="no-items-yet text-muted text-left p-tb-5">{{ emptyListPlaceholder }}</li>
                        <ListItem
                            v-for="(item, index) in items"
                            :item="item"
                            :show-actions="isMyList"
                            :key="index"
                            :data-index="index" />
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ListItem from '../components/shoppinglist/ListItem.vue';
import ListOrderTab from '../components/shoppinglist/ListOrderTab.vue';
import Loader from '../components/includes/Loader.vue';
import MessageBlock from '../components/includes/MessageBlock.vue';

export default {
    name: 'ShoppingList',
    components: {
        ListItem,
        ListOrderTab,
        Loader,
        MessageBlock
    },
    data () {
        return {
            focusCreate: false,
            items: [],
            listLoading: false,
            newItem: '',
            title: '',
            user: null,
            userLoading: false,
            userNotFound: false,
            sortOptions: [
                {
                    label: 'Created',
                    active: true,
                    order: -1,
                    field: 'created_at'
                },
                {
                    label: 'Name',
                    active: false,
                    order: 1,
                    field: 'name'
                }
            ]
        };
    },
    sockets: {
        UPDATE_LIST (isEditing = false) {
            let callback = isEditing ? () => this.$events.$emit('resetEditedItem') : null;
            this.getList(callback);
        }
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
        },
        activeSortOption () {
            return this.sortOptions.find(item => item.active === true);
        },
        emptyListPlaceholder () {
            return this.isMyList ? 'Start creating your shopping list!' : 'This shopping list is empty.';
        }
    },
    watch: {
        userId () {
            this.userNotFound = false;
            this.initUser();
        },
        activeSortOption () {
            this.getList();
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
        this.$events.$on('emptyListEvent', this.emptyList);
        this.$events.$on('listOrderChanged', this.onListOrderChanged);
        this.$events.$on('removeItemEvent', this.removeItem);
        this.$events.$on('updateListItem', this.onUpdateItem);
    },
    beforeDestroy () {
        this.$events.$off('emptyListEvent', this.emptyList);
        this.$events.$off('listOrderChanged', this.onListOrderChanged);
        this.$events.$off('removeItemEvent', this.removeItem);
        this.$events.$off('updateListItem', this.onUpdateItem);
    },
    methods: {
        // INITIALIZATION METHODS
        initUser () {
            if (this.isMyList) {
                this.setTitle(this.authUser.username);
                this.getList();
            } else {
                this.getUsername();
            }
        },
        getUsername () {
            if (!this.userLoading) {
                this.userNotFound = false;
                this.userLoading = true;

                this.$http.get(`/users/${this.userId}`)
                    .then(response => {
                        if (response.data && response.data.user) {
                            this.user = response.data.user;
                            this.setTitle(this.user.username);
                            this.getList();
                        } else {
                            this.userNotFound = true;
                        }
                        this.userLoading = false;
                    })
                    .catch(() => {
                        this.userLoading = false;
                        this.openErrorModal('retrieve the user info');
                    });
            }
        },
        setTitle (username) {
            this.title = `${username}'s shopping list`;
        },

        // GENERIC METHODS
        checkExistingItem (str, callback) {
            if (str === '') return;
            const repeatedIndex = this.items.findIndex(item => str.toLowerCase() === item.name.toLowerCase());

            if (repeatedIndex === -1) {
                callback();
            } else {
                var repeatedItem = document.querySelector(`li[data-index="${repeatedIndex}"]`);
                repeatedItem.classList.add('highlight');
                setTimeout(function () {
                    repeatedItem.classList.remove('highlight');
                }, 600);
            }
        },
        submitCreation () {
            let callback = () => {
                this.createItem();
                this.newItem = '';
            };
            this.checkExistingItem(this.newItem, callback);
        },
        onUpdateItem (item) {
            let callback = (updateItem) => {
                this.updateItem(item);
                this.$events.$emit('resetEditedItem');
            };
            this.checkExistingItem(item.name, callback);
        },
        onListOrderChanged (changedTab) {
            this.sortOptions.forEach(function (item) {
                item.active = false;
            });
            const activeIndex = this.sortOptions.findIndex(item => changedTab.label === item.label);
            this.sortOptions[activeIndex].active = true;
            this.sortOptions[activeIndex].order = changedTab.order;
        },

        // CRUD METHODS
        getList (callback = null) {
            if (!this.userNotFound && !this.listLoading) {
                const uid = this.isMyList && this.userId === null ? this.authUser._id : this.userId;
                this.listLoading = true;

                this.$http.get(`/items/${uid}`, {
                    params: {
                        field: this.activeSortOption.field,
                        order: this.activeSortOption.order
                    }
                })
                    .then(response => {
                        this.items = response.data;
                        this.listLoading = false;
                        if (callback) callback();
                    })
                    .catch(() => {
                        this.listLoading = false;
                        this.openErrorModal('refresh your shopping list');
                    });
            }
        },
        createItem () {
            if (!this.listLoading) {
                this.listLoading = true;

                this.$http.post('/items', {
                    user: this.authUser._id,
                    name: this.newItem
                })
                    .then(response => {
                        this.listLoading = false;
                        this.$socket.emit('NUMBER_ITEMS_UPDATED', this.authUser._id);
                        this.$socket.emit('LIST_UPDATED');
                    })
                    .catch(() => {
                        this.listLoading = false;
                        this.openErrorModal('create your item');
                    });
            }
        },
        removeItem (item) {
            if (!this.listLoading) {
                this.listLoading = true;

                this.$http.delete('/items', {
                    data: { id: item._id }
                })
                    .then(response => {
                        this.listLoading = false;
                        this.$store.commit('closeModal');
                        this.$socket.emit('NUMBER_ITEMS_UPDATED', this.authUser._id);
                        this.$socket.emit('LIST_UPDATED');
                    })
                    .catch(() => {
                        this.listLoading = false;
                        this.openErrorModal('delete your item');
                    });
            }
        },
        emptyList () {
            if (!this.listLoading) {
                this.listLoading = true;

                this.$http.delete('/items/all', {
                    data: { user: this.authUser._id }
                })
                    .then(response => {
                        this.listLoading = false;
                        this.$store.commit('closeModal');
                        this.$socket.emit('NUMBER_ITEMS_UPDATED', this.authUser._id);
                        this.$socket.emit('LIST_UPDATED');
                    })
                    .catch(() => {
                        this.listLoading = false;
                        this.openErrorModal('delete your item');
                    });
            }
        },
        updateItem (item) {
            if (!this.listLoading) {
                this.listLoading = true;

                this.$http.put('/items', item)
                    .then(response => {
                        this.listLoading = false;
                        this.$socket.emit('LIST_UPDATED', true);
                    })
                    .catch(() => {
                        this.listLoading = false;
                        this.openErrorModal('update your item');
                    });
            }
        },

        // FEEDBACK METHODS
        openErrorModal (action) {
            let content = {
                title: 'Oooops something wrong happened!',
                body: `We were not able to ${action}.`,
                cancelCTA: 'Close'

            };
            this.$store.commit('setModalContent', content);
        },
        emptyListConfirmation () {
            let content = {
                title: 'You are about to empty your Shopping List.',
                body: 'This process cannot be undone. Are you sure you want to proceed?',
                submitCTA: 'Empty my list',
                cancelCTA: 'Cancel',
                submitEvent: 'emptyListEvent'
            };
            this.$store.commit('setModalContent', content);
        }
    }
};
</script>

<style lang="scss" scoped>
.list-content {
    width: 500px;
    margin: 0 auto;
    @media #{$xxs-max} {
        width: 100%;
        h1 { font-size: 26px; }
    }
}
.new-item-input-wrapper {
    height: 60px;
    border: 1px solid #CCCCCE;
    border-radius: 3px;
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
.list-block {
    background: #EFEFF0;
    border-radius: 3px;
    overflow: hidden;

    .list-header {
        background: $blue;
        border-bottom: 1px solid #ccc;
        padding: 10px 20px;
        a {
            margin-right: 20px;
            &:last-of-type { margin-right: 0; }
        }
    }

    .list-table { margin: 0 20px; }
    li.list-row:last-of-type { border-bottom: 0; }
}
.loading-overlay {
    display: flex;
    background: rgba(230, 230, 232, 0.8);
    top: 0;
    z-index: 100;
    height:100%;
}
</style>

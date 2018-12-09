<template>
    <div class="home-page view-container">
        <h1 class="mb-5">Shopping Lists App</h1>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <ItemsBlock :loading="items.isLoading" />
                </div>
                <div class="col-12 col-md-6">
                    <ListsBlock :loading="lists.isLoading" />
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 ">
                    <UsersBlock :loading="users.isLoading" />
                </div>
                <div class="col-12 col-md-6">
                    <LastUsersBlock :loading="lastUsers.isLoading" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemsBlock from '../components/dashboard/ItemsBlock.vue';
import ListsBlock from '../components/dashboard/ListsBlock.vue';
import LastUsersBlock from '../components/dashboard/LastUsersBlock.vue';
import UsersBlock from '../components/dashboard/UsersBlock.vue';

export default {
    name: 'Home',
    components: {
        ItemsBlock,
        ListsBlock,
        LastUsersBlock,
        UsersBlock
    },
    data () {
        return {
            items: {
                data: 0,
                isLoading: false,
                hasError: false
            },
            lists: {
                data: 0,
                isLoading: false,
                hasError: false
            },
            users: {
                data: 0,
                isLoading: false,
                hasError: false
            },
            lastUsers: {
                data: 0,
                isLoading: false,
                hasError: false
            }
        };
    },
    sockets: {
        UPDATE_DASHBOARD (data) {
            data.forEach(model => {
                this.getBlockData(model);
            });
        }
    },
    mounted () {
        this.getDashboardData();
    },
    methods: {
        getDashboardData () {
            this.getBlockData('items');
            this.getBlockData('lists');
            this.getBlockData('users');
            this.getBlockData('lastUsers');
        },
        getBlockData (model) {
            if (!this[model].isLoading) {
                const endpoint = model === 'lastUsers' ? 'users/last' : model;
                this[model].hasError = false;
                this[model].isLoading = true;

                this.$http.get(`/dashboard/${endpoint}`)
                    .then(response => {
                        this[model].data = response.data[model];
                        this[model].isLoading = false;
                        this[model].hasError = false;
                        this.$events.$emit(`${model}Updated`, this[model]);
                    })
                    .catch(() => {
                        this[model].data = 0;
                        this[model].isLoading = false;
                        this[model].hasError = true;
                        this.$events.$emit(`${model}Updated`, this[model]);
                    });
            }
        }
    }
};
</script>

<style lang="scss">
.home-page {
    .dashboard-block {
        display: block;
        background: white;
        border-radius: 3px;
        margin: 15px 0;
        overflow: hidden;
    }
    .dashboard-block-header {
        text-align: left;
        padding: 10px 20px;
        color: white;

        &.bg-red { background-color: $red; }
        &.bg-blue { background-color: $blue; }
        &.bg-purple { background-color: $purple; }
        &.bg-orange { background-color: $orange; }

        h5 { margin: 0; }
    }
    .dashboard-block-body {
        padding: 5px 20px 12px;
        font-size: 15px;
        height: 175px;
    }
    .num {
        font-size: 72px;
        line-height: 1;
        font-weight: bold;
    }
    .data-label {
        font-weight: 300;
        font-size: 22px;
        line-height: 1.8;
    }
    .text-red { color: $red; }
    .text-blue { color: $blue; }
    .text-purple { color: $purple; }
    .text-orange { color: $orange; }
    .error-block i {
        font-size: 48px;
        margin-bottom: 10px;
        color: #BDBDBE;
    }
}
</style>

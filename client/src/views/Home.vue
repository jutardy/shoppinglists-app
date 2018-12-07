<template>
    <div class="home-page view-container">
        <h1 class="mb-5">Shopping Lists App</h1>
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="dashboard-block">
                        <div class="dashboard-block-header bg-red">
                            <h5><i class="fa fa-check-square-o m-r-10" />Items</h5>
                        </div>
                        <div class="dashboard-block-body d-flex flex-wrap align-items-center">
                            <div class="w-100 align-self-center">
                                <div class="num text-red">{{ items.data | numeral(items.data < 1000 ? '0a' : '0.0a') }}</div>
                                <div class="data-label">{{ pluralize('items') }} ready to be bought</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="dashboard-block">
                        <div class="dashboard-block-header bg-orange">
                            <h5><i class="fa fa-list-ul m-r-10" />Lists</h5>
                        </div>
                        <div class="dashboard-block-body d-flex flex-wrap align-items-center">
                            <div class="w-100 align-self-center">
                                <div class="num text-orange">{{ lists.data | numeral(lists.data < 1000 ? '0a' : '0.0a') }}</div>
                                <div class="data-label">{{ pluralize('lists') }} containing at least 1 item</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-6 ">
                    <div class="dashboard-block">
                        <div class="dashboard-block-header bg-purple">
                            <h5><i class="fa fa-users m-r-10" />Users</h5>
                        </div>
                        <div class="dashboard-block-body d-flex flex-wrap align-items-center">
                            <div class="w-100 align-self-center">
                                <div class="num text-purple">{{ users.data | numeral(users.data < 1000 ? '0a' : '0.0a') }}</div>
                                <div class="data-label">registered {{ pluralize('users') }} on the platform</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="dashboard-block">
                        <div class="dashboard-block-header bg-blue">
                            <h5><i class="fa fa-user-plus m-r-10" />Recent Users</h5>
                        </div>
                        <div class="dashboard-block-body d-flex flex-wrap align-items-center">
                            <div class="w-100 align-self-center">
                                <div
                                    v-for="(user, index) in lastUsers.data"
                                    :key="index"
                                    class="user-block">
                                    <span class="fs-18">{{ user.username }}</span> created {{ user.numItems == 1 ? '1 item.' : `${user.numItems} items.`}} <router-link :to="`/shoppinglist/${user.id}`">Go to list</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
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
    mounted () {
        this.getDashboardData();
    },
    methods: {
        pluralize (model) {
            return this[model].data === 1 ? model.slice(0, -1) : model;
        },
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
                        this.isLoading[model] = false;
                    })
                    .catch(() => {
                        this[model].isLoading = false;
                        this[model].hasError = true;
                    });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.home-page {
    .dashboard-block {
        display: block;
        background: white;
        border-radius: 3px;
        margin: 15px 0;
        overflow: hidden;
        -webkit-box-shadow: 0px 8px 20px 0px rgba(212, 212, 212, 0.7);
        -moz-box-shadow: 0px 8px 20px 0px rgba(212, 212, 212, 0.7);
        box-shadow: 0px 8px 20px 0px rgba(212, 212, 212, 0.7);

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
        padding: 10px 20px;
        font-size: 15px;
        height: 170px;
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
}
</style>

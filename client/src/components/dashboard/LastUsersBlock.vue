<template>
    <div class="dashboard-block last-users-block block-shadow">
        <div class="dashboard-block-header bg-blue">
            <h5><i class="fa fa-user-plus m-r-10" />Recent Users</h5>
        </div>
        <div class="dashboard-block-body d-flex flex-wrap align-items-center">
            <Loader
                v-show="loading"
                :options="{ color: '#258EA6', border: '6px'}" />
            <div
                v-show="!loading && !lastUsers.hasError"
                class="w-100 align-self-center">
                <div
                    v-show="lastUsers.data.length === 0"
                    class="w-100 align-self-center">
                    <div class="num text-blue">0</div>
                    <div class="data-label">recent users on the platform</div>
                </div>
                <div
                    v-for="(user, index) in lastUsers.data"
                    :key="index"
                    class="user-block">
                    <span class="fs-18">{{ user.username }}</span> created {{ user.numItems == 1 ? '1 item.' : `${user.numItems} items.`}} <router-link :to="`/shoppinglist/${user._id}`">Go to list</router-link>
                </div>
            </div>
            <div
                v-show="!loading && lastUsers.hasError"
                class="w-100 align-self-center error-block">
                <i class="fa fa-exclamation-circle" />
                <h6 class="mb-1 font-weight-normal">Ooops something went wrong!</h6>
                <p class="mb-0 text-muted">We were not able to retrieve the Items information.</p>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../includes/Loader.vue';

export default {
    name: 'LastUsersBlock',
    components: { Loader },
    props: ['loading'],
    data () {
        return {
            lastUsers: {
                data: 0,
                hasError: false
            },
            isLoading: this.loading
        };
    },
    created () {
        this.$events.$on('lastUsersUpdated', this.updateLastUsers);
    },
    beforeDestroy () {
        this.$events.$off('lastUsersUpdated', this.updateLastUsers);
    },
    methods: {
        updateLastUsers (updatedLastUsers) {
            this.lastUsers.data = updatedLastUsers.data;
            this.lastUsers.hasError = updatedLastUsers.hasError;
        }
    }
};
</script>

<style lang="scss">
.last-users-block {
    .user-block { 
        line-height: 1.2;
        padding: 3px 0;
    }
}
</style>

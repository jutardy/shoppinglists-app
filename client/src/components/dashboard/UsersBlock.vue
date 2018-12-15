<template>
    <div class="dashboard-block users-block block-shadow">
        <div class="dashboard-block-header bg-purple">
            <h5><i class="fa fa-users m-r-10" />Users</h5>
        </div>
        <div class="dashboard-block-body d-flex flex-wrap align-items-center">
            <Loader
                v-show="loading"
                :options="{ color: '#300032', border: '6px'}" />
            <div
                v-show="!loading && !users.hasError"
                class="w-100 align-self-center">
                <div class="num text-purple">{{ users.data | numeral(numeralFormat) }}</div>
                <div class="data-label">registered {{ usersPluralized }} on the platform</div>
            </div>
            <div
                v-show="!loading && users.hasError"
                class="w-100 align-self-center error-block">
                <i class="fa fa-exclamation-circle" />
                <h6 class="mb-1 font-weight-normal">Ooops something went wrong!</h6>
                <p class="mb-0 text-muted">We were not able to retrieve the Users information.</p>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../includes/Loader.vue';

export default {
    name: 'UsersBlock',
    components: { Loader },
    props: ['loading'],
    data () {
        return {
            users: {
                data: 0,
                hasError: false
            },
            isLoading: this.loading
        };
    },
    created () {
        this.$events.$on('usersUpdated', this.updateUsers);
    },
    beforeDestroy () {
        this.$events.$off('usersUpdated', this.updateUsers);
    },
    computed: {
        usersPluralized () {
            return this.users.data === 1 ? 'user' : 'users';
        },
        numeralFormat () {
            return this.users.data < 1000 ? '0a' : '0.0a';
        }
    },
    methods: {
        updateUsers (updatedUsers) {
            this.users.data = updatedUsers.data;
            this.users.hasError = updatedUsers.hasError;
        }
    }
};
</script>

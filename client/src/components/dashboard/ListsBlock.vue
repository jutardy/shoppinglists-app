<template>
    <div class="dashboard-block lists-block block-shadow">
        <div class="dashboard-block-header bg-orange">
            <h5><i class="fa fa-list-ul m-r-10" />Lists</h5>
        </div>
        <div class="dashboard-block-body d-flex flex-wrap align-items-center">
            <Loader
                v-show="loading"
                :options="{ color: '#CF5C36', border: '6px'}" />
            <div
                v-show="!loading && !lists.hasError"
                class="w-100 align-self-center">
                <div class="num text-orange">{{ lists.data | numeral(lists.data < 1000 ? '0a' : '0.0a') }}</div>
                <div class="data-label">{{ listsPluralized }} containing at least 1 item</div>
            </div>
            <div
                v-show="!loading && lists.hasError"
                class="w-100 align-self-center error-block">
                <i class="fa fa-exclamation-circle" />
                <h6 class="mb-1 font-weight-normal">Ooops something went wrong!</h6>
                <p class="mb-0 text-muted">We were not able to retrieve the Lists information.</p>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../includes/Loader.vue';

export default {
    name: 'ListsBlock',
    components: { Loader },
    props: ['loading'],
    data () {
        return {
            lists: {
                data: 0,
                hasError: false
            },
            isLoading: this.loading
        };
    },
    created () {
        this.$events.$on('listsUpdated', this.updateLists);
    },
    beforeDestroy () {
        this.$events.$off('listsUpdated', this.updateLists);
    },
    computed: {
        listsPluralized () {
            return this.lists.data === 1 ? 'list' : 'lists';
        }
    },
    methods: {
        updateLists (updatedLists) {
            this.lists.data = updatedLists.data;
            this.lists.hasError = updatedLists.hasError;
        }
    }
};
</script>

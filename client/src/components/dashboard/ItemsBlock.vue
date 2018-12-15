<template>
    <div class="dashboard-block items-block block-shadow">
        <div class="dashboard-block-header bg-red">
            <h5><i class="fa fa-check-square-o m-r-10" />Items</h5>
        </div>
        <div class="dashboard-block-body d-flex flex-wrap align-items-center">
            <Loader
                v-show="loading"
                :options="{ color: '#c43235', border: '6px'}" />
            <div
                v-show="!loading && !items.hasError"
                class="w-100 align-self-center data-block">
                <div class="num text-red">{{ items.data | numeral(numeralFormat) }}</div>
                <div class="data-label">{{ itemsPluralized }} ready to be bought</div>
            </div>
            <div
                v-show="!loading && items.hasError"
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
    name: 'ItemsBlock',
    components: { Loader },
    props: ['loading'],
    data () {
        return {
            items: {
                data: 0,
                hasError: false
            },
            isLoading: this.loading
        };
    },
    created () {
        this.$events.$on('itemsUpdated', this.updateItems);
    },
    beforeDestroy () {
        this.$events.$off('itemsUpdated', this.updateItems);
    },
    computed: {
        itemsPluralized () {
            return this.items.data === 1 ? 'item' : 'items';
        },
        numeralFormat () {
            return this.items.data < 1000 ? '0a' : '0.0a';
        }
    },
    methods: {
        updateItems (updatedItems) {
            this.items.data = updatedItems.data;
            this.items.hasError = updatedItems.hasError;
        }
    }
};
</script>

<template>
    <a
        tabindex
        class="list-order-tab btn-link cursor-pointer d-inline-block"
        @click="tabClicked">
        {{ tab.label }}
        <i
            v-show="!tab.active"
            class="fa fa-sort"
            aria-hidden="true" />
        <i
            v-show="tab.active && tab.order === 1"
            class="fa fa-sort-up"
            aria-hidden="true" />
        <i
            v-show="tab.active && tab.order === -1"
            class="fa fa-sort-desc hidden"
            aria-hidden="true" />
    </a>
</template>

<script>
export default {
    name: 'ListOrderTab',
    props: ['option'],
    data () {
        return {
            tab: this.option
        };
    },
    computed: { },
    mounted () {
    },
    methods: {
        toggleOrder () {
            this.tab.order = this.tab.order * -1;
        },
        tabClicked () {
            if (this.tab.active) {
                this.toggleOrder();
            }
            this.$events.$emit('listOrderChanged', this.tab);
        }
    }
};
</script>

<style lang="scss">
    .list-order-tab {
        color: white;
        &.text-muted { color: #AFD5DE !important; }
        &.disabled {
            color: #74B7C6 !important;
            &:hover { cursor: not-allowed; }
        }
        &:hover, &.text-muted:hover { color: white !important; text-decoration: none; }
    }
</style>

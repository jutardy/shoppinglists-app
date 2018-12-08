<template>
    <div class="message-block">
        <h5 class="mb-4">{{ title || 'Page not found' }}</h5>
        <p>{{ body || 'Sorry but the page you have requested cannot be found.' }}</p>
        <a
            class="btn btn-primary mt-2"
            tabindex
            @click="ctaClicked">{{ cta || 'Go back' }}</a>
    </div>
</template>

<script>
export default {
    name: 'MessageBlock',
    props: ['title', 'body', 'route', 'cta'],
    methods: {
        ctaClicked () {
            return this.route ? this.$router.push(this.route) : this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss">
.message-block {
    border: 1px solid $border-block;
    border-radius: 6px;
    background: white;
    width: 330px;
    padding: 20px;
    margin: 0 auto;
}
</style>

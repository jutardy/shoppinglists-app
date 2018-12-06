<template>
    <div
        :style="styles"
        class="loader" />
</template>

<script>
export default {
    name: 'Loader',
    props: ['options'],
    data () {
        return {
            size: this.options && this.options.size ? this.options.size : '50px',
            border: this.options && this.options.border ? this.options.border : '4px'
        };
    },
    computed: {
        styles () {
            return {
                width: this.size,
                height: this.size,
                borderWidth: this.border
            };
        }
    }
};
</script>

<style lang="scss">
.loader {
    display: block;
    margin: 0 auto;
    position: relative;
    padding: 0px;
    border-style: solid;
    border-radius: 100%;
    border-top-color: $blue;
    border-bottom-color: rgba(0, 0, 0, 0.15);
    border-left-color: $blue;
    border-right-color: rgba(0, 0, 0, 0.15);
    -webkit-animation: loader 0.8s linear infinite;
    animation: loader 0.8s linear infinite;
}

@keyframes loader {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        -webkit-transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
    }
}
</style>

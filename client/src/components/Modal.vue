<template>
    <div
        v-show="showOverlay"
        class="overlay-container"
        @click="closeByOverlay">
        <div class="modal d-block">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ modalContent.title }}</h5>
                        <button
                            type="button"
                            class="close"
                            aria-label="Close"
                            @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>{{ modalContent.body }}</p>
                    </div>
                    <div class="modal-footer">
                        <button
                            v-if="modalContent.submitCTA!=''"
                            type="button"
                            class="btn btn-primary"
                            @click="ctaClicked">
                            {{ modalContent.submitCTA }}</button>
                        <button
                            type="button"
                            class="btn btn-secondary"
                            @click="closeModal">{{ modalContent.cancelCTA }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    data () {
        return {};
    },
    computed: {
        modalContent () {
            return this.$store.getters.getModalContent;
        },
        showOverlay () {
            return this.modalContent.opened;
        }
    },
    mounted () {
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) { this.closeModal(); }
        });
    },
    methods: {
        ctaClicked () {
            this.$events.$emit(this.modalContent.submitEvent, this.modalContent.submitEventParam);
        },
        closeModal () {
            this.$store.commit('closeModal');
        },
        closeByOverlay (event) {
            if (event.target.closest('.modal-content') === null) this.closeModal();
        }
    }
};
</script>

<style lang="scss">
    .overlay-container {
        background: rgba(0, 0, 0, 0.8);
        min-height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        overflow: auto;
        z-index: 10000;
        cursor: initial;
    }
</style>

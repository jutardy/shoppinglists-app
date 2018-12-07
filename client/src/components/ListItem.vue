<template>
    <li
        :class="{'is-editing': editedItem !== null && editedItem._id === item._id}"
        class="list-row d-flex d-flex-row">
        <div class="text-cell text-left d-inline-block align-self-center">
            <span v-show="editedItem === null || editedItem._id !== item._id">
                {{ item.name }}
            </span>
            <input
                v-if="editedItem !== null && editedItem._id === item._id"
                class="input-edit-item w-100 form-control border-0 p-sides-10"
                type="text"
                v-model.trim="editedItem.name"
                maxlength="100"
                v-focus
                @blur="editionCanceled"
                @keyup.enter="editionDone"
                @keyup.esc="editionCanceled">
        </div>
        <div
            v-if="showActions"
            class="actions-cell text-left d-inline-block align-self-top">
            <a
                v-show="editedItem === null || editedItem._id !== item._id"
                tabindex
                class="btn-edit cursor-pointer text-center"
                @click="editionStart">
                <i class="fa fa fa-pencil" aria-hidden="true" />
            </a>
            <a
                v-show="editedItem !== null && editedItem._id === item._id"
                class="btn-edit-done cursor-pointer text-center text-success"
                tabindex
                @mousedown.prevent
                @click="editionDone">
                <i class="fa fa-check-circle" aria-hidden="true" />
            </a>
            <a
                v-show="editedItem === null || editedItem._id !== item._id"
                class="btn-delete cursor-pointer text-center"
                tabindex
                @click="deleteConfirmation">
                <i class="fa fa fa-times" aria-hidden="true" />
            </a>
        </div>
    </li>
</template>

<script>
export default {
    name: 'ListItem',
    props: ['item', 'showActions'],
    data () {
        return {
            editedItem: null
        };
    },
    directives: {
        focus: {
            inserted (el) { el.focus(); }
        }
    },
    created () {
        this.$events.$on('resetEditedItem', this.editionCanceled);
    },
    beforeDestroy () {
        this.$events.$off('resetEditedItem', this.editionCanceled);
    },
    methods: {
        editionStart () {
            this.editedItem = { ...this.item };
        },
        editionCanceled () {
            if (!this.editedItem) return;
            this.editedItem = null;
        },
        editionDone () {
            if (!this.editedItem) return;
            if (this.editedItem.name !== this.item.name) {
                this.$events.$emit('updateListItem', this.editedItem);
            }
        },
        deleteConfirmation () {
            let content = {
                title: 'You\'re about to delete an item permanently',
                body: `Are you sure you want to delete ${this.item.name}?`,
                submitCTA: 'Delete',
                cancelCTA: 'Cancel',
                submitEvent: 'removeItemEvent',
                submitEventParam: this.item
            };
            this.$store.commit('setModalContent', content);
        }
    }
};
</script>

<style lang="scss">
.list-row {
    border-bottom: 1px solid $border-block;
    min-height: 39px;
    &.is-editing { padding: 0 !important; }
}
.text-cell {
    width: calc(100% - 70px);
    span {
        display: block;
        padding: 7px 0 7px 10px;
    }
}
.input-edit-item { background-color: rgba(255, 255, 255, 0.4) !important; }
.actions-cell {
    width: 70px;
    a {
        padding: 7px 0 6px;
        width: 35px;
        color: $input-focus-border-color;
        display: inline-block;
        &.btn-edit:hover { color: $body-color; }
        &.btn-delete:hover { color: $red; }
    }
}
.highlight {
    animation-name: colorhighlight;
    animation-duration: 0.5s;
}

@keyframes colorhighlight {
    0% { background-color: $red; }
    25% { background-color: $red-light; }
    50% { background-color: $red; }
    75% { background-color: $red-light; }
    100% { background-color: $red; }
}
</style>

<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <div class="dialog-content" @click="e => e.stopPropagation()">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyDialog',
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    }
}
</script>

<style>
.dialog {
    position: fixed;
    z-index: 33;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #00000045;
    backdrop-filter: blur(12px);
    display: grid;
    place-items: center center;
}
.dialog-content {
    width: 90%;
    max-width: 600px;
    background-color: #333;
    border-radius: 6px;
    padding: 2rem 1rem;
}
</style>
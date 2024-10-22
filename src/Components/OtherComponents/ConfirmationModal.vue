<!-- ModalComponent.vue -->
<template>
    <div v-if="isVisible" class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <p>{{ message }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cancelAction">{{ cancelText }}</button>
                    <button type="button" class="btn btn-primary" @click="confirmAction">{{ confirmText }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Confirmation',
    },
    message: {
        type: String,
        default: 'Are you sure?',
    },
    confirmText: {
        type: String,
        default: 'Confirm',
    },
    cancelText: {
        type: String,
        default: 'Cancel',
    },
    isVisible: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close', 'confirm', 'cancel']);

const closeModal = () => emit('close');
const confirmAction = () => emit('confirm');
const cancelAction = () => emit('cancel');
</script>

<style scoped>
/* Bootstrap 5 takes care of most styling */
.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>

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
                    <button type="button" class="btn btn-danger" @click="logoutAction">{{ confirmText }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter to navigate

const props = defineProps({
    title: {
        type: String,
        default: 'Confirmation',
    },
    message: {
        type: String,
        default: 'Are you sure you want to logout?',
    },
    confirmText: {
        type: String,
        default: 'Logout',
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
const router = useRouter(); // Initialize the router

const closeModal = () => emit('close');

const logoutAction = () => {
    // Remove the token and user info from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Navigate to the specified page (e.g., login page)
    router.push('/'); // Adjust this path based on your routing setup

    // Emit the confirm event
    emit('confirm'); // This should be used to signal that logout was confirmed
};

const cancelAction = () => {
    closeModal(); // Close the modal when "Cancel" is clicked
    emit('cancel'); // Emit the cancel event
};
</script>

<style scoped>
.modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
<!-- ParentComponent.vue -->
<template>
    <div class="container mt-5">
        <button class="btn btn-warning" @click="showLogoutModal">Log Out</button>
        <button class="btn btn-danger ms-2" @click="showDeleteModal">Delete Account</button>

        <!-- Using ModalComponent for logout -->
        <ModalComponent v-if="isLogoutModalVisible" title="Logging out?"
            message="Thanks for stopping by. See you again soon!" confirmText="Log out" cancelText="Cancel"
            :isVisible="isLogoutModalVisible" @close="closeLogoutModal" @confirm="confirmLogout"
            @cancel="closeLogoutModal" />

        <!-- Using ModalComponent for delete confirmation -->
        <ModalComponent v-if="isDeleteModalVisible" title="Delete Account"
            message="Are you sure you want to delete your account? This action cannot be undone." confirmText="Delete"
            cancelText="Cancel" :isVisible="isDeleteModalVisible" @close="closeDeleteModal" @confirm="confirmDelete"
            @cancel="closeDeleteModal" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ModalComponent from './ConfirmationModal.vue';

const isLogoutModalVisible = ref(false);
const isDeleteModalVisible = ref(false);

const showLogoutModal = () => {
    isLogoutModalVisible.value = true;
};

const closeLogoutModal = () => {
    isLogoutModalVisible.value = false;
};

const confirmLogout = () => {
    isLogoutModalVisible.value = false;
    // Add logout logic here
    console.log('Logging out...');
};

const showDeleteModal = () => {
    isDeleteModalVisible.value = true;
};

const closeDeleteModal = () => {
    isDeleteModalVisible.value = false;
};

const confirmDelete = () => {
    isDeleteModalVisible.value = false;
    // Add delete account logic here
    console.log('Account deleted...');
};
</script>

<style scoped>
.container {
    text-align: center;
}

@media (max-width: 576px) {
    .container {
        margin-top: 3rem;
    }
}
</style>

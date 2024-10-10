<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Welcome!</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </div>

            <div class="modal-body">
                <button class="btn btn-google mb-3">
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" class="me-2">
                    Continue with Google
                </button>

                <div class="separator mb-3"></div>

                <form @submit.prevent="login">
                    <div class="mb-3">
                        <input type="email" class="form-control" placeholder="Email" v-model="email" required>
                    </div>
                    <div class="mb-3">
                        <input type="password" class="form-control" placeholder="Password" v-model="password" required>
                    </div>

                    <button type="submit" class="btn btn-login w-100 mb-3">Log in</button>
                </form>

            </div>

            <div class="modal-footer">
                <p>By signing up, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, toRefs, defineProps, defineEmits } from 'vue';

// Props
const props = defineProps({
    showModal: {
        type: Boolean,
        required: true,
    },
});

// Emits
const emit = defineEmits(['close']);

// State
const { showModal } = toRefs(props);
const email = ref('');
const password = ref('');

// Functions
const closeModal = () => {
    emit('close');
};

const login = () => {
    console.log('Email:', email.value, 'Password:', password.value);
};
</script>

<style scoped>
.modal-title {
    text-align: center;
    flex-grow: 1;
    font-weight: bolder;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 90%;
    width: 400px;
    text-align: center;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
}

.modal-header h5 {
    margin: 0;
}

.btn-close {
    background: transparent;
    border: none;
    font-size: 1.5rem;
}

.modal-body {
    padding: 20px 0;
}

.separator {
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
    line-height: 0.1em;
    margin: 10px 0;
}

.separator:before {
    content: 'or';
    background: white;
    padding: 0 10px;
}

.btn-google {
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 1px solid #ccc;
    width: 100%;
    text-align: left;
    padding: 10px;
    border: 2px solid black;
}

.btn-login {
    background-color: #00754A;
    color: white;
    font-weight: bolder;
}

.btn-login:hover {
    background-color: #00925d;
    font-weight: bolder;
}

.modal-footer {
    font-size: 0.85rem;
}

.modal-footer a {
    color: #00754A;
    text-decoration: none;
}

@media (max-width: 768px) {
    .modal-content {
        padding: 15px;
    }
}

@media (max-width: 576px) {
    .modal-header {
        flex-direction: column;
    }

    .modal-header h5 {
        margin-bottom: 10px;
    }

    .modal-body {
        padding: 10px 0;
    }

    .separator {
        margin: 5px 0;
    }
}
</style>

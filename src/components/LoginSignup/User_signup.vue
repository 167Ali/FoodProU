<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Sign Up</h5>
        <button type="button" class="btn-close" @click="closeModal"></button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="signUp">
          <div class="mb-3">
            <input type="text" class="form-control" placeholder="First Name" v-model="firstName" required />
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" placeholder="Last Name" v-model="lastName" required />
          </div>
          <div class="mb-3">
            <input type="email" class="form-control" placeholder="Email" v-model="email" required />
          </div>
          <div class="mb-3">
            <input type="password" class="form-control" placeholder="Password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-signup w-100 mb-3">Sign Up</button>
        </form>
      </div>

      <div class="modal-footer">
        <p>By signing up, you agree to our <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const closeModal = () => {
  emit('close');
};

const signUp = () => {
  // Logic for sign-up
  console.log('First Name:', firstName.value);
  console.log('Last Name:', lastName.value);
  console.log('Email:', email.value);
  console.log('Password:', password.value);
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

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
}

.modal-body {
  padding: 20px 0;
}

.modal-footer {
  font-size: 0.85rem;
}

.modal-footer a {
  color: #00754A;
  text-decoration: none;
}

.btn-signup {
  background-color: #00754A;
  color: rgb(255, 255, 255);
  font-weight: bolder;
}

.btn-signup:hover {
  background-color: #00925d;
  font-weight: bolder;
}

/* Additional Responsive Styles */
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
}
</style>

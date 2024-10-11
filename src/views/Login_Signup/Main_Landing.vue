<template>
  <div class="main d-flex">
    <!-- Left half for content -->
    <div class="content-wrapper d-flex flex-column justify-content-center align-items-start">
      <h2 class="text-left mb-3">
        It's the food and groceries you love,delivered
      </h2>
      <div class="button-group mb-5">
        <button class="btn btn-login me-3" @click="showLoginModal = true">Login</button>
        <button class="btn btn-signup" @click="showSignUpModal = true">Sign Up</button>
      </div>
      <!-- Right half for image -->
    </div>
    <!-- Right half for image -->
    <div class="image-wrapper">
      <img src="../../assets/bg3.gif" alt="Landing Logo" class="logo" />
    </div>

    <LoginModal :showModal="showLoginModal" @close="closeLoginModal" />
    <SignUpModal :showModal="showSignUpModal" @close="closeSignUpModal" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import LoginModal from '../../components/LoginSignup/User_login.vue';
import SignUpModal from '../../components/LoginSignup/User_signup.vue';

export default defineComponent({
  name: 'Main_Landing',
  components: {
    LoginModal,
    SignUpModal,
  },
  setup() {
    const showLoginModal = ref(false);
    const showSignUpModal = ref(false);

    const closeLoginModal = () => {
      showLoginModal.value = false;
    };

    const closeSignUpModal = () => {
      showSignUpModal.value = false;
    };

    return {
      showLoginModal,
      showSignUpModal,
      closeLoginModal,
      closeSignUpModal,
    };
  },
});
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100vh;
}

.content-wrapper {
  width: 50%;
  padding: 3rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  font-size: 2.5rem;
  color: rgb(0, 0, 0);
  font-weight: bolder;
}

.button-group button {
  width: 140px;
  font-size: 1rem;
}

.btn-login {
  background-color: whitesmoke;
  color: black;
  border: 2px solid black;
  font-weight: bolder;
}

.btn-login:hover {
  background-color: rgb(122, 122, 122);
}

.btn-signup {
  background-color: #00754a;
  color: white;
  font-weight: bolder;
}

.btn-signup:hover {
  background-color: #00925d;
  color: black;
}

.image-wrapper {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Ensures the image covers the entire right half */
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  h2 {
    font-size: 2rem;
  }

  .button-group button {
    width: 120px;
  }
}

@media (max-width: 768px) {
  h2 {
    font-size: 1.8rem;
  }

  .button-group button {
    width: 100px;
  }
}

@media (max-width: 576px) {
  .main {
    flex-direction: column;
  }

  .content-wrapper,
  .image-wrapper {
    width: 100%;
    height: 50vh;
  }

  h2 {
    font-size: 1.5rem;
  }

  .button-group button {
    width: 100px;
    font-size: 0.8rem;
  }
}
</style>
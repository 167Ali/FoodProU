<template>
    <div class="container mt-5 d-flex justify-content-center">
        <div class="form-container">
            <!-- Profile -->
            <div class="mb-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h5 class="fw-bold">My Profile</h5>
                    <i class="fa-regular fa-user"></i>
                </div>
                <form @submit.prevent="saveProfile" class="animate__animated animate__fadeIn">
                    <div class="mb-3 input-wrapper">
                        <input type="text" v-model="profile.first_name" class="form-control" id="firstName" required
                            @focus="onFocus($event)" @blur="onBlur($event)" placeholder="" />
                        <label for="firstName" class="floating-label">First Name</label>
                    </div>
                    <div class="mb-3 input-wrapper">
                        <input type="text" v-model="profile.last_name" class="form-control" id="lastName" required
                            @focus="onFocus($event)" @blur="onBlur($event)" placeholder=" " />
                        <label for="lastName" class="floating-label">Last Name</label>
                    </div>
                    <div class="mb-3 input-wrapper">
                        <input type="text" v-model="profile.phone_number" class="form-control" id="mobile" required
                            @focus="onFocus($event)" @blur="onBlur($event)" placeholder="" />
                        <label for="mobile" class="floating-label">Mobile Number</label>
                    </div>
                    <div class="mb-3 input-wrapper">
                        <input type="email" v-model="profile.email" class="form-control" id="email" required
                            @focus="onFocus($event)" @blur="onBlur($event)" placeholder="" />
                        <label for="email" class="floating-label">Email</label>
                        <span v-if="isEmailVerified" class="badge bg-warning mt-2">Verified</span>
                        <span v-else class="badge bg-danger mt-2">Not Verified</span>
                    </div>
                    <button type="submit" class="btn btn-primary scale-on-hover"
                        :disabled="isProfileFormInvalid">Save</button>
                </form>
            </div>
            <hr />
            <!-- Password -->
            <div>
                <h5 class="fw-bold">Password</h5>
                <form @submit.prevent="savePassword" class="animate__animated animate__fadeIn">
                    <div class="mb-3 input-wrapper">
                        <input type="password" v-model="profile.currentPassword" class="form-control"
                            id="currentPassword" required @focus="onFocus($event)" @blur="onBlur($event)"
                            placeholder="" />
                        <label for="currentPassword" class="floating-label">Current Password</label>
                    </div>
                    <div class="mb-3 input-wrapper">
                        <input type="password" v-model="profile.newPassword" class="form-control" id="newPassword"
                            required @focus="onFocus($event)" @blur="onBlur($event)" placeholder=" " />
                        <label for="newPassword" class="floating-label">New Password</label>
                    </div>
                    <button type="submit" class="btn btn-primary scale-on-hover"
                        :disabled="isPasswordFormInvalid">Save</button>
                    <hr>
                    <router-link to="/fav">View Favorites</router-link> <br>
                    <router-link to="/orderScreen">View Order Screen</router-link> <br>
                    <router-link to="/modalView">View Modal</router-link> <br>
                    <router-link to="/restOwnerProfile">View Rest Owner Profile</router-link> <br>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const profile = computed(() => store.state.profile);
const isEmailVerified = computed(() => profile.value.isEmailVerified);

const isProfileFormInvalid = computed(() => {
    return (
        !profile.value.first_name ||
        !profile.value.last_name ||
        !profile.value.phone_number ||
        !profile.value.email
    );
});

const isPasswordFormInvalid = computed(() => {
    return (
        !profile.value.currentPassword ||
        !profile.value.newPassword
    );
});

const saveProfile = async () => {
    try {
        await store.dispatch('profile/saveProfile', {
            first_name: profile.value.first_name,
            last_name: profile.value.last_name,
            phone_number: profile.value.phone_number,
            email: profile.value.email
        });
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to save profile. Please try again.');
    }
};

const savePassword = async () => {
    try {
        await store.dispatch('profile/savePassword', {
            currentPassword: profile.value.currentPassword,
            newPassword: profile.value.newPassword
        });
        alert('Password updated successfully!');
    } catch (error) {
        console.error('Error updating password:', error);
        alert('Failed to save password. Please try again.');
    }
};

// Fetch profile data on component mount
onMounted(async () => {
  try {
    await store.dispatch('profile/fetchProfile');
    console.log('Fetched Profile:', store.state.profile); // Log profile data
  } catch (error) {
    alert('Failed to load profile data. Please try again.');
  }
});


const onFocus = (event) => {
    const input = event.target;
    input.classList.add('active');
};

const onBlur = (event) => {
    const input = event.target;
    if (!input.value) {
        input.classList.remove('active');
    }
};
</script>


<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.form-container {
    width: 100%;
    max-width: 500px;
    padding: 20px;
}

.input-wrapper {
    position: relative;
    margin-bottom: 1.5rem;
    opacity: 0;
    animation: fadeIn 0.5s forwards;
}

.input-wrapper:nth-child(1) {
    animation-delay: 0.2s;
}

.input-wrapper:nth-child(2) {
    animation-delay: 0.3s;
}

.input-wrapper:nth-child(3) {
    animation-delay: 0.4s;
}

input.form-control {
    width: 100%;
    padding: 12px 15px;
    font-size: 13px;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition: border-color 0.3s ease;
}

input.form-control:focus {
    outline: none;
    border-color: #000000;
}

.floating-label {
    position: absolute;
    left: 15px;
    top: 15px;
    font-size: 13px;
    color: #999;
    transition: 0.2s ease all;
    pointer-events: none;
}

input.form-control:focus+.floating-label,
input.form-control:not(:placeholder-shown)+.floating-label {
    top: -10px;
    left: 15px;
    font-size: 12px;
    color: #000000;
    background: white;
    padding: 0 5px;
}

.scale-on-hover {
    transition: transform 0.2s ease;
}

.scale-on-hover:hover {
    transform: scale(1.05);
}
</style>

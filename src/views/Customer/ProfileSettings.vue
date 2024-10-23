<template>
    <LoginHeader />
    <div class="container mt-5 d-flex justify-content-center">
        <div class="form-container">
            <Loader v-if="loading" />
            <!-- Profile -->
            <div class="mb-4" v-else>
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
                    </div>
                    <button type="submit" class="btn btn-primary scale-on-hover"
                        :disabled="isProfileFormInvalid">Save</button>
                </form>
            </div>
            <hr />
            <!-- Password -->
            <div>
                <h5 class="fw-bold">Password</h5>
                <form @submit.prevent="changePassword" class="animate__animated animate__fadeIn"> <!-- Updated to call changePassword -->
                    <div class="mb-3 input-wrapper">
                        <input type="password" v-model="currentPassword" class="form-control"
                            id="currentPassword" required @focus="onFocus($event)" @blur="onBlur($event)"
                            placeholder="" />
                        <label for="currentPassword" class="floating-label">Current Password</label>
                    </div>
                    <div class="mb-3 input-wrapper">
                        <input type="password" v-model="newPassword" class="form-control" id="newPassword"
                            required @focus="onFocus($event)" @blur="onBlur($event)" placeholder=" " />
                        <label for="newPassword" class="floating-label">New Password</label>
                    </div>
                    <button type="submit" class="btn btn-primary scale-on-hover"
                        :disabled="isPasswordFormInvalid">Save</button>
                    <hr>
                </form>
            </div>
        </div>
    </div>
    <PageFooter />
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import LoginHeader from '@/components/HeaderFooter/LoginHeader.vue';
import PageFooter from '@/components/HeaderFooter/PageFooter.vue';
import Loader from '@/components/OtherComponents/Loader.vue';
import { useStore } from 'vuex';

const store = useStore();
const loading = ref(true); // Loading state

// Password fields
const currentPassword = ref('');
const newPassword = ref('');

// Get the profile from Vuex store
const profile = computed(() => store.state.profile.profile);

// Fetch profile data on component mount
onMounted(async () => {
    try {
        await store.dispatch('profile/fetchProfile');
    } catch (error) {
        console.error('Error fetching profile:', error);
    } finally {
        loading.value = false; // Set loading to false after fetching data
    }
});

// Form validation logic
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
        !currentPassword.value ||
        !newPassword.value
    );
});

// Save profile function
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

// Save password function
const changePassword = async () => {
    try {
        const payload = {
            old_password: currentPassword.value,
            new_password: newPassword.value
        };
        console.log('Changing password with payload:', payload); // Log the payload
        await store.dispatch('profile/changePassword', payload);
        alert('Password updated successfully!');
        // Clear password inputs after successful update
        currentPassword.value = '';
        newPassword.value = '';
    } catch (error) {
        console.error('Error updating password:', error);
        alert('Failed to save password. Please try again.');
    }
};


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

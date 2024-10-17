<template>
    <nav class="navbar">
        <div class="navbar-left">
            <font-awesome-icon :icon="['fas', 'utensils']" class="logo" />
            <span class="brand-name">foodpro</span>
        </div>
        <div class="navbar-right">
            <div class="user-dropdown" ref="dropdown" @click="toggleDropdown">
                <span>{{ username }}</span><font-awesome-icon :icon="['fas', 'user']" />

                <!-- Use v-show to toggle visibility of the dropdown -->
                <div v-show="dropdownOpen" class="dropdownmenu">
                    <ul>
                        <li>
                            <router-link to="/OrderReorder" class="nav-link">
                                <font-awesome-icon :icon="['fas', 'shopping-bag']" />
                                <span>Order & Reorder</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/profilesettings" class="nav-link">
                                <font-awesome-icon :icon="['fas', 'user']" />
                                <span>Profile</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/userguide" class="nav-link">
                                <font-awesome-icon :icon="['fas', 'question-circle']" />
                                <span>User Guide</span>
                            </router-link>
                        </li>
                        <li>
                            <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                            <button class="nav-link" @click="showLogoutModal">Log Out</button>

                        </li>

                    </ul>
                </div>
            </div>
            <ModalComponent v-if="isLogoutModalVisible" title="Logging out?"
                message="Thanks for stopping by. See you again soon!" confirmText="Log out" cancelText="Cancel"
                :isVisible="isLogoutModalVisible" @close="closeLogoutModal" @confirm="confirmLogout"
                @cancel="closeLogoutModal" />
            <!-- Heart Button -->
            <router-link to="/favoritespage" class="favorites-button">
                <button class="heart-icon-button">
                    <font-awesome-icon :icon="['fas', 'heart']" />
                </button>
            </router-link>

            <!-- Cart Button -->
            <router-link to="/RestaurantPage" class="cart-button">
                <button class="cart-icon-button">
                    <font-awesome-icon :icon="['fas', 'shopping-cart']" />
                </button>
            </router-link>
        </div>
    </nav>
</template>


<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();  
import ModalComponent from '../OtherComponents/ConfirmationModal.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faShoppingCart,
    faUtensils,
    faShoppingBag,
    faUser,
    faQuestionCircle,
    faSignOutAlt,
    faHeart, // Added heart icon
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(
    faShoppingCart,
    faUtensils,
    faShoppingBag,
    faUser,
    faQuestionCircle,
    faSignOutAlt,
    faHeart // Added heart icon to library
);

// Reactive state
const dropdownOpen = ref(false);
const username = ref('Guest');
const dropdown = ref(null);

// Toggle dropdown visibility
const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent bubbling to the document click listener
    dropdownOpen.value = !dropdownOpen.value;
};

// Close dropdown if clicked outside
const closeDropdown = (event) => {
    if (dropdown.value && !dropdown.value.contains(event.target)) {
        dropdownOpen.value = false;
    }
};


// Lifecycle hooks
onMounted(() => {
    document.addEventListener('click', closeDropdown);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
});
const isLogoutModalVisible = ref(false);


const showLogoutModal = () => {
    isLogoutModalVisible.value = true;
};

const closeLogoutModal = () => {
    isLogoutModalVisible.value = false;
};

const confirmLogout = () => {
    isLogoutModalVisible.value = false;
    console.log('Logging out...');
    window.location.href = '/';
};

</script>


<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    background-color: #ffffff;
    border-bottom: 1px solid #eaeaea;
}

.logo {
    font-size: 24px;
    margin-right: 10px;
    color: #00754a;
}

.brand-name {
    font-size: 24px;
    color: #00754a;
    font-weight: bold;
}

.navbar-right {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 50px;
}

.user-dropdown {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    transition: background-color 0.3s ease;
}

.user-dropdown:hover {
    background-color: #f1f1f1;
    border-radius: 8px;
}

.user-dropdown span {
    margin-right: 5px;
}

.dropdownmenu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border: 1px solid #eaeaea;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    min-width: 200px;
    z-index: 1000;


}

.dropdownmenu ul {
    list-style: none;
    padding: 10px;
    margin: 0;
}

.dropdownmenu li {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dropdownmenu li:hover {
    background-color: #aef18b;
    border-radius: 5px;
}


.cart-icon {

    margin-left: 20px;
    display: flex;
    align-items: center;
}

.heart-icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 25px;
    color: #000;
}

.heart-icon-button:hover {
    color: #ff4b4b;
}

.cart-button {
    margin-left: 20px;
    display: flex;
    align-items: center;
}

.cart-icon-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 25px;
}

.cart-icon-button:hover {
    color: #00754a;
}
</style>

<template>
    <div class="position-relative my-4">
        <div class="position-relative">
            <input type="text" class="form-control rounded-pill border-0 shadow-sm search ps-5"
                placeholder="Search for restaurants, cuisines, and dishes" v-model="searchQuery"
                @focus="showDropdown = true" @blur="hideDropdown" />
            <i class="fa-solid fa-magnifying-glass fa-lg position-absolute"
                style="color: rgb(123, 123, 123); top: 50%; left: 15px; transform: translateY(-50%);"></i>
        </div>
        <div class="dropdown mt-1 border-0 shadow-sm" v-if="showDropdown">
            <div class="dropdown-menu show">
                <h6 class="dropdown-header">Recent searches</h6>
                <div class="dropdown-item" v-for="(item, index) in recentSearches" :key="index">
                    {{ item }}
                </div>
                <h6 class="dropdown-header">Popular searches</h6>
                <div class="dropdown-item" v-for="(item, index) in popularSearches" :key="index">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const showDropdown = ref(false);
const recentSearches = [
    'zing burger'
];

const popularSearches = [
    'pizza', 'kfc', 'burger', 'biryani', 'dominos',
    'pizza middle size price 300', 'mcdonalds', 'kfc zinger burger deal by 1 get 1 free'
];

function hideDropdown() {
    setTimeout(() => {
        showDropdown.value = false;
    }, 200); // Delay to allow click event on dropdown items to register
}

</script>
<style scoped>
.dropdown-menu {
    width: 100%;
    z-index: 1000;
    border-radius: 20px;
    cursor: pointer;
}

.search {
    height: 60px;
}
</style>
<template>
    <div class="container-fluid">

        <div
            class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Delivery Menu</h1>
        </div>


        <div class="row">

            <!-- Main content -->
            <main class="col-md-6 ms-sm-auto col-lg-8 px-md-4">
                <div class="container mt-4">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2>Menu Categories</h2>
                        <button class="btn btn-primary" @click="openModal">Add Category</button>
                    </div>

                    <div class="scroll-container-wrapper">
                        <!-- Left Scroll Button -->
                        <button class="scroll-button left" @click="scrollLeft">
                            <i class="fa-solid fa-angle-left fa-xl" style="color: #080a0c;"></i>
                        </button>

                        <div class="scroll-container">
                            <div class="scroll-row">
                                <div v-for="(item, index) in menuItems" :key="index" class="col-6 col-md-4 col-lg-3">
                                    <div class="menu-card p-3 text-center" :class="{ selected: selectedItem === index }"
                                        @click="selectItem(index, item.id, item.name)">
                                        <div class="menu-icon mb-2"></div>
                                        <h5 class="menu-title">{{ item.name }}</h5>
                                        <p class="menu-stock">{{ item.menu_items_count }} Menu In Stock</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Right Scroll Button -->
                        <button class="scroll-button right" @click="scrollRight">
                            <i class="fa-solid fa-angle-right fa-xl" style="color: #181d25;"></i>
                        </button>
                    </div>

                    <!-- <div class="row g-3">
                        <div v-for="(item, index) in menuItems" :key="index" class="col-6 col-md-3">
                            <div class="menu-card p-3 text-center" :class="{ selected: selectedItem === index }"
                                @click="selectItem(index, item.id, item.name)">
                                <div class="menu-icon mb-2">
                                </div>
                                <h5 class="menu-title">{{ item.name }}</h5>
                                <p class="menu-stock">{{ item.menu_items_count
                                    }} Menu In Stock</p>
                            </div>
                        </div>
                    </div> -->

                </div>
                <!-- Example Category Section -->
                <div class="category-section mb-4">
                    <div class="menu-items">
                        <div class="menu-item d-flex justify-content-between align-items-center border-bottom py-2">
                            <MenuView :categoryTitle="selectedTitle" :categoryId="categoryId" :key="selectedItem"
                                v-if="isProductCategoryVisibile" />
                            <!-- <MenuViewChoice v-if="isMenuVisible" /> -->
                        </div>
                    </div>
                </div>
            </main>
            <div class="col-lg-4 col-md-6">
                <MenuViewChoice />
            </div>
        </div>
        <div v-if="isFormVisible" class="modal-overlay">
            <div class="modal-content">
                <div>
                    <div class="mb-3 d-flex justify-content-between align-items-center ">
                        <h4 class="card-title">Add Category</h4>
                        <button class="btn btn-outline" type="button" @click="isFormVisible = false"><i
                                class="fa-solid fa-xmark fa-lg" style="color: #030303;"></i></button>
                    </div>
                    <div>
                        <select v-model="selectedOption" class="form-select mb-2" @change="handleSelection">
                            <option value="0">Category</option>
                            <option value="1">Discount</option>
                        </select>

                        <div class="mb-3" v-if="suggestedCategories.length">
                            <h6>Suggested {{ selectedOption === '0' ? 'Categories' : 'Discounts' }}:</h6>
                            <div class="d-flex flex-wrap gap-2">
                                <button v-for="category in suggestedCategories" :key="category"
                                    class="btn btn-outline-secondary rounded-pill"
                                    @click="selectSuggestedCategory(category)">
                                    {{ category }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <input v-model="newCategory" type="text" placeholder="Enter category name"
                        class="form-control mb-2" />
                    <input v-if="selectedOption == 1" v-model="discountPercentage" type="number"
                        placeholder="Enter discount percentage" class="form-control" />

                    <div v-if="message" :class="['alert', messageType]">
                        {{ message }}
                    </div>
                    <button class="btn btn-primary me-3" @click="addCategory">Add Category</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import MenuViewChoice from './MenuViewChoice.vue';
import MenuView from './MenuView.vue';
import { useStore } from 'vuex';  // Import the Vuex store
const store = useStore();  // Initialize the store

const newCategory = ref('');
const message = ref('');
const messageType = ref('alert-success'); // Default message type
// State to track visibility of the ChoiceGroups component
const isChoiceGroupsVisible = ref(false);
const isProductCategoryVisibile = ref(false);
const isFormVisible = ref(false);
const selectedOption = ref('0');
const discountPercentage = ref(0)
const suggestedCategories = ref([]);

const categorySuggestions = ['Breakfast', 'Lunch', 'Dinner', 'Soup', 'Desserts', 'Beverages'];
const discountSuggestions = ['Combo Deal', 'Super Deal', 'Holiday Special', 'Discount Offer'];

const handleSelection = () => {
    if (selectedOption.value === '0') {
        suggestedCategories.value = categorySuggestions;
    } else if (selectedOption.value === '1') {
        suggestedCategories.value = discountSuggestions;
    }
};

const selectSuggestedCategory = (category) => {
    newCategory.value = category;
};

const openModal = () => {
    isFormVisible.value = true;
};

const menuItems = computed(() => store.getters['menuCategory/allCategories']);


onMounted(async () => {
    scrollContainer.value = document.querySelector('.scroll-container');
    handleSelection();
    try {
        await store.dispatch('menuCategory/displayCategory');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});


// Scroll functions
const scrollContainer = ref(null);

const scrollLeft = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
            left: -scrollContainer.value.offsetWidth, // Scroll by container width (approx. 4 cards)
            behavior: 'smooth',
        });
    }
};

const scrollRight = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({
            left: scrollContainer.value.offsetWidth, // Scroll by container width (approx. 4 cards)
            behavior: 'smooth',
        });
    }
};



const addCategory = async () => {
    console.log(discountPercentage.value)
    console.log(selectedOption.value)
    console.log(newCategory.value)
    try {
        if (newCategory.value.trim() !== '') {
            await store.dispatch('menuCategory/addCategory', { name: newCategory.value });
            message.value = `Category added: ${newCategory.value}`;
            messageType.value = 'alert-success';
            newCategory.value = '';
        } else {
            message.value = 'Please enter a category name.';
            messageType.value = 'alert-danger';
        }
    } catch (error) {
        console.error('Error adding category:', error);
        message.value = 'Failed to add category.';
        messageType.value = 'alert-danger';
    }
};


// categoesies new


// const menuItems = ref([
//     { title: "Breakfast", icon: "bi bi-bread", stock: 12 },
//     { title: "Lunch", icon: "bi bi-hamburger", stock: 12 },
//     { title: "Dinner", icon: "bi bi-dish", stock: 12 },
//     { title: "Soup", icon: "bi bi-bowl", stock: 12 },
//     { title: "Desserts", icon: "bi bi-ice-cream", stock: 12 },
//     { title: "Side Dish", icon: "bi bi-egg-fried", stock: 12 },
//     { title: "Appetizer", icon: "bi bi-eggplant", stock: 12 },
//     { title: "Beverages", icon: "bi bi-cup-straw", stock: 12 },
// ]);
// Selected item state
const selectedItem = ref(null);
const selectedTitle = ref('');
const categoryId = ref(null);
// Function to select an item
const selectItem = (index, id, title) => {
    selectedItem.value = index;
    selectedTitle.value = title;

    categoryId.value = id;

    console.log("selected item ", id, title)
    isProductCategoryVisibile.value = true;
};


// Method to toggle the visibility
// const showChoices = () => {
//     isChoiceGroupsVisible.value = true; // Toggle visibility
//     isProductCategoryVisibile.value = false;
// };
// const OpenProductCategory = () => {
//     isProductCategoryVisibile.value = true;
//     isChoiceGroupsVisible.value = false;
// };
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
}

.container-fluid {
    background-color: rgb(242, 241, 242);
}

.container-fluid {
    background-color: rgb(242, 241, 242);
}

.scroll-container-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.scroll-container {
    overflow-x: auto;
    white-space: nowrap;
    flex-grow: 1;
    scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
    display: none;
}

.scroll-row {
    display: flex;
    flex-wrap: nowrap;
}

.scroll-button {
    /* background-color: #198754; */
    color: #fff;
    border: none;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    z-index: 1;
}

.scroll-button.left {
    left: -30px;
}

.scroll-button.right {
    right: -30px;
}

.menu-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    flex: 0 0 25%;
    margin-right: 15px;
}

.menu-card:hover {
    background-color: #e9ecef;
}

.menu-card.selected {
    background-color: #198754;
    color: #fff;
}

.menu-card.selected .menu-icon {
    color: #fff;
}

.menu-title {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
}

.menu-stock {
    font-size: 0.9rem;
    color: #6c757d;
}

.menu-card.selected .menu-stock {
    color: #fff;
}


/* categories */
.menu-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
    flex: 0 0 25%;
    /* Show 4 items per row */
    box-sizing: border-box;
    margin-right: 15px;
}

.menu-card:hover {
    background-color: #e9ecef;
}

.menu-card.selected {
    background-color: #198754;
    color: #fff;
}

.menu-icon {
    font-size: 2rem;
    color: #6c757d;
}

.menu-stock {
    font-size: 0.9rem;
    color: #6c757d;
}

.menu-card.selected .menu-stock {
    color: #fff;
}


/* Custom styles for sidebar */
#sidebar {
    height: 100vh;
    padding-top: 20px;
    background-color: #f8f9fa;
}

#sidebar .nav-link {
    font-size: 1.1rem;
    padding: 10px;
}

#sidebar .nav-link.active {
    font-weight: bold;
    color: #0d6efd;
}

.menu-item {
    padding: 10px 0;
}

.menu-item strong {
    font-size: 1.2rem;
}
</style>

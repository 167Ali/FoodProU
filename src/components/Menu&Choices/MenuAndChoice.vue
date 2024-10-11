<template>
    <div class="container-fluid">
        <div>
            <div
                class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 class="h2">Delivery Menu</h1>
            </div>

            <input v-model="newCategory" type="text" placeholder="Enter category name" class="form-control mb-2" />
            <div v-if="message" :class="['alert', messageType]">
                {{ message }}
            </div>
            <button class="btn btn-primary" @click="addCategory">Add Category</button>
        </div>
        <div class="row">

            <!-- Sidebar -->
            <!-- <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div class="position-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#" @click.prevent="showChoices">
                                <i class="bi bi-list-task"></i>
                                Choice Groups
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">
                                <i class="bi bi-menu-button-wide"></i>
                                Menu Categories
                            </a>
                            <ul class="nav flex-column ms-3">
                                <li class="nav-item">
                                    <a class="nav-link" href="#" @click.prevent="OpenProductCategory">Breakfast</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" @click.prevent="OpenProductCategory">Sandwiches</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#" @click.prevent="OpenProductCategory">Pasta</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav> -->

            <!-- Main content -->
            <main class="col-md-12 ms-sm-auto col-lg-8 px-md-4">

                <div class="container mt-4">
                    <div class="row g-3">
                        <div v-for="(item, index) in menuItems" :key="index" class="col-6 col-md-3">
                            <div class="menu-card p-3 text-center" :class="{ selected: selectedItem === index }"
                                @click="selectItem(index)">
                                <div class="menu-icon mb-2">
                                    <i :class="item.icon" class="fs-1"></i>
                                </div>
                                <h5 class="menu-title">{{ item.title }}</h5>
                                <p class="menu-stock">{{ item.stock }} Menu In Stock</p>
                            </div>
                        </div>
                    </div>
                </div>





                <!-- Example Category Section -->
                <div class="category-section mb-4">
                    <div class="menu-items">
                        <div class="menu-item d-flex justify-content-between align-items-center border-bottom py-2">

                            <MenuView v-if="isProductCategoryVisibile" />

                            <!-- <MenuViewChoice v-if="isMenuVisible" /> -->
                        </div>
                    </div>
                </div>
            </main>
            <div class="col-lg-4">
                <MenuViewChoice />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MenuViewChoice from './MenuViewChoice.vue';
import MenuView from './MenuView.vue';
const newCategory = ref('');
const message = ref('');
const messageType = ref('alert-success'); // Default message type
// State to track visibility of the ChoiceGroups component
const isChoiceGroupsVisible = ref(false);
const isProductCategoryVisibile = ref(false);


const addCategory = async () => {
    try {
        if (newCategory.value.trim() !== '') {
            // const success = await store.dispatch('', { category: category.value, id: id.value });
            // if (success) {
            //     console.log(success)
            // }
            // Logic to add the category can be added here
            message.value = `Category added: ${newCategory.value}`;
            messageType.value = 'alert-success'; // Success message type
            newCategory.value = ''; // Clear the input field after adding
        } else {
            message.value = 'Please enter a category name.';
            messageType.value = 'alert-danger'; // Error message type
        }

    } catch (error) {
        console.error('Error submitting profile:', error);
    } finally {

    }
};


// categoesies new


const menuItems = ref([
    { title: "Breakfast", icon: "bi bi-bread", stock: 12 },
    { title: "Lunch", icon: "bi bi-hamburger", stock: 12 },
    { title: "Dinner", icon: "bi bi-dish", stock: 12 },
    { title: "Soup", icon: "bi bi-bowl", stock: 12 },
    { title: "Desserts", icon: "bi bi-ice-cream", stock: 12 },
    { title: "Side Dish", icon: "bi bi-egg-fried", stock: 12 },
    { title: "Appetizer", icon: "bi bi-eggplant", stock: 12 },
    { title: "Beverages", icon: "bi bi-cup-straw", stock: 12 },
]);
// Selected item state
const selectedItem = ref(null);

// Function to select an item
const selectItem = (index) => {
    selectedItem.value = index;
    isProductCategoryVisibile.value = true;
};




// Method to toggle the visibility
const showChoices = () => {
    isChoiceGroupsVisible.value = true; // Toggle visibility
    isProductCategoryVisibile.value = false;
};
const OpenProductCategory = () => {
    isProductCategoryVisibile.value = true;
    isChoiceGroupsVisible.value = false;
};
</script>

<style>
/* categories */
.menu-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
}

.menu-card:hover {
    background-color: #e9ecef;
}

.menu-card.selected {
    background-color: #007bff;
    color: #fff;
}

.menu-icon {
    font-size: 2rem;
    color: #6c757d;
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

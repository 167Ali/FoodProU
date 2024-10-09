<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
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
                                    <a class="nav-link" href="#">Breakfast</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Sandwiches</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Pasta</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Combo Set</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>

            <!-- Main content -->
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div
                    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Delivery Menu</h1>
                    <button class="btn btn-primary">Add New</button>
                </div>

                <!-- Example Category Section -->
                <div class="category-section mb-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <h4>Breakfast</h4>
                        <a href="#" class="text-primary">Edit Category</a>
                    </div>
                    <div class="menu-items">
                        <div class="menu-item d-flex justify-content-between align-items-center border-bottom py-2">
                            <MenuViewChoice v-if="isChoiceGroupsVisible" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MenuViewChoice from './MenuViewChoice.vue';

// State to track visibility of the ChoiceGroups component
const isChoiceGroupsVisible = ref(false);

// Method to toggle the visibility
const showChoices = () => {
    isChoiceGroupsVisible.value = !isChoiceGroupsVisible.value; // Toggle visibility
};
</script>

<style>
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

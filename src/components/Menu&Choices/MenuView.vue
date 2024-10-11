<template>
    <div class="container mt-4">
        <!-- Button to trigger modal for creating a product -->
        <button class="btn btn-primary mb-4" @click="openModal()">Add Product</button>

        <!-- Cards displaying product details -->
        <div class="row">
            <div v-for="(product, index) in products" :key="index" class="col-md-4 mb-4">
                <div class="card">
                    <img v-if="product.image" :src="product.image" alt="Product Image" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">{{ product.productname }}</h5>
                        <p class="card-text">Description: {{ product.description }}</p>
                        <p class="card-text">Price: ${{ product.price }}</p>

                        <!-- Display Assigned Choices -->
                        <div class="card-text">
                            <strong>Assigned Choices:</strong>
                            <ul class="scroller-card">
                                <li v-for="(choice, idx) in product.assignedchoices" :key="idx">{{ choice }}</li>
                            </ul>
                        </div>


                        <button class="btn btn-secondary me-2" @click="viewProduct(index)">View/Edit</button>
                        <button class="btn btn-danger" @click="deleteProduct(index)">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal for Create/Edit Product -->
        <div v-if="isFormVisible" class="modal-overlay">
            <div class="modal-content">
                <MenuUpdate_AddProduct :product="currentProduct" :is-edit-mode="isEditMode" @save="saveProduct"
                    @cancel="isFormVisible = false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MenuUpdate_AddProduct from './MenuUpdate_AddProduct.vue'; // Import the form component
// Mock data for products
const products = ref([
    {
        category: 'Pizza',
        productname: 'Margherita Pizza',
        description: 'Classic cheese and tomato pizza.',
        price: 10,
        image: '/src/assets/img3.jpeg',
        assignedchoices: ['Choice 1', 'Choice 2'], // Assigned choices displayed here
    },
    {
        category: 'Pizza',
        productname: 'Coke',
        description: 'Refreshing soft drink.',
        price: 1.5,
        image: '/src/assets/img2.jpg',
        assignedchoices: ['Choice 4'], // Assigned choices displayed here
    },
    {
        category: 'Pizza',
        productname: 'Cheeseburger',
        description: 'Juicy burger with cheese.',
        price: 5,
        image: '/src/assets/img1.jpg',
        assignedchoices: ['Choice 1', 'Choice 3', 'Choice 5'], // Assigned choices displayed here
    },
]);


const isFormVisible = ref(false);
const isEditMode = ref(false);
const currentProduct = ref(null);
const currentEditIndex = ref(null);

// Function to open the form modal for creating a new product
const openModal = () => {
    isFormVisible.value = true;
    currentProduct.value = {
        name: '',
        description: '',
        price: null,
        image: null,
        assignedchoices: [], // Initialize as an empty array for new product
    };
    isEditMode.value = false;
};

// Function to open the form modal for editing a product
const viewProduct = (index) => {
    currentEditIndex.value = index;
    currentProduct.value = { ...products.value[index] };
    isEditMode.value = true;
    isFormVisible.value = true;
};

// Save function for the form component
const saveProduct = (product) => {
    if (isEditMode.value && currentEditIndex.value !== null) {
        products.value[currentEditIndex.value] = product;
        console.log(product, "kk");
    } else {
        products.value.push(product);
        console.log(product, "oo");
    }
    isFormVisible.value = false;
};

// Delete a product
const deleteProduct = (index) => {
    products.value.splice(index, 1);
};
</script>

<style>
/* Modal overlay styling */
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
}

.scroller-card {
    overflow-y: auto;
    height: 100px;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 800px;
    max-width: 100%;
}
</style>
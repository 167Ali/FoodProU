<template>
    <div class="container mt-4">
        <!-- Button to trigger modal for creating a product -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>{{ categoryTitle }}</h2>
            <button class="btn btn-primary" @click="openModal()">Add Product</button>
        </div>

        <!-- Cards displaying product details -->
        <div class="row g-4">
            <div v-for="(product, index) in products" :key="index" class="col-md-6">
                <div class="card h-100 px-3 pt-3 shadow-sm">
                    <div class="row g-0">
                        <div class="col-3">
                            <img v-if="product.image_file" :src="product.image_file" alt="Product Image"
                                class="img-fluid rounded mx-auto d-block border border-2 product-image" />

                        </div>
                        <div class="col-6">
                            <div class="ms-3 ard-body">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <!-- <p class="card-text">Description: {{ product.description }}</p> -->
                                <div class="card-text mt-3">
                                    <strong>Description:</strong>
                                    <p class="scroller-card">
                                        {{ product.description }}
                                    </p>
                                </div>
                                <!-- <div class="card-text">
                                    <strong>Assigned Choices:</strong>
                                    <ul class="scroller-card">
                                        <li v-for="(choice, idx) in product.assignedchoices" :key="idx">{{ choice }}
                                        </li>
                                    </ul>
                                </div> -->
                                <div class="card-text">
                                    <strong>Assigned Choices:</strong>
                                    <!-- <p class="scroller-card">
                                        {{ product.variation_id.join(', ') }}
                                    </p> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center mb-1"> <!-- align-items-center ensures vertical alignment -->
                        <div class="col text-start">
                            <h3 class="card-title mt-2 ms-3">{{ product.price }} PKR</h3>
                        </div>
                        <div class="col-auto">
                            <div class="d-flex justify-content-end">
                                <button class="btn btn-outline me-2" @click="viewProduct(index)"><i
                                        class="fa-regular fa-pen-to-square fa-xl" style="color: #343f50;"></i></button>
                                <button class="btn btn-outline" @click="deleteProduct(index)"><i
                                        class="fa-regular fa-trash-can fa-xl" style="color: #444e5f;"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal for Create/Edit Product -->
        <div v-if="isFormVisible" class="modal-overlay">
            <div class="modal-content">
                <MenuUpdate_AddProduct :product="currentProduct" :categoryTitle="categoryTitle"
                    :is-edit-mode="isEditMode" @save="saveProduct" @cancel="isFormVisible = false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MenuUpdate_AddProduct from './MenuUpdate_AddProduct.vue'; // Import the form component
import { useStore } from 'vuex';

const store = useStore();

const { categoryTitle, categoryId } = defineProps({
    categoryTitle: String,
    categoryId: Number
});


const products = computed(() => store.getters['menuProduct/allProducts']);

onMounted(async () => {
    try {
        await store.dispatch('menuProduct/displayProducts', categoryId);
    } catch (error) {
        console.error('Error fetching Choices:', error);
    }
});

// const products = ref([
//     {
//         category: 'Pizza',
//         name: 'Margherita Pizza',
//         description: 'Classic cheese and tomato pizza.',
//         price: 350,
//         image_path: '/src/assets/img3.jpeg',
//         variation_id: ['Choice 1', 'Choice 2'], // Assigned choices displayed here
//     },
//     {
//         category: 'Pizza',
//         name: 'Coke',
//         description: 'Refreshing soft drink.',
//         price: 200,
//         image_path: '/src/assets/img2.jpg',
//         variation_id: ['Choice 4'], // Assigned choices displayed here
//     },
//     {
//         category: 'Pizza',
//         name: 'Cheeseburger',
//         description: 'Juicy burger with cheese.',
//         price: 240,
//         image_path: '/src/assets/img1.jpg',
//         variation_id: ['Choice 1', 'Choice 3', 'Choice 5'], // Assigned choices displayed here
//     },
//     {
//         category: 'Pizza',
//         name: 'Coke',
//         description: 'Refreshing soft drink.',
//         price: 200,
//         image_path: '/src/assets/img2.jpg',
//         variation_id: ['Choice 4'], // Assigned choices displayed here
//     },
// ]);

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
        image_file: null,
        variation_id: {
            choices: [], addons: []
        }, // Initialize as an empty array for new product
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
const saveProduct = async (product) => {
    try {
        if (isEditMode.value && currentEditIndex.value !== null) {
            products.value[currentEditIndex.value] = product;
        } else {
            // console.log("Category ID: ", categoryId);
            // console.log("Product ", product);
            const success = await store.dispatch('menuProduct/addProduct', { product, categoryId });
            console.log("success ", success);
            // Uncomment if you want to add the product after the category
            // products.value.push(product);
        }

        isFormVisible.value = false;
    } catch (error) {
        console.error('Error Adding Product:', error);
    }
};

// Delete a product
const deleteProduct = (index) => {
    products.value.splice(index, 1);
};
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
    width: 800px;
    max-width: 100%;
}

.product-image {
    width: 150px;
    height: 100%;
    max-height: 150px;
    object-fit: cover;
    border-radius: 8px;
}

.card {
    border-radius: 12px;
    height: 300px;
}

.card-title {
    font-weight: bold;
    color:#00754A;
}

.card-text {
    font-size: 0.9rem;
}

.scroller-card {
    max-height: 40px;
    overflow-y: auto;
}
</style>

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
                        <div class="col-5">
                            <img v-if="product.image_file" :src="product.image_file" alt="Product Image"
                                class="img-fluid rounded mx-auto d-block border border-2 product-image" />

                        </div>
                        <div class="col-7">
                            <div class="ms-3 ard-body">
                                <h5 class="card-title text-capital">{{ product.name }}</h5>
                                <!-- <p class="card-text">Description: {{ product.description }}</p> -->
                                <div class="card-text mt-3">
                                    <strong>Description:</strong>
                                    <p class="scroller-card">
                                        {{ product.description }}
                                    </p>
                                </div>
                            </div>
                            <div class="card-text">
                                <strong>Assigned Choices:</strong>
                                <p class="scroller-card">
                                    <!-- Check if assigned_choices has any data -->
                                    <span v-if="product.assigned_choices && product.assigned_choices.length > 0">
                                        {{ product.assigned_choices
                                            .filter(group => group.choice_group && group.choice_group.name)
                                            .map(group => group.choice_group.name)
                                            .join(', ')
                                        }}
                                    </span>
                                    <!-- Fallback message if no choices are assigned -->
                                    <span v-else>
                                        No assigned choices available.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center mb-1"> <!-- align-items-center ensures vertical alignment -->
                    <div class="col text-start">
                        <h3 class="card-title mt-2 ms-2">{{ product.price }} PKR</h3>
                    </div>
                    <div class="col-auto">
                        <div class="d-flex justify-content-end">
                            <button class="btn btn-outline me-2" @click="viewProduct(index)"><i
                                    class="fa-regular fa-pen-to-square fa-xl" style="color: #343f50;"></i></button>
                            <button class="btn btn-outline" @click="deleteProduct(product.id)"><i
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
            <MenuUpdateAddProduct :product="currentProduct" :categoryTitle="categoryTitle" :is-edit-mode="isEditMode"
                @save="saveProduct" @cancel="isFormVisible = false" />
        </div>
    </div>

</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import MenuUpdateAddProduct from '@/Components/Menu&Choices/MenuUpdateAddProduct.vue'; // Import the form component
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
        assigned_choices: []
        // Initialize as an empty array for new product
    };
    isEditMode.value = false;
};

// Function to open the form modal for editing a product
const viewProduct = (index) => {
    console.log(" p ", products)
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
            console.log("prodyct ", product)
            // console.log("Category ID: ", categoryId);
            console.log("Product ", product);
            const success = await store.dispatch('menuProduct/addProduct', { product, categoryId });
            console.log("success ", success);
            await store.dispatch('menuProduct/displayProducts', categoryId);
            // Uncomment if you want to add the product after the category
            isFormVisible.value = false;
        }

    } catch (error) {
        console.error('Error Adding Product:', error);
    }
    finally {

    }
};

// Delete a product

const deleteProduct = async (index) => {

    try {
        console.log("index ", index)
        const success = await store.dispatch('menuProduct/deleteProduct', index);
        console.log("response choice ", success);
        products.value.splice(index, 1);
    } catch (error) {
        console.error('Error Deleting Choice: ', error);
    }
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
    width: 175px;
    height: 100%;
    max-height: 175px;
    object-fit: cover;
    border-radius: 8px;
}

.card {
    border-radius: 12px;
    height: 300px;
}

.card-title {
    font-weight: bold;
    color: #00754A;
}

.card-text {
    font-size: 0.9rem;
}

.text-capital {
    text-transform: capitalize;
    /* Capitalizes the first letter of the text */
}

.scroller-card {
    max-height: 60px;
    overflow-y: auto;
}
</style>

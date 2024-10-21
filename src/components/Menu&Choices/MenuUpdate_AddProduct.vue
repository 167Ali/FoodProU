<template>

    <div class="p-2">
        <div class="mb-3 d-flex justify-content-between align-items-center">
    <h4 class="card-title">{{ isEditMode ? 'Edit Product' : 'Add Product' }}</h4>
    <button class="btn btn-outline" type="button" @click="cancelForm">
        <i class="fa-solid fa-xmark fa-lg" style="color: #030303;"></i>
    </button>
</div>
        <form ref="productFormRef" @submit.prevent="submitForm" :class="{ 'was-validated': isFormValidated }">
            <!-- Product Name -->
            <div class="card">
                <div class="row">
                    <h5 class="m-3 card-title"><strong>Category: </strong>{{ categoryTitle }}</h5>
                    <div class="col-md-6 col-12 ps-4 py-4">
                        <div class="mb-3">
                            <label for="productName" class="form-label">Product Name</label>
                            <input type="text" class="form-control" id="productName" v-model="productForm.name"
                                required />
                        </div>
                        <!-- Product Price -->
                        <div class="mb-3">
                            <label for="price" class="form-label">Price</label>
                            <input type="number" class="form-control" id="price" v-model="productForm.price" required />
                        </div>
                        <!-- Product Description -->
                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" v-model="productForm.description" rows="3"
                                style="resize: none;" required></textarea>
                        </div>
                        <!-- Choices Section -->
                        <div class="mb-3">
                            <label class="form-label">Assign Choices</label>
                            <div class="scroller-card">
                                <div v-for="(choice, index) in availableChoices" :key="index" class="form-check">
                                    <input type="checkbox" class="form-check-input" :id="'choice' + index"
                                        v-model="choice.id" :value="choice.id" />
                                    <label class="form-check-label" :for="'choice' + index">
                                        <!-- Displaying choice name, required/optional status, and choice type in a line -->
                                        {{ choice.name }} -
                                        <span>{{ choice.is_required == 1 ? 'Required' : 'Optional' }}</span> -
                                        <span>{{ choice.choice_type }}</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- Image Upload Required Validation -->
                        <div class="mb-3" v-if="isFormValidated && !productForm.image_path">
                            <div class="text-danger">Image is required.</div>
                        </div>


                    </div>

                    <div class="col-md-6 col-12">
                        <div class="p-4 text-center">
                            <div class="drop-zone" @click="triggerFileInput">
                                <!-- <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*"
                                    :required="!productForm.image" class="d-none" /> -->

                                <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*"
                                    class="d-none" />

                                <img v-if="productForm.image_path" :src="productForm.image_path" alt="Uploaded Image"
                                    class="img-fluid" />
                                <div v-else>
                                    <i class="fa-solid fa-arrow-up-from-bracket fa-4x" style="color: #373d49;"></i>
                                    <p>Click to upload Product photo</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div class="mt-3">
                <button class="btn btn-primary me-2 px-5 py-2" type="submit">{{ isEditMode ? 'Update' : 'Add'
                    }}</button>
                <button class="btn btn-secondary px-5 py-2" type="button" @click="cancelForm">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
// Props and emits
const props = defineProps({
    product: Object,
    isEditMode: Boolean,
    categoryTitle: String,
});
const emits = defineEmits(['save', 'cancel']);

const availableChoices = computed(() => store.getters['menuChoice/allChoices']);

// Available choices for the product (can be fetched from an API later)
//const availableChoices = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'];
    
// Refs and reactive data
const productFormRef = ref(null);
const isFormValidated = ref(false);
const productForm = reactive({
    name: '', //name
    description: '', //price
    price: 0,               //category // description//variation_id
    image_path: null, // Now directly storing the image data URL // image_path
    variation_id: {
        choices: [], addons: []
    }, // Array to store selected choices 
});
const fileInput = ref(null);

// Trigger file input
const triggerFileInput = () => {
    fileInput.value.click();
};

// Handle image upload
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        productForm.image_file = file; // Store the image file for submission
        // Use FileReader to display the image preview
        const reader = new FileReader();
        reader.onload = (e) => {
            productForm.image_path = e.target.result; // This is for displaying the image preview
        };
        reader.readAsDataURL(file);
    } else {
        isFormValidated.value = false;
        alert('Please upload a valid image file.');
    }
};

// Submit form


const submitForm = () => {
    isFormValidated.value = true;
    if (productForm.image_file && productFormRef.value.checkValidity()) {
        emits('save', { ...productForm });
        isFormValidated.value = false; // Reset validation
    } else {
        productFormRef.value.reportValidity();
        if (!productForm.image_file) {
            // Optionally alert if no image is uploaded
        }
    }
};


// Cancel form
const cancelForm = () => {
    emits('cancel');
};

// Reset form
const resetForm = () => {
    productForm.name = '';
    productForm.description = '';
    productForm.price = 0;
    productForm.image_path = null; // Reset the image as well
};

// Watch for changes in the product prop
watch(
    () => props.product,
    (newProduct) => {
        if (newProduct) {
            Object.assign(productForm, newProduct);
        } else {
            resetForm();
        }
    },
    { immediate: true }
);
</script>

<style scoped>
.drop-zone {
    width: 100%;
    height: 200px;
    border: 2px dashed #ced4da;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #f8f9fa;
    position: relative;
}

.drop-zone:hover {
    background-color: #e9ecef;
}

.scroller-card {
    overflow-y: auto;
    height: 100px;
}

.drop-zone img {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
}
</style>
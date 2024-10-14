<template>

    <div class="p-2">
        <div class="mb-3">
            <h5 class="card-title">{{ isEditMode ? 'Edit Product' : 'Add Product' }}</h5>
        </div>
        <form ref="productFormRef" @submit.prevent="submitForm" :class="{ 'was-validated': isFormValidated }">
            <!-- Product Name -->
            <div class="card">
                <div class="row">
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
                                        v-model="productForm.assignedChoices" :value="choice" />
                                    <label class="form-check-label" :for="'choice' + index">{{ choice }}</label>
                                </div>
                            </div>
                        </div>

                        <!-- Image Upload Required Validation -->
                        <div class="mb-3" v-if="isFormValidated && !productForm.image">
                            <div class="text-danger">Image is required.</div>
                        </div>


                    </div>
                    <div class="col-md-6 col-12">
                        <div class="p-4 text-center">
                            <div class="drop-zone" @click="triggerFileInput">
                                <input type="file" ref="fileInput" @change="handleImageUpload" accept="image/*"
                                    class="d-none" required />
                                <img v-if="productForm.image" :src="productForm.image" alt="Uploaded Image"
                                    class="img-fluid" />
                                <div v-else>
                                    <i class="fa-solid fa-arrow-up-from-bracket fa-4x" style="color: #373d49;"></i>
                                    <p>Click to upload Product photo <br />
                                        <!-- <button class="btn btn-outline-primary">Select file</button> -->
                                    </p>
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
import { ref, reactive, watch } from 'vue';

// Props and emits
const props = defineProps({
    product: Object,
    isEditMode: Boolean,
});
const emits = defineEmits(['save', 'cancel']);


// Available choices for the product (can be fetched from an API later)
const availableChoices = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'];

// Refs and reactive data
const productFormRef = ref(null);
const isFormValidated = ref(false);
const productForm = reactive({
    name: '',
    description: '',
    price: 0,
    image: null, // Now directly storing the image data URL
    assignedChoices: [], // Array to store selected choices
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
        const reader = new FileReader();
        reader.onload = (e) => {
            productForm.image = e.target.result; // Set uploaded image source directly in productForm
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
};

// Submit form
const submitForm = () => {
    isFormValidated.value = true;
    // Check if image is uploaded
    if (productFormRef.value.checkValidity() && productForm.image) {
        console.log(productForm, " pf")
        emits('save', { ...productForm });
        isFormValidated.value = false; // Reset validation
    } else {
        productFormRef.value.reportValidity();
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
    productForm.image = null; // Reset the image as well
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
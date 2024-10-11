<template>
    <div class="card product-form-card mx-auto">
        <div class="card-header text-center">
            <h5>Add Product</h5>
            <p>Add a new product to your store.</p>
        </div>

        <div class="card-body">
            <ul class="nav nav-pills mb-3 justify-content-center">
                <li class="nav-item">
                    <span class="nav-link active">01 General</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link disabled">02 Pricing</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link disabled">03 Files</span>
                </li>
                <li class="nav-item">
                    <span class="nav-link disabled">04 Settings</span>
                </li>
            </ul>

            <form @submit.prevent="submitProduct">
                <div class="mb-3">
                    <label for="product-name" class="form-label">Name *</label>
                    <input type="text" class="form-control" id="product-name" v-model="product.name"
                        placeholder="Enter product name" required>
                </div>

                <div class="mb-3">
                    <label for="product-description" class="form-label">Description</label>
                    <textarea class="form-control" id="product-description" v-model="product.description" rows="3"
                        placeholder="Enter product description"></textarea>
                </div>

                <div class="mb-3 upload-box">
                    <label for="product-images" class="form-label">Upload Image</label>
                    <div class="upload-area" @click="uploadImage">
                        <input type="file" id="product-images" hidden @change="handleImageUpload">
                        <p v-if="!product.image">Click to browse or drag and drop</p>
                        <img v-if="product.image" :src="product.image" class="img-preview" />
                    </div>
                </div>

                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-secondary">Save as draft</button>
                    <button type="submit" class="btn btn-primary">Next step</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const product = ref({
    name: '',
    description: '',
    image: null,
});

const submitProduct = () => {
    console.log('Product submitted:', product.value);
};

const uploadImage = () => {
    document.getElementById('product-images').click();
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        product.value.image = URL.createObjectURL(file);
    }
};
</script>

<style scoped>
.product-form-card {
    max-width: 600px;
    border-radius: 8px;
    border: none;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

.card-header h5 {
    font-weight: bold;
}

.card-header p {
    font-size: 0.9rem;
    color: #6c757d;
}

.nav-pills .nav-link {
    background-color: #f8f9fa;
    border-radius: 50px;
    margin-right: 10px;
}

.nav-pills .nav-link.active {
    background-color: #0d6efd;
    color: white;
}

.upload-box {
    margin-top: 20px;
}

.upload-area {
    border: 2px dashed #ced4da;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
}

.img-preview {
    width: 100%;
    height: auto;
    max-height: 200px;
    border-radius: 8px;
}

button {
    min-width: 120px;
}
</style>

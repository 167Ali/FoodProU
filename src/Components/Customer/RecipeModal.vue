<template>
    <div v-if="isVisible" class="modal fade show d-block" tabindex="-1" role="dialog" aria-labelledby="recipeModalLabel"
        aria-hidden="true" @click.self="closeModal">
        <div class="modal-dialog modal-md modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-header align-items-center">
                    <h5 class="modal-title" id="recipeModalLabel">{{ title }}</h5>
                    <button type="button" class="close btn  btn-lg ml-auto" @click="closeModal"
                        aria-label="Close">
                        <i class="fa-sharp fa-solid fa-xmark fa-lg"></i>
                        
                    </button>

                </div>

                <div class="modal-body">
                    <div class="modal-image-container">
                        <img :src="image" alt="Recipe image" class="img-fluid rounded modal-image" />
                    </div>
                    <h6 class="text-muted">{{ category }}</h6>

                    <h5>Ingredients:</h5>
                    <ul class="ingredients-list mb-3">
                        <li v-for="(ingredient, index) in ingredients" :key="index">{{ ingredient }}</li>
                    </ul>

                    <h5>Recipe:</h5>
                    <p class="modal-instructions">{{ instructions }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>


<style scoped>
.modal-content {
    border-radius: 8px;
}

.modal-image-container {
    position: relative;
    overflow: hidden;
}

.modal-image {
    width: 100%;
    height: auto;
    max-height: 200px;
    /* Adjust for image size */
    object-fit: cover;
    filter: brightness(0.8);
    /* Add a slight dark overlay */
}

.modal-title {
    font-weight: bold;
    color: white;
    /* Title color */
}

h5 {
    margin-top: 15px;
    color: #00754A;
    font-weight: bold;

}

.modal-instructions {
    margin-top: 10px;
    color: #666;
}

.list-group-item {
    background-color: #f8f9fa;
    /* Light background for ingredients */
    border: none;
    /* Remove borders for a cleaner look */
}


.modal-header {
    background-color: #00754A;

}


</style>
<template>
  <div class="rating-container">
    <h2>Rate Your Order</h2>

    <div class="rating-section">
      <label for="rating">Rating:</label>
      <div class="stars">
        <span
          v-for="star in 5"
          :key="star"
          @click="setRating(star)"
          :class="{ selected: star <= rating }"
          class="star"
        >
          ★
        </span>
      </div>
    </div>

    <div class="remarks-section">
      <label for="remarks">Remarks:</label>
      <textarea
        v-model="remarks"
        id="remarks"
        placeholder="Write your remarks here..."
      ></textarea>
    </div>

    <button @click="submitReview" class="submit-button" :disabled="loading">Add Review</button>
    <div v-if="loading">Submitting review...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router'; // Optional if using route props

// Props
const props = defineProps({
  orderId: {
    type: String,
    required: true,
  },
});

// State and Store
const store = useStore();
const rating = ref(0);
const remarks = ref('');

// Computed properties from the Vuex store
const loading = computed(() => store.getters['reviews/loading']);
const error = computed(() => store.getters['reviews/error']);
const successMessage = computed(() => store.getters['reviews/successMessage']);

// Methods
const setRating = (value) => {
  rating.value = value;
};

const submitReview = () => {
  if (rating.value === 0 || remarks.value.trim() === '') {
    alert('Please provide both a rating and remarks.');
    return;
  }

  const reviewData = {
    orderId: props.orderId, // Pass the correct order ID
    rating: rating.value,
    remarks: remarks.value,
  };

  // Dispatch the action to submit the review via Vuex
  store.dispatch('reviews/submitCustomerReview', reviewData);

  // Optionally, reset fields after submission if no error occurred
  if (!loading.value && !error.value) {
    rating.value = 0;
    remarks.value = '';
  }
};
</script>

<style scoped>
.rating-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.rating-section,
.remarks-section {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
}

.star {
  font-size: 2rem;
  color: #dcdcdc;
}

.star.selected {
  color: #ffb400;
}

textarea {
  width: 100%;
  height: 50px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: none;
}

.submit-button {
  width: 100%;
  background-color: #00754A;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #00593C;
}

.submit-button:disabled {
  background-color: #ccc;
}

.success {
  color: green;
  margin-top: 10px;
  text-align: center;
}
</style>
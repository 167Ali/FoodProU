<template>
  <div class="layout-container">
    <SideBar />
    <div class="reviews-container">
      <h2>Reviews</h2>

      <!-- Restaurant Filter -->
      <div class="filter">
        <label for="restaurant">Select Restaurant:</label>
        <select id="restaurant" v-model="selectedRestaurant" @change="filterReviews">
          <option value="">All Restaurants</option>
          <option v-for="restaurant in restaurants" :key="restaurant.id" :value="restaurant.name">
            {{ restaurant.name }}
          </option>
        </select>
      </div>

      <div class="summary">
        <div class="summary-item">
          <h3>Total Reviews</h3>
          <p>{{ filteredReviews.length }} ({{ growthPercentage }}%)</p>
        </div>
        <div class="summary-item">
          <h3>Average Rating</h3>
          <p>{{ averageRating }} ★★★★☆</p>
        </div>
      </div>

      <div v-if="filteredReviews.length">
        <div v-for="review in filteredReviews" :key="review.id" class="review-card">
          <div class="review-header">
            <img :src="review.avatar" alt="User Avatar" class="avatar" />
            <div class="review-info">
              <h4>{{ review.name }}</h4>
              <p>Total Spend: ${{ review.totalSpend }}</p>
              <p>Total Reviews: {{ review.totalReview }}</p>
              <p>{{ review.date }}</p>
            </div>
          </div>
          <p class="review-rating">{{ review.rating }} ★★★★☆</p>
          <p class="review-text">{{ review.text }}</p>
          <div class="review-actions">
            <button class="action-button">Public Comment</button>
            <button class="action-button">Direct Message</button>
          </div>
        </div>
      </div>

      <div v-else>
        <p>No reviews available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchReviews, fetchRestaurants } from '@/Services/Admin/reviewAdminServices';
import SideBar from '@/Components/Admin/SideBar.vue';

// Define state using the Composition API
const reviews = ref([]);
const filteredReviews = ref([]);
const totalReviews = ref(0);
const averageRating = ref(0);
const growthPercentage = ref(0);
const restaurants = ref([]);
const selectedRestaurant = ref('');

// Function to fetch reviews
const getReviews = async () => {
  try {
    const data = await fetchReviews();
    reviews.value = data.reviews; // Adjust according to your API response structure
    totalReviews.value = data.totalReviews;
    averageRating.value = data.averageRating;
    growthPercentage.value = data.growthPercentage;
    filteredReviews.value = reviews.value; // Set initial filtered reviews
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
  }
};

// Function to fetch restaurants
const getRestaurants = async () => {
  try {
    const data = await fetchRestaurants();
    restaurants.value = data.restaurants; // Adjust according to your API response structure
  } catch (error) {
    console.error('Failed to fetch restaurants:', error);
  }
};

// Function to filter reviews by the selected restaurant
const filterReviews = () => {
  if (selectedRestaurant.value) {
    filteredReviews.value = reviews.value.filter(review => review.restaurant === selectedRestaurant.value);
  } else {
    filteredReviews.value = reviews.value; // Reset to all reviews if no restaurant is selected
  }
};

// Fetch data when component is mounted
onMounted(() => {
  getReviews();
  getRestaurants();
});
</script>

<style scoped>
.layout-container {
  display: flex;

}



.reviews-container {
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.filter {
  margin-bottom: 20px;
}

.summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.summary-item {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  width: 48%;
  text-align: center;
}

.review-card {
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.review-header {
  display: flex;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.review-info {
  flex: 1;
}

.review-rating {
  color: #FFA500;
  /* Gold color for rating */
}

.review-text {
  margin: 10px 0;
}

.review-actions {
  display: flex;
  justify-content: flex-end;
}

.action-button {
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>
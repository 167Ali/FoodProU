<template>
  <div class="layout-container">
    <SideBar />
    <div class="reviews-container">
      <h2>Reviews</h2>

      <!-- Loading Spinner -->
      <div v-if="loading" class="loading-container">
        <p>Loading data...</p>
      </div>

      <!-- Content visible only when data is available and not loading -->
      <div v-else>
        <!-- Restaurant Filter -->
        <div class="filter">
          <label for="restaurant">Select Restaurant:</label>
          <select id="restaurant" v-model="selectedRestaurantLocal" @change="filterReviews">
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
            <p>{{ averageRating || 0 }} ★★★★☆</p>
          </div>
        </div>

        <div v-if="filteredReviews.length">
          <div v-for="review in filteredReviews" :key="review?.id" class="review-card">
            <div class="review-header">
              <img v-if="review.user?.avatar" :src="review.user.avatar" alt="User Avatar" class="avatar" />
              <div class="review-info">
                <h4>{{ review.user?.first_name }} {{ review.user?.last_name }}</h4>
                <p>Restaurant: {{ review.restaurant?.name }}</p>
                <p>{{ review.created_at }}</p>
              </div>
            </div>
            <p class="review-rating">{{ review.stars }} ★★★★☆</p>
            <p class="review-text">{{ review.feedback }}</p>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import SideBar from '../../components/Admin/SideBar.vue';

const store = useStore();

const reviews = computed(() => store.getters['adminreviews/reviews'] || []);
const filteredReviews = computed(() => store.getters['adminreviews/filteredReviews'] || []);
const totalReviews = computed(() => store.getters['adminreviews/totalReviews'] || 0);
const averageRating = computed(() => store.getters['adminreviews/averageRating'] || 0);
const growthPercentage = computed(() => store.getters['adminreviews/growthPercentage'] || 0);
const restaurants = computed(() => store.getters['adminreviews/restaurants'] || []);
const loading = computed(() => store.getters['adminreviews/loading'] || false);

// Using a local ref to handle the selected restaurant
const selectedRestaurantLocal = ref('');

onMounted(() => {
  store.dispatch('adminreviews/fetchReviews'); // Fetch reviews on mount
});

// Filter the reviews based on the selected restaurant
const filterReviews = () => {
  store.dispatch('adminreviews/setSelectedRestaurant', selectedRestaurantLocal.value);
};
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

.loading-container {
  text-align: center;
  margin: 20px 0;
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
  color: #ffa500;
}

.review-text {
  margin: 10px 0;
}

.review-actions {
  display: flex;
  justify-content: flex-end;
}

.action-button {
  background-color: #007bff;
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
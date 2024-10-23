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
      <div v-if="!loading">
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

        <!-- Summary of Total Reviews and Average Rating -->
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

        <!-- Reviews List -->
        <div v-if="filteredReviews.length">
          <div 
            v-for="review in filteredReviews" 
            :key="review.id" 
            class="review-card"
          >
            <div class="review-header">
              <div class="review-info">
                <h4>{{ review.user?.first_name }} {{ review.user?.last_name }}</h4>
                <p>Restaurant: {{ review.restaurant?.name || 'Unknown Restaurant' }}</p>
                <p>{{ new Date(review.created_at).toLocaleDateString() }}</p>
              </div>
            </div>
            <p class="review-rating">{{ review.stars }} {{ renderStars(review.stars) }}</p>
            <p class="review-text">{{ review.feedback }}</p>
          </div>
        </div>

        <!-- No Reviews Available Message -->
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
import SideBar from '../../Components/Admin/SideBar.vue'; // Sidebar component

const store = useStore();

// Getters from Vuex
const reviews = computed(() => store.getters['adminreviews/reviews'] || []);
const filteredReviews = computed(() => store.getters['adminreviews/filteredReviews'] || []);
const totalReviews = computed(() => store.getters['adminreviews/totalReviews'] || 0);
const averageRating = computed(() => store.getters['adminreviews/averageRating'] || 0);
const growthPercentage = computed(() => store.getters['adminreviews/growthPercentage'] || 0);
const restaurants = computed(() => store.getters['adminreviews/restaurants'] || []);
const loading = computed(() => store.getters['adminreviews/loading'] || false);

// Local ref to handle the selected restaurant filter
const selectedRestaurantLocal = ref('');

// Fetch reviews on component mount
onMounted(() => {
  store.dispatch('adminreviews/fetchReviews');
});

// Filter reviews when the restaurant is changed
const filterReviews = () => {
  store.dispatch('adminreviews/setSelectedRestaurant', selectedRestaurantLocal.value);
};

// Method to render stars dynamically
const renderStars = (stars) => {
  const totalStars = 5; // Total stars to show
  let starString = '';

  // Loop to create filled stars
  for (let i = 0; i < stars; i++) {
    starString += '★'; // Filled star
  }

  // Loop to create empty stars
  for (let i = stars; i < totalStars; i++) {
    starString += '☆'; // Empty star
  }

  return starString;
};
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh; /* Full viewport height */
}

.sidebar {
  width: 80px; /* Fixed width for the sidebar */
  height: 100vh; /* Full height for scrolling */
}

.reviews-container {
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Enable vertical scrolling if needed */
  max-height: calc(100vh - 40px); /* Adjust based on your header/footer height */
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

.review-info {
  flex: 1;
}

.review-rating {
  color: #ffa500;
}

.review-text {
  margin: 10px 0;
}
</style>
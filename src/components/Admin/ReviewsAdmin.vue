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
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import SideBar from '../../components/Admin/SideBar.vue';

const store = useStore();

const reviews = computed(() => store.getters['reviewadmin/reviews']);
const filteredReviews = computed(() => store.getters['reviewadmin/filteredReviews']);
const totalReviews = computed(() => store.getters['reviewadmin/totalReviews']);
const averageRating = computed(() => store.getters['reviewadmin/averageRating']);
const growthPercentage = computed(() => store.getters['reviewadmin/growthPercentage']);
const restaurants = computed(() => store.getters['reviewadmin/restaurants']);
const selectedRestaurant = computed(() => store.getters['reviewadmin/selectedRestaurant']);
const loading = computed(() => store.getters['reviewadmin/loading']);
const error = computed(() => store.getters['reviewadmin/error']);

onMounted(() => {
  store.dispatch('reviewadmin/fetchReviews');
  store.dispatch('reviewadmin/fetchRestaurants');
});

const filterReviews = () => {
  store.dispatch('reviewadmin/setSelectedRestaurant', selectedRestaurant.value);
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
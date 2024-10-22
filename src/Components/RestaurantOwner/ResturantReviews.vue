<template>
  <div class="main-container">
    <SideBar class="sidebar" />
    <div class="reviews-container">
      <h1>My Restaurant Reviews</h1>

      <!-- Loading and Error States -->
      <div v-if="loading" class="loading">Loading reviews...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <!-- Reviews Display -->
      <div v-else class="reviews-list">
        <div v-for="review in reviews" :key="review.id" class="review-card">
          <!-- Avatar and Header -->
          <div class="review-header">
            <img :src="review.avatar" alt="Avatar" class="review-avatar" />
            <div class="review-info">
              <h2>{{ review.first_name }} {{ review.last_name }}</h2>
              <p class="review-date">{{ review.date }}</p>
            </div>
            <div class="review-rating">
              <!-- Star Rating and Total Comments -->
              <span class="stars">
                <i v-for="n in 5" :key="n" :class="n <= review.stars ? 'fas fa-star' : 'far fa-star'"></i>
              </span>
              <span class="comments-count">
                 {{ review.comments_count }}
              </span>
            </div>
          </div>
          <i class="fas fa-comment comments-count"></i>
          <!-- Review Body -->
          <p class="review-feedback">{{ review.feedback }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import SideBar from '@/Components/RestaurantOwner/RestaurantDashboard/SideBar.vue';

// Props
const props = defineProps({
  restaurantId: {
    type: String,
    required: true,
  },
});

// Use Vuex store
const store = useStore();

// Getters for reviews, loading state, and error from Vuex
const reviews = computed(() => store.getters['Resturantownerreviews/reviews']);
const loading = computed(() => store.getters['Resturantownerreviews/loading']);
const error = computed(() => store.getters['Resturantownerreviews/error']);

// Fetch reviews on component mount
onMounted(() => {
  store.dispatch('Resturantownerreviews/fetchOwnerReviews', props.restaurantId);
});
</script>

<style scoped>
/* Main layout for sidebar and content */
.main-container {
  display: flex;
  min-height: 100vh;
  background-color: #f7f7f7;
}

/* Sidebar */
.sidebar {
  width: 80px; /* Increase sidebar width for better layout */
  
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 20px;
  box-sizing: border-box;
}

/* Container for reviews */
.reviews-container {
  padding: 40px;
  background-color: #fff;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: auto;
}

/* Loading and Error styles */
.loading, .error {
  text-align: center;
  margin-top: 20px;
  color: #ff6347;
  font-weight: bold;
}

/* Review list grid */
.reviews-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 20px;
}

/* Review card styling */
.review-card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.review-card:hover {
  border-color: #00c8a0;
}

/* Review header with avatar and details */
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.review-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.review-info {
  flex-grow: 1;
  margin-left: 20px;
}

.review-info h2 {
  font-size: 1.2rem;
  margin: 0;
}

.review-info .review-date {
  font-size: 0.9rem;
  color: #888;
}

/* Star Rating and Comments */
.review-rating {
  display: flex;
  align-items: center;
}

.stars {
  color: #ffd700;
}

.stars i {
  margin-right: 3px;
}

.comments-count {
  display: flex;
  align-items: center;
  margin-left: 15px;
  color: #00c8a0;
}

.comments-count i {
  margin-right: 5px;
}

/* Review feedback */
.review-feedback {
  font-size: 1rem;
  color: #555;
  margin-top: 15px;
  line-height: 1.6;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .reviews-list {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .reviews-container {
    padding: 20px;
  }
}
</style>
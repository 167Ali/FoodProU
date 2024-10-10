<template>
  <div>
    <!-- Button to trigger the modal -->
    <button class="btn btn-more-info" @click="showModal = true">See reviews</button>

    <!-- Modal -->
    <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" style="display: block;"
      v-if="showModal">
      <div class="modal-dialog modal-dialog-centered" role="document" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Reviews</h5>
            <button type="button" class="btn-close" @click="closeModal">&times;</button>
          </div>
          <div class="modal-body">
            <!-- Review Summary -->
            <div class="d-flex justify-content-between align-items-center mb-4 rounded-box">
              <div>
                <h2>4.9</h2>
                <h5 class="rating">(All ratings 100+)</h5>
              </div>
              <!-- Rating distribution -->
              <div class="rating-distribution">
                <div v-for="(percentage, index) in ratings" :key="index" class="rating-row">
                  <span>{{ 5 - index }}<i class="fas fa-star"></i></span>
                  <div class="rating-bar">
                    <div :style="{ width: percentage + '%' }" class="rating-fill"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Review Filters -->
            <div class="review-filters mb-4">
              <button class="filter-btn" :class="{ active: activeFilter === 'top' }" @click="setActiveFilter('top')">Top
                reviews</button>
              <button class="filter-btn" :class="{ active: activeFilter === 'newest' }"
                @click="setActiveFilter('newest')">Newest</button>
              <button class="filter-btn" :class="{ active: activeFilter === 'highest' }"
                @click="setActiveFilter('highest')">Highest rating</button>
              <button class="filter-btn" :class="{ active: activeFilter === 'lowest' }"
                @click="setActiveFilter('lowest')">Lowest rating</button>
            </div>

            <!-- Individual Reviews -->
            <div class="review-item mb-3 rounded-box">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Zaara</strong><span class="badge badge-secondary">Top Reviewer</span>
                  <p class="review-date">2 weeks ago</p>
                </div>
                <div class="review-rating">
                  <i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i
                    class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i
                    class="fas fa-star text-warning"></i>
                </div>
              </div>
              <p>Their rolls platter was really tasty!</p>

              <!-- Liked dishes -->
              <div class="liked-dish d-flex align-items-center">
                <img src="https://via.placeholder.com/60" alt="dish image" class="dish-img">
                <div class="dish-info ms-3">
                  <p class="mb-1">Premium Rolls Platter</p>
                  <p class="price">Rs. 1,200</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);
const ratings = [80, 10, 5, 3, 2]; // Example percentages for 5-star, 4-star, etc.
const activeFilter = ref('top'); // Track which filter is active

const closeModal = () => {
  showModal.value = false;
};

const setActiveFilter = (filter) => {
  activeFilter.value = filter; // Update active filter
};
</script>

<style scoped>
/* Modal styling */
.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-dialog {
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* More Info button styling */
.btn-more-info {
  border-radius: 15px;
  border: none;
  color: rgb(38, 36, 36);
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: -20px;
}

.btn-more-info:hover,
.btn-more-info:active {
  background-color: lightgray;
  /* Light gray on hover or active */
  color: black;
  /* Change text color on hover */
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1040;
}

/* Close button styling */
.btn-close {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}

/* Modal body with light gray background */
.modal-body {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
}

/* Custom class for divs with rounded borders and white background */
.rounded-box {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
}

/* Reduced font size for "All ratings 100+" */
.rating {
  font-size: 1em;
  font-weight: bold;
}

/* Rating distribution styling */
.rating-distribution .rating-row {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.rating-bar {
  background-color: #ddd;
  width: 100px;
  height: 8px;
  margin-left: 10px;
  position: relative;
}

.rating-fill {
  background-color: #fbc02d;
  height: 100%;
  position: absolute;
}

/* Filter button styling */
.review-filters .filter-btn {
  border: 1px solid #ddd;
  padding: 5px 10px;
  margin-right: 5px;
  cursor: pointer;
  border-radius: 15px;
  transition: background-color 0.3s, color 0.3s, font-weight 0.3s;
}

.review-filters .filter-btn.active {
  background-color: #555;
  color: white;
  font-weight: bold;
}

.review-item {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.review-rating i {
  color: #fbc02d;
}

.badge {
  margin-left: 10px;
  background-color: pink;
}

.liked-dish {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.dish-img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}

.dish-info {
  font-size: 0.9em;
}

.price {
  color: gray;
}
</style>
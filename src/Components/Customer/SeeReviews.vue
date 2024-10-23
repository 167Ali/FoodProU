<template>
  <div>
    <!-- Button to trigger the modal -->
    <button class="btn btn-more-info" @click="showModal = true">See reviews</button>

    <!-- Modal -->
    <div
      class="modal fade"
      :class="{ show: showModal }"
      tabindex="-1"
      role="dialog"
      v-if="showModal"
    >
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
                <div
                  v-for="(percentage, index) in ratings"
                  :key="index"
                  class="rating-row"
                >
                  <span>{{ 5 - index }}<i class="fas fa-star"></i></span>
                  <div class="rating-bar">
                    <div
                      :style="{ width: percentage + '%' }"
                      class="rating-fill"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Individual Reviews -->
            <!-- Assume reviews is an array of review objects -->
            <div
              v-for="(review, index) in reviews"
              :key="index"
              class="review-item mb-3 rounded-box"
            >
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{{ review.name }}</strong>
                  <span v-if="review.topReviewer" class="badge badge-secondary"
                    >Top Reviewer</span
                  >
                  <p class="review-date">{{ review.date }}</p>
                </div>
                <div class="review-rating">
                  <i
                    v-for="n in 5"
                    :key="n"
                    class="fas fa-star"
                    :class="n <= review.rating ? 'text-warning' : 'text-muted'"
                  ></i>
                </div>
              </div>
              <p>{{ review.comment }}</p>

              <!-- Liked dishes -->
              <div class="liked-dish d-flex align-items-center">
                <img
                  :src="review.dish.image"
                  alt="dish image"
                  class="dish-img"
                />
                <div class="dish-info ms-3">
                  <p class="mb-1">{{ review.dish.name }}</p>
                  <p class="price">Rs. {{ review.dish.price }}</p>
                </div>
              </div>
            </div>
            <!-- End of reviews loop -->
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

// Sample reviews data
const reviews = [
  {
    name: 'Zaara',
    topReviewer: true,
    date: '2 weeks ago',
    rating: 5,
    comment: 'Their rolls platter was really tasty!',
    dish: {
      image: 'https://via.placeholder.com/60',
      name: 'Premium Rolls Platter',
      price: 1200,
    },
  },
  {
    name: 'Zaara',
    topReviewer: true,
    date: '2 weeks ago',
    rating: 5,
    comment: 'Their rolls platter was really tasty!',
    dish: {
      image: 'https://via.placeholder.com/60',
      name: 'Premium Rolls Platter',
      price: 1200,
    },
  },{
    name: 'Zaara',
    topReviewer: true,
    date: '2 weeks ago',
    rating: 5,
    comment: 'Their rolls platter was really tasty!',
    dish: {
      image: 'https://via.placeholder.com/60',
      name: 'Premium Rolls Platter',
      price: 1200,
    },
  },{
    name: 'Zaara',
    topReviewer: true,
    date: '2 weeks ago',
    rating: 5,
    comment: 'Their rolls platter was really tasty!',
    dish: {
      image: 'https://via.placeholder.com/60',
      name: 'Premium Rolls Platter',
      price: 1200,
    },
  },{
    name: 'Zaara',
    topReviewer: true,
    date: '2 weeks ago',
    rating: 5,
    comment: 'Their rolls platter was really tasty!',
    dish: {
      image: 'https://via.placeholder.com/60',
      name: 'Premium Rolls Platter',
      price: 1200,
    },
  },
  // Add more review objects as needed
];
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
  margin: 30px auto;
}

.modal-content {
  max-height: 90vh;
  overflow: hidden;
}

.modal-body {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  max-height: 70vh;
  overflow-y: auto;
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
  color: black;
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

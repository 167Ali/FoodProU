<template>
    <div
      id="restaurant-slider"
      class="carousel slide"
      data-bs-ride="carousel"
      style="background-color: #66a182; padding: 20px; border-radius: 12px;"
    >
      <!-- Carousel Indicators -->
      <div class="carousel-indicators">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :data-bs-target="'#restaurant-slider'"
          :data-bs-slide-to="index"
          :class="{ active: index === 0 }"
          aria-current="index === 0 ? 'true' : ''"
          :aria-label="'Slide ' + (index + 1)"
        ></button>
      </div>
  
      <!-- Carousel Items -->
      <div class="carousel-inner">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          :class="['carousel-item', { active: index === 0 }]"
        >
          <div class="row">
            <div v-for="restaurant in slide" :key="restaurant.id" class="col-md-3">
              <div class="card restaurant-card m-2">
                <div class="position-relative">
                  <img :src="restaurant.image" class="card-img-top" alt="Restaurant Image" />
                  <div class="position-absolute top-0 start-0 m-2 d-flex flex-column">
                    <span
                      class="badge bg-success mb-1"
                      v-for="(discount, index) in restaurant.discounts"
                      :key="index"
                    >
                    </span>
                  </div>
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{ restaurant.name }}</h5>
                  <p class="card-cuisine text-muted mb-1">{{ restaurant.cuisine }}</p>
                  <div class="card-info d-flex justify-content-between align-items-center ">
                    <span class="rating">⭐ {{ restaurant.rating }} ({{ restaurant.reviews }}+)</span>
                    <span class="price">{{ restaurant.price }}</span>
                  </div>
                  <div class="delivery-info text-muted">
                    <span>{{ restaurant.deliveryTime }} min</span> · <span>{{ restaurant.deliveryFee }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Carousel Controls -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#restaurant-slider"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#restaurant-slider"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    name: 'RestaurantSlider',
    props: {
      restaurants: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      // Split restaurants data into slides, 4 items per slide
      const slides = computed(() => {
        const slideSize = 4;
        return props.restaurants.reduce((acc, restaurant, index) => {
          const slideIndex = Math.floor(index / slideSize);
          if (!acc[slideIndex]) acc[slideIndex] = [];
          acc[slideIndex].push(restaurant);
          return acc;
        }, []);
      });
  
      return {
        slides,
      };
    },
  };
  </script>
  
  <style scoped>
  .card {
    max-width: 550px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: 0.5rem;
    min-height: 200px; /* Reduced card height */
  }
  
  .card:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
  
  .card-img-top {
    height: 120px; /* Further reduced image height */
    object-fit: cover;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
  
  .card-body {
    padding: 5px; /* Reduced padding */
  }
  
  .card-title {
    font-size: 1rem; /* Slightly smaller title */
    font-weight: bold;
    height: 20px; /* Fixed height for title */
    overflow: hidden; /* Prevent text overflow */
  }
  
  .card-cuisine {
    font-size: 0.8rem;
    height: 20px; /* Fixed height for cuisine */
    overflow: hidden;
  }
  
  .card-info {
    font-size: 0.8rem;
  }
  
  .delivery-info {
    font-size: 0.8rem;
  }
  
  .badge {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
  }
  
  .carousel-indicators button {
    background-color: #9c9c9c;
  }
  
  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: #b5d6ca;
  }
  </style>
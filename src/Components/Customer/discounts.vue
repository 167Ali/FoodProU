<template>
  <div
    id="deal-slider"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <!-- Carousel Items -->
    <div class="carousel-inner">
      <div
        v-for="(slide, index) in slides"
        :key="index"
        :class="['carousel-item', { active: index === 0 }]"
      >
        <div class="row">
          <div v-for="deal in slide" :key="deal.id" class="col-md-3">
            <div class="card restaurant-card m-2">
              <div class="position-relative">
                <img :src="getImageUrl(deal.restaurant_logo)" class="card-img-top" alt="Restaurant Image" />
                <div class="position-absolute top-0 start-0 m-2 d-flex flex-column">
                  <span class="badge bg-success mb-1">
                    {{ deal.discount }}% OFF
                  </span>
                </div>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ deal.name }}</h5>
                <p class="card-cuisine text-muted mb-1">{{ deal.restaurant_cuisine }}</p>
                <div class="card-info d-flex justify-content-between align-items-center">
                  <span class="price">Rating: {{ deal.average_rating }}</span>
                </div>
                <div class="delivery-info text-muted">
                  <span>{{ deal.restaurant_name }}</span>
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
      data-bs-target="#deal-slider"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#deal-slider"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Computed property to get deals from Vuex store
const deals = computed(() => store.getters['resturantDetails/allDeals']);

// Computed property to split deals into slides of 4 items each
const slides = computed(() => {
  const slideSize = 4;
  return deals.value.reduce((acc, deal, index) => {
    const slideIndex = Math.floor(index / slideSize);
    if (!acc[slideIndex]) acc[slideIndex] = [];
    acc[slideIndex].push(deal);
    return acc;
  }, []);
});

// Function to construct image URL
const getImageUrl = (imagePath) => {
  return imagePath !== 'N/A' ? `http://192.168.15.90:8000/media/${imagePath}` : 'default-image-path.jpg';
};

// Fetch deals when the component is mounted
onMounted(() => {
  store.dispatch('resturantDetails/fetchDeals');
});
</script>
<style scoped>
#deal-slider {
  background:#00754A;
  padding: 20px;
  border-radius: 12px;
  
}
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


.carousel-control-prev-icon
{
  background-color: #000000; 
  border-radius: 50%; 
  padding: 0px 0px 10px 0px;
  margin-right: 155px;
}
.carousel-control-next-icon {
  background-color: #000000; 
  border-radius: 50%;
  padding: 0px 0px 10px 0px;
  margin-left: 155px;
}

@media (max-width: 767.98px) {
  #deal-slider {
    display: none;
  }
}
</style>
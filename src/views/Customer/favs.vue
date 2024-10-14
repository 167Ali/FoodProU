<template>
  <LoginHeader />
  <div class="container mt-4">
    <h2 class="text-center">Favorite Foods</h2>
    <div class="row">
      <transition-group name="fade" tag="div" class="row">
        <div class="col-md-4" v-for="food in foods" :key="food.id">
          <div class="card mb-4 animated-card">
            <img :src="food.image" class="card-img-top" :alt="food.name" />
            <div class="card-body">
              <h5 class="card-title">{{ food.name }}</h5>
              <p class="card-text">Price: {{ food.price }} pkr</p>
              <button class="btn btn-primary">View Details</button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
  <PageFooter />
</template>


<script setup>
import { reactive } from 'vue';

// Defining the foods list as a reactive object
const foods = reactive([
  {
    id: 1,
    name: "Biriyani",
    price: 350,
    image: "#",
  },
  {
    id: 2,
    name: "Seekh Kebabs",
    price: 350,
    image: "#",
  },
  {
    id: 3,
    name: "Haleem",
    price: 350,
    image: "#",
  },
  {
    id: 4,
    name: "Seekh Kebabs",
    price: 350,
    image: "#",

  },
]);
</script>

<style scoped>
.card-img-top {
  height: 180px; 
  object-fit: cover; 
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.animated-card {
  transform: translateY(10px);
  transition: transform 0.3s;
}

.animated-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>

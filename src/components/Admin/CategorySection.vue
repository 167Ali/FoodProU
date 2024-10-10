<template>
  <div class="category-section mb-5 mt-2">
    <CategoryIcon :icon="['fas', 'pepper-hot']" label="Chinese Cuisine" />
    <CategoryIcon :icon="['fas', 'utensils']" label="Indian Cuisine" />
    <CategoryIcon :icon="['fas', 'pizza-slice']" label="Italian Cuisine" />
    <CategoryIcon :icon="['fas', 'hamburger']" label="Fast Food" />
    <CategoryIcon :icon="['fas', 'pepper-hot']" label="Mexican Cuisine" /> <!-- Use pepper-hot if taco is unavailable -->
    <CategoryIcon :icon="['fas', 'hotdog']" label="American Cuisine" />
    <CategoryIcon :icon="['fas', 'globe']" label="Continental Cuisine" />
  </div>
</template>

<script setup>
import CategoryIcon from './CategoryIcon.vue'; // Adjust the path if needed
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUtensils,
  faPepperHot,
  faPizzaSlice,
  faHamburger,
  faHotdog,
  faGlobe,
  faBreadSlice // Optional, if you want to use it
} from '@fortawesome/free-solid-svg-icons';

// Add icons to the library within this component
library.add(
  faUtensils,
  faPepperHot,
  faPizzaSlice,
  faHamburger,
  faHotdog,
  faGlobe,
  faBreadSlice // Optional
);
</script>

<style scoped>
/* Container for the category icons */
.category-section {
  display: flex;
  justify-content: space-around;
  /* Spread items horizontally */
  align-items: center;
  /* Vertically center items */
  padding: 10px 20px;
  border-radius: 10px;
  overflow-x: auto;
  /* Enable horizontal scrolling if needed */
  white-space: nowrap;
  /* Prevent wrapping */
}

/* Mobile-friendly adjustments */
@media (max-width: 768px) {
  .category-section {
    padding: 10px;
    justify-content: flex-start;
    /* Left-align items on smaller screens */
    gap: 10px;
  }
}</style>
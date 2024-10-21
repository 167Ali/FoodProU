<template>
  <div class="category-section mb-5 mt-2">
    <CategoryIcon :icon="['fas', 'pepper-hot']" label="Chinese Cuisine" />
    <CategoryIcon :icon="['fas', 'spoon']" label="Indian Cuisine" />
    <CategoryIcon :icon="['fas', 'pizza-slice']" label="Italian Cuisine" />
    <CategoryIcon :icon="['fas', 'hamburger']" label="Fast Food" />
    <CategoryIcon :icon="['fas', 'pepper-hot']" label="Mexican Cuisine" />
    <CategoryIcon :icon="['fas', 'hotdog']" label="American Cuisine" />
    <CategoryIcon :icon="['fas', 'globe']" label="Continental Cuisine" />
  </div>
</template>

<script setup>
import CategoryIcon from '@/components/Admin/CategoryIcon.vue'; // Adjust the path if needed
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSpoon,
  faPepperHot,
  faPizzaSlice,
  faHamburger,
  faHotdog,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';

library.add(faSpoon, faPepperHot, faPizzaSlice, faHamburger, faHotdog, faGlobe);
</script>

<style scoped>
/* Container for the category icons */
.category-section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  gap: 15px;
  overflow: hidden;
  /* Hide horizontal scroll on larger screens */
}

/* Adjust to make the section horizontally scrollable on smaller screens */
@media (max-width: 768px) {
  .category-section {
    overflow-x: auto;
    white-space: nowrap;
    justify-content: flex-start;
    /* Align items to the left */
    gap: 10px;
    padding: 10px;
    scrollbar-width: none;
    /* Hide scrollbar in Firefox */
  }

  .category-section::-webkit-scrollbar {
    display: none;
    /* Hide scrollbar in WebKit browsers */
  }
}

/* Ensure that each category item maintains its size across all screen sizes */
.category-section>* {
  flex: 0 0 auto;
  /* Prevent items from shrinking or growing */
}
</style>

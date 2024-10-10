<!-- src/components/PopularSection.vue -->
<template>
  <section class="popular-section mb-2 mx-5">
    <h2 class="popular-title">🔥 Popular</h2>
    <p class="popular-subtitle">Most ordered right now.</p>
    <div class="popular-items">
      <PopularItem v-for="item in popularItems" :key="item.id" :item="item" />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import PopularItem from '../Customer/PopularItem.vue'

const popularItems = ref([
  {
    id: 1,
    name: 'Animal Fries',
    price: 649,
    description: 'Breaded fries with cheese, chunky chicken topped with fiery hot sauce...',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    name: 'Chicago Fries',
    price: 699,
    description: 'Soft on the outside, crunchy on the inside...',
    image: 'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'All American',
    price: 799,
    description: 'Smashed beef with caramelized onions and a secret sauce...',
    image: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJpZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    name: 'Nuker Chicken Burger',
    price: 999,
    description: 'Crispy chicken with fried cheese patty, fries, and animal sauce...',
    image: 'https://plus.unsplash.com/premium_photo-1683657860399-60f51361c65a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZyaWVzfGVufDB8fDB8fHww',
  }
])
</script>

<style scoped>
.popular-section {
  margin-top: 40px;
}

.popular-title {
  font-size: 1.8rem;
  font-weight: 700;
}

.popular-subtitle {
  color: #757575;
  margin-bottom: 20px;
}

.popular-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style>
<!-- src/views/Home.vue -->
<template>
    <div class="restaurant-header">
        <RestaurantHeader />
        <Deals />
    </div>
    <!-- Popular Section -->
    <PopularSection />

    <!-- Cart Section -->
    <div class="cart-section">
        <Cart />
    </div>
</template>
  
<script setup>
import RestaurantHeader from '../../components/HeaderFooter/RestaurantHeader.vue'
import Deals from '../../components/Customer/Deals.vue'
import PopularSection from '../../components/Customer/PopularSection.vue'
import Cart from '../../components/Customer/PopularItem.vue'
</script>
  
<style scoped>
.restaurant-header {
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.cart-section {
    margin-top: 40px;
}
</style>
  
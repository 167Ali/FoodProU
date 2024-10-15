<!-- HomeView.vue -->
<!-- HomeView.vue -->
<template>
    <div>
      <SeeReviews/>
      <Moreinfo/>
      <CreateDeals/>
      <ProductAddToCart/>
    </div>
  </template>
  
   <script setup>
  import SeeReviews from '@/components/Customer/SeeReviews.vue';
  import Moreinfo from '@/components/Customer/Moreinfo.vue';
  import CreateDeals from '@/components/Admin/CreateDeals.vue'
  import ProductAddToCart from '@/components/Customer/ProductAddToCart.vue';
  
  
  </script>
  
  <style scoped>
  </style>


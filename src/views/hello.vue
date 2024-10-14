<!-- HomeView.vue -->
<template>
    <div>
      <SeeReviews/>
      <Moreinfo/>
      <CreateDeals/>
      <AdminFinanceDashboard/>

    </div>
  </template>
  
   <script setup>
  import SeeReviews from '@/components/Customer/SeeReviews.vue';
  import Moreinfo from '@/components/Customer/Moreinfo.vue';
  import CreateDeals from '@/components/Admin/CreateDeals.vue'
  import AdminFinanceDashboard from '@/components/Admin/AdminFinanceDashboard.vue';

  </script>
  
  <style scoped>
  </style>

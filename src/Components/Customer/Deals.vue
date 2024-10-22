<!--  -->
<!--  -->
<template>
    <div class="main-cont">
      <h4>Available Deals</h4>
      <div class="deals">
        <div class="deal" v-for="deal in deals" :key="deal.id">
          <p class="deal-text">{{ deal.text }}</p>
          <p class="deal-details">{{ deal.details }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const deals = ref([
    { id: 1, text: 'Rs. 218 off', details: 'Min. order Rs. 218. Auto applied.' },
    { id: 2, text: '20% off (MC20)', details: 'Min. order Rs. 500. Use in cart.' },
    { id: 3, text: '30% off (MC30)', details: 'Min. order Rs. 700. Use in cart.' },
    { id: 4, text: 'Rs. 150 cashback (CB4U)', details: 'Min. order Rs. 700. Use in cart.' }
  ]);
  </script>
  
  <style scoped>
  .main-cont{
    font-family: 'Agrandir';
    padding: 0px 40px;
    padding-bottom: 10px;
  }
  .main-cont h4{
    font-weight: bolder;
    margin: 20px 0px;
  }
  .deals {
    display: flex;
    gap: 20px;
    /* height: 100px; */
    justify-content: space-evenly;
    flex-wrap: wrap;
    /* overflow-y: auto; */
    /* padding: 10px 0; */
  }
  
  .deal {
    background: #E3F5E3FF; /* Light background for a realistic feel */
    color: #00754A; /* Green text color */
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
    width: calc(25% - 20px);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
    border: 2px solid rgba(0, 0, 0, 0.1); /* Soft border */
  }
  
  .deal:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow on hover */
  }
  
  .deal-text {
    font-size: 1.2rem; /* Increase prominence */
    font-weight: bolder;
    margin-bottom: 8px;
  }
  
  .deal-details {
    font-size: 0.9rem; /* Slightly larger for readability */
    color: black; /* Softer green for details */
  }
  
  @media (max-width: 768px) {
    .deal {
      width: calc(50% - 20px);
    }
  }
  
  @media (max-width: 480px) {
    .deal {
      width: 100%;
      margin-bottom: 20px;
    }
  }
  </style>
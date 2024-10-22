<template>
    <div class="order-item">
      <img :src="item.image" alt="Food Image" class="item-image" />
      <div class="item-details">
        <h4 class="item-name">{{ item.name }}</h4>
        <p class="item-status">{{ item.status }}</p>
        <p class="item-price">{{ item.price }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    item: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .order-item {
    display: flex;
    align-items: center;
    background-color: #f9f9f9; /* Light background for contrast */
    border-radius: 10px; /* Rounded corners */
    padding: 10px; /* Padding around the item */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
    margin-bottom: 15px; /* Space between items */
    transition: transform 0.2s, box-shadow 0.2s; /* Transition for hover effects */
  }
  
  .order-item:hover {
    transform: translateY(-2px); /* Slight lift effect on hover */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Enhanced shadow on hover */
  }
  
  .item-image {
    width: 60px;
    height: 60px;
    border-radius: 10px; /* Rounded corners for the image */
    object-fit: cover; /* Cover the image area */
    margin-right: 15px; /* Space between image and text */
  }
  
  .item-details {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center the text vertically */
  }
  
  .item-name {
    font-size: 16px;
    font-weight: bold;
    color: #00754A; /* Brand color for the item name */
    margin: 0;
  }
  
  .item-status {
    font-size: 12px;
    color: #888; /* Subtle color for status */
    margin: 5px 0;
  }
  
  .item-price {
    font-size: 14px;
    color: #333; /* Darker color for price */
    font-weight: bold; /* Bold price for emphasis */
  }
  </style>
  
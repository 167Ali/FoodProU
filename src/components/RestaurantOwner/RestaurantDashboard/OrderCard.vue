<template>
    <div 
      class="card mb-3 order-card" 
      :class="{ 'accepted-order-card': isAccepted, 'rejected-order-card': !isAccepted }"
    >
      <img 
        :src="order.image" 
        class="card-img-top" 
        :alt="`${order.user}'s order image`" 
      />
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="order-user">{{ order.user }}</h5>
          <p class="order-location">{{ order.location }}</p>
          <h5 class="text-price">$ {{ order.totalPrice.toFixed(2) }}</h5>
        </div>
        <button class="btn btn-order">View</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "OrderCard",
    props: {
      order: {
        type: Object,
        required: true,
      },
      isAccepted: {
        type: Boolean,
        default: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* General Card Styles */
  .card {
    width: 300px; /* Fixed width */
    height: 400px; /* Fixed height */
    background-color: var(--secondary-color, #fff);
    border-radius: 12px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.1);
    border: none;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  /* Order Image Styles */
  .card-img-top {
    width: 100%;
    height: 60%; /* Adjusting height for better aspect ratio */
    object-fit: cover;
  }
  
  /* Card Body (Text and Details) */
  .card-body {
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  /* User and Location */
  .order-user {
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }
  
  .order-location {
    font-size: 1rem;
    color: #888;
    margin-bottom: 10px;
  }
  
  /* Price */
  .text-price {
    color: #28a745;
    font-weight: bold;
    font-size: 1.5rem;
  }
  
  /* Order Button */
  .btn-order {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
  
  .btn-order:hover {
    background-color: #0056b3;
    transform: scale(1.05); /* Slight scaling effect on hover */
  }
  
  /* Accepted and Rejected Order Styles */
  .accepted-order-card {
    border-left: 4px solid #28a745;
  }
  
  .rejected-order-card {
    border-left: 4px solid #dc3545;
  }
  
  @media (max-width: 768px) {
    /* Adjustments for smaller screens */
    .card {
      width: 90%; /* Adjust width for smaller devices */
      height: auto; /* Allow height to be flexible */
    }
  
    .card-img-top {
      height: auto;
      border-radius: 12px 12px 0 0;
    }
  
    .card-body {
      text-align: center;
      padding: 20px;
    }
  }
  </style>
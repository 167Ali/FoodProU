<template>
    <div class="order-detail">
      <h2 class="order-title">Order Details</h2>
      <div class="order-status">
        <button class="status-btn active">Pending</button>
        <button class="status-btn">Rejected</button>
        <button class="status-btn">Deactivated</button>
      </div>
      <div class="order-items">
        <OrderItem
          v-for="item in orderItems"
          :key="item.id"
          :item="item"
        />
      </div>

    </div>
  </template>
  
  <script setup>
  import OrderItem from '../components/OrderItem.vue'
  
  const orderItems = [
    {
      id: 1,
      name: 'Snow Ramen With Chicken Katsu',
      price: '$10.50',
      status: 'On Process',
      image: 'https://images.unsplash.com/photo-1477925518023-22b33cbd802c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      id: 2,
      name: 'Spicy Tuna Roll',
      price: '$8.00',
      status: 'On Process',
      image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2R8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 3,
      name: 'Beef Teriyaki Bento',
      price: '$12.00',
      status: 'On Process',
      image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 4,
      name: 'Chicken Curry',
      price: '$9.00',
      status: 'On Process',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN1cnJ5fGVufDB8fDB8fHww%3D%3D'
    },
    {
      id: 5,
      name: 'Salmon Sashimi',
      price: '$11.00',
      status: 'On Process',
      image: 'https://images.unsplash.com/photo-1487790343276-2fe56a7d9439?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHx8MHx8fDA%3D'
    },
  ]
  </script>
  
  <style scoped>
  .order-detail {
    width: 350px;
    margin-top: 30px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-family: Arial, sans-serif;
  }
  
  .order-title {
    text-align: center;
    margin-bottom: 20px;
    color: #00754A;
  }
  
  .order-status {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .status-btn {
    flex: 1;
    padding: 10px;
    border: none;
    background-color: #f4f4f4;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .status-btn:last-child {
    margin-right: 0;
  }
  
  .status-btn:hover {
    background-color: #e2e2e2;
  }
  
  .status-btn.active {
    background-color: #00754A;
    color: #fff;
  }
  
  .order-items {
    margin-top: 80px;
    max-height: 510px; /* Limit the height to 300px */
    overflow-y: auto; /* Enable vertical scrolling */
    margin-bottom: 20px;
    padding-right: 5px; /* Avoid clipping content due to scrollbar */
  }
  
  .order-items::-webkit-scrollbar {
    width: 6px;
  }
  
  .order-items::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
  
  .order-summary {
    border-top: 1px solid #e0e0e0;
    padding-top: 10px;
  }
  
  .summary-item {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }
  
  .discount {
    color: #d9534f;
  }
  
  .total {
    font-weight: bold;
  }
  
  .tracking-btn {
    width: 100%;
    padding: 15px;
    background-color: #00754A;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .tracking-btn:hover {
    background-color: #005f3a;
  }
  </style>
  
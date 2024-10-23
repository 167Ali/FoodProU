<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="banner mb-4">
      <img
        src="https://images.unsplash.com/photo-1525596201491-f6eae338a205?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2RzfGVufDB8fDB8fHww"
        alt="Delicious Food Banner"
        class="img-fluid banner-img"
      />
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .banner {
    width: 100%;
    height: 220px;
    overflow: hidden;
    border-radius: 20px;
    justify-content: center;
  }
  
  .banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 20px;
  }
  
  .banner-img:hover {
    transform: scale(1.05);
    filter: brightness(0.9);
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .banner {
      height: 150px;
      margin-left: -40px;
    }
  }
  </style>
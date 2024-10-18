<template>
    <div class="loading">
      <i class="fas fa-spinner fa-spin"></i> <!-- Loading icon -->
    </div>
  </template>
  
  <script setup>
  // No props or additional logic are needed for this simple loader
  </script>
  
  <style scoped>
  .loading {
    position: fixed; /* Position it fixed to cover the screen */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent background */
    z-index: 999; /* Ensure it's above other content */
    font-size: 48px; /* Icon size */
  }
  
  .loading i {
    animation: spin 1s linear infinite; /* Animation for spinning */
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  
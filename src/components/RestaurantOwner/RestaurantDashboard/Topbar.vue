<template>
    <div class="top-bar d-flex justify-content-between align-items-center mb-4">
      <!-- Left section: Logo and Search -->
      <div class="d-flex align-items-center">
        <img 
          src="https://plus.unsplash.com/premium_photo-1674670904769-544b31893a15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyJTIwbGFifGVufDB8fDB8fHww" 
          alt="Restaurant Logo" 
          class="restaurant-logo me-3" 
        />
        <input 
          type="text" 
          class="form-control search-input" 
          placeholder="Search for orders..." 
        />
      </div>
  
      <!-- Right section: Toggle Button -->
      <button 
        @click="$emit('toggle-status')" 
        class="btn btn-toggle"
      >
        {{ restaurantStatus ? 'Deactivate' : 'Activate' }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "TopBar",
    props: {
      restaurantStatus: {
        type: Boolean,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Top Bar Container */
  .top-bar {
    background-color: #f8f9fa; /* Light background for modern look */
    padding: 15px 20px;
    border-radius: 12px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1); /* Soft shadow */
  }
  
  /* Restaurant Logo */
  .restaurant-logo {
    width: 100px;
    height: 50px;
    object-fit: contain;
    transition: transform 0.3s ease;
  }
  
  /* Search Input */
  .search-input {
    width: 300px;
    border-radius: 25px;
    border: 1px solid #ced4da;
    padding-left: 15px;
    transition: all 0.3s ease;
  }
  
  .search-input:focus {
    border-color: #007bff; /* Highlight border on focus */
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.2);
  }
  
  /* Toggle Button */
  .btn-toggle {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    font-weight: 600;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .btn-toggle:hover {
    background-color: #0056b3;
    box-shadow: 0px 4px 10px rgba(0, 91, 187, 0.4);
  }
  
  /* Hover effect on logo */
  .restaurant-logo:hover {
    transform: scale(1.05); /* Slight zoom effect */
  }
  </style>
  
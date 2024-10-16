
<template>
    <header>
      <!-- User Profile Section -->
      <div class="user-profile">
        <img src="../../assets/Ali.jpeg" alt="User" class="avatar" />
        <span class="username">Ali hussain</span>
      </div>
    </header>
  </template>
  
  <!-- <script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Import Font Awesome icon
  </script> -->
  
  <style scoped>
  /* Main header container */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background-color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 1000; /* Ensure the header stays on top */
  }
  
  /* Logo container */
  .logo-container {
    display: flex;
    align-items: center;
  }
  
  /* Logo styling */
  .logo {
    font-size: 40px;
    color: #00754a; /* Green theme color */
  }
  
  /* Search bar container for better alignment */
  .search-container {
    flex-grow: 1;
    margin: 0 30px;
  }
  
  /* Search bar styling */
  .search-bar {
    width: 100%;
    padding: 10px 20px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 30px; /* Rounded search bar for a modern look */
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a slight shadow inside the input */
    transition: border-color 0.3s ease;
  }
  
  /* Focus effect on the search bar */
  .search-bar:focus {
    border-color: #00754a; /* Change border color on focus */
    outline: none; /* Remove default outline */
  }
  
  /* User profile container */
  .user-profile {
    display: flex;
    align-items: center;
    gap: 10px; /* Spacing between avatar and username */
  }
  
  /* Avatar image styling */
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 2px solid #00754a; /* Add a border around the avatar */
    object-fit: cover; /* Ensure the image fills the container */
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow for avatar depth */
  }
  
  /* Username styling */
  .username {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  </style>
=======
<style scoped>
/* Main header container */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
  /* Ensure the header stays on top */
}

/* Logo container */
.logo-container {
  display: flex;
  align-items: center;
}

/* Logo styling */
.logo {
  font-size: 40px;
  color: #00754a;
  /* Green theme color */
}

/* Search bar container for better alignment */
.search-container {
  flex-grow: 1;
  margin: 0 30px;
}

/* Search bar styling */
.search-bar {
  width: 100%;
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 30px;
  /* Rounded search bar for a modern look */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Add a slight shadow inside the input */
  transition: border-color 0.3s ease;
}

/* Focus effect on the search bar */
.search-bar:focus {
  border-color: #00754a;
  /* Change border color on focus */
  outline: none;
  /* Remove default outline */
}

/* User profile container */
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  /* Spacing between avatar and username */
}

/* Avatar image styling */
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #00754a;
  /* Add a border around the avatar */
  object-fit: cover;
  /* Ensure the image fills the container */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  /* Subtle shadow for avatar depth */
}

/* Username styling */
.username {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}</style>

  
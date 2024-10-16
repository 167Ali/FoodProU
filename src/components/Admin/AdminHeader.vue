<template>
  <header class="header">
    <!-- Search Bar -->
    <div class="search-container">
      <input type="text" class="search-bar" placeholder="Search Food or Restaurant" />
    </div>

    <!-- User Profile Section -->
    <div class="user-profile">
      <img src="../../assets/Ali.jpeg" alt="User" class="avatar" />
      <span class="username">Ali Hussain</span>
    </div>
  </header>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Import Font Awesome icon
</script>

<style scoped>
/* Main header container */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Logo styling */
.logo {
  font-size: 40px;
  color: #00754a;
}

/* Search bar container for better alignment */
.search-container {
  flex-grow: 1;
  margin: 0 30px;
  display: flex;
  justify-content: center;
}

/* Search bar styling */
.search-bar {
  width: 100%;
  max-width: 500px; /* Limit the width to avoid it being too long on large screens */
  padding: 10px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 30px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
}

/* Focus effect on the search bar */
.search-bar:focus {
  border-color: #00754a;
  outline: none;
}

/* User profile container */
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Avatar image styling */
.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid #00754a;
  object-fit: cover;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

/* Username styling */
.username {
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

/* Media Queries for Responsiveness */

/* For small devices (up to 575.98px), we reduce padding and make the search bar full width */
@media (max-width: 575.98px) {
  .header {
    padding: 10px 15px;
    flex-direction: column;
    align-items: stretch;
  }

  .search-container {
    margin: 10px 0;
    width: 100%;
  }

  .search-bar {
    width: 100%;
    margin-bottom: 10px;
  }

  .user-profile {
    justify-content: center;
  }

  .username {
    font-size: 14px;
  }
}

/* For medium devices (up to 767.98px), we adjust the layout for tablet-like displays */
@media (max-width: 767.98px) {
  .header {
    padding: 10px 20px;
  }

  .search-container {
    margin: 0 20px;
  }

  .search-bar {
    width: 100%;
  }

  .username {
    font-size: 14px;
  }
}

/* For large devices (up to 991.98px), we adjust the layout for mid-sized desktop screens */
@media (max-width: 991.98px) {
  .search-container {
    margin: 0 15px;
  }

  .search-bar {
    max-width: 400px;
  }
}

/* For extra-large devices (large desktops), we keep the search bar centered and reduce margin */
@media (min-width: 1200px) {
  .search-container {
    margin: 0 50px;
  }

  .search-bar {
    max-width: 600px;
  }
}
</style>
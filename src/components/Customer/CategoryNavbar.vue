<template>
    <div class="restaurant-menu">
      <!-- Search and Category Sticky Navbar -->
      <div id="categoryNavbar" class="category-navbar">
        <input 
          type="text" 
          id="search" 
          placeholder="Search in menu" 
          v-show="!isMobile" 
          class="menu-search" 
          v-model="searchQuery"
        />
        <button v-if="isMobile" @click="toggleSearchBar" class="search-btn"><i class="fa-solid fa-magnifying-glass"></i></button>
  
        <div id="categoriesContainer" ref="categories" class="categories">
          <a v-for="category in categoryLinks" :key="category.id" :href="`#${category.id}`" 
          class="category-link" :class="{ active: activeCategory === category.id }" @click="scrollToSection(category.id)">
            {{ category.name }}
          </a>
        </div>
  
        <button id="scrollRight" class="scroll-btn right" @click="scrollRight">›</button>
      </div>
  
      <!-- Menu Sections -->
      <div v-for="category in categoryLinks" :key="category.id" class="menu-section" :id="category.id">
        <h2>{{ category.name }}</h2>
        <!-- Items of each category -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  // import { ref, reactive, computed, watch, onMounted } from 'vue';

  
  // Category links (Dynamic example)
  const categoryLinks = ref([
    { id: 'popular', name: 'Popular' },
    { id: 'summer-deals', name: 'Summer Deals' },
    { id: 'pau-pau-deals', name: 'Pau Pau Deals' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'desi', name: 'Desi' },
    { id: 'pizza', name: 'Pizza' }, 
    { id: 'burgers', name: 'Burgers' },
    { id: 'fast-food', name: 'Fast Food' },
    { id: 'quesadilla', name: 'Quesadilla' },
    { id: 'cutlery', name: 'Cutlery' },
  ]);
  
  const activeCategory = ref('');
  const searchQuery = ref('');
  const isMobile = ref(false);
  const categoriesDiv = ref(null);
  
  watch(searchQuery, (newQuery) => {
    console.log('Search query updated:', newQuery);
    // Add any code you want to trigger when searchQuery changes
  });

  // Check screen size for responsiveness
  const checkMobileView = () => {
    isMobile.value = window.innerWidth <= 600;
  };

  // Scroll to the selected section smoothly
  const scrollToSection = (categoryId) => {
    const section = document.getElementById(categoryId);
    const navbarHeight = document.getElementById('categoryNavbar').offsetHeight;
  
    window.scrollTo({
      top: section.offsetTop - navbarHeight,
      behavior: 'smooth',
    });

    // Ensure the navbar is positioned to keep the active category centered
    setTimeout(() => {
      section.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300); // Adjust the timeout if necessary
  };
  


  // Highlight active section on scroll
  const onScroll = () => {
    const navbarHeight = document.getElementById('categoryNavbar').offsetHeight;
    const offset = window.scrollY + navbarHeight;

    categoryLinks.value.forEach((category) => {
      const section = document.getElementById(category.id);
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (offset >= sectionTop && offset < sectionBottom) {
        activeCategory.value = category.id;
      }
    });
  };
  
  // Scroll categories horizontally when overflow
  const scrollRight = () => {
    categoriesDiv.value.scrollBy({
      left: 100,
      behavior: 'smooth',
    });
  };
  
  // Toggle search bar in mobile view
  const toggleSearchBar = () => {
    const searchInput = document.getElementById('search');
    searchInput.classList.toggle('show');
  };
  
  // Lifecycle hooks
  onMounted(() => {
    window.addEventListener('resize', checkMobileView);
    window.addEventListener('scroll', onScroll);
    checkMobileView();
  });
  
  </script>
  
  <style scoped>
  /* Basic Styles */
  body {
    font-family: Arial, sans-serif;
    margin: 0;
  }
  
  .restaurant-menu {
    margin-top: 80px;
  }
  
  .category-navbar {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: white;
    padding: 10px;
    box-shadow: 0 4px 2px -2px gray;
    z-index: 1000;
    white-space: nowrap;
    overflow-x: auto;
  }
  
  .menu-search {
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 20px;
    margin-right: 20px;
  }
  
  .search-btn {
    display: none;
  }
  
  .categories {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    /* overflow-x: scroll; */
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none;  /* For Internet Explorer and Edge */
  }
  .categories::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }

  .category-link {
    padding: 10px 15px;
    text-decoration: none;
    color: black;
    white-space: nowrap;
  }
  
  .category-link.active {
    border-bottom: 2px solid red;
  }
  
  .scroll-btn {
    background-color: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .scroll-btn.right {
    margin-left: auto;
  }
  
  /* Responsive Search Button for Mobile */
  @media screen and (max-width: 600px) {
    .menu-search {
      display: none;
    }
    
    .search-btn {
      display: inline-block;
      margin-right: 10px;
    }
  }
  
  /* Menu section */
  .menu-section {
    padding: 40px 20px;
  }
  
  .menu-section h2 {
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
</style>
  
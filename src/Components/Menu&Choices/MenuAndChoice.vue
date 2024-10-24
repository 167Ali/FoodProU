<template>
    <div class="d-flex">
      <!-- Sidebar -->
      <SideBar class="sidebar" />
  
      <!-- Main Content -->
      <div class="main-content">
        <nav class="navbar">
          <div class="navbar-left">
            <!-- Logo -->
            <i class="fa-solid fa-utensils logo"></i>
            <span class="brand-name">FoodPro For Business</span>
          </div>
        </nav>
  
        <div class="container-fluid">
          <div class="row">
            <!-- Main content -->
            <main class="col-md-8 col-lg-8 px-md-4">
              <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h3>Menu Categories</h3>
                  <button class="btn btn-primary" @click="openModal">Add Category</button>
                </div>
  
                <div class="scroll-container-wrapper">
                  <!-- Left Scroll Button -->
                  <button class="scroll-button left" @click="scrollLeft">
                    <i class="fa-solid fa-angle-left fa-xl" style="color: #080a0c;"></i>
                  </button>
  
                  <div class="scroll-container">
                    <div class="scroll-row">
                      <div v-for="(item, index) in menuItems" :key="index" class="col-6 col-md-4 col-lg-3">
                        <div
                          class="menu-card p-3 text-center"
                          :class="{ selected: selectedItem === index }"
                          @click="selectItem(index, item.id, item.name)"
                        >
                          <div class="menu-icon mb-2"></div>
                          <h5 class="menu-title">
                            {{ item.name }} <i class="fa-solid fa-bowl-food"></i>
                          </h5>
                          <p class="menu-stock">{{ item.menu_items_count }} Menu In Stock</p>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <!-- Right Scroll Button -->
                  <button class="scroll-button right" @click="scrollRight">
                    <i class="fa-solid fa-angle-right fa-xl" style="color: #181d25;"></i>
                  </button>
                </div>
              </div>
  
              <!-- Example Category Section -->
              <div class="category-section mb-4">
                <div class="menu-items">
                  <div class="menu-item d-flex justify-content-between align-items-center border-bottom py-2">
                    <MenuView :categoryTitle="selectedTitle" :categoryId="categoryId" :key="selectedItem" v-if="isProductCategoryVisible" />
                  </div>
                </div>
              </div>
            </main>
  
            <div class="col-lg-4 col-md-6">
              <MenuViewChoice />
            </div>
          </div>
  
          <div v-if="isFormVisible" class="modal-overlay">
            <div class="modal-content">
              <div>
                <div class="mb-3 d-flex justify-content-between align-items-center">
                  <h4 class="card-title">Add Category</h4>
                  <button class="btn btn-outline" type="button" @click="isFormVisible = false">
                    <i class="fa-solid fa-xmark fa-lg" style="color: #030303;"></i>
                  </button>
                </div>
                <div>
                  <select v-model="selectedOption" class="form-select mb-2" @change="handleSelection">
                    <option value="0">Category</option>
                    <option value="1">Discount</option>
                  </select>
  
                  <div class="mb-3" v-if="suggestedCategories.length">
                    <h6>Suggested {{ selectedOption === '0' ? 'Categories' : 'Discounts' }}:</h6>
                    <div class="d-flex flex-wrap gap-2">
                      <button v-for="category in suggestedCategories" :key="category" class="btn btn-outline-secondary rounded-pill" @click="selectSuggestedCategory(category)">
                        {{ category }}
                      </button>
                    </div>
                  </div>
                </div>
                <input v-model="newCategory" type="text" placeholder="Enter category name" class="form-control mb-2" />
                <input v-if="selectedOption == 1" v-model="discountPercentage" type="number" placeholder="Enter discount percentage" class="form-control" />
  
                <div v-if="message" :class="['alert', messageType]">{{ message }}</div>
                <button class="btn btn-primary me-3" @click="addCategory">Add Category</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import MenuViewChoice from '@/Components/Menu&Choices/MenuViewChoice.vue';
  import MenuView from '@/Components/Menu&Choices/MenuView.vue';
  import SideBar from '@/Components/RestaurantOwner/RestaurantDashboard/SideBar.vue';
  import { useStore } from 'vuex'; // Import the Vuex store
  const store = useStore(); // Initialize the store
  
  const newCategory = ref('');
  const message = ref('');
  const messageType = ref('alert-success'); // Default message type
  const isProductCategoryVisible = ref(false);
  const isFormVisible = ref(false);
  const selectedOption = ref('0');
  const discountPercentage = ref(0);
  const suggestedCategories = ref([]);
  
  const categorySuggestions = ['Breakfast', 'Lunch', 'Dinner', 'Soup', 'Desserts', 'Beverages'];
  const discountSuggestions = ['Combo Deal', 'Super Deal', 'Holiday Special', 'Discount Offer'];
  
  const handleSelection = () => {
     suggestedCategories.value = selectedOption.value === '0' ? categorySuggestions : discountSuggestions;
  };
  
  const selectSuggestedCategory = (category) => {
     newCategory.value = category;
  };
  
  const openModal = () => {
     isFormVisible.value = true;
  };
  
  const menuItems = computed(() => store.getters['menuCategory/allCategories']);
  
  onMounted(async () => {
     try {
         await store.dispatch('menuCategory/displayCategory');
     } catch (error) {
         console.error('Error fetching data:', error);
     }
  });
  
  // Scroll functions
  const scrollContainer = ref(null);
  
  const scrollLeft = () => {
     if (scrollContainer.value) {
         scrollContainer.value.scrollBy({
             left: -scrollContainer.value.offsetWidth, // Scroll by container width
             behavior: 'smooth',
         });
     }
  };
  
  const scrollRight = () => {
     if (scrollContainer.value) {
         scrollContainer.value.scrollBy({
             left: scrollContainer.value.offsetWidth, // Scroll by container width
             behavior: 'smooth',
         });
     }
  };
  
  const addCategory = async () => {
     try {
         if (newCategory.value.trim() !== '') {
             await store.dispatch('menuCategory/addCategory', { name: newCategory.value });
             message.value = `Category added: ${newCategory.value}`;
             messageType.value = 'alert-success';
             newCategory.value = '';
         } else {
             message.value = 'Please enter a category name.';
             messageType.value = 'alert-danger';
         }
     } catch (error) {
         console.error('Error adding category:', error);
         message.value = 'Failed to add category.';
         messageType.value = 'alert-danger';
     }
  };
  
  // Selected item state
  const selectedItem = ref(null);
  const selectedTitle = ref('');
  const categoryId = ref(null);
  
  const selectItem = (index, id, title) => {
     selectedItem.value = index;
     selectedTitle.value = title;
     categoryId.value = id;
     isProductCategoryVisible.value = true;
  };
  </script>
  
  <style scoped>
  /* Layout container for sidebar and main content */
  .d-flex {
    display: flex;
  }
  
  /* Sidebar styles */
  .sidebar {
    width: 80px; /* Increase sidebar width for better layout */
    height: 100vh;
    position: sticky;
    top: 0;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f8f9fa; /* Light background for sidebar */
  }
  
  /* Main content styles */
  .main-content {
    flex-grow: 1; /* Take the remaining width */
    padding: 20px; /* Padding around main content */
  }
  
  /* Navbar styles */
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 50px;
    background-color: white;
    border-bottom: 1px solid #eaeaea;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
  }
  
  .logo {
    font-size: 24px;
    margin-right: 10px;
    color: #00754a;
  }
  
  .brand-name {
    font-size: 22px;
    font-weight: bold;
    color: #00754a;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
  }
  
  /* Scroll Container */
  .scroll-container-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  
  .scroll-container {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  
  .scroll-row {
    display: flex; /* Flex for horizontal arrangement */
  }
  
  .scroll-button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  /* Menu Card */
  .menu-card {
    background-color: #fff; /* Card background */
    border: 1px solid #eaeaea; /* Card border */
    border-radius: 8px; /* Rounded corners */
    transition: transform 0.3s; /* Animation effect */
  }
  
  .menu-card:hover {
    transform: scale(1.05); /* Scale effect on hover */
  }
  
  .menu-title {
    font-size: 18px;
    margin: 0;
  }
  
  .menu-stock {
    font-size: 14px;
    color: #6c757d; /* Muted text color */
  }
  
  .selected {
    background-color: #00754a; /* Selected background color */
    color: white; /* Selected text color */
  }
  
  /* Category Section Styles */
  .category-section {
    margin-top: 20px; /* Margin for separation */
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .navbar {
      padding: 15px;
    }
    
    .main-content {
      padding: 10px;
    }
  }
  </style>  
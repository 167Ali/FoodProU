<template>
  <div class="restaurant-menu">
    <!-- Search and Category Sticky Navbar -->
    <div id="categoryNavbar" class="category-navbar">

      <input type="text" id="search" placeholder="Search in menu" v-show="!isMobile" class="menu-search"
        v-model="searchQuery" />
      <button v-if="isMobile" @click="toggleSearchBar" class="search-btn"><i
          class="fa-solid fa-magnifying-glass"></i></button>

      <button v-if="isLeftButtonVisible" id="scrollLeft" class="scroll-btn left" @click="scrollLeft">‹</button>
      <!-- <button id="scrollLeft" class="scroll-btn left" @click="scrollLeft">‹</button> -->

      <div id="categoriesContainer" ref="categories" class="categories">
        <a v-for="category in categoryLinks" :key="category.menu_id" class="category-link" :class="{ active: activeCategory === category.menu_id }
          " @click="scrollToSection(category.id)">
          {{ category.menu_name }}
        </a>
      </div>

      <!-- <button id="scrollRight" class="scroll-btn right" @click="scrollRight">›</button> -->
      <button v-if="isRightButtonVisible" id="scrollRight" class="scroll-btn right" @click="scrollRight">›</button>
    </div>

    <!-- Menu Sections -->
    <div class="main-container">
      <div class="main-section ">
        <div v-for="category in categoryLinks" :key="category.menu_id" class="menu-section" :id="category.menu_id">
          <h2 class="popular-title">{{ category.menu_name }}</h2>
          <p class="popular-subtitle">Single serving</p>
          <div class="popular-items">
            <CategoryItem v-for="item in items" :key="item.id" :item="item" />
          </div>
        </div>
      </div>
      <AddtoCart />
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import CategoryItem from './CategoryItem.vue'
import AddtoCart from '../../components/Customer/AddtoCart.vue'

const props = defineProps({
  menus: {
    type: Object,
    required: true,
  },
});


//console.log('I have got the data', props.menus);


//const categoryLinks = props.menus;

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
  { id: 'qsuhajsla', name: 'qsuhajsla' },
  { id: 'omiwuexuf', name: 'omiwuexuf' },
  { id: 'sscgiwueA', name: 'sscgiwueA' },
  { id: 'slxifmeaa', name: 'slxifmeaa' },
  { id: 'AWUECYEQI', name: 'AWUECYEQI' },
  { id: 'sudfkxfhi', name: 'sudfkxfhi' },
  { id: 'quesadias', name: 'quesadias' },
  { id: 'jjjasiiii', name: 'jjjasiiii' },
]);

const items = ref([
  {
    id: 1,
    name: 'Animal Fries',
    price: 649,
    description: 'Breaded fries with cheese, chunky chicken topped with fiery hot sauce...',
    image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJpZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    name: 'Chicago Fries',
    price: 699,
    description: 'Soft on the outside, crunchy on the inside...',
    image: 'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJpZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'All American',
    price: 799,
    description: 'Smashed beef with caramelized onions and a secret sauce...',
    image: 'https://images.unsplash.com/photo-1598679253544-2c97992403ea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnJpZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    name: 'Nuker Chicken Burger',
    price: 999,
    description: 'Crispy chicken with fried cheese patty, fries, and animal sauce...',
    image: 'https://plus.unsplash.com/premium_photo-1683657860399-60f51361c65a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZyaWVzfGVufDB8fDB8fHww',
  }
]);


// const items = ref(props.menus.map(item => ({
//   id: item.menu_item_id,
//   name: item.menu_name,
//   price: item.price,
//   image: item.image_url,
//   description: item.description || 'No description available', // Default description if none
// })));

const isRightButtonVisible = ref(false);
const isLeftButtonVisible = ref(false);
const activeCategory = ref('');
const searchQuery = ref('');
const isMobile = ref(false);
const categoriesDiv = ref(null);

// Watch search query changes
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

// Helper function: Scroll active navbar item into center view
const scrollNavbarItemIntoView = () => {
  const activeNavItem = categoriesDiv.value.querySelector(`a.active`);
  if (activeNavItem) {
    activeNavItem.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest', // Doesn't scroll the whole navbar, keeps it within bounds
      inline: 'center',
    });
  }
};

// Highlight active section on scroll and scroll navbar item into view
const onScroll = () => {
  const navbarHeight = document.getElementById('categoryNavbar').offsetHeight;
  const offset = window.scrollY + navbarHeight;

  categoryLinks.value.forEach((category) => {
    const section = document.getElementById(category.id);
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (offset >= sectionTop && offset < sectionBottom) {
      activeCategory.value = category.id;

      // Scroll the active navbar item into center view
      nextTick(() => {
        scrollNavbarItemIntoView();
      });
    }
  });
};

// Check if categories overflow the container
const checkOverflow = () => {
  const container = categoriesDiv.value;
  if (container.scrollWidth > container.clientWidth) {
    isRightButtonVisible.value = true;
  } else {
    isRightButtonVisible.value = false;
  }
  // Also check if there's room to scroll left
  isLeftButtonVisible.value = container.scrollLeft > 0;
};


// Scroll categories horizontally when overflow
const scrollRight = () => {
  categoriesDiv.value.scrollBy({
    left: 300,
    behavior: 'smooth',
  });
  nextTick(() => checkOverflow());
};
const scrollLeft = () => {
  categoriesDiv.value.scrollBy({
    left: -300,
    behavior: 'smooth',
  });
  nextTick(() => checkOverflow());
};

// Toggle search bar in mobile view
const toggleSearchBar = () => {
  const searchInput = document.getElementById('search');
  searchInput.classList.toggle('show');
};

// Lifecycle hooks
onMounted(() => {
  categoriesDiv.value = document.getElementById('categoriesContainer'); // Ensure ref is set properly
  window.addEventListener('resize', checkMobileView);
  window.addEventListener('scroll', onScroll, checkOverflow);
  checkMobileView();
  checkOverflow();
});

watch([items, categoryLinks], () => {
  nextTick(() => {
    checkOverflow();
  });
});

// 
</script>
  
<style scoped>
.main-container {
  display: flex;
  /* Use Flexbox for layout */
  width: 100%;
  /* Full width */
}

.main-section {
  flex: 0 0 70%;
  /* Default: Takes 70% of the width on larger screens */
  padding: 20px;
  /* Optional padding */
  overflow-y: auto;
  /* Allow vertical scrolling if needed */
  height: calc(90vh - 40px);
  /* Fixed height */
  scrollbar-width: none;
  /* Hide scrollbar for Firefox */
}

/* Hide scrollbar for Webkit browsers (Chrome, Safari) */
.main-section::-webkit-scrollbar {
  display: none;
  /* Hide the scrollbar */
}

.menu-section {
  margin: 40px 0;
  /* Vertical spacing */
}

.add-to-cart {
  flex: 0 0 30%;
  /* Default: Takes 30% of the width on larger screens */
  padding: 20px;
  /* Optional padding */
  position: sticky;
  /* Make it sticky */
  top: 20px;
  /* Distance from the top when scrolling */
  height: calc(100vh - 40px);
  /* Full height minus margins */
  overflow-y: auto;
  /* Allow vertical scrolling if needed */
}

.restaurant-menu {
  font-family: 'Agrandir';
}

/* Adjust layout for mobile screens */
@media (max-width: 600px) {
  .main-section {
    flex: 1 0 100%;
    /* Full width on mobile */
    height: auto;
    /* Allow height to adjust */
  }

  .add-to-cart {
    display: none;
    /* Hide the cart on mobile */
  }
}

.menu-section {
  margin: 40px 60px;
  /* Spacing for menu sections */
}

.popular-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* Default: 2 columns */
  gap: 20px;
  /* Space between items */
}

/* Responsive adjustments */
@media (max-width: 800px) {
  .popular-items {
    grid-template-columns: repeat(1, 1fr);
    /* 1 column for smaller screens */
  }

}

@media (min-width: 801px) and (max-width: 1200px) {
  .popular-items {
    grid-template-columns: repeat(2, 1fr);
    /* 2 columns for medium screens */
  }
}

@media (min-width: 1201px) {
  .popular-items {
    grid-template-columns: repeat(2, 1fr);
    /* 3 columns for larger screens */
  }
}

/* Other styles for category navbar and search */
.category-navbar {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  padding: 0px 50px 0px 60px;
  box-shadow: 0 6px 20px -10px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  white-space: nowrap;
  overflow-x: auto;
}

.menu-search {
  background-color: rgb(245, 245, 245);
  border: none;
  padding: 5px 20px;
  border-radius: 20px;
  margin-right: 20px;
  font-size: 14px;
  font-weight: 900;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.scroll-btn {
  background-color: white;
  padding: 0px 14px;
  color: rgb(62, 62, 62);
  border-radius: 100px;
  font-size: 24px;
  border: 1px solid rgb(145, 143, 143);
  font-weight: bolder;
  cursor: pointer;
}

.scroll-btn.right {
  margin-left: auto;
}

/* Categories styles */
.categories {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scrollbar-width: none;
  /* For Firefox */
  -ms-overflow-style: none;
  /* For Internet Explorer and Edge */
}

.categories::-webkit-scrollbar {
  display: none;
  /* For Chrome, Safari, and Opera */
}

.category-link {
  font-size: 15px;
  margin: 0px 15px;
  padding: 15px 15px;
  color: black;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s ease;
}

.category-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background-color: #00754A;
  transition: width 0.3s ease, left 0.3s ease;
}

.category-link:hover {
  background-color: rgb(244, 244, 244);
}

.category-link:hover::before {
  width: 50%;
  left: 25%;
}

.category-link.active::before {
  width: 100%;
  left: 0;
}

/* Responsive Search Button for Mobile */
@media screen and (max-width: 600px) {
  .menu-search {
    display: none;
  }

  .search-btn {
    display: inline-block;
    margin-left: -50px;
    border-radius: 50px;
    color: rgb(62, 62, 62);
    padding: 6px 10px;
    margin-right: 10px;
    border: 1px solid rgb(145, 143, 143);
    background-color: white;
  }

  .scroll-btn.right {
    margin-right: -20px;
  }
}
</style>
  
<template>
    <div class="cuisines-slider">
      <h2 class="title">Cuisines for you</h2>
      <div class="slider-container">
        <button class="slider-btn left-btn" @click="slide('left')">❮</button>
        <div class="slider">
          <div
            class="cuisine-card"
            v-for="(cuisine, index) in cuisines"
            :key="index"
          >
            <img :src="cuisine.image" :alt="cuisine.name" class="cuisine-image" />
            <p class="cuisine-name">{{ cuisine.name }}</p>
          </div>
        </div>
        <button class="slider-btn right-btn" @click="slide('right')">❯</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const cuisines = ref([
    { name: 'Burgers', image: 'https://www.chicken.ca/wp-content/uploads/2020/09/Big-Juicy-Burgers.jpg' },
    { name: 'Fast Food', image: 'https://images.deliveryhero.io/image/fd-pk/LH/j01s-listing.jpg?width=400&height=225' },
    { name: 'Ice Cream', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJVGbI4pBbCqLyqDe64U1LGqBn9lP6aRMeaQ&s' },
    { name: 'Paratha', image: 'https://i.ytimg.com/vi/nMuvAuMI7bk/sddefault.jpg' },
    { name: 'Halwa Puri', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKLp1WdhcMUADhTfOnP5eAZliRlmtw3DkhAw&s' },
    { name: 'Pasta', image: 'https://www.allrecipes.com/thmb/mvO1mRRH1zTz1SvbwBCTz78CRJI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/67700_RichPastaforthePoorKitchen_ddmfs_4x3_2284-220302ec8328442096df370dede357d7.jpg' },
    { name: 'Chinese', image: 'https://media.istockphoto.com/id/483120255/photo/asian-oranage-chicken-with-green-onions.jpg?s=612x612&w=0&k=20&c=0T_g_J5OSnmCei1Slgr1128wzAhzceRvLjd94R3gkgs=' },
    { name: 'Desserts', image: 'https://via.placeholder.com/150?text=Desserts' },
    { name: 'Shawarma', image: 'https://via.placeholder.com/150?text=Shawarma' },
    { name: 'Paratha', image: 'https://via.placeholder.com/150?text=Paratha' },
    { name: 'Halwa Puri', image: 'https://via.placeholder.com/150?text=Halwa+Puri' },
    { name: 'Pasta', image: 'https://via.placeholder.com/150?text=Pasta' },
    { name: 'Chinese', image: 'https://via.placeholder.com/150?text=Chinese' },
    { name: 'Desserts', image: 'https://via.placeholder.com/150?text=Desserts' },
    { name: 'Shawarma', image: 'https://via.placeholder.com/150?text=Shawarma' },
  ]);
  
  const slide = (direction) => {
    const slider = document.querySelector('.slider');
    const scrollAmount = slider.clientWidth / 3;
  
    if (direction === 'left') {
      slider.scrollLeft -= scrollAmount;
      if (slider.scrollLeft <= 0) {
        slider.scrollLeft = slider.scrollWidth; // Go to the end
      }
    } else {
      slider.scrollLeft += scrollAmount;
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
        slider.scrollLeft = 0; // Reset to start
      }
    }
  };
  
  // Automatically rotate the slider every 2 seconds
  let autoSlide;
  onMounted(() => {
    autoSlide = setInterval(() => {
      slide('right');
    }, 2000);
  });
  
  onUnmounted(() => {
    clearInterval(autoSlide);
  });
  </script>
  
  <style scoped>
  .cuisines-slider {
    max-width: 100%;
    overflow: hidden;
  }
  
  .title {
    text-align: left;
    font-size: 24px;
    margin: 0px 0px 10px 10px;
  }
  
  .slider-container {
    position: relative;
    display: flex;
    align-items: center;
  }
  
  .slider {
    display: flex;
    overflow-x: hidden; /* Prevents scrollbar */
    scroll-behavior: smooth;
  }
  
  .cuisine-card {
    flex: 0 0 auto;
    width: 120px;
    margin-right: 15px;
    text-align: center;
  }
  
  .cuisine-image {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .cuisine-name {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
  }
  
  .slider-btn {
    background: white;
    border: none;
    padding: 10px;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    z-index: 1;
  }
  
  .left-btn {
    left: -30px;
  }
  
  .right-btn {
    right: -30px;
  }
  </style>
  
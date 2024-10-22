<template>
    <div class="recipe-blog">
      <RecipeCard
        v-for="(recipe, index) in recipes"
        :key="index"
        :image="recipe.image"
        :category="recipe.category"
        :title="recipe.title"
        :description="recipe.description"
        :author="recipe.author"
        :date="recipe.date"
        @click="openModal(recipe)" 
      />
      
      <!-- Background overlay -->
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal"></div>
      
      <RecipeModal
        v-if="isModalVisible"
        :isVisible="isModalVisible"
        :image="selectedRecipe.image"
        :title="selectedRecipe.title"
        :description="selectedRecipe.description"
        :ingredients="selectedRecipe.ingredients"
        :instructions="selectedRecipe.instructions"
        @close="closeModal"
      />
    </div>
  </template>
  
  <script>
  import RecipeCard from '@/Components/Customer/BlogCard.vue';
  import RecipeModal from '@/Components/Customer/RecipeModal.vue'; 
  
  export default {
    components: {
      RecipeCard,
      RecipeModal,
    },
    data() {
      return {
        recipes: [
          {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg',
            category: 'Italian',
            title: 'Delicious Pasta',
            description: 'A simple and flavorful pasta recipe with tomato sauce.',
            author: 'Amanda H.',
            date: '4 days ago',
            ingredients: ['Pasta', 'Tomato sauce', 'Olive oil', 'Garlic', 'Basil'],
            instructions: 'Cook pasta according to package instructions. In a separate pan, sauté garlic in olive oil, add tomato sauce, and combine with pasta. Serve with fresh basil.'
          },
          {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg',
            category: 'Italian',
            title: 'Delicious Pasta',
            description: 'A simple and flavorful pasta recipe with tomato sauce.',
            author: 'Amanda H.',
            date: '4 days ago',
            ingredients: ['Pasta', 'Tomato sauce', 'Olive oil', 'Garlic', 'Basil'],
            instructions: 'Cook pasta according to package instructions. In a separate pan, sauté garlic in olive oil, add tomato sauce, and combine with pasta. Serve with fresh basil.'
          },
          {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg',
            category: 'Italian',
            title: 'Delicious Pasta',
            description: 'A simple and flavorful pasta recipe with tomato sauce.',
            author: 'Amanda H.',
            date: '4 days ago',
            ingredients: ['Pasta', 'Tomato sauce', 'Olive oil', 'Garlic', 'Basil'],
            instructions: 'Cook pasta according to package instructions. In a separate pan, sauté garlic in olive oil, add tomato sauce, and combine with pasta. Serve with fresh basil.'
          },
          {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg',
            category: 'Italian',
            title: 'Delicious Pasta',
            description: 'A simple and flavorful pasta recipe with tomato sauce.',
            author: 'Amanda H.',
            date: '4 days ago',
            ingredients: ['Pasta', 'Tomato sauce', 'Olive oil', 'Garlic', 'Basil'],
            instructions: 'Cook pasta according to package instructions. In a separate pan, sauté garlic in olive oil, add tomato sauce, and combine with pasta. Serve with fresh basil.'
          },
          {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg',
            category: 'Italian',
            title: 'Delicious Pasta',
            description: 'A simple and flavorful pasta recipe with tomato sauce.',
            author: 'Amanda H.',
            date: '4 days ago',
            ingredients: ['Pasta', 'Tomato sauce', 'Olive oil', 'Garlic', 'Basil'],
            instructions: 'Cook pasta according to package instructions. In a separate pan, sauté garlic in olive oil, add tomato sauce, and combine with pasta. Serve with fresh basil.'
          },
          {
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/1280px-%22Hyderabadi_Dum_Biryani%22.jpg',
            category: 'Italian',
            title: 'Delicious Pasta',
            description: 'A simple and flavorful pasta recipe with tomato sauce.',
            author: 'Amanda H.',
            date: '4 days ago',
            ingredients: ['Pasta', 'Tomato sauce', 'Olive oil', 'Garlic', 'Basil'],
            instructions: 'Cook pasta according to package instructions. In a separate pan, sauté garlic in olive oil, add tomato sauce, and combine with pasta. Serve with fresh basil.'
          },
          
        ],
        isModalVisible: false,
        selectedRecipe: {},
      };
    },
    methods: {
      openModal(recipe) {
        this.selectedRecipe = recipe;
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .recipe-blog {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px; 
    padding: 50px;
    width: 100%;
    box-sizing: border-box;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 123, 255, 0.5); /* Light blue background */
    animation: fadeIn 0.5s forwards; /* Fade in animation */
    z-index: 999; /* Ensure it's above other content */
  }
  
  @keyframes fadeIn {
    from {
      background-color: transparent; /* Start with transparent */
    }
    to {
      background-color: rgba(128, 130, 127, 0.5); /* End with light blue */
    }
  }
  
  @media (max-width: 768px) {
    .recipe-blog {
      grid-template-columns: repeat(1, 1fr); 
    }
  }
  
  @media (min-width: 768px) and (max-width: 1024px) {
    .recipe-blog {
      grid-template-columns: repeat(3, 1fr); 
    }
  }
  
  @media (min-width: 1024px) {
    .recipe-blog {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  </style>
  
<template>
  <LoginHeader />
  <div class="recipe-blog">
    <RecipeCard v-for="(recipe, index) in recipes" :key="index" :image="recipe.image" :category="recipe.category"
      :title="recipe.title" :description="recipe.description" :author="recipe.author" :date="recipe.date"
      @click="openModal(recipe)" />

    <!-- Background overlay -->
    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal"></div>

    <RecipeModal v-if="isModalVisible" :isVisible="isModalVisible" :image="selectedRecipe.image"
      :title="selectedRecipe.title" :description="selectedRecipe.description" :ingredients="selectedRecipe.ingredients"
      :instructions="selectedRecipe.instructions" @close="closeModal" />
  </div>
  <PageFooter />
</template>

<script setup>
import { ref } from 'vue';
import RecipeCard from '@/Components/Customer/BlogCard.vue';
import RecipeModal from '@/Components/Customer/RecipeModal.vue';

const recipes = ref([
  {
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Mutton_Nihari.jpg/220px-Mutton_Nihari.jpg',
    category: 'Pakistani',
    title: 'Beef Nihari',
    description: 'A slow-cooked beef stew spiced with traditional Pakistani flavors.',
    author: 'Zainab A.',
    date: '2 days ago',
    ingredients: ['Beef shank', 'Ginger', 'Garlic', 'Spices', 'Wheat flour'],
    instructions: 'Cook beef with spices and wheat flour on slow heat. Garnish with ginger and green chili. Serve with naan.'
  },
  {
    image: 'https://www.sandyathome.com/wp-content/uploads/2019/04/chicken-biryani-recipe-1024x577.png',
    category: 'Pakistani',
    title: 'Chicken Biryani',
    description: 'A flavorful and aromatic rice dish with spiced chicken.',
    author: 'Ahmed K.',
    date: '3 days ago',
    ingredients: ['Chicken', 'Basmati rice', 'Yogurt', 'Tomatoes', 'Spices'],
    instructions: 'Marinate chicken in yogurt and spices, cook with basmati rice and tomatoes. Serve with raita.'
  },
  {
    image: 'https://myfoodstory.com/wp-content/uploads/2021/09/karahi-chicken-kadai-chicken-1-500x500.jpg',
    category: 'Pakistani',
    title: 'Chicken Karahi',
    description: 'A spicy and flavorful chicken curry prepared in a wok (karahi).',
    author: 'Fatima B.',
    date: '5 days ago',
    ingredients: ['Chicken', 'Tomatoes', 'Green chilies', 'Garlic', 'Ginger', 'Spices'],
    instructions: 'Cook chicken with tomatoes, garlic, and green chilies in a wok. Serve hot with naan or rice.'
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrLAl37RxeCfyIJZOkEH6YBDXIMvHQL8sW5Q&s',
    category: 'Pakistani',
    title: 'Beef Haleem',
    description: 'A thick and hearty beef and lentil stew, slow-cooked for hours.',
    author: 'Hassan T.',
    date: '6 days ago',
    ingredients: ['Beef', 'Lentils', 'Wheat', 'Ginger', 'Garlic', 'Spices'],
    instructions: 'Cook beef, lentils, and wheat slowly for several hours. Serve with fried onions, lemon, and green chilies.'
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNDUcORb_Tawy3bGDl5B3TrdAIOFJ3zeUIYQ&s',
    category: 'Pakistani',
    title: 'Chicken Sajji',
    description: 'Whole chicken marinated and roasted to perfection, a Balochi specialty.',
    author: 'Sana F.',
    date: '7 days ago',
    ingredients: ['Whole chicken', 'Yogurt', 'Spices', 'Lemon', 'Rice'],
    instructions: 'Marinate whole chicken with spices and yogurt, then roast. Serve with lemon and rice.'
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhnmvZuwHY-VprdaZ1i7vQdeRahsn34uJSA&s',
    category: 'Pakistani',
    title: 'Chana Chaat',
    description: 'A tangy and spicy chickpea salad, perfect for snacks or appetizers.',
    author: 'Ayesha M.',
    date: '1 week ago',
    ingredients: ['Chickpeas', 'Onions', 'Tomatoes', 'Cilantro', 'Spices', 'Tamarind sauce'],
    instructions: 'Mix boiled chickpeas with onions, tomatoes, and spices. Add tamarind sauce and garnish with cilantro.'
  }
]);


const isModalVisible = ref(false);
const selectedRecipe = ref({});

const openModal = (recipe) => {
  selectedRecipe.value = recipe;
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
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
  background-color: rgba(0, 123, 255, 0.5);
  /* Light blue background */
  animation: fadeIn 0.5s forwards;
  /* Fade in animation */
  z-index: 999;
  /* Ensure it's above other content */
}

@keyframes fadeIn {
  from {
    background-color: transparent;
    /* Start with transparent */
  }

  to {
    background-color: rgba(128, 130, 127, 0.5);
    /* End with light blue */
  }
}

@media (max-width: 768px) {
  .recipe-blog {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 50px;
    width: 100%;
    box-sizing: border-box;
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 123, 255, 0.5);
  /* Light blue background */
  animation: fadeIn 0.5s forwards;
  /* Fade in animation */
  z-index: 999;
  /* Ensure it's above other content */
}

@keyframes fadeIn {
  from {
    background-color: transparent;
    /* Start with transparent */
  }

  to {
    background-color: rgba(128, 130, 127, 0.5);
    /* End with light blue */
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
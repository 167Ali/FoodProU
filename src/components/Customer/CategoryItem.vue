<template>
  <div class="popular-item">
    
    <img class="item-image" :src="item.image" alt="Popular item" />
    <div class="item-info">
      <h3>{{ item.menu_item_name }}</h3>
      <p class="item-price">from Rs. {{ item.price }}</p>
      <p class="item-description">{{ item.description }}</p>
    </div>
    <!-- <button class="add-to-cart-btn">+</button> -->
     <ProductModal/>

  </div>
</template>

<script setup>
import { defineProps,ref } from 'vue';

// Define the props for the component
defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false);
const productImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9Qq1rV_svdydH5u3O8r5ZmT8udMBnSuKeA&s';
const productName = 'Summer Deal 1';
const discountedPrice = 475.16;
const originalPrice = 774;
const productDescription = 'Chicken Sub & 345ml Drink';
const cartNotes = ref('');
const sections = ref([
  {
    title: 'Choose Your Sub',
    selectLimit: 1,
    required: true,
    selectedOption: null,
    options: [
      { name: 'Tikka', price: 'Free', popular: true },
      { name: 'BBQ', price: 'Free', popular: false },
      { name: 'Roasted Chicken Breast', price: 'Free', popular: false },
      { name: 'Chicken Chapli', price: 'Free', popular: false },
    ],
  },
  {
    title: 'Choose Your Drink',
    selectLimit: 1,
    required: true,
    selectedOption: null,
    options: [
      { name: 'Coca Cola', price: 'Free', popular: true },
      { name: 'Pepsi', price: 'Free', popular: false },
      { name: 'Sprite', price: 'Free', popular: false },
    ],
  },
  {
    title: 'Choose Your Extras',
    selectLimit: 1,
    required: false,
    selectedOption: null,
    options: [
      { name: 'Extra Cheese', price: 'Rs. 50', popular: false },
      { name: 'Extra Mayo', price: 'Rs. 30', popular: false },
    ],
  },
]);

const closeModal = () => {
  showModal.value = false;
};

const addToCart = () => {
  sections.value.forEach((section) => {
    if (section.selectedOption) {
      console.log(`Added ${section.title}: ${section.selectedOption.name}`);
    }
  });
  if (cartNotes.value) {
    console.log(`Notes: ${cartNotes.value}`);
  }
  closeModal();
};

// Scroll to the next section after an option is selected
const scrollToNext = (currentSectionIndex) => {
  const nextSectionIndex = currentSectionIndex + 1;
  const nextSection = document.querySelector(`.choose-sub-card:nth-of-type(${nextSectionIndex + 1})`);
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>



<style scoped>
.popular-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.07);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.popular-item:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
}

.item-info {
  flex: 1;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.item-info h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.item-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #00754A;
  margin-bottom: 8px;
}

.item-description {
  color: #757575;
  font-size: 0.95rem;
  line-height: 1.4;
}
/*  */
.add-to-cart-btn:hover {
  background-color: #005F3A;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.modal {
  display: block;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-dialog {
  max-width: 600px;
  max-height: 70vh;
  margin: auto;
  border-radius: 20px; /* Added border-radius */
}

.modal-content {
  border-radius: 20px; /* Added border-radius */
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1000;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.modal-body {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}

.current-price {
  font-size: 1.5em;
  color: #d9534f;
}

.original-price {
  text-decoration: line-through;
  color: gray;
  margin-left: 10px;
}

.choose-sub-card {
  margin-bottom: 20px;
}

.scrollable-options {
  display: flex;
  flex-direction: column;
}

.form-check-input.square-checkbox {
  border-radius: 0; /* Square checkbox for required options */
}

.form-check-input.circle-checkbox {
  border-radius: 50%; /* Circular checkbox for non-required options */
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.btn-green {
  background-color: #00754A;
  color: white;
  border: none;
  width: 100%;
  transition: background-color 0.3s ease;
}

.btn-green:hover {
  background-color: #005f3d;
}

.required-badge {
  background-color: #00754A;
  color: white;
  padding: 5px 10px;
  font-size: 0.9em;
}

.scrollable-body {
  overflow-y: auto;
  max-height: 50vh;
}

@media (max-width: 768px) {
  .popular-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .item-image {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }

  .add-to-cart-btn {
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
  }
}
</style>
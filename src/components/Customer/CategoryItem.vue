<template>
  <div class="popular-item">
    
    <img class="item-image" :src="item.image" alt="Popular item" />
    <div class="item-info">
      <h3>{{ item.name }}</h3>
      <p class="item-price">from Rs. {{ item.price }}</p>
      <p class="item-description">{{ item.description }}</p>
    </div>
    <!-- <button class="add-to-cart-btn">+</button> -->
     <ProductModal/>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ProductModal from '../Customer/ProductAddToCart.vue';

// Define the props for the component
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
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
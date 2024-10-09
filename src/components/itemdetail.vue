<template>
    <div>
      <!-- Add to Cart Button -->
      <button class="btn btn-primary" @click="showModal = true">Add to cart</button>
  
      <!-- Modal -->
      <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" style="display: block;" v-if="showModal">
        <div class="modal-dialog modal-dialog-centered" role="document" @click.stop>
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Product Details</h5>
              <button type="button" class="btn-close" @click="closeModal">&times;</button>
            </div>
            <div class="modal-body text-center">
              <img :src="productImage" alt="Product Image" class="product-image">
              <h3>{{ productName }}</h3>
              <p>
                <span class="current-price">Rs. {{ productPrice }}</span><br>
                <span class="original-price">Rs. {{ originalPrice }}</span><br>
                <span class="discount">{{ discount }} off</span>
              </p>
              <button class="btn btn-pink" @click="addToCart">Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showModal = ref(false);
  const productImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9Qq1rV_svdydH5u3O8r5ZmT8udMBnSuKeA&s'; // Replace with the burger image URL or use the uploaded image
  const productName = 'Smoky Sandwich';
  const productPrice = 945;
  const originalPrice = 1050;
  const discount = '10% off';
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const addToCart = () => {
    // Logic to add the product to the cart
    console.log('Added to cart:', productName);
    closeModal(); // Optionally close the modal after adding to the cart
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1050;
  }
  
  .modal-dialog {
    max-width: 600px;
    margin: 100px auto;
  }
  
  .product-image {
    width: 100%;
    height: auto;
  }
  
  .current-price {
    font-size: 1.5em;
    color: #d9534f; /* Bootstrap danger color for current price */
  }
  
  .original-price {
    text-decoration: line-through;
    color: gray;
  }
  
  .discount {
    color: green;
    font-weight: bold;
  }
  
  .btn-pink {
    background-color: #d9534f; /* Button color */
    color: white;
    border: none;
  }
  </style>
  
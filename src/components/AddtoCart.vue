<template>
  <div class="cart-container" :class="{ 'cart-button-mode': isMobile }">
    <!-- Cart Button for Mobile -->
    <button v-if="isMobile && !cartVisible" @click="toggleCart" class="cart-toggle-btn">
      View Cart ({{ totalItems }} items) - Rs. {{ cartTotal }}
    </button>

    <!-- Cart Modal / Drawer for Desktop & Mobile -->
    <div v-if="cartVisible || !isMobile" class="cart-modal">
      <button @click="toggleCart" class="close-btn" v-if="isMobile">X</button>
      <h3>Your Cart</h3>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <img :src="item.image" alt="item.name" class="item-img" />
        <div class="item-details">
          <p class="item-name">{{ item.name }}</p>
          <p class="item-price">Rs. {{ item.price }}</p>
        </div>
        <div class="item-quantity d-flex align-items-center">
          <button v-if="item.quantity > 1" @click="decrementItem(item)" class="btn btn-outline-secondary">-</button>
          <button v-else @click="removeItem(item)" class="btn btn-outline-danger">🗑️</button>
          <span class="mx-2">{{ item.quantity }}</span>
          <button @click="incrementItem(item)" class="btn btn-outline-secondary">+</button>
        </div>
      </div>

      <div class="cart-summary">
        <p>Subtotal: Rs. {{ cartSubtotal }}</p>
        <p>Delivery Fee: Rs. {{ deliveryFee }}</p>
        <p>Service Fee: Rs. {{ serviceFee }}</p>
        <p>Total: Rs. {{ cartTotal }}</p>
      </div>

      <button class="checkout-btn">Review Payment and Address</button>
    </div>
  </div>
</template>

  

<script setup>
  import { reactive, ref, computed, onMounted } from 'vue';
  import kulchaImg from '@/assets/images/kulcha.png';
  import alooAndaImg from '@/assets/images/salan.png';
  import raitaImg from '@/assets/images/raita.png';
  import saladImg from '@/assets/images/salad.png';
  import lassiImg from '@/assets/images/lassi.png';
  
  // Dummy items in the cart for now
  
  const cart = reactive([
    {
      id: 1,
      name: 'Kulcha',
      price: 50,
      quantity: 1,
      image: kulchaImg,
    },
    {
      id: 2,
      name: 'Aloo Anda',
      price: 230,
      quantity: 1,
      image: alooAndaImg,
    },
    {
      id: 3,
      name: 'Raita',
      price: 50,
      quantity: 1,
      image: raitaImg,
    },
    {
      id: 4,
      name: 'Salad',
      price: 70,
      quantity: 1,
      image: saladImg,
    },
    {
      id: 5,
      name: 'Lassi',
      price: 160,
      quantity: 1,
      image: lassiImg,
    },
  ]);
  

  // State for mobile responsiveness
  const isMobile = ref(false);
  const cartVisible = ref(false);

  const deliveryFee = 120;
  const serviceFee = 9.99;

  // Methods for managing the cart
  const incrementItem = (item) => {
    item.quantity++;
  };
  
  const decrementItem = (item) => {
    if (item.quantity > 1) {
      item.quantity--;
    }
  };
  
  const removeItem = (item) => {
    const index = cart.indexOf(item);
    if (index > -1) {
      cart.splice(index, 1);
    }
  };
  
  // Computed properties
  const cartSubtotal = computed(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });
  
  const cartTotal = computed(() => {
    return cartSubtotal.value + deliveryFee + serviceFee;
  });
  
  const totalItems = computed(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  });
  
  // Toggle cart visibility for mobile
  const toggleCart = () => {
    cartVisible.value = !cartVisible.value;
  };
  
  // Check screen size for responsiveness
  onMounted(() => {
    const checkScreenSize = () => {
      isMobile.value = window.innerWidth <= 959;
    };
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
  });
</script>


<style scoped>
.cart-container {
  position: fixed;
  right: 0px;
  top: 64px;
  /* margin-right: 50px; */
  width: 320px;
  height: calc(100vh - 64px);
  background-color: red;
  /* background-color: #ffffff; */
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px 0 0 8px;
  z-index: 999; /* Ensure it appears above other content */
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.item-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 16px;
}



.item-details {
  flex-grow: 1;
}

.item-name {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 4px;
  color: #333;
}

.item-price {
  font-size: 14px;
  color: #888;
}
.item-quantity {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.item-quantity button {
  background-color: #f2f2f2;
  border: none;
  padding: 8px;
  font-size: 18px;
  cursor: pointer;
}

.item-quantity span {
  padding: 0 8px;
  font-size: 16px;
}

.remove-item-btn {
  background-color: transparent;
  border: none;
  color: red;
  font-size: 24px;
  margin-left: 8px;
  cursor: pointer;
}

.cart-summary {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  background-color: #f9f9f9;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cart-summary p {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 4px 0;
}
  
.checkout-btn {
  background-color: #ff3366;
  color: white;
  padding: 12px;
  border: none;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  margin-top: 16px;
  border-radius: 8px;
}

.checkout-btn:hover {
  background-color: #ff6699;
}

  /* Responsive Mobile Styles */
  .cart-button-mode {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0;
  }

  .cart-toggle-btn {
    width: 100%;
    background-color: #ff3366;
    color: white;
    padding: 12px;
    border: none;
    font-size: 16px;
  }

  .cart-modal {
    width: 100%;
    padding-top: 20px;
    height: calc(100vh - 64px);
    /* position: relative; */
    /* right: 30px; */
    /* top: 0; */
    /* background-color: white; */
    /* background-color: aqua; */
    z-index: 800;
    overflow-y: auto;
  }

  .close-btn {
    background-color: transparent;
    border: none;
    font-size: 24px;
    position: absolute;
    top: 16px;
    right: 16px;
    cursor: pointer;
  }

  @media (min-width: 960px) {
    .cart-modal {
        /* height: 200px; */
      height: calc(100vh - 64px);
      top: 64px;
      width: 300px;
    }
  }
</style>


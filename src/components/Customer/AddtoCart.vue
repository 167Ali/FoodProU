<template>
  
  <!-- View Cart Button for Mobile -->
  <button v-if="isMobile && !cartVisible" @click="toggleCart" class="cart-toggle-btn">
    View Cart ({{ totalItems }} items) - Rs. {{ cartTotal }}
  </button>

  <div class="cart-container">

    <!-- Cart Modal for Desktop & Mobile -->
    <div :class="['cart-modal', { 'cart-visible': cartVisible, 'fullscreen': isMobile }]">
      <!-- Close Button for Mobile -->
      <button v-if="isMobile" @click="toggleCart" class="close-btn"> &times; </button>
      <!-- Cart Content -->
      <h5 v-if="cart.length > 0">Your items</h5>

      <div v-if="cart.length === 0" class="empty-cart">
        <h6>Hungry?</h6>
        <p>You haven't added anything to your cart!</p>
      </div>
      
      <div v-else>
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" alt="item.name" class="item-img"/>
          <div class="item-details">
            <p class="item-name">{{ item.name }}</p>
            <p class="item-price">Rs. {{ item.price }}</p>
          </div>
          <div class="item-quantity">
            <button v-if="item.quantity > 1" @click="decrementItem(item)">
              <i class="fa-solid fa-minus fa1"></i>
            </button>
            <button v-else @click="removeItem(item)">
              <i class="fa-regular fa-trash-can fa2"></i>
            </button>
            <span>{{ item.quantity }}</span>
            <button @click="incrementItem(item)">
              <i class="fa-solid fa-plus fa3"></i>
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <p class="d-flex justify-content-between">
            Subtotal<span>Rs. {{ cartSubtotal }}</span>
          </p>
          <p class="d-flex justify-content-between">
            Delivery Fee<span>Rs. {{ deliveryFee }}</span>
          </p>
          <p class="d-flex justify-content-between">
            Service Fee<span>Rs. {{ serviceFee }}</span>
          </p>
        </div>
        <!-- Total and Checkout Button for Mobile -->
        <div  v-if="isMobile " class="chekout-btn-mobile">
          <p class="d-flex justify-content-between cart-summary-total">
          <span> Total
            <span class="fee-tax">(incl. fees and tax)</span>
          </span>
          <span>Rs. {{ cartTotal }}</span>
          </p>
          <button class="checkout-btn">
            Review Payment and Address
          </button>
        </div>
        
      </div>
      
    </div>

    <!-- Total and Checkout Button for Desktop -->
    <p class="d-flex justify-content-between cart-summary-total" v-if="!isMobile && cart.length > 0">
      <span> Total
        <span class="fee-tax">(incl. fees and tax)</span>
      </span>
      <span>Rs. {{ cartTotal }}</span>
    </p>
    <button class="checkout-btn" v-if="!isMobile && cart.length > 0">
      Review Payment and Address
    </button>

    
  </div>

</template>

<!--  -->
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
  background-color: white;


  /* position: fixed;
  right: 0px;
  top: 64px; */
  /* posi */

  margin-top: 60px;
  margin-right: 80px;
  width: 350px;
  height: calc(75vh - 65px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid rgb(223, 222, 222);
  
}

.cart-modal {
  background-color: white;
  display: none;
  width: 100%;
  height: calc(100vh - 64px);
  overflow-y: auto;
  z-index: 800;
  scrollbar-width: none; 
}

h5{
  font-weight: 1000;
  font-family: 'Agrandir', 'Open Sans', 'Helvetica Neue', sans-serif;
}
.cart-visible {
  display: block;
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(225, 225, 225);
  padding: 15px 12px 15px 12px;
}
.item-img {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid rgb(214, 211, 211);
  object-fit: cover;
  margin-right: 16px;
}
/*  */
.item-details {
  flex-grow: 1;
}

.item-name {
  font-weight: 600;
  font-family:system-ui, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  margin-bottom: 4px;

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
  border-radius: 50px;
}

.item-quantity button {
  background-color: white;
  border-radius: 50%;
  border: none;
  margin: 4px;
  /* font-size: 18px; */
  cursor: pointer;
}

.item-quantity span {
  
  font-size: 16px;
}
.fa2, .fa3, .fa1{
  font-weight: 100;
  padding: 0px 0px 0px 5px;
}
.fa1{
  font-weight: 600;
  color: #3e3e3e;
}

.cart-summary {
  padding: 12px 0;
}

.cart-summary p {
  margin: 4px 0;  
  font-size: 14px;

}  
.cart-summary span {
  padding-right: 10px;
}  
.cart-summary span, .cart-summary p {
  color: #787878;
  font-weight: 600;
  font-family: 'Open Sans', system-ui, 'Segoe UI', 'Helvetica Neue', sans-serif;
}
.cart-summary-total{
  margin: 10px 0px 0px 0px;
  font-size: 18px;
  font-weight: 600;
}
.cart-summary-total span, .checkout-btn{
  font-family:'Open Sans', system-ui, 'Segoe UI', 'Helvetica Neue', sans-serif;
}
  .fee-tax{
    font-size: 13px;
    color: #787878;
    font-weight: 400;
  }
  .checkout-btn {
  background-color:#00754A;
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
  background-color:#076241;
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
    background-color: #00754A;
    color: white;
    padding: 12px;
    border: none;
    font-size: 16px;
    position: absolute;
    bottom: 10px;
    border-radius: 5px;
    margin-left: 2vw;
    /* margin-right: 20px */
    width: 96vw;

  }


  .empty-cart{
    height: 100%;
    width: 100%;
    padding-top: 40%;
    text-align: center;
  }
  .empty-cart h6{
    font-family: 'Agrandir', 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 22px;
    font-weight: bolder;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  .empty-cart p{
    text-align: center;
    width: 67%;
    margin: auto;
    color: #838383;
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
  .checkout-btn-mobile{
    border: 1px solid black;
  }



/* Hide the cart by default on mobile */
@media (max-width: 959px) {
  /* .cart-visible {
    display: none;
  } */
  /* .cart-container
  {
    display: none;
  } */
  /* .chekout-btn-mobile{
    display: block;
  } */
  .empty-cart{
    margin-top: -150px;
    /* display: flex; */
    /* justify-content: center;
    align-items: center; */
  }
}

/* Desktop view - keep original style */
@media (min-width: 960px) {
  .cart-modal {
    display: block;
  }
  /* .chekout-btn-mobile{
    display: none;
  } */
}
/*  */
</style>


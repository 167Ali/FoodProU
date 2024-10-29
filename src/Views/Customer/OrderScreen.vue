<template>
  <div class="container-fluid mt-4 p-3">
    <div class="row g-3 justify-content-center">
      <div class="col-lg-9">
        <div
          class="card timer-section shadow-sm mb-2 text-black text-center border-0 rounded-3 p-2 animate__animated animate__fadeIn">
          <div class="d-flex justify-content-between align-items-center mb-2"></div>

          <div>
            <h6 class="fw-bold mb-1">Your order will be delivered in:</h6>
            <h3 class="display-6 fw-bold countdown">{{ minutes }} min</h3>

            <div class="progress-container mx-auto mt-4">
              <i class="fa-solid fa-fire text-danger position-absolute start-icon"></i>
              <div class="progress-line" :style="{ width: `${progressWidth}%` }"></div>
              <i class="fas fa-utensils text-success position-absolute end-icon"></i>
            </div>
          </div>
        </div>

        <div
          class="card order-details-section shadow-sm p-2 bg-white border-0 rounded-3 animate__animated animate__fadeInUp"
          v-if="isOrderActive">
          <h6 class="fw-bold text-center mb-2">Order Details</h6>
        </div>
        <br />

        <ul class="list-group list-group-flush scrollable-list" v-if="isOrderActive">
          <li
            class="list-group-item d-flex justify-content-between align-items-center py-2 animate__animated animate__fadeIn"
            v-for="item in orderItems" :key="item.id">
            <div class="d-flex flex-column">
              <div class="d-flex align-items-center">
                <img :src="item.img" alt="item image" class="item-img me-2" />
                <div class="item-details">
                  <span class="item-name fw-semibold">{{ item.name }}</span><br />
                  <small>Item Number: <strong>#{{ item.orderNumber }}</strong></small><br />
                  <small>Delivery Address: <strong>{{ item.address }}</strong></small><br />
                  <small>City: <strong>{{ item.city }}</strong></small>
                </div>
              </div>
            </div>
            <span class="item-price">Rs {{ item.price }}</span>
          </li>
        </ul>

        <div class="total-section text-end mt-2" v-if="isOrderActive">
          <h6 class="fw-bold">Total: <span class="text-success">Rs {{ totalPayment }} </span></h6>
        </div>
      </div>

      <div class="col-lg-3 d-flex flex-column justify-content-start align-items-center">
        <div
          class="card cancel-section shadow-sm p-3 bg-light text-center border-0 rounded-3 animate__animated animate__bounceIn">
          <p class="mt-2 fs-6 countdown-text">
            Time Remaining:
            <strong>
              {{ Math.floor(cancelSeconds / 60) }}:{{ cancelSeconds % 60 }} s
            </strong>
          </p>
          <button class="btn btn-danger btn-lg px-4 py-2 fw-bold btn-cancel" @click="cancelOrder">
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const initialOrderItems = [
  {
    id: 1,
    name: "Masala Fries",
    price: 450,
    orderNumber: 1,
    address: "326 PF",
    city: "Lahore",
    img: "http://192.168.15.67:8000/storage/menuitems/0mDeobliEAVGRhzw5wl0NGj9WWTkn5T3N0CbB0zm.webp",
  },
  {
    id: 2,
    name: "Chicken fillet Sandwich",
    price: 690,
    orderNumber: 2,
    address: "326 PF",
    city: "Lahore",
    img: "http://192.168.15.67:8000/storage/menuitems/PTYrHpfxp35cjeIMayFVgoCfvzzJIQAdSYK4iuxb.webp",
  }
];

const minutes = ref(5);
const cancelMinutes = ref(3);
const cancelSeconds = ref(cancelMinutes.value * 60);
const progressWidth = ref(0);
const orderItems = ref([...initialOrderItems]);
const isOrderActive = ref(true); // New flag to track order status

const totalPayment = computed(() => {
  return orderItems.value.reduce((total, item) => total + item.price, 0);
});

let timer;
let cancelTimer;

const updateProgress = () => {
  const totalMinutes = 5;
  progressWidth.value = ((totalMinutes - minutes.value) / totalMinutes) * 100;
};

const startTimer = () => {
  timer = setInterval(() => {
    if (minutes.value > 0) {
      minutes.value--;
      updateProgress();
    } else {
      clearInterval(timer);
    }
  }, 60000);
};

const startCancelTimer = () => {
  cancelTimer = setInterval(() => {
    if (cancelSeconds.value > 0) {
      cancelSeconds.value--;
    } else {
      clearInterval(cancelTimer);
    }
  }, 1000);
};

const cancelOrder = () => {
  // Stop timers
  clearInterval(timer);
  clearInterval(cancelTimer);

  // Reset data
  orderItems.value = [...initialOrderItems];
  minutes.value = 5;
  cancelSeconds.value = cancelMinutes.value * 60;
  progressWidth.value = 0;
  isOrderActive.value = false; // Set flag to false

  alert("Order has been cancelled and reset.");
};

onMounted(() => {
  startTimer();
  startCancelTimer();
});

onBeforeUnmount(() => {
  clearInterval(timer);
  clearInterval(cancelTimer);
});
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css';

.container-fluid {
  max-width: 1000px;
  margin: 0 auto;
}

.card {
  border-radius: 15px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.timer-section {
  background: rgb(248, 249, 251);
  padding: 10px;
  height: 150px;
}

.progress-container {
  height: 5px;
  background-color: #ccc;
  width: 40%;
  margin: 10px auto;
  border-radius: 10px;
  position: relative;
}

.progress-line {
  height: 100%;
  background-color: #00A86B;
  transition: width 0.3s ease;
  max-width: 100%;
  border-radius: 10px;
}

.start-icon {
  left: -20px;
  top: -3px;
}

.end-icon {
  right: -20px;
  top: -3px;
}

.countdown {
  font-size: 1.5rem;
}

.order-details-section {
  max-height: 300px;
  overflow-y: auto;
}

.scrollable-list {
  max-height: 200px;
  overflow-y: auto;
}

.item-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
}

.item-details {
  font-size: 0.85rem;
}

.item-name {
  font-size: 1rem;
}

.item-price {
  font-weight: bold;
  color: #00754A;
}

.total-section h6 {
  font-size: 20px;
  color: #00754A;
}

.cancel-section {
  padding: 10px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn-cancel {
  background-color: #dc3545;
  border: none;
  font-size: 0.8rem;
  padding: 0.3rem 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-cancel:hover {
  background-color: #bd2130;
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .container-fluid {
    padding: 15px;
    text-align: center;
  }

  .timer-section,
  .order-details-section,
  .cancel-section {
    margin: auto;
  }

  .countdown {
    font-size: 1.25rem;
  }
}
</style>
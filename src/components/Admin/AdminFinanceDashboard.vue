<template>
  <div class="page-container">
    <SideBar />

    <div class="main-content container main-body mt-5">
      <!-- Dropdown filters for Time Period and Restaurant -->
      <div class="row mb-4 justify-content-center mt-5">
        <div class="col-md-4">
          <label class="label" for="restaurantFilter">Select Restaurant:</label>
          <select v-model="selectedRestaurant" @change="applyFilters" class="form-select">
            <option value="">All Restaurants</option>
            <option v-for="name in restaurantNames" :key="name" :value="name">{{ name }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="label" for="timeFilter">Filter by Time:</label>
          <select v-model="selectedFilter" @change="applyFilters" class="form-select">
            <option value="daily">Today</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="text-center mt-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- Charts -->
      <div v-else>
        <!-- Display Top Performing Restaurants when no restaurant filter is applied -->
        <div v-if="!selectedRestaurant">
          <!-- Top Performing Restaurants Chart -->
          <div class="row mt-5">
            <div class="col-md-8 offset-md-2">
              <h3>Top Performing Restaurants</h3>
              <canvas ref="topRestaurantsChartCanvas"></canvas>
            </div>
          </div>
        </div>

        <!-- Display other charts when a restaurant filter is applied -->
        <div v-else>
          <!-- Revenue Over Time and Order Volume Over Time -->
          <div class="row mt-5">
            <div class="col-md-6">
              <h3>Revenue Over Time</h3>
              <canvas ref="revenueOverTimeCanvas"></canvas>
            </div>
            <div class="col-md-6">
              <h3>Order Volume Over Time</h3>
              <canvas ref="orderVolumeOverTimeCanvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useStore } from 'vuex';
import SideBar from '../../components/Admin/SideBar.vue';

// Register all chart types
Chart.register(...registerables);

const store = useStore();

// References for each chart
const revenueOverTimeCanvas = ref(null);
const orderVolumeOverTimeCanvas = ref(null);
const topRestaurantsChartCanvas = ref(null);

// Store the selected filter, selected restaurant values, and loading state
const selectedFilter = ref('all');
const selectedRestaurant = ref('');
const isLoading = ref(true);

// Chart instances
let topRestaurantsChart = null;
let revenueOverTimeChart = null;
let orderVolumeOverTimeChart = null;

// Fetch data from the store
const revenueDetails = computed(() => store.getters['RevenueStore/getRevenueDetails']);
const orderVolumeDetails = computed(() => store.getters['RevenueStore/getOrderVolumeDetails']);

// Reactive variables
const restaurantNames = ref([]);

// Function to initialize data and create charts
const initializeData = async () => {
  try {
    await store.dispatch('RevenueStore/fetchRevenueReports');
    restaurantNames.value = Array.from(new Set([
      ...(revenueDetails.value.restaurant_name || []),
      ...(orderVolumeDetails.value.restaurant_name || []),
    ]));
    isLoading.value = false;
    await nextTick();  // Wait until the DOM is updated
    createCharts();
  } catch (error) {
    console.error("Error in dispatch:", error);
  }
};

// Function to create all charts based on selected filter and restaurant
const createCharts = () => {
  destroyCharts();

  if (!selectedRestaurant.value) {
    createTopRestaurantsChart();
  } else {
    createRevenueOverTimeChart();
    createOrderVolumeOverTimeChart();
  }
};

// Function to destroy existing charts before re-creating them
const destroyCharts = () => {
  if (topRestaurantsChart) {
    topRestaurantsChart.destroy();
    topRestaurantsChart = null;
  }
  if (revenueOverTimeChart) {
    revenueOverTimeChart.destroy();
    revenueOverTimeChart = null;
  }
  if (orderVolumeOverTimeChart) {
    orderVolumeOverTimeChart.destroy();
    orderVolumeOverTimeChart = null;
  }
};

// Function to create Top Performing Restaurants Chart
const createTopRestaurantsChart = () => {
  if (!topRestaurantsChartCanvas.value) return;  // Check if the canvas is available
  const ctx = topRestaurantsChartCanvas.value.getContext('2d');
  const revenueData = revenueDetails.value.revenue || [];
  const restaurantData = revenueDetails.value.restaurant_name || [];

  topRestaurantsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: restaurantData,
      datasets: [{
        label: 'Revenue',
        data: revenueData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: { display: true, text: 'Top Performing Restaurants' },
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
};

// Function to create Revenue Over Time Chart
const createRevenueOverTimeChart = () => {
  if (!revenueOverTimeCanvas.value) return;  // Check if the canvas is available
  const ctx = revenueOverTimeCanvas.value.getContext('2d');
  const revenueData = revenueDetails.value.revenue || [];
  const createdAtData = revenueDetails.value.created_at || [];

  revenueOverTimeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: createdAtData,
      datasets: [{
        label: 'Revenue Over Time',
        data: revenueData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: { display: true, text: 'Revenue Over Time' },
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
};

// Function to create Order Volume Over Time Chart
const createOrderVolumeOverTimeChart = () => {
  if (!orderVolumeOverTimeCanvas.value) return;  // Check if the canvas is available
  const ctx = orderVolumeOverTimeCanvas.value.getContext('2d');
  const orderVolumeData = orderVolumeDetails.value.order_volume || [];
  const orderDateData = orderVolumeDetails.value.order_date || [];

  orderVolumeOverTimeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: orderDateData,
      datasets: [{
        label: 'Order Volume Over Time',
        data: orderVolumeData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        title: { display: true, text: 'Order Volume Over Time' },
      },
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
};

// Watch for changes in the filters and re-create charts when they change
watch([selectedFilter, selectedRestaurant], () => {
  if (!isLoading.value) {
    createCharts();
  }
});

// Initialize data on component mount
onMounted(() => {
  initializeData();
});

// Clean up chart instances on component unmount
onUnmounted(() => {
  destroyCharts();
});
</script>

<style scoped>
.page-container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  color: #007bff;
}

h3 {
  text-align: center;
  margin-top: 20px;
}

canvas {
  width: 100% !important;
  height: auto !important;
}
</style>

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
import { ref, onMounted, computed, watch } from 'vue';
import { Chart, registerables } from 'chart.js';
import { useStore } from 'vuex';
import SideBar from '@/Components/Admin/SideBar.vue';

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

// Fetch data from the store
const revenueDetails = computed(() => store.getters['RevenueStore/getRevenueDetails']);
const orderVolumeDetails = computed(() => store.getters['RevenueStore/getOrderVolumeDetails']);

// Reactive variables
const restaurantNames = ref([]);

// Watch for changes in the filters and re-create charts when they change
watch([selectedFilter, selectedRestaurant], () => {
  if (!isLoading.value) {
    createCharts();
  }
});

// Function to initialize data
const initializeData = () => {
  // Populate restaurantNames
  const allRestaurants = [
    ...new Set([
      ...revenueDetails.value.restaurant_name,
      ...orderVolumeDetails.value.restaurant_name,
    ]),
  ];
  restaurantNames.value = allRestaurants;

  // Fetch initial data
  store.dispatch('RevenueStore/fetchRevenueReports').then(() => {
    isLoading.value = false;
    initializeData();
    createCharts();
  });
};

// Function to apply filters and update charts
const applyFilters = () => {
  isLoading.value = true; // Show loading spinner
  createCharts();
};

// Function to create all charts
const createCharts = () => {
  // Create Top Performing Restaurants Chart
  if (!selectedRestaurant.value) {
    createTopRestaurantsChart();
  } else {
    createRevenueOverTimeChart();
    createOrderVolumeOverTimeChart();
  }
};

// Function to create Top Performing Restaurants Chart
const createTopRestaurantsChart = () => {
  const ctx = topRestaurantsChartCanvas.value.getContext('2d');
  const revenueData = revenueDetails.value.revenue; // Adjust according to your data structure
  const restaurantData = revenueDetails.value.restaurant_name; // Adjust according to your data structure

  new Chart(ctx, {
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
  const ctx = revenueOverTimeCanvas.value.getContext('2d');
  const revenueData = revenueDetails.value.revenue; // Adjust according to your data structure
  const createdAtData = revenueDetails.value.created_at; // Adjust according to your data structure

  new Chart(ctx, {
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
  const ctx = orderVolumeOverTimeCanvas.value.getContext('2d');
  const orderVolumeData = orderVolumeDetails.value.order_volume; // Adjust according to your data structure
  const orderDateData = orderVolumeDetails.value.order_date; // Adjust according to your data structure

  new Chart(ctx, {
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

// Initialize data on component mount
onMounted(() => {
  initializeData();
});
</script>

<style scoped>
.page-container {
  display: flex;
}
.main-content {
  flex: 1;
}
.label {
  margin-bottom: 0.5rem;
}
</style>
<template>
  <SideBar/>
  <div class="container main-body mt-5">
    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center my-5">
      <p>Loading data...</p>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- Charts -->
    <div v-else>
      <!-- Dropdown filter -->
      <div class="row mb-4 justify-content-center">
        <div class="col-md-4">
          <label for="timeFilter">Filter by:</label>
          <select v-model="selectedFilter" @change="processData" class="form-select">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      <!-- First Row: Total Revenue and Order Volume -->
      <div class="row">
        <div class="col-md-6">
          <h3>Total Revenue</h3>
          <canvas ref="revenueChartCanvas" class="small-bar-chart"></canvas>
        </div>
        <div class="col-md-6">
          <h3>Order Volume</h3>
          <canvas ref="orderVolumeChartCanvas" class="small-bar-chart"></canvas>
        </div>
      </div>

      <!-- Second Row: Average Order Value -->
      <div class="row mt-5">
        <div class="col-md-12">
          <h3>Average Order Value</h3>
          <canvas ref="aovChartCanvas" class="small-bar-chart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SideBar from './RestaurantDashboard/SideBar.vue';
import { ref, onMounted, watch, computed } from 'vue';
import { Chart } from 'chart.js/auto';
import { useStore } from 'vuex';
import moment from 'moment';

// References for each chart
const revenueChartCanvas = ref(null);
const orderVolumeChartCanvas = ref(null);
const aovChartCanvas = ref(null);

// Store the selected filter value
const selectedFilter = ref('daily');

// Access the Vuex store
const store = useStore();

// Computed properties to access Vuex store state
const totalRevenue = computed(() => store.getters['resturantRevinue/getTotalRevenue']);
const revenueDates = computed(() => store.getters['resturantRevinue/getRevenueDates']);
const orderVolume = computed(() => store.getters['resturantRevinue/getOrderVolume']);
const orderDates = computed(() => store.getters['resturantRevinue/getOrderDates']);
const loading = computed(() => store.getters['resturantRevinue/isLoading']);
const errorMessage = computed(() => store.getters['resturantRevinue/errorMessage']);

// Initialize charts
let revenueChart, orderVolumeChart, aovChart;

// Function to create the revenue chart
const createRevenueChart = (labels, data) => {
  if (revenueChart) revenueChart.destroy();
  const ctx = revenueChartCanvas.value.getContext('2d');
  revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Revenue',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
};

// Function to create the order volume chart
const createOrderVolumeChart = (labels, data) => {
  if (orderVolumeChart) orderVolumeChart.destroy();
  const ctx = orderVolumeChartCanvas.value.getContext('2d');
  orderVolumeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Order Volume',
        data: data,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
};

// Function to create the Average Order Value chart
const createAOVChart = (labels, data) => {
  if (aovChart) aovChart.destroy();
  const ctx = aovChartCanvas.value.getContext('2d');
  aovChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Average Order Value',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
};

// Function to process data based on the selected filter
const processData = () => {
  const filter = selectedFilter.value;

  // Process total revenue data
  const revenueData = {};
  totalRevenue.value.forEach((amount, index) => {
    const date = moment(revenueDates.value[index]);
    let key;
    if (filter === 'daily') {
      key = date.format('YYYY-MM-DD');
    } else if (filter === 'weekly') {
      key = date.format('YYYY-[W]WW');
    } else if (filter === 'monthly') {
      key = date.format('YYYY-MM');
    }
    revenueData[key] = (revenueData[key] || 0) + amount;
  });

  const revenueLabels = Object.keys(revenueData);
  const revenueAmounts = Object.values(revenueData);

  // Process order volume data
  const orderData = {};
  orderVolume.value.forEach((count, index) => {
    const date = moment(orderDates.value[index]);
    let key;
    if (filter === 'daily') {
      key = date.format('YYYY-MM-DD');
    } else if (filter === 'weekly') {
      key = date.format('YYYY-[W]WW');
    } else if (filter === 'monthly') {
      key = date.format('YYYY-MM');
    }
    orderData[key] = (orderData[key] || 0) + count;
  });

  const orderLabels = Object.keys(orderData);
  const orderCounts = Object.values(orderData);

  // Compute Average Order Value
  const aovData = {};
  revenueLabels.forEach((label) => {
    const revenue = revenueData[label] || 0;
    const orders = orderData[label] || 0;
    aovData[label] = orders > 0 ? (revenue / orders).toFixed(2) : 0;
  });

  const aovLabels = Object.keys(aovData);
  const aovValues = Object.values(aovData);

  // Update the charts
  createRevenueChart(revenueLabels, revenueAmounts);
  createOrderVolumeChart(orderLabels, orderCounts);
  createAOVChart(aovLabels, aovValues);
};

// Fetch data and initialize charts when component is mounted
onMounted(async () => {
  await store.dispatch('resturantRevinue/fetchRevenueData');
  processData();
});

// Watch for changes in the selected filter
watch(selectedFilter, () => {
  processData();
});
</script>

<style scoped>
.container {
  max-width: 1000px;
}
h3 {
  text-align: center;
}

/* Adjust the size of the bar charts */
.small-bar-chart {
  height: 300px;
  width: 100%;
}
</style>

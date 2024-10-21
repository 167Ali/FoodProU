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
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
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
};

// Function to apply filters and update charts
const applyFilters = () => {
  createCharts();
};

// Function to create all charts
const createCharts = () => {
  // Destroy existing charts to prevent duplicates
  destroyCharts();

  if (!selectedRestaurant.value) {
    // No restaurant filter applied, show only Top Performing Restaurants chart
    createTopRestaurantsChart();
  } else {
    // Restaurant filter applied, show Revenue Over Time and Order Volume Over Time charts
    createRevenueOverTimeChart();
    createOrderVolumeOverTimeChart();
  }
};

// Function to destroy existing charts
const destroyCharts = () => {
  if (revenueOverTimeChart) {
    revenueOverTimeChart.destroy();
    revenueOverTimeChart = null;
  }
  if (orderVolumeOverTimeChart) {
    orderVolumeOverTimeChart.destroy();
    orderVolumeOverTimeChart = null;
  }
  if (topRestaurantsChart) {
    topRestaurantsChart.destroy();
    topRestaurantsChart = null;
  }
};

// Helper function to generate consistent colors for restaurants
const restaurantColors = {};
const getRestaurantColor = (restaurant) => {
  if (restaurantColors[restaurant]) {
    return restaurantColors[restaurant];
  }
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  restaurantColors[restaurant] = color;
  return color;
};

// Chart instances
let revenueOverTimeChart, orderVolumeOverTimeChart, topRestaurantsChart;

/////////////////////////////
// Top Performing Restaurants //
/////////////////////////////
const createTopRestaurantsChart = () => {
  const { labels, data } = prepareTotalRevenueData();
  const combinedData = labels.map((label, index) => ({ label, value: data[index] }));
  const sortedData = combinedData.sort((a, b) => b.value - a.value).slice(0, 5); // Top 5 restaurants

  const ctx = topRestaurantsChartCanvas.value.getContext('2d');
  topRestaurantsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedData.map((item) => item.label),
      datasets: [
        {
          label: 'Total Revenue',
          data: sortedData.map((item) => item.value),
          backgroundColor: sortedData.map((item) => getRestaurantColor(item.label)),
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      scales: { x: { beginAtZero: true } },
      plugins: {
        legend: { display: false },
      },
    },
  });
};

/////////////////////////////////////
// Revenue Over Time Chart //
/////////////////////////////////////
const prepareRevenueOverTimeData = () => {
  const revenueData = {};
  const labelsSet = new Set();

  revenueDetails.value.revenue.forEach((rev, index) => {
    const date = new Date(revenueDetails.value.created_at[index]);
    const formattedDate = formatDateForChart(date, selectedFilter.value);
    const restaurant = revenueDetails.value.restaurant_name[index];

    // Apply filters
    if (selectedRestaurant.value && selectedRestaurant.value !== restaurant) return;
    if (!matchesFilter(date, selectedFilter.value)) return;

    if (!revenueData[restaurant]) {
      revenueData[restaurant] = {};
    }

    if (!revenueData[restaurant][formattedDate]) {
      revenueData[restaurant][formattedDate] = 0;
    }

    revenueData[restaurant][formattedDate] += rev;
    labelsSet.add(formattedDate);
  });

  const labels = Array.from(labelsSet).sort((a, b) => new Date(a) - new Date(b));
  const datasets = Object.keys(revenueData).map((restaurant) => {
    return {
      label: restaurant,
      data: labels.map((date) => revenueData[restaurant][date] || 0),
      fill: false,
      borderColor: getRestaurantColor(restaurant),
      tension: 0.1,
    };
  });

  return { labels, datasets };
};

const createRevenueOverTimeChart = () => {
  const { labels, datasets } = prepareRevenueOverTimeData();
  const ctx = revenueOverTimeCanvas.value.getContext('2d');
  revenueOverTimeChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
      plugins: {
        tooltip: { mode: 'index', intersect: false },
        legend: { display: true },
      },
    },
  });
};

///////////////////////////////
// Order Volume Over Time Chart //
///////////////////////////////
const prepareOrderVolumeOverTimeData = () => {
  const orderData = {};
  const labelsSet = new Set();

  orderVolumeDetails.value.order_volume.forEach((orders, index) => {
    const date = new Date(orderVolumeDetails.value.order_date[index]);
    const formattedDate = formatDateForChart(date, selectedFilter.value);
    const restaurant = orderVolumeDetails.value.restaurant_name[index];

    // Apply filters
    if (selectedRestaurant.value && selectedRestaurant.value !== restaurant) return;
    if (!matchesFilter(date, selectedFilter.value)) return;

    if (!orderData[restaurant]) {
      orderData[restaurant] = {};
    }

    if (!orderData[restaurant][formattedDate]) {
      orderData[restaurant][formattedDate] = 0;
    }

    orderData[restaurant][formattedDate] += orders;
    labelsSet.add(formattedDate);
  });

  const labels = Array.from(labelsSet).sort((a, b) => new Date(a) - new Date(b));
  const datasets = Object.keys(orderData).map((restaurant) => {
    return {
      label: restaurant,
      data: labels.map((date) => orderData[restaurant][date] || 0),
      fill: false,
      borderColor: getRestaurantColor(restaurant),
      tension: 0.1,
    };
  });

  return { labels, datasets };
};

const createOrderVolumeOverTimeChart = () => {
  const { labels, datasets } = prepareOrderVolumeOverTimeData();
  const ctx = orderVolumeOverTimeCanvas.value.getContext('2d');
  orderVolumeOverTimeChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } },
      plugins: {
        tooltip: { mode: 'index', intersect: false },
        legend: { display: true },
      },
    },
  });
};

/////////////////////////////////////
// Helper Functions //
/////////////////////////////////////
const prepareTotalRevenueData = () => {
  const revenueByRestaurant = {};

  revenueDetails.value.revenue.forEach((rev, index) => {
    const date = new Date(revenueDetails.value.created_at[index]);
    const restaurant = revenueDetails.value.restaurant_name[index];

    // Apply filters
    if (!matchesFilter(date, selectedFilter.value)) return;

    if (!revenueByRestaurant[restaurant]) {
      revenueByRestaurant[restaurant] = 0;
    }
    revenueByRestaurant[restaurant] += rev;
  });

  const labels = Object.keys(revenueByRestaurant);
  const data = Object.values(revenueByRestaurant);

  return { labels, data };
};

const formatDateForChart = (date, filter) => {
  if (filter === 'daily' || filter === 'all') {
    return date.toLocaleDateString();
  } else if (filter === 'weekly') {
    const weekNumber = getWeekNumber(date);
    return `Week ${weekNumber}, ${date.getFullYear()}`;
  } else if (filter === 'monthly') {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }
};

const getWeekNumber = (date) => {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = ((date - firstDay + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7);
};

const matchesFilter = (date, filter) => {
  const now = new Date();
  if (filter === 'daily') {
    return date.toDateString() === now.toDateString();
  } else if (filter === 'weekly') {
    const currentWeek = getWeekNumber(now);
    const dateWeek = getWeekNumber(date);
    return dateWeek === currentWeek && date.getFullYear() === now.getFullYear();
  } else if (filter === 'monthly') {
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  } else {
    return true;
  }
};

/////////////////////////
// Fetch Data on Mount //
/////////////////////////
onMounted(async () => {
  try {
    await store.dispatch('RevenueStore/fetchRevenueReports');
    if (revenueDetails.value && orderVolumeDetails.value) {
      initializeData();
      createCharts();
    } else {
      console.error('Data not available after fetch');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>
<style scoped>
.page-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}

.container {
  max-width: 1200px;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

canvas {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.row {
  margin-bottom: 40px;
}

.form-select {
  margin-top: 10px;
}

.label {
  font-weight: bold;
}

.table {
  margin-top: 20px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>

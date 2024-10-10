<template>
  <div class="container main-body mt-5">
    <!-- Dropdown filters for Time Period and Restaurant -->
    <div class="row mb-4 justify-content-center mt-5">
      <div class="col-md-4">
        <label for="restaurantFilter">Select Restaurant:</label>
        <select v-model="selectedRestaurant" @change="applyFilters" class="form-select">
          <option value="restaurant1">Restaurant 1</option>
          <option value="restaurant2">Restaurant 2</option>
          <option value="restaurant3">Restaurant 3</option>
        </select>
      </div>
      <div class="col-md-4">  
        <label for="timeFilter">Filter by Time:</label>
        <select v-model="selectedFilter" @change="applyFilters" class="form-select">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>

    <!-- First Row: Total Revenue and Order Volume (shown after filters are applied) -->
    <div v-if="!showInitialChart" class="row">
      <div class="col-md-6">
        <h3>Total Revenue</h3>
        <canvas ref="revenueChartCanvas" class="small-bar-chart"></canvas>
      </div>
      <div class="col-md-6">
        <h3>Order Volume</h3>
        <canvas ref="orderVolumeChartCanvas" class="small-bar-chart"></canvas>
      </div>
    </div>

    <!-- Second Row: Top Performing Restaurants (shown initially) -->
    <div v-if="showInitialChart" class="row mt-5 justify-content-center">
      <div class="col-md-8">
        <h3>Top Performing Restaurants</h3>
        <canvas ref="topRestaurantsChartCanvas" class="small-bar-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

// References for each chart
const revenueChartCanvas = ref(null);
const orderVolumeChartCanvas = ref(null);
const topRestaurantsChartCanvas = ref(null);

// Store the selected filter, selected restaurant values, and state for showing the initial chart
const selectedFilter = ref('daily');
const selectedRestaurant = ref('restaurant1');
const showInitialChart = ref(true);

// Dummy data based on filter type and restaurant
const chartData = {
  restaurant1: {
    daily: {
      revenue: [200, 150, 250, 300],
      orderVolume: [50, 40, 60, 70],
      topRestaurants: [400, 350, 300, 200]
    },
    weekly: {
      revenue: [1500, 2000, 1750, 2200],
      orderVolume: [300, 350, 320, 380],
      topRestaurants: [4500, 4000, 3500, 3200]
    },
    monthly: {
      revenue: [6000, 7500, 8000, 9500],
      orderVolume: [1000, 1200, 1100, 1300],
      topRestaurants: [15000, 14000, 13500, 12000]
    }
  },
  restaurant2: {
    daily: {
      revenue: [180, 140, 210, 250],
      orderVolume: [45, 38, 55, 65],
      topRestaurants: [370, 320, 280, 180]
    },
    weekly: {
      revenue: [1400, 1800, 1600, 2100],
      orderVolume: [270, 300, 290, 360],
      topRestaurants: [4200, 3800, 3300, 3100]
    },
    monthly: {
      revenue: [5800, 7000, 7600, 9000],
      orderVolume: [950, 1100, 1050, 1200],
      topRestaurants: [14500, 13000, 12500, 11500]
    }
  },
  restaurant3: {
    daily: {
      revenue: [220, 170, 280, 330],
      orderVolume: [60, 50, 75, 85],
      topRestaurants: [420, 380, 330, 210]
    },
    weekly: {
      revenue: [1600, 2100, 1900, 2300],
      orderVolume: [320, 370, 340, 400],
      topRestaurants: [4600, 4200, 3600, 3300]
    },
    monthly: {
      revenue: [6500, 8000, 8500, 10000],
      orderVolume: [1100, 1300, 1200, 1400],
      topRestaurants: [15500, 14500, 14000, 12500]
    }
  }
};

// Functions to create the charts
let revenueChart, orderVolumeChart, topRestaurantsChart;

const createRevenueChart = (data) => {
  if (revenueChart) revenueChart.destroy();
  const ctx = revenueChartCanvas.value.getContext('2d');
  revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Period 1', 'Period 2', 'Period 3', 'Period 4'],
      datasets: [{
        label: 'Total Revenue',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
};

const createOrderVolumeChart = (data) => {
  if (orderVolumeChart) orderVolumeChart.destroy();
  const ctx = orderVolumeChartCanvas.value.getContext('2d');
  orderVolumeChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Period 1', 'Period 2', 'Period 3', 'Period 4'],
      datasets: [{
        label: 'Order Volume',
        data: data,
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
};

const createTopRestaurantsChart = (data) => {
  if (topRestaurantsChart) topRestaurantsChart.destroy();
  const ctx = topRestaurantsChartCanvas.value.getContext('2d');
  topRestaurantsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Restaurant A', 'Restaurant B', 'Restaurant C', 'Restaurant D'],
      datasets: [{
        label: 'Sales (in $)',
        data: data,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
};

// Function to apply filters and update charts
const applyFilters = () => {
  showInitialChart.value = false;
  updateCharts();
};

// Function to update charts based on the selected filter and restaurant
const updateCharts = () => {
  const filter = selectedFilter.value;
  const restaurant = selectedRestaurant.value;
  createRevenueChart(chartData[restaurant][filter].revenue);
  createOrderVolumeChart(chartData[restaurant][filter].orderVolume);
};

// Initialize charts when component is mounted
onMounted(() => {
  createTopRestaurantsChart(chartData.restaurant1.daily.topRestaurants);
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

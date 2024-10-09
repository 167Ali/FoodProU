<template>
    <div class="container main-body mt-5">
      <!-- Dropdown filter -->
      <div class="row mb-4 justify-content-center">
        <div class="col-md-4">
          <label for="timeFilter">Filter by:</label>
          <select v-model="selectedFilter" @change="updateCharts" class="form-select">
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
  
      <!-- Second Row: Top Performing Restaurants -->
      <div class="row mt-5 justify-content-center">
        <div class="col-md-8">
          <h3>Top Performing Restaurants</h3>
          <canvas ref="topRestaurantsChartCanvas" class="small-bar-chart"></canvas>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { Chart } from 'chart.js/auto';
  
  // References for each chart
  const revenueChartCanvas = ref(null);
  const orderVolumeChartCanvas = ref(null);
  const topRestaurantsChartCanvas = ref(null);
  
  // Store the selected filter value
  const selectedFilter = ref('daily');
  
  // Dummy data based on filter type
  const chartData = {
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
    },
    
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
  
  // Function to update charts based on the selected filter
  const updateCharts = () => {
    const filter = selectedFilter.value;
    createRevenueChart(chartData[filter].revenue);
    createOrderVolumeChart(chartData[filter].orderVolume);
    createTopRestaurantsChart(chartData[filter].topRestaurants);
  };
  
  // Initialize charts when component is mounted
  onMounted(() => {
    updateCharts();
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
  
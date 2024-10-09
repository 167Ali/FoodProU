<template>
    <div class="container main-body mt-5">
      <!-- First Row: Total Revenue and Order Volume -->
      <div class="row">
        <div class="col-md-6">
          <h3>Total Revenue Over Time</h3>
          <canvas ref="revenueChartCanvas" class="small-bar-chart"></canvas>
        </div>
        <div class="col-md-6">
          <h3>Order Volume Trends</h3>
          <canvas ref="orderVolumeChartCanvas" class="small-bar-chart"></canvas>
        </div>
      </div>
      
      <div class="row mt-5 justify-content-center">
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
  
  // Create references for each chart's canvas
  const revenueChartCanvas = ref(null);
  const orderVolumeChartCanvas = ref(null);
  const topRestaurantsChartCanvas = ref(null);
  
  // Total Revenue Chart
  const createRevenueChart = () => {
    if (revenueChartCanvas.value) {
      const ctx = revenueChartCanvas.value.getContext('2d');
      new Chart(ctx, {
        type: 'bar',  // You can change to 'line' if needed
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Total Revenue',
            data: [5000, 7000, 8000, 7500, 8500, 9000, 9500],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };
  
  // Order Volume Chart
  const createOrderVolumeChart = () => {
    if (orderVolumeChartCanvas.value) {
      const ctx = orderVolumeChartCanvas.value.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'Order Volume',
            data: [150, 200, 170, 220],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };
  
  // Top Performing Restaurants (Bar Chart)
  const createTopRestaurantsChart = () => {
    if (topRestaurantsChartCanvas.value) {
      const ctx = topRestaurantsChartCanvas.value.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Restaurant A', 'Restaurant B', 'Restaurant C', 'Restaurant D'],
          datasets: [{
            label: 'Sales (in $)',
            data: [12000, 10000, 8000, 7000],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };
  
  // Mount the charts after the component is loaded
  onMounted(() => {
    createRevenueChart();
    createOrderVolumeChart();
    createTopRestaurantsChart();
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
    height: 300px; /* Reduce the height */
    width: 100%;
  }
  </style>
  
<template>
  <div class="chart-container">
    <div class="row">
      <div class="chart-col">
        <h3>Total Revenue Over Time</h3>
        <canvas ref="revenueChartCanvas" class="chart"></canvas>
      </div>
      <div class="chart-col">
        <h3>Order Volume Trends</h3>
        <canvas ref="orderVolumeChartCanvas" class="chart"></canvas>
      </div>
    </div>

    <div class="row mt-5 justify-content-center">
      <div class="chart-col">
        <h3>Top Performing Restaurants</h3>
        <canvas ref="topRestaurantsChartCanvas" class="chart"></canvas>
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
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Total Revenue',
          data: [5000, 7000, 8000, 7500, 8500, 9000, 9500],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.3)'
            }
          },
          x: {
            grid: {
              display: false
            }
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
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.3)'
            }
          },
          x: {
            grid: {
              display: false
            }
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
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(200, 200, 200, 0.3)'
            }
          },
          x: {
            grid: {
              display: false
            }
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
.chart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.chart-col {
  flex: 1;
  min-width: 350px;
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.chart-col:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

h3 {
  font-family: 'Arial', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Chart styling */
.chart {
  height: 320px;
  width: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .chart-col {
    flex-basis: 100%;
  }
}
</style>
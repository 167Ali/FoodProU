<template>
<<<<<<< HEAD:src/components/AdminFinanceDashboard.vue
  <div class="app-container">
    <SideBar />
    <div class="content">
      <Header />
      <Charts />
    </div>
=======
  <div>
    <Header />
    <charts />
>>>>>>> dc494b7fd631f769a3d79f4a3933a615370fffee:src/components/Admin/AdminFinanceDashboard.vue
  </div>
</template>

<script setup>
<<<<<<< HEAD:src/components/AdminFinanceDashboard.vue
import Header from '../components/Headersection.vue';
import Charts from '../components/DataChart.vue';
import SideBar from '../components/SideBar.vue';
=======
import Header from '../HeaderFooter/Headersection.vue'
import charts from './DataChart.vue'
>>>>>>> dc494b7fd631f769a3d79f4a3933a615370fffee:src/components/Admin/AdminFinanceDashboard.vue
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
  /* Horizontal layout */
  height: 100vh;
  /* Full height */
}

/* Sidebar styling */
.sidebar {
  width: 100px;
  /* Fixed width for sidebar */
}

/* Content area */
.content {
  flex-grow: 1;
  /* Take remaining space */
  padding: 20px;
  /* Padding for aesthetics */
  display: flex;
  flex-direction: column;
}

/* Media query for responsiveness */
@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
    /* Stack vertically on smaller screens */
  }
}</style>
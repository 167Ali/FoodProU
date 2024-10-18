<!-- src/views/Home.vue -->
<template>
    <LoginHeader />
    <div class="restaurant-header">
        <RestaurantHeader />
        <hr>
        <Deals />
    </div>
    <div>
        <CategoryNavbar/>
    </div>

    <PageFooter />
    
</template>

<script setup>
import LoginHeader from '../../components/HeaderFooter/LoginHeader.vue';
import RestaurantHeader from '../../components/HeaderFooter/RestaurantHeader.vue'
import Deals from '../../components/Customer/Deals.vue'
import CategoryNavbar from '../../components/Customer/CategoryNavbar.vue'
import PageFooter from '../../components/HeaderFooter/PageFooter.vue';
 
</script>

<style scoped>
.restaurant-header {
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.restaurant-header hr{
    margin: 0;
    color: rgb(128, 127, 127);
    opacity: 0.1;
    font-weight: lighter;
    /* font-size: 1px; */
}

</style>
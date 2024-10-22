<!-- src/views/Home.vue -->
<template>
    <div class="restaurant-header">
        <AdminResturantHeader />
        <hr>
        <Deals />
    </div>
    <div>
        <CategoryNavbar/>
    </div>

    <PageFooter />
    
</template>

<script setup>
import AdminResturantHeader from './AdminResturantHeader.vue';
import Deals from '../../components/Customer/Deals.vue';
import CategoryNavbar from '../../components/Customer/CategoryNavbar.vue';
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
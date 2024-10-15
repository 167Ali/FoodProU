<template>
    <LoginHeader />
    <div class="row me-xl-5 me-lg-2">
        <div class="d-none d-lg-block col-lg-3">
            <DashboardFilter />
        </div>
        <div class="col-lg-9">
            <Searchbar />
            <discounts :restaurants="restaurants" />
            <Cuisines/>

            <div class="d-lg-none">
                <!-- Different placement of filter for non-lg screens -->
                <DashboardFilter />
            </div>
            <div class="row">

                

                <div class="col-lg-4 col-md-6 col-sm-6 col-12 mb-4" v-for="(restaurant, index) in restaurants"
                    :key="index">
                    <router-link :to="{ name: 'RestaurantPage', params: { id: restaurant.id } }" class="card-link">
                        <RestaurantCard :image="restaurant.image" :name="restaurant.name" :cuisine="restaurant.cuisine"
                            :rating="restaurant.rating" :reviews="restaurant.reviews" :price="restaurant.price"
                            :deliveryTime="restaurant.deliveryTime" :deliveryFee="restaurant.deliveryFee"
                            :discounts="restaurant.discounts" />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
    <PageFooter />
</template>


<script setup>
import RestaurantCard from '../../components/Customer/RestaurantCard.vue'
import DashboardFilter from '../../components/Customer/DashboardFilter.vue'
import Searchbar from '../../components/OtherComponents/Searchbar.vue'
import discounts from '../../components/Customer/discounts.vue';
import LoginHeader from '../../components/HeaderFooter/LoginHeader.vue';
import PageFooter from '../../components/HeaderFooter/PageFooter.vue';

import Cuisines from '@/components/Customer/Cuisines.vue';


const restaurants = [
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    {
        image: '/src/assets/img1.jpg',
        name: 'Suadish Biryani – Lahore',
        cuisine: 'Pakistani',
        rating: 4.5,
        reviews: 3000,
        price: 'Rs.199',
        deliveryTime: 15,
        deliveryFee: 'Rs.20',
        discounts: ['20% off: mc20', 'Up to 35% PRO']
    },
    {
        image: '/src/assets/img2.jpg',
        name: 'Kababjees Fried Chicken',
        cuisine: 'Burgers',
        rating: 4.6,
        reviews: 5000,
        price: 'Rs.99',
        deliveryTime: 35,
        deliveryFee: 'Rs.99',
        discounts: ['20% off: mc20', '15% off PRO']
    },
    {
        image: '/src/assets/img3.jpeg',
        name: 'Karachi Naseeb Biryani',
        cuisine: 'Pakistani',
        rating: 4.8,
        reviews: 500,
        price: 'Rs.149',
        deliveryTime: 10,
        deliveryFee: 'Rs.149',
        discounts: ['Up to 15% off', '20% off: mc20']
    },
    // More restaurants can be added here
]
</script>

<style scoped></style>>

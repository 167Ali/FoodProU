<template>
    <div>
        <div class="d-none d-lg-flex flex-column card filters">
            <h5>Filters</h5>
            <h6>Sort by</h6>
            <div>
                <label><input type="radio" name="sort" value="relevance" v-model="sortOption" checked />
                    Relevance</label><br>
                <label><input type="radio" name="sort" value="fastest" v-model="sortOption" /> Fastest
                    delivery</label><br>
                <label><input type="radio" name="sort" value="distance" v-model="sortOption" /> Distance</label>
            </div>

            <h6>Quick filters</h6>
            <div>
                <label><input type="checkbox" v-model="quickFilters.ratings" /> Ratings 4+</label><br>
                <label><input type="checkbox" v-model="quickFilters.topRestaurant" /> Top restaurant</label>
            </div>

            <h6>Offers</h6>
            <div>
                <label><input type="checkbox" v-model="offers.freeDelivery" /> Free delivery</label><br>
                <label><input type="checkbox" v-model="offers.acceptsVouchers" /> Accepts vouchers</label><br>
                <label><input type="checkbox" v-model="offers.deals" /> Deals</label>
            </div>

            <h6>Cuisines</h6>
            <input type="text" class="form-control mb-2" placeholder="Search for cuisines" v-model="cuisineSearch" />
            <div>
                <label v-for="(cuisine, index) in cuisines" :key="index" class="d-block mb-1">
                    <input type="checkbox" v-model="cuisine.selected" /> {{ cuisine.name }}
                </label>
            </div>

            <h6>Price</h6>
            <div>
                <button v-for="(price, index) in prices" :key="index" class="btn btn-outline-secondary me-1 "
                    :class="{ active: price.selected }" @click="togglePrice(price)">
                    {{ price.label }}
                </button>
            </div>
        </div>

        <!-- Filter Icon for small screens -->
        <div class="d-lg-none mt-2">
            <button class="btn btn-outline-secondary" @click="showFilters = !showFilters">
                <i class="fa-solid fa-filter fa-lg" style="color: #303640;"></i>
            </button>
            <div v-if="showFilters" class="position-absolute bg-light border p-3" style="z-index: 1000;">
                <h5>Filters</h5>
                <!-- Add the same filter structure here -->
                <!-- Sort by -->
                <h6>Sort by</h6>
                <div>
                    <label><input type="radio" name="sort" value="relevance" v-model="sortOption" checked />
                        Relevance</label>
                    <label><input type="radio" name="sort" value="fastest" v-model="sortOption" /> Fastest
                        delivery</label>
                    <label><input type="radio" name="sort" value="distance" v-model="sortOption" /> Distance</label>
                </div>

                <!-- Quick filters -->
                <h6>Quick filters</h6>
                <div>
                    <label><input type="checkbox" v-model="quickFilters.ratings" /> Ratings 4+</label>
                    <label><input type="checkbox" v-model="quickFilters.topRestaurant" /> Top restaurant</label>
                </div>

                <!-- Offers -->
                <h6>Offers</h6>
                <div>
                    <label><input type="checkbox" v-model="offers.freeDelivery" /> Free delivery</label>
                    <label><input type="checkbox" v-model="offers.acceptsVouchers" /> Accepts vouchers</label>
                    <label><input type="checkbox" v-model="offers.deals" /> Deals</label>
                </div>

                <!-- Cuisines -->
                <h6>Cuisines</h6>
                <input type="text" class="form-control mb-2" placeholder="Search for cuisines"
                    v-model="cuisineSearch" />
                <div>
                    <br><label v-for="(cuisine, index) in cuisines" :key="index">
                        <input type="checkbox" v-model="cuisine.selected" /> {{ cuisine.name }}
                    </label>
                </div>

                <!-- Price -->
                <h6>Price</h6>
                <div>
                    <button v-for="(price, index) in prices" :key="index" class="btn btn-outline-secondary me-1"
                        :class="{ active: price.selected }" @click="togglePrice(price)">
                        {{ price.label }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const sortOption = ref('relevance');
const showFilters = ref(false);

const quickFilters = {
    ratings: false,
    topRestaurant: false,
};

const offers = {
    freeDelivery: false,
    acceptsVouchers: false,
    deals: false,
};

const cuisineSearch = ref('');
const cuisines = ref([
    { name: 'American', selected: false },
    { name: 'BBQ', selected: false },
    { name: 'Beverages', selected: false },
    { name: 'Biryani', selected: false },
    { name: 'Broast', selected: false },
    { name: 'Burgers', selected: false },
    { name: 'Cakes & Bakery', selected: false },
    { name: 'Chinese', selected: false },
    { name: 'Continental', selected: false },
    { name: 'Cakes & Bakery', selected: false },
    { name: 'Chinese', selected: false },
    { name: 'Continental', selected: false },
]);

const prices = ref([
    { label: '$', selected: false },
    { label: '$$', selected: false },
    { label: '$$$', selected: false },
]);

function togglePrice(price) {
    price.selected = !price.selected;
}
</script>

<style scoped>
.filters {
    max-width: 300px;
    height: 100%;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;

}

.card {
    border: 1px solid #eaeaea;
    border-radius: 10px;
    padding: 15px;
    max-width: 300px;
    margin: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

/* @media only screen and (max-width: 1350px) {

    .filters {
        max-width: 250px;
    }
} */
</style>

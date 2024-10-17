<template>
    <div>
        <div class="d-none d-lg-flex flex-column card filters">
            <h3>Filters</h3>
            <h6>Sort by</h6><br />
            <hr />
            <div>
                <label><input type="checkbox" v-model="quickFilters.ratings" /> Ratings 4+</label><br />
            </div>
            <hr />
            <div>
                <label><input type="checkbox" v-model="quickFilters.deals" /> Deals</label><br />
            </div>
            <hr />
            <h5>Cuisines</h5>
            <div>
                <label v-for="(cuisine, index) in cuisines" :key="index" class="d-block mb-1">
                    <input type="checkbox" v-model="cuisine.selected" /> {{ cuisine.name }}
                </label>
            </div><br />
            <hr />

            <h5>Price</h5><br />
            <div>
                <button v-for="(price, index) in prices" :key="index" class="btn btn-outline-secondary me-1"
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
                <!-- Include mobile filters here (similar to desktop) -->
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, watch, defineEmits } from 'vue';

const emit = defineEmits(['filterChanged']);

const sortOption = ref('relevance');
const showFilters = ref(false);

const quickFilters = ref({
    ratings: false,
    deals: false,
});

const offers = ref({
    freeDelivery: false,
    acceptsVouchers: false,
});

const cuisineSearch = ref('');
const cuisines = ref([
    { name: 'American', selected: false },
    { name: 'Chinese', selected: false },
    { name: 'Continental', selected: false },
    { name: 'Fast Food', selected: false },
    { name: 'Indain', selected: false },
    { name: 'Italian', selected: false },
    { name: 'Mexican', selected: false },
    { name: 'Middle Eastern', selected: false },
    { name: 'Thai', selected: false },
    { name: 'Turkish', selected: false },
]);

const prices = ref([
    { label: '99+', selected: false },
    { label: '499+', selected: false },
    { label: '999+', selected: false },
]);

function togglePrice(price) {
    price.selected = !price.selected;
}

// Computed property to get selected filters
const selectedFilters = computed(() => {
    return {
        sortOption: sortOption.value,
        quickFilters: quickFilters.value,
        offers: offers.value,
        selectedCuisines: cuisines.value.filter(cuisine => cuisine.selected).map(cuisine => cuisine.name),
        selectedPrices: prices.value.filter(price => price.selected).map(price => price.label),
    };
});

// Watch for changes and emit event
watch(selectedFilters, (newFilters) => {
    emit('filterChanged', newFilters);
}, { deep: true });
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
    padding: 30px;
    max-width: 300px;
    margin: 90px 0px 0px 25px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
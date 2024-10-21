<template>
    <div class="container mt-4">
        <div class="row g-3">
            <div v-for="(item, index) in menuItems" :key="index" class="col-6 col-md-3">
                <div class="menu-card p-3 text-center" :class="{ selected: selectedItem === index }"
                    @click="selectItem(index)">
                    <div class="menu-icon mb-2">
                        <i :class="item.icon" class="fs-1"></i>
                    </div>
                    <h5 class="menu-title">{{ item.title }}</h5>
                    <p class="menu-stock">{{ item.stock }} Menu In Stock</p>
                </div>
            </div>
        </div>
    </div>


    <div class="container mt-5">
        <div class="row g-4">
            <div class="col-md-4" v-for="product in products" :key="product.id">
                <div class="card cardp h-100 p-3 shadow-sm">
                    <div class="row g-0">
                        <div class="col-4">
                            <img :src="product.image" class="img-fluid rounded" alt="Product image">
                        </div>
                        <div class="col-8">
                            <div class="card-body">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <p class="card-text text-muted">
                                    {{ product.description }}
                                </p>
                                <h4 class="card-text">
                                    ${{ product.price }}
                                </h4>
                                <div class="d-flex align-items-center">
                                    <button class="btn btn-outline-secondary" @click="decreaseQuantity(product)">
                                        &minus;
                                    </button>
                                    <span class="mx-3">{{ product.quantity }}</span>
                                    <button class="btn btn-outline-primary" @click="increaseQuantity(product)">
                                        &plus;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="container mt-5">
        <div class="card p-4">
            <h4 class="fw-bold">Invoice</h4>

            <!-- Invoice Items -->
            <div v-for="(item, index) in items1" :key="index"
                class="d-flex justify-content-between align-items-center mt-3">
                <div class="d-flex align-items-center">
                    <img :src="item.image" alt="item.name" class="rounded img-fluid me-3"
                        style="width: 60px; height: 60px;" />
                    <div>
                        <h5 class="mb-0">{{ item.name }}</h5>
                        <small>{{ item.quantity }}x</small>
                        <p class="mb-0"><small>{{ item.note }}</small></p>
                    </div>
                </div>
                <h6 class="fw-bold">$55</h6>
            </div>

            <!-- Payment Summary -->
            <div class="card p-3 mt-4 bg-light">
                <h5 class="fw-bold">Payment Summary</h5>
                <div class="d-flex justify-content-between">
                    <span>Sub Total</span>
                    <span>$44</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Tax</span>
                    <span>$44</span>
                </div>
                <hr />
                <div class="d-flex justify-content-between">
                    <span>Total Payment</span>
                    <span>$$44 </span>
                </div>
            </div>

            <!-- Payment Options -->
            <div class="d-flex justify-content-between mt-3">
                <button class="btn btn-light flex-fill me-2" :class="{ active: selectedPaymentMethod === 'creditCard' }"
                    @click="selectPaymentMethod('creditCard')">
                    <i class="bi bi-credit-card"></i> Credit Card
                </button>
                <button class="btn btn-light flex-fill me-2" :class="{ active: selectedPaymentMethod === 'payLater' }"
                    @click="selectPaymentMethod('payLater')">
                    <i class="bi bi-wallet2"></i> Pay Later
                </button>
                <button class="btn btn-light flex-fill" :class="{ active: selectedPaymentMethod === 'cashPayout' }"
                    @click="selectPaymentMethod('cashPayout')">
                    <i class="bi bi-cash"></i> Cash Payout
                </button>
            </div>

            <!-- Place Order Button -->
            <button class="btn btn-primary btn-lg w-100 mt-4" @click="placeOrder">Place An Order</button>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { ref, computed } from "vue";


const menuItems = ref([
    { title: "Breakfast", icon: "bi bi-bread", stock: 12 },
    { title: "Lunch", icon: "bi bi-hamburger", stock: 12 },
    { title: "Dinner", icon: "bi bi-dish", stock: 12 },
    { title: "Soup", icon: "bi bi-bowl", stock: 12 },
    { title: "Desserts", icon: "bi bi-ice-cream", stock: 12 },
    { title: "Side Dish", icon: "bi bi-egg-fried", stock: 12 },
    { title: "Appetizer", icon: "bi bi-eggplant", stock: 12 },
    { title: "Beverages", icon: "bi bi-cup-straw", stock: 12 },
]);
// Selected item state
const selectedItem = ref(null);

// Function to select an item
const selectItem = (index) => {
    selectedItem.value = index;
};
//



const products = ref([
    {
        id: 1,
        name: 'Pasta Bolognese',
        description: 'Delicious beef lasagna with double chilli',
        price: 50.5,
        quantity: 1,
        image: '/src/assets/img3.jpeg',
    },
    {
        id: 2,
        name: 'Pizza Margherita',
        description: 'Classic pizza with mozzarella and basil',
        price: 25.0,
        quantity: 1,
        image: '/src/assets/img3.jpeg',
    },
    {
        id: 3,
        name: 'Tiramisu',
        description: 'Coffee-flavored Italian dessert',
        price: 15.0,
        quantity: 1,
        image: '/src/assets/img3.jpeg',
    },
]);

const increaseQuantity = (product) => {
    product.quantity++;
};

const decreaseQuantity = (product) => {
    if (product.quantity > 1) {
        product.quantity--;
    }
};


////
const items1 = ref([
    {
        name: 'Pasta Bolognese',
        quantity: 2,
        note: 'Dont Add Vegetables',
        price: 50.50,
        image: '/src/assets/img3.jpeg',
    },
    {
        name: 'Spicy Fried Chicken',
        quantity: 2,
        note: 'Dont Add Vegetables',
        price: 45.70,
        image: '/src/assets/img3.jpeg',
    },
    {
        name: 'Spaghetti Carbonara',
        quantity: 2,
        note: 'Dont Add Vegetables',
        price: 35.00,
        image: '/src/assets/img3.jpeg',
    },
]);



const selectedPaymentMethod = ref('creditCard');

function selectPaymentMethod(method) {
    selectedPaymentMethod.value = method;
}

function placeOrder() {
    console.log('Order placed with method:', selectedPaymentMethod.value);
}
//const subTotal = computed(() => items.value.reduce((sum, item) => sum + item.price, 0));
//const tax = computed(() => subTotal.value * 0.04); // 4% tax rate
//const totalPayment = computed(() => subTotal.value + tax.value);
</script>
<style scoped>
.menu-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;
}

.menu-card:hover {
    background-color: #e9ecef;
}

.menu-card.selected {
    background-color: #007bff;
    color: #fff;
}

.menu-icon {
    font-size: 2rem;
    color: #6c757d;
}

.menu-card.selected .menu-icon {
    color: #fff;
}

.menu-title {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
}

.menu-stock {
    font-size: 0.9rem;
    color: #6c757d;
}

.menu-card.selected .menu-stock {
    color: #fff;
}

/* /// */
.cardp {
    border-radius: 12px;
}

.card-title {
    font-weight: 600;
}

.card-text {
    font-size: 0.9rem;
}

.img-fluid {
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

button {
    font-size: 1.25rem;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* // */
.active {
    border-color: #007bff;
}

.card {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
}

h4 {
    font-size: 1.5rem;
}

img {
    border-radius: 10px;
}

button.active {
    background-color: #007bff;
    color: #fff;
}

button i {
    margin-right: 5px;
}
</style>

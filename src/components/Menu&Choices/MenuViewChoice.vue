<template>

    <div class="container">
        <div class="card p-4">
            <h4 class="fw-bold">Choices</h4>



            <div v-for="(choice, index) in choices" :key="index" class="col-md-12 mb-4">
                <div class="card p-3 shadow-lg">
                    <div class="card-body">
                        <h5 class="card-title">{{ choice.choicename }}</h5>
                        <p class="card-text">Min: {{ choice.ischoice }}</p>
                        <p class="card-text">Choice Type: {{ choice.choicetype }}</p>
                        <ul class="scroller-card">
                            <li v-for="(item, idx) in choice.choiceitems" :key="idx">{{ item.name
                                }} - ${{ item.price }}
                            </li>
                        </ul>
                        <button class="btn btn-outline-secondary me-2" @click="viewChoice(index)">View/Edit</button>
                        <button class="btn btn-danger" @click="deleteChoice(index)">Delete</button>
                    </div>
                </div>
            </div>

            <!-- Invoice Items -->
            <!-- <div v-for="(item, index) in items1" :key="index"
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
            </div> -->

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




    <div class="container mt-4">
        <!-- Button to trigger modal for creating a choice -->
        <button class="btn btn-primary mb-4" @click="openModal()">Create Choice</button>

        <!-- Cards displaying choice names -->
        <div class="row">

        </div>

        <!-- Modal for Create/Edit Choice -->
        <div v-if="isFormVisible" class="modal-overlay">
            <div class="modal-content">
                <MenuCreateChoice :choice="currentChoice" :is-edit-mode="isEditMode" @save="saveChoice"
                    @cancel="isFormVisible = false" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import MenuCreateChoice from '../Menu&Choices/MenuCreateChoice.vue'; // Import the form component

// Mock data for choices
const choices = ref([
    {
        choicename: 'Pizza Toppings',
        ischoice: '1',
        choicetype: 'size',
        choiceitems: [{ name: 'Cheese', price: 2 }, { name: 'Pepperoni', price: 3 }],
    },
    {
        choicename: 'Drink Sizes',
        ischoice: '0',
        choicetype: 'additional',
        choiceitems: [{ name: 'Small', price: 1 }, { name: 'Medium', price: 1.5 }, { name: 'Large', price: 2 }],
    },
    {
        choicename: 'Burger Add-ons',
        ischoice: '1',
        choicetype: 'additional',
        choiceitems: [{ name: 'Bacon', price: 1.5 }, { name: 'Extra Cheese', price: 1 }],
    },
]);

const isFormVisible = ref(false);
const isEditMode = ref(false);
const currentChoice = ref(null);
const currentEditIndex = ref(null);

// Function to open the form modal for creating a new choice
const openModal = () => {
    isFormVisible.value = true;
    currentChoice.value = null;
    isEditMode.value = false;
};

// Function to open the form modal for editing a choice
const viewChoice = (index) => {
    currentEditIndex.value = index;
    currentChoice.value = { ...choices.value[index] };
    isEditMode.value = true;
    isFormVisible.value = true;
};

// Save function for the form component
const saveChoice = (choice) => {
    if (isEditMode.value && currentEditIndex.value !== null) {
        choices.value[currentEditIndex.value] = choice;
    } else {
        choices.value.push(choice);
    }
    isFormVisible.value = false;
};

// Delete a choice
const deleteChoice = (index) => {
    choices.value.splice(index, 1);
};




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

</script>

<style>
/* Modal overlay styling */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.scroller-card {
    overflow-y: auto;
    height: 100px;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    max-width: 100%;
}

/* .card {
    max-width: 700px;
    border-radius: 8px;
    border: none;
} */

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.card-text i {
    font-size: 1.2rem;
    color: #666;
}

.btn-outline-secondary {
    border-radius: 20px;
}

.btn-danger {
    border-radius: 20px;
}


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

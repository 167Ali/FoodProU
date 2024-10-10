<template>

    <div>

        <!-- Add to Cart Button -->

        <button class="btn btn-primary" @click="showModal = true">Add to cart</button>



        <!-- Modal -->

        <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" style="display: block;"
            v-if="showModal">

            <div class="modal-dialog modal-dialog-centered" role="document">

                <div class="modal-content">

                    <!-- Modal Body with scroll -->

                    <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">

                        <!-- Product Image at the Top -->

                        <img :src="productImage" alt="Product Image" class="product-image mb-3">



                        <!-- Product Details under the image -->

                        <div class="text-left">

                            <strong>
                                <h4 class="font-weight-bold">{{ productName }}</h4>
                            </strong>

                            <h6 class="current-price">Rs. {{ discountedPrice.toFixed(2) }} <span
                                    class="original-price">Rs. {{ originalPrice }}</span></h6>

                            <p>{{ productDescription }}</p>

                        </div>



                        <!-- Scrollable Card: Choose Your Sub -->

                        <div class="choose-sub-card mt-3">

                            <div class="card p-3" style="background-color: #fff0f5;">

                                <div class="d-flex justify-content-between align-items-center">

                                    <h5 class="font-weight-bold">Choose Your Sub</h5>

                                    <span class="badge badge-danger">Required</span>

                                </div>

                                <p class="mb-1">Select 1</p>

                                <div class="scrollable-options">

                                    <!-- Radio Button Options -->

                                    <div class="form-check mb-2" v-for="(option, index) in subOptions" :key="index">

                                        <input class="form-check-input" type="radio" :id="'option-' + index"
                                            :value="option" v-model="selectedSub" />

                                        <label class="form-check-label" :for="'option-' + index">

                                            {{ option.name }}

                                            <span v-if="option.popular" class="ml-1 text-muted">

                                                <i class="fas fa-fire"></i> Popular

                                            </span>

                                        </label>

                                        <span class="float-right text-muted">{{ option.price }}</span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>



                    <!-- Add to Cart Section -->

                    <div class="modal-footer justify-content-between">

                        <!-- Updated Button -->

                        <button class="btn btn-green w-100" @click="addToCart">Add to cart</button>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>



<script setup>

import { ref } from 'vue';



const showModal = ref(false);

const productImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9Qq1rV_svdydH5u3O8r5ZmT8udMBnSuKeA&s'; // Replace with your burger image URL

const productName = 'Summer Deal 1';

const discountedPrice = 475.16;

const originalPrice = 774;

const discount = '39%';

const productDescription = 'Chicken Sub & 345ml Drink';

const quantity = ref(1);

const selectedSub = ref(null);

const subOptions = ref([

    { name: 'Tikka', price: 'Free', popular: true },

    { name: 'BBQ', price: 'Free', popular: false },

    { name: 'Roasted Chicken Breast', price: 'Free', popular: false },

    { name: 'Chicken Chapli', price: 'Free', popular: false },

]);



const closeModal = () => {

    showModal.value = false;

};



const addToCart = () => {

    console.log(`Added to cart: ${productName}, Quantity: ${quantity.value}, Sub: ${selectedSub.value?.name}`);

    closeModal(); // Optionally close the modal after adding to the cart

};



const increaseQuantity = () => {

    quantity.value++;

};



const decreaseQuantity = () => {

    if (quantity.value > 1) quantity.value--;

};

</script>



<style scoped>
.modal {

    display: block;

    background: rgba(0, 0, 0, 0.5);

    position: fixed;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    z-index: 1050;

}



.modal-dialog {

    max-width: 600px;
    /* Increased width */

    margin: 100px auto;

    border-radius: 10px;
    /* Added border-radius */

}



.modal-content {

    border-radius: 10px;
    /* Added border-radius */

}



.modal-body {

    display: block;

    text-align: left;

    padding: 20px;

}



.product-image {

    width: 100%;

    height: auto;

    object-fit: cover;

}



.current-price {

    font-size: 1.5em;

    color: #d9534f;
    /* Bootstrap danger color */

}



.original-price {

    text-decoration: line-through;

    color: gray;

    margin-left: 10px;

}



.discount {

    color: green;

    font-weight: bold;

}



.choose-sub-card {

    margin-bottom: 20px;

}



.scrollable-options {

    display: flex;

    flex-direction: column;

}



.modal-footer {

    display: flex;

    justify-content: space-between;

    align-items: center;

}



.quantity-control {

    display: flex;

    align-items: center;

}



.btn-green {

    background-color: #00754A;
    /* Changed button color */

    color: white;

    border: none;

    width: 100%;

    transition: background-color 0.3s ease;
    /* Smooth transition */

}



.btn-green:hover {

    background-color: #005f3d;
    /* Darker green on hover */

}
</style>
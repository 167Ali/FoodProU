<template>
    <BeforeLoginHeader />
    <div id="landing-page" class="container-fluid p-0">
        <section id="hero-section" class="py-5">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 text-start">
                        <h1 class="mb-4">It’s the food and groceries you love, delivered</h1>
                        <input type="text" class="form-control my-4"
                            placeholder="Enter your Desired Food to munch and enjoy!" />
                    </div>
                    <div class="col-md-6 text-center position-relative">
                        <div class="pic" style="height: 600px;">
                            <img src="../../Assets/MainLandingCusine/3.png" alt="Cuisine Image" class="card-img-top"
                                style="height: 100%; width: 100%; object-fit:fill;">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="text-center py-5 mx-5">
            <h3 class="mb-5 card_text">Find your MouthWatering cuisines and many more</h3>
            <div class="row justify-content-center">
                <div v-for="(cuisine, index) in cuisines" :key="index" class="col-md-3 col-sm-6 mb-4 animated zoomIn">
                    <div class="card">
                        <img :src="cuisine.image" class="card-img-top" :alt="cuisine.name">
                        <div class="card-label">{{ cuisine.name }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Restaurant/Shop Section -->
        <section class="text-center py-5" id="shop_section">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-6 text-start">
                        <h3 class="mb-3 text-dark">You prepare the food and products, we handle the rest</h3>
                        <p class="mb-4 text-dark">
                            It's as simple as letting us display your menu and items online,
                            assist you in processing orders, pick them up, and transport them
                            to hungry pros - all in a flash!
                        </p>
                        <button class="btn">Get started</button>
                    </div>
                    <div class="col-md-6 text-center mt-4 mt-md-0">
                        <div class="card image-box mb-4">
                            <img src="../../assets/delivery.png" class="card-img" alt="Delivery Image">
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Office Lunch Section -->
        <section class="text-center py-5">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-6 text-center mt-4 mt-md-0">
                        <div class="card image-box mb-4">
                            <img src="../../assets/food.jpg" class="card-img" alt="Food Image">
                        </div>
                    </div>
                    <div class="col-md-6 text-start">
                        <h3 class="mb-3">Take your office out to lunch</h3>
                        <p class="mb-4">
                            Order lunch or fuel for work-from-home, late nights in the office, corporate events, client
                            meetings, and much more.
                        </p>
                        <button class="btn ">foodPro for business</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Mobile App Section -->
        <section class="text-center py-5 " id="mobile_section">
            <h3 class="mb-4 text-black">Put us in your pocket</h3>
            <p class="mb-4 text-black">
                Find the right food and groceries to suit your mood, and make the first bite last.
            </p>
            <button class="btn  mb-4">Download the App</button>
            <div class="row justify-content-center">

            </div>
        </section>

        <section class="py-5">
            <div class="container">
                <h3 class="text-center mb-5">Why foodPro?</h3>
                <div class="row text-start">
                    <div class="col-md-4 mb-4">
                        <h5 class="mb-2">Convenient</h5>
                        <p>You can order food online from popular restaurants in your area and enjoy delivery till late
                            into the night.</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <h5 class="mb-2">Easy and free to use</h5>
                        <p>24-hour grocery delivery from promart as well as online delivery from shops selling a range
                            of products.</p>
                    </div>
                    <div class="col-md-4 mb-4">
                        <h5 class="mb-2">All types of Cuisine</h5>
                        <p>From flavorful Asian delicacies to mouthwatering Mexican food, foodPro has got it all.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Frequently Asked Questions Section -->
        <section id="faq-section" class="py-5 ">
            <div class="container">
                <h3 class="text-center mb-4 text-black">Frequently Asked Questions</h3>
                <p class="mb-3 text-black">
                    The Pakistan has a wide variety and countless number of restaurants across the country.
                    From local Pakistani cuisine to delicious western dishes like steak and burgers, there is
                    something for everyone. Whether you're searching for the best restaurants in Lahore or
                    wondering where to eat in Karachi City, there is one destination where you can find it all: foodPro.
                </p>
                <p class="mb-3 text-black">
                    Here at foodPro, we deliver delicacies from local restaurants right to your home. The delivery
                    service
                    brings to you a perfect combination of the coziness of yo ur home and amazing food from nearby
                    restaurants.
                </p>
                <h5 class="mb-2 text-black">What is the difference between delivery and Pick-Up?</h5>
                <p class="mb-3 text-black">
                    If you choose delivery, a foodPro rider will collect your order from the restaurant and take it to
                    your chosen delivery address. If you choose Pick-Up, you can self-collect your food directly from
                    the restaurant for extra savings and jump to the front of the queue. Pick-Up orders are available
                    for restaurants only.
                </p>
                <h5 class="mb-2 text-black">All about convenience</h5>
            </div>
        </section>

        <!-- Footer Section -->
        <footer class="text-center py-5 text-white footer">
            <p>© 2022 foodPro</p>
            <p>
                For customer support, contact: <a href="mailto:support@foodPro.ph"
                    class="text-white">support@foodPro.pk</a>
            </p>
        </footer>
    </div>
</template>


<script setup>
import BeforeLoginHeader from '@/Components/HeaderFooter/BeforeLoginHeader.vue';
const cuisines = [
    { name: 'Pakistani', image: new URL('@/assets/MainLandingCusine/pk.png', import.meta.url).href },
    { name: 'Japanese', image: new URL('@/assets/MainLandingCusine/japan.png', import.meta.url).href },
    { name: 'Italian', image: new URL('@/assets/MainLandingCusine/italy.png', import.meta.url).href },
    { name: 'Mexican', image: new URL('@/assets/MainLandingCusine/mexican.png', import.meta.url).href },
    { name: 'Indian', image: new URL('@/assets/MainLandingCusine/indian.png', import.meta.url).href },
    { name: 'Chinese', image: new URL('@/assets/MainLandingCusine/chinese.png', import.meta.url).href },
    { name: 'Arabic', image: new URL('@/assets/MainLandingCusine/arabic.png', import.meta.url).href },
    { name: 'Turkish', image: new URL('@/assets/MainLandingCusine/turkish.png', import.meta.url).href }
];

</script>


<style scoped>
/* Global section styles */
#landing-page section {
    padding: 4rem 0;
}

/* Add this style for the green circle */
.col-md-6.text-center.position-relative {
    position: relative;
}

.col-md-6.text-center.position-relative::before {
    content: "";
    position: absolute;
    top: 45%;
    left: 55%;
    transform: translate(-50%, -50%);
    width: 610px;
    /* Adjust the width to make the circle larger than the image */
    height: 590px;
    /* Adjust the height to make the circle larger than the image */
    background: linear-gradient(135deg, #004E31, #00754A, #009B6F, #3BA87E, #66C39A);
    border-radius: 50%;
    /* Makes it a circle */
    z-index: -1;
    /* Places it behind the image */
}

/* Card styles */
.card {

    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    overflow: hidden;
    height: 300px;
    /* Fixed height for consistency */
    position: relative;
    /* Ensures the label stays at the bottom */
    display: flex;
    align-items: center;
    justify-content: center;
}

.card_text {
    font-weight: bold;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Image styles */
.card img {
    height: 300px;
    /* Adjust the height as needed for smaller images */
    width: auto;
    /* Keeps the original aspect ratio */
    object-fit: contain;
    /* Ensures the image doesn't stretch */
    margin: auto;
    /* Center the image inside the card */
}

/* Card label styles */
.card-label {
    background: #00754A;
    color: white;
    padding: 0.5rem;
    font-size: 1rem;
    text-align: center;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    font-weight: bolder;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .card {
        height: 280px;
    }

    .card img {
        height: 120px;
        /* Adjust the image size for smaller screens */
    }
}

.image-box {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: inline-block;
    /* Ensures the card size is as small as the image */
}

.image-box img {
    width: 100%;
    height: auto;
    /* Maintains the original aspect ratio of the image */
    object-fit: contain;
    /* Keeps the image fully visible within its container */
}

#mobile_section {
    background-color: #dadbdd;

}

#faq-section {
    background: #dadbdd
}

.btn {
    background: #00754A;
    color: #ffffff;
    font-weight: bold;
}

.btn:hover {
    background: #00754A;
    color: #000000;
    font-weight: bold;
}

/* Hero section */
#hero-section h1 {
    font-size: 2.8rem;
    font-weight: bold;
    color: black;
}

#hero-section input {
    padding: 1rem;
    font-size: 1.2rem;
}

/* General text and button styles */
h3 {
    color: black;
}

h5 {
    color: #000000;
}

p {
    color: #000000;
}

button {
    padding: 0.75rem 2rem;
    font-size: 1.2rem;
}

/* Footer styles */
footer {
    background-color: #000000;
    color: white;
}

footer p {
    color: antiquewhite;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    #hero-section h1 {
        font-size: 2.2rem;
    }


    #hero-section input {
        width: 80%;
    }

    .image-box {
        height: 180px;
    }
}
</style>

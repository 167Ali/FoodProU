<template>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    <!-- Header Section -->
    <BussinessNav />

    <!-- Signup Info Section -->
    <section class="signup-info py-5">
        <div class="container d-flex flex-column flex-lg-row justify-content-between align-items-center">
            <div class="signup-info-text mb-4 mb-lg-0">
                <h1>foodpro Signup</h1>
                <p>
                    Want access to corporate food delivery, dine-in, allowances and gift cards? You're in the right
                    place!
                </p>
                <ul class="list-unstyled">
                    <li class="mb-2">
                        <i class="fas fa-file-alt text-success"></i>
                        <span>Take 5 mins to fill out our form</span>
                    </li>
                    <li>
                        <i class="fas fa-clock text-success"></i>
                        <span>Get a response within 1-2 business days</span>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Main Form Section -->
    <div class="form-page py-5 bg-light">
        <div class="container d-flex align-items-center justify-content-center">
            <div class="form-card row no-gutters">
                <!-- Left Side Image (50% width) -->
                <div class="col-lg-6 form-image bg-white">
                    <img src="../../assets/form.gif" alt="Form Side Image" class="img-fluid" />
                </div>

                <!-- Right Side Form (50% width) -->
                <div class="col-lg-6 form-content">
                    <div class="form-container p-4">
                        <form @submit.prevent="submitForm">
                            <!-- Personal Information -->
                            <div v-if="currentPage === 1">
                                <h4>Personal Information</h4>
                                <div class="form-group mb-3">
                                    <label for="first_name">First Name</label>
                                    <input type="text" v-model="form.first_name" class="form-control" id="first_name"
                                        placeholder="Enter your first name" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="last_name">Last Name</label>
                                    <input type="text" v-model="form.last_name" class="form-control" id="last_name"
                                        placeholder="Enter your last name" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="email">Email</label>
                                    <input type="email" v-model="form.email" class="form-control" id="email"
                                        placeholder="Enter your email address" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="password">Password</label>
                                    <input type="password" v-model="form.password" class="form-control" id="password"
                                        placeholder="Create a password" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="password_confirmation">Confirm Password</label>
                                    <input type="password" v-model="form.password_confirmation" class="form-control"
                                        id="password_confirmation" placeholder="Confirm your password" required />
                                </div>
                            </div>

                            <!-- Business Information -->
                            <div v-if="currentPage === 2">
                                <h4>Business Information</h4>
                                <div class="form-group mb-3">
                                    <label for="restaurant_name">Restaurant Name</label>
                                    <input type="text" v-model="form.restaurant_name" class="form-control"
                                        id="restaurant_name" placeholder="Enter restaurant name" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="opening_time">Opening Time</label>
                                    <input type="time" v-model="form.opening_time" class="form-control"
                                        id="opening_time" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="closing_time">Closing Time</label>
                                    <input type="time" v-model="form.closing_time" class="form-control"
                                        id="closing_time" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="cuisine">Cuisine</label>
                                    <select v-model="form.cuisine" class="form-control" id="cuisine" required>
                                        <option disabled value="">Select Cuisine</option>
                                        <option v-for="cuisine in cuisines" :key="cuisine" :value="cuisine">
                                            {{ cuisine }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="logo_path">Logo</label>
                                    <input type="file" @change="handleFileUpload" class="form-control" id="logo_path" />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="business_type">Business Type</label>
                                    <select v-model="form.business_type" class="form-control" id="business_type"
                                        required>
                                        <option value="">Select business type</option>
                                        <option value="home">Home Based Kitchen</option>
                                        <option value="restaurant">Restaurant</option>

                                    </select>
                                </div>
                            </div>

                            <!-- Address Information -->
                            <div v-if="currentPage === 3">
                                <h4>Address Information</h4>
                                <div class="form-group mb-3">
                                    <label for="address">Address</label>
                                    <input type="text" v-model="form.address" class="form-control" id="address"
                                        placeholder="Enter address" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="postal_code">Postal Code</label>
                                    <input type="text" v-model="form.postal_code" class="form-control" id="postal_code"
                                        placeholder="Enter postal code" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="city">City</label>
                                    <input type="text" v-model="form.city" class="form-control" id="city"
                                        placeholder="Enter city" required />
                                </div>
                            </div>

                            <!-- Bank Information -->
                            <div v-if="currentPage === 4">
                                <h4>Bank Information</h4>
                                <div class="form-group mb-3">
                                    <label for="cnic">CNIC</label>
                                    <input type="text" v-model="form.cnic" class="form-control" id="cnic"
                                        placeholder="Enter CNIC" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="bank_name">Bank Name</label>
                                    <input type="text" v-model="form.bank_name" class="form-control" id="bank_name"
                                        placeholder="Enter bank name" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="iban">IBAN</label>
                                    <input type="text" v-model="form.iban" class="form-control" id="iban"
                                        placeholder="Enter IBAN" required />
                                </div>
                                <div class="form-group mb-3">
                                    <label for="account_owner_title">Account Owner Title</label>
                                    <input type="text" v-model="form.account_owner_title" class="form-control"
                                        id="account_owner_title" placeholder="Enter account owner title" required />
                                </div>
                            </div>

                            <!-- Navigation Buttons -->
                            <div class="form-navigation d-flex justify-content-between mt-4">
                                <button type="button" class="btn btn-secondary" @click="prevPage"
                                    v-if="currentPage > 1">Previous</button>
                                <button type="button" class="btn  next-btn" @click="nextPage"
                                    v-if="currentPage < totalPages">Next</button>
                                <button type="submit" class="btn btn-success"
                                    v-if="currentPage === totalPages">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Contact Section -->
    <section class="contact-section py-5 bg-white">
        <div class="container text-center contact">
            <h2 class="contact-heading">Contact us</h2>
            <div class="row icons">
                <div class="col-md-4 ">
                    <i class="fas fa-building fa-2x mb-2 "></i>
                    <h5>Become a foodpro for business client</h5>
                    <p>Contact <a href="mailto:corporate.sales@foodpro.pk">corporate.sales@foodpro.pk</a></p>
                </div>
                <div class="col-md-4">
                    <i class="fas fa-bowl-food fa-2x mb-2"></i>
                    <h5>Order-related queries</h5>
                    <p>Contact <a href="mailto:corporate@foodpro.pk">corporate@foodpro.pk</a></p>
                </div>
                <div class="col-md-4">
                    <i class="fas fa-clipboard-list fa-2x mb-2"></i>
                    <h5>List your restaurant</h5>
                    <p>Visit <a href="https://partner.foodpro.pk">partner.foodpro.pk</a></p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer Section -->
    <footer class="footer bg-black text-white py-4">
        <div class="container text-center">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <p>&copy; 2024 foodpro for business</p>
                    <div>
                        <a href="#" class="text-white me-3">About us</a>
                        <a href="#" class="text-white">Company Login</a>
                    </div>
                </div>
                <div class="footer-social">
                    <a href="#" class="text-white me-3"><i class="fab fa-facebook"></i></a>
                    <a href="#" class="text-white me-3"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="text-white me-3"><i class="fab fa-linkedin"></i></a>
                    <a href="#" class="text-white"><i class="fab fa-instagram"></i></a>
                </div>
                <div class="footer-apps">
                    <a href="#"><img
                            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                            alt="Google Play" class="app-badge" /></a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import BussinessNav from "@/Components/LoginSignup/BussinessNav.vue";
import { ref } from "vue";

// Current page and total pages
const currentPage = ref(1);
const totalPages = 4;

// Form data
const form = ref({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    restaurant_name: "",
    opening_time: "",
    closing_time: "",
    cuisine: "",
    logo_path: "",
    business_type: "",
    address: "",
    postal_code: "",
    city: "",
    cnic: "",
    bank_name: "",
    iban: "",
    account_owner_title: "",
});

const cuisines = ref([
    'Chinese Cuisine',
    'Indian Cuisine',
    'Italian Cuisine',
    'Middle Eastern Cuisine',
    'Turkish Cuisine',
    'Thai Cuisine',
    'Fast Food',
    'Mexican Cuisine',
    'American Cuisine',
    'Continental Cuisine'
]);
// Move to next page after validation
const nextPage = () => {
    if (validateForm(currentPage.value)) {
        currentPage.value++;
    }
};

// Move to previous page
const prevPage = () => {
    currentPage.value--;
};

// Validate form fields based on the current page
const validateForm = (page) => {
    switch (page) {
        case 1:
            return (
                form.value.first_name &&
                form.value.last_name &&
                form.value.email &&
                form.value.password &&
                form.value.password_confirmation
            );
        case 2:
            return (
                form.value.restaurant_name &&
                form.value.opening_time &&
                form.value.closing_time &&
                form.value.cuisine &&
                form.value.logo_path &&
                form.value.business_type
            );
        case 3:
            return (
                form.value.address &&
                form.value.postal_code &&
                form.value.city
            );
        case 4:
            return (
                form.value.cnic &&
                form.value.bank_name &&
                form.value.iban &&
                form.value.account_owner_title
            );
        default:
            return false;
    }
};

// Submit the form data
const submitForm = () => {
    console.log("Form Submitted", form.value);
};

// Handle file upload for logo_path
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    form.value.logo_path = file;
};

</script>

<style scoped>
/* Header */
.header {
    background-color: #f5f5f5;
    padding: 1rem 2rem;
}

.business-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #00754a;
}

/* Signup Info Section */
.signup-info {
    background-color: #ffffff;
    /* White background for contrast */
    padding: 6rem;
    /* Moderate padding */
    margin: 0rem auto;
    /* Center the section */
    max-width: 1200px;
    /* Maximum width for larger screens */
    text-align: center;
    /* Center-align text */
}

.signup-info-text {
    flex: 1;
    max-width: 1000px;
    /* Limit the text width for better readability */
}

.signup-info-text h1 {
    font-size: 2.2rem;
    /* Larger font size for the heading */
    font-weight: 700;
    /* Bold for emphasis */
    color: #00754a;
    /* Brand color */
    margin-bottom: 1rem;
    /* Margin for separation */
}

.signup-info-text p {
    font-size: 1.2rem;
    /* Slightly larger text for readability */
    color: #555;
    /* Softer color for contrast */
    line-height: 1.6;
    /* Improved line height for readability */
    margin-bottom: 1.5rem;
    /* Increased margin */
}

.signup-info-text ul {
    list-style: none;
    /* Remove default list styling */
    padding: 0;
    margin: 0;
    /* Remove default margin */
}

.signup-info-text ul li {
    font-size: 1.1rem;
    /* Consistent font size */
    color: #666;
    /* Softer color */
    margin-bottom: 1rem;
    /* Spacing between list items */
    display: flex;
    /* Align icon and text */
    justify-content: center;
    /* Center-align items horizontally */
    align-items: center;
    /* Center items vertically */
}

.signup-info-text ul li i {
    color: #00754a;
    /* Brand color for icons */
    margin-right: 0.5rem;
    /* Space between icon and text */
    font-size: 1.2rem;
    /* Slightly larger icons */
}

.signup-info-image {
    flex: 0 0 200px;
    /* Fixed width for the image */
    display: flex;
    /* Center the image */
    justify-content: center;
    align-items: center;
}

/* Main Form Page */
.form-page {
    background-color: #f8f9fa;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

}

/* Form Card */
.form-card {
    display: flex;
    background-color: #ffffff;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 100%;
    max-width: 900px;

}

/* Left Side Image */
.form-image {
    flex: 1;
    /* Ensure it takes equal space */
    display: flex;
    /* Use flexbox for alignment */
    align-items: center;
    /* Center the image vertically */
    justify-content: center;
    /* Center the image horizontally */
    overflow: hidden;
    /* Hide overflow */

}

.form-image img {
    width: 100%;
    /* Make the image take full width */
    height: auto;
    /* Maintain aspect ratio */
    min-height: 100%;
    /* Ensure it covers the full height */
    object-fit: cover;
    /* Cover the space without distortion */
}

/* Form Content */
.form-content {
    padding: 2rem;
}

.form-container {
    padding: 1rem;
}

.form-group label {
    font-weight: bold;
    color: #495057;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 0.6rem;
    font-size: 1rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
}

.form-navigation .btn {
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border-radius: 0.25rem;
}

.next-btn {
    background-color: #00754a;
    color: white;
}

.next-btn:hover {
    background-color: #005c3c;
}

.btn-success {
    background-color: #00754a;
    color: white;
    width: 50%;
    font-size: 1.1rem;
}

.btn-success:hover {
    background-color: #005c3c;
}

.contact {
    background-color: white;
}

/* Footer */
.footer {
    background-color: #333;
    padding: 2rem;
}

.footer-contact {
    margin-bottom: 2rem;
}

.footer-logo {
    display: flex;
    align-items: center;
}

.footer-logo img {
    width: 50px;
    margin-right: 1rem;
}

.footer-links a {
    color: white;
    text-decoration: none;
}

.footer-social a {
    font-size: 1.5rem;
}

.app-store {
    width: 120px;
}

.icons i {
    color: #00754A
}

@media (max-width: 768px) {
    .signup-info {
        flex-direction: column;
    }

    .signup-info-image {
        display: flex;
        justify-content: center;
    }

    .footer-contact {
        flex-direction: column;
    }
}
</style>
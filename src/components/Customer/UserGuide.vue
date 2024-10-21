<template>
    <div class="help-center-container" :class="{ 'open': isOpen }">
        <div class="help-center-header" @click="toggleHelpCenter">
            <span>User Guide</span>
            <i class="fas" :class="isOpen ? 'fa-chevron-down' : 'fa-chevron-up'"></i>
        </div>

        <div v-if="isOpen" class="help-center-body">
            <h4 v-if="currentQuestion === null">How can we assist you?</h4>
            <ul v-if="currentQuestion === null" class="help-list">
                <li v-for="(item, index) in mainQuestions" :key="index" @click="openQuestion(item)"
                    :class="['help-list-item', { active: currentQuestion === item }]">
                    <i :class="item.iconClass" :style="{ color: item.iconColor }"></i>
                    <span>{{ item.question }}</span>
                    <i class="fas fa-chevron-right"></i>
                </li>
            </ul>

            <div v-if="currentQuestion !== null" class="question-detail">
                <button @click="goBack" class="back-btn"> <i class="fa-solid fa-less-than"></i> Back</button><hr>
                <h3>{{ currentQuestion.question }}</h3>
                <ul class="help-list">
                    <li v-for="(subItem, subIndex) in currentQuestion.subQuestions" :key="subIndex"
                        @click="handleSubQuestion(subItem)"
                        :class="['help-list-item', { active: currentAnswer === subItem.answer }]">
                        <i :class="subItem.iconClass" :style="{ color: subItem.iconColor }"></i>
                        <span>{{ subItem.question }}</span>
                        <i class="fas fa-chevron-right"></i>
                    </li>
                </ul>

                <transition name="fade">
                    <div v-if="currentAnswer" class="answer">
                        <hr>
                        <p>{{ currentAnswer }}</p>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(true);

// Main questions with icon colors
const mainQuestions = ref([
    {
        question: 'Logging in / Signing in Issues',
        iconClass: 'fas fa-user-circle',
        iconColor: '#2196F3', // Blue color
        subQuestions: [
            { question: 'Trouble with Google Login?', answer: 'Use a valid Google account and ensure correct credentials.', iconClass: 'fab fa-google', iconColor: '#DB4437' },
            { question: 'Trouble with Form Login?', answer: 'Ensure correct email and password, and reset if needed.', iconClass: 'fas fa-key', iconColor: '#FF9800' }
        ]
    },
    {
        question: 'Facing issues placing orders?',
        iconClass: 'fas fa-shopping-cart',
        iconColor: '#4CAF50', // Green color
        subQuestions: [
            { question: 'Payment issues?', answer: 'Currently, we only offer cash on delivery.', iconClass: 'fas fa-money-bill-wave', iconColor: '#8BC34A' },
            { question: 'Voucher issues?', answer: 'Apply the voucher code in the provided field.', iconClass: 'fas fa-gift', iconColor: '#FFEB3B' },
            { question: 'Web issues?', answer: 'Ensure stable internet connection.', iconClass: 'fas fa-wifi', iconColor: '#FF5722' }
        ]
    },
    {
        question: 'Food Pro',
        iconClass: 'fas fa-info-circle',
        iconColor: '#9C27B0', // Purple color
        subQuestions: [
            { question: 'What is Food Pro?', answer: 'A service connecting users with restaurants.', iconClass: 'fas fa-utensils', iconColor: '#673AB7' },
            { question: 'How does it work?', answer: 'Choose food and place orders via the platform.', iconClass: 'fas fa-concierge-bell', iconColor: '#3F51B5' },
            { question: 'Other details', answer: 'Contact support for more info.', iconClass: 'fas fa-question-circle', iconColor: '#FF9800' }
        ]
    },
    {
        question: 'Register as a business?',
        iconClass: 'fas fa-briefcase',
        iconColor: '#FF5722', // Red-Orange color
        subQuestions: [
            { question: 'How to register?', answer: 'Register through the business form on our website.', iconClass: 'fas fa-pencil-alt', iconColor: '#FF9800' },
            { question: 'How to get approved?', answer: 'Our team will review and approve qualifying businesses.', iconClass: 'fas fa-check-circle', iconColor: '#4CAF50' },
            { question: 'Business benefits', answer: 'Registered businesses can manage their availability easily.', iconClass: 'fas fa-calendar-alt', iconColor: '#2196F3' }
        ]
    },
    {
        question: 'My Account Settings',
        iconClass: 'fas fa-cog',
        iconColor: '#FF9800', // Orange color
        subQuestions: [
            { question: 'Update Profile?', answer: 'Go to "My Profile" and update your info.', iconClass: 'fas fa-user-edit', iconColor: '#8BC34A' },
            { question: 'Forgot Password?', answer: 'Reset password via OTP sent to your email.', iconClass: 'fas fa-lock', iconColor: '#FF5722' }
        ]
    },
    {
        question: 'FAQs',
        iconClass: 'fas fa-question-circle',
        iconColor: '#3F51B5', // Blue color
        subQuestions: [
            { question: 'Order Delivery?', answer: 'Delivery within the estimated time at checkout.', iconClass: 'fas fa-clock', iconColor: '#FF9800' },
            { question: 'Pricing?', answer: 'Our prices reflect the quality of service.', iconClass: 'fas fa-tag', iconColor: '#4CAF50' },
            { question: 'Other important FAQs?', answer: 'Browse FAQ or contact support.', iconClass: 'fas fa-info-circle', iconColor: '#9C27B0' }
        ]
    }
]);

const currentQuestion = ref(null);
const currentAnswer = ref(null);

const openQuestion = (item) => {
    currentQuestion.value = item;
    currentAnswer.value = null;
};

const handleSubQuestion = (subItem) => {
    currentAnswer.value = subItem.answer;
};

const goBack = () => {
    currentQuestion.value = null;
    currentAnswer.value = null;
};

const toggleHelpCenter = () => {
    isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.help-center-container {
  position: fixed;
  bottom: 20px;
  right: 20px;  
  width: 100%;
  max-width: 350px;
  background-color: #fff;
  border-top: 1px solid #ccc;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  font-family: Arial, sans-serif;
  z-index: 1000; /* Ensure it is on top of other elements */
}

.help-center-header {
  display: flex;
  justify-content: space-between;
  background-color: #00754A;
  color: #fff;
  padding: 10px; /* Smaller padding */
  font-size: 14px; /* Smaller font size */
  cursor: pointer;
}

.help-center-body {
  padding: 15px; /* Reduced padding */
  max-height: calc(100vh - 100px); /* Adjust height to avoid overflow */
  overflow-y: auto; /* Allow scrolling if content exceeds height */
}

.help-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Help list item styles */
.help-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px; /* Reduced padding */
  margin-bottom: 8px;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 13px; /* Smaller font size */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease; /* Add transform transition */
}

/* Hover effect */
.help-list-item:hover {
  background-color: #e0f7fa; /* Light cyan background for hover */
  transform: scale(1.02); /* Slightly scale up on hover */
}

/* Active question styling */
.help-list-item.active {
  background-color: #e0f7fa; /* Light cyan background for active */
  font-weight: bold;
  border-left: 4px solid #00796b; /* Green border for active */
}

.arrow {
  color: #e91e63;
  margin-left: 10px;
}

.question-detail {
  margin-top: 10px;
}

.answer {
  margin-top: 10px;
}

.back-btn {
  margin-bottom: 10px;
  border: none;
  background-color: #f44336; /* Red color for back button */
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
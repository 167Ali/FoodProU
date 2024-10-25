<template>
    <div>
      <button @click="showModal = true" class="btn btn-more-info">More Info</button>
  
      <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" style="display: block;" v-if="showModal">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cheese Square</h5>
              <button type="button" class="btn-close-modal" @click="closeModal">
                <span>&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="d-flex align-items-center justify-content-between">
                <p class="mb-0"><strong>Now Open till 23:59</strong></p>
                <button @click="toggleDropdown" class="btn btn-link p-0 dropdown-btn">
                  <span v-if="!showDropdown">View more</span>
                  <span v-if="showDropdown">View less</span>
                </button>
              </div>
  
              <!-- Dropdown content for hours -->
              <transition name="slide-fade">
                <div v-if="showDropdown" class="mb-3">
                  <p>Monday – Sunday</p>
                  <p class="dropdown-times">00:00 – 03:00</p>
                  <p class="dropdown-times">11:00 – 23:59</p>
                </div>
              </transition>
  
              <p><strong>M Tower, G3 Johar, Block G3 Block G3 Phase 2 Town, Lahore, Punjab 54000</strong></p>
              <p><strong>Delivery Fee:</strong> Delivery fee is charged based on time of day, distance, and surge conditions.</p>
              <p><strong>Minimum Order:</strong> For orders below Rs. 249.00, we charge a small order fee.</p>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Backdrop (Optional) -->
      <div v-if="showModal" class="modal-backdrop fade show"></div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showModal = ref(false);
  const showDropdown = ref(false);
  
  const closeModal = () => {
    showModal.value = false;
  };
  
  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .modal-dialog {
    max-width: 500px;
  }
  
  .btn-close-modal {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 30px;
    height: 30px;
    background-color: #ddd;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    cursor: pointer;
  }
  
  .btn-close-modal:hover {
    background-color: #ccc;
  }
  
  .modal-header {
    position: relative;
  }
  
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  /* Styling for 'View more'/'View less' button */
  .dropdown-btn {
    color: gray;
    transition: color 0.3s ease;
    text-decoration: none; /* Remove underline */
  }
  
  .dropdown-btn:hover {
    color: black;
  }
  
  /* Transition for the dropdown content */
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  
  /* Styling for dropdown times */
  .dropdown-times {
    font-weight: bold;
    color: gray;
  }
  
  /* More Info button styling */
  .btn-more-info {
    border-radius: 15px;
    border: none;
    color: rgb(38, 36, 36);
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: -20px;
  }
  
  .btn-more-info:hover,
  .btn-more-info:active {
    background-color: lightgray; /* Light gray on hover or active */
    color: black; /* Change text color on hover */
  }
  </style>
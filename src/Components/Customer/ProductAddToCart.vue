<template>
  <div>
    <!-- Add to Cart Button -->
    <button class="btn btn-primary add-to-cart-btn" @click="showModal = true">+</button>

    <!-- Modal -->
    <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" style="display: block;" v-if="showModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- Modal Header with Fixed Full-Width Image -->
          <div class="modal-header">
            <img :src="productImage" alt="Product Image" class="product-image">
          </div>

          <!-- Scrollable Modal Body -->
          <div class="modal-body scrollable-body" ref="modalBody">
            <div class="text-left">
              <strong>
                <h4 class="font-weight-bold">{{ productName }}</h4>
              </strong>
              <h6 class="current-price">Rs. {{ discountedPrice.toFixed(2) }} <span class="original-price">Rs. {{ originalPrice }}</span></h6>
              <p>{{ productDescription }}</p>
            </div>

            <!-- Dynamically Render "Choose Your Sub" Sections -->
            <div v-for="(section, sectionIndex) in sections" :key="sectionIndex" class="choose-sub-card mt-3">
              <div
                class="card p-3"
                :style="{
                  backgroundColor: section.required ? '#f8d7da' : '#f0f0f0'
                }"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="font-weight-bold">{{ section.title }}</h5>
                  <span v-if="section.required" class="badge required-badge">Required</span>
                </div>
                <p class="mb-1">Select {{ section.selectLimit }}</p>
                <div class="scrollable-options">
                  <div class="form-check mb-2" v-for="(option, optionIndex) in section.options" :key="optionIndex">
                    <input
                      class="form-check-input"
                      :class="section.required ? 'square-checkbox' : 'circle-checkbox'"
                      type="radio"
                      :id="'section-' + sectionIndex + '-option-' + optionIndex"
                      :value="option"
                      v-model="section.selectedOption"
                      @change="scrollToNext(sectionIndex)"
                    />
                    <label class="form-check-label" :for="'section-' + sectionIndex + '-option-' + optionIndex">
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

            <strong>Specfic instructions</strong>
            <p>Special requests are subject to the restaurant's approval. Tell us here!</p>

            <!-- Text Field -->
            <div class="mt-3">
              <textarea id="notes" class="form-control" v-model="cartNotes" rows="2" placeholder="Any special instructions?"></textarea>
            </div>
          </div>

          <!-- Add to Cart Section -->
          <div class="modal-footer justify-content-between">
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
const productImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9Qq1rV_svdydH5u3O8r5ZmT8udMBnSuKeA&s';
const productName = 'Summer Deal 1';
const discountedPrice = 475.16;
const originalPrice = 774;
const productDescription = 'Chicken Sub & 345ml Drink';
const cartNotes = ref('');
const sections = ref([
  {
    title: 'Choose Your Sub',
    selectLimit: 1,
    required: true,
    selectedOption: null,
    options: [
      { name: 'Tikka', price: 'Free', popular: true },
      { name: 'BBQ', price: 'Free', popular: false },
      { name: 'Roasted Chicken Breast', price: 'Free', popular: false },
      { name: 'Chicken Chapli', price: 'Free', popular: false },
    ],
  },
  {
    title: 'Choose Your Drink',
    selectLimit: 1,
    required: true,
    selectedOption: null,
    options: [
      { name: 'Coca Cola', price: 'Free', popular: true },
      { name: 'Pepsi', price: 'Free', popular: false },
      { name: 'Sprite', price: 'Free', popular: false },
    ],
  },
  {
    title: 'Choose Your Extras',
    selectLimit: 1,
    required: false,
    selectedOption: null,
    options: [
      { name: 'Extra Cheese', price: 'Rs. 50', popular: false },
      { name: 'Extra Mayo', price: 'Rs. 30', popular: false },
    ],
  },
]);

const closeModal = () => {
  showModal.value = false;
};

const addToCart = () => {
  sections.value.forEach((section) => {
    if (section.selectedOption) {
      console.log(`Added ${section.title}: ${section.selectedOption.name}`);
    }
  });
  if (cartNotes.value) {
    console.log(`Notes: ${cartNotes.value}`);
  }
  closeModal();
};

// Scroll to the next section after an option is selected
const scrollToNext = (currentSectionIndex) => {
  const nextSectionIndex = currentSectionIndex + 1;
  const nextSection = document.querySelector(`.choose-sub-card:nth-of-type(${nextSectionIndex + 1})`);
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<style scoped>
.add-to-cart-btn {
  background-color: #00754A;
  color: #fff;
  font-size: 1.5rem;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
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
  max-height: 70vh;
  margin: auto;
  border-radius: 20px; /* Added border-radius */
}

.modal-content {
  border-radius: 20px; /* Added border-radius */
  max-height: 100%;
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1000;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.modal-body {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
}

.current-price {
  font-size: 1.5em;
  color: #d9534f;
}

.original-price {
  text-decoration: line-through;
  color: gray;
  margin-left: 10px;
}

.choose-sub-card {
  margin-bottom: 20px;
}

.scrollable-options {
  display: flex;
  flex-direction: column;
}

.form-check-input.square-checkbox {
  border-radius: 0; /* Square checkbox for required options */
}

.form-check-input.circle-checkbox {
  border-radius: 50%; /* Circular checkbox for non-required options */
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.btn-green {
  background-color: #00754A;
  color: white;
  border: none;
  width: 100%;
  transition: background-color 0.3s ease;
}

.btn-green:hover {
  background-color: #005f3d;
}

.required-badge {
  background-color: #00754A;
  color: white;
  padding: 5px 10px;
  font-size: 0.9em;
}

.scrollable-body {
  overflow-y: auto;
  max-height: 50vh;
}
</style>

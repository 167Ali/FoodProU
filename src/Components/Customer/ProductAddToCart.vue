<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" :class="{ show: showModal }" tabindex="-1" role="dialog" v-if="showModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <!-- Modal Header with Fixed Full-Width Image -->
          <div class="modal-header">
            <img :src="choices.image_url" alt="Product Image" class="product-image" />
          </div>

          <!-- Scrollable Modal Body -->
          <div class="modal-body scrollable-body" ref="modalBody">
            <div class="text-left">
              <strong>
                <h4 class="font-weight-bold">{{ productName }}</h4>
              </strong>
              <h6 class="current-price">Rs. {{ discountedPrice.toFixed(2) }} </h6>
              <p>{{ productDescription }}</p>
            </div>

            <!-- Dynamically Render "Choose Your Sub" Sections -->
            <div v-for="(section, sectionIndex) in sections" :key="sectionIndex" class="choose-sub-card mt-3">
              <div class="card p-3" :style="{
                backgroundColor: section.required ? '#f8d7da' : '#f0f0f0'
              }">
                <div class="d-flex justify-content-between align-items-center">
                  <h5 class="font-weight-bold">{{ section.title }}</h5>
                  <span v-if="section.required" class="badge required-badge">Required</span>
                </div>
                <p class="mb-1">Select {{ section.selectLimit }}</p>
                <div class="scrollable-options">
                  <div class="form-check mb-2" v-for="(option, optionIndex) in section.options" :key="optionIndex">
                    <input class="form-check-input" :class="section.required ? 'square-checkbox' : 'circle-checkbox'"
                      type="radio" :id="'section-' + sectionIndex + '-option-' + optionIndex" :value="option"
                      v-model="section.selectedOption" @change="scrollToNext(sectionIndex)" />
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

            <strong>Specific instructions</strong>
            <p>Special requests are subject to the restaurant's approval. Tell us here!</p>

            <!-- Text Field -->
            <div class="mt-3">
              <textarea id="notes" class="form-control" v-model="cartNotes" rows="2"
                placeholder="Any special instructions?"></textarea>
            </div>
          </div>

          <!-- Add to Cart Section -->
          <div class="modal-footer justify-content-between">
            <button class="btn btn-green w-100" @click="addToCart">Add to cart</button>
            <button class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
const props = defineProps({
  choices: {
    type: Array,
    default: () => [],
  },
});
const store = useStore();

const productName = props.choices.menu_item_name;
const discountedPrice = props.choices.price;
const productDescription = props.choices.description;
const cartNotes = ref('');


console.log("I have founded the data here", props.choices);
const sections = ref([
  {
    title: props.choices.choice_groups[0].choice_group_name,
    selectLimit: 1,
    required: true,
    selectedOption: null,
    options: props.choices.choice_groups[0].choices,
    Id: props.choices.choice_groups[0].choice_group_id
  }
]);


const closeModal = () => {
  showModal.value = false;
};

const showModal = ref(true);

const addToCart = async () => {
  const variations = sections.value.map(section => ({
    choice_group_id: section.Id, // Adjust this if necessary
    choice_id: section.selectedOption ? section.selectedOption.id : null,
  }));

  const item = {
    menu_item_id: props.choices.menu_item_id, // Ensure this exists
    quantity: 1,
    variations: variations.filter(v => v.choice_id !== null),
  };
  const itemJson = JSON.stringify(item);

  try {
    const response = await store.dispatch('addToCartStore/addToCart', itemJson); // Dispatch the action from the store
    console.log('Item added to cart:', response);
    closeModal();
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    // Optionally handle the error (e.g., show a notification)
  }
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
  top: 10;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-dialog {
  max-width: 600px;
  margin: auto;
  /* Center the modal */
}

.modal-content {
  border-radius: 20px;
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
  border-radius: 0;
  /* Square checkbox for required options */
}

.form-check-input.circle-checkbox {
  border-radius: 50%;
  /* Circular checkbox for non-required options */
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
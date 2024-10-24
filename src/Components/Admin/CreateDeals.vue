<template>
  <!-- Trigger Button -->
  <button
    type="button"
    class="btn btn-success"
    @click="openModal"
    style="background-color: #00754A; border-color: #00754A;"
  >
    Create Menu Deal
  </button>

  <!-- Modal Structure -->
  <div
    class="modal fade"
    id="createMenuDealModal"
    tabindex="-1"
    aria-labelledby="createMenuDealModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered custom-modal">
      <div class="modal-content">
        <!-- Modal Header -->
        <div
          class="modal-header"
          style="background-color: #00754A; color: white;"
        >
          <h5 class="modal-title" id="createMenuDealModalLabel">
            Create Menu Deal
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <form @submit.prevent="submitDeal">
            <!-- Deal Details -->
            <div class="mb-3">
              <label for="dealName" class="form-label">Deal Name</label>
              <input
                type="text"
                class="form-control"
                id="dealName"
                v-model="dealName"
                required
              />
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea
                class="form-control"
                id="description"
                v-model="description"
                rows="3"
                required
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="discount" class="form-label">Discount %</label>
              <select
                class="form-select"
                id="discount"
                v-model="discount"
                required
              >
                <option disabled value="">Select discount</option>
                <option
                  v-for="option in discountOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>

            <!-- Product Selection -->
            <div class="mb-3">
              <label class="form-label">Select Products</label>
              <div
                class="product-list p-2 border rounded"
                style="max-height: 300px; overflow-y: auto;"
              >
                <div
                  v-for="product in products"
                  :key="product.id"
                  class="form-check mb-3"
                >
                  <div class="d-flex align-items-center">
                    <input
                      class="form-check-input me-2"
                      type="checkbox"
                      :id="`product-${product.id}`"
                      v-model="selectedProducts"
                      :value="product.id"
                    />
                    <label
                      class="form-check-label flex-grow-1"
                      :for="`product-${product.id}`"
                    >
                      {{ product.name }}
                    </label>
                  </div>

                  <!-- Variations Section -->
                  <div
                    v-if="selectedProducts.includes(product.id)"
                    class="ms-4 mt-2"
                  >
                    <div
                      v-for="(options, category) in productVariations[product.id]"
                      :key="category"
                      class="mb-2"
                    >
                      <label :for="`variation-${product.id}-${category}`" class="form-label">
                        {{ capitalize(category) }}
                      </label>
                      <select
                        class="form-select"
                        :id="`variation-${product.id}-${category}`"
                        v-model="productSelectedVariations[product.id][category]"
                        required
                      >
                        <option disabled value="">Select {{ category }}</option>
                        <option
                          v-for="option in options"
                          :key="option"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>
                    </div>

                    <!-- Limit Selection -->
                    <div class="d-flex align-items-center mt-2">
                      <label class="form-label me-2" for="limit">Limit:</label>
                      <input
                        type="number"
                        class="form-control w-25"
                        min="1"
                        max="5"
                        v-model.number="productLimits[product.id]"
                        title="Select limit (1-5)"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="text-end">
              <button
                type="submit"
                class="btn"
                style="background-color: #00754A; color: white;"
              >
                Create Deal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { Modal } from 'bootstrap';

// Reactive state variables
const dealName = ref('');
const description = ref('');
const discount = ref('');
const discountOptions = ['5%', '10%', '20%', '25%'];

// Define product variations
const productVariations = {
  1: { size: ['Small', 'Medium', 'Large'], crust: ['Thin', 'Thick', 'Stuffed'], toppings: ['Cheese', 'Pepperoni', 'Veggie'] },
  2: { patty: ['Beef', 'Chicken', 'Veggie'], cheese: ['Yes', 'No'], extras: ['Lettuce', 'Tomato'] },
  3: { size: ['Small', 'Medium'], type: ['Soda', 'Juice'] },
};

// Product array
const products = [
  { id: 1, name: 'Pizza' },
  { id: 2, name: 'Burger' },
  { id: 3, name: 'Drinks' }
];

const selectedProducts = ref([]);
const productLimits = reactive({});
const productSelectedVariations = reactive({});

const initializeProductData = () => {
  products.forEach((product) => {
    productLimits[product.id] = 1;
    if (productVariations[product.id]) {
      productSelectedVariations[product.id] = {};
      Object.keys(productVariations[product.id]).forEach((category) => {
        productSelectedVariations[product.id][category] = '';
      });
    }
  });
};

watch(selectedProducts, (newVal, oldVal) => {
  newVal.forEach((id) => {
    if (productVariations[id] && !productSelectedVariations[id]) {
      productSelectedVariations[id] = {};
      Object.keys(productVariations[id]).forEach((category) => {
        productSelectedVariations[id][category] = '';
      });
    }
  });

  oldVal.forEach((id) => {
    if (!newVal.includes(id) && productSelectedVariations[id]) {
      delete productSelectedVariations[id];
    }
  });
}, { deep: true });

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Modal handling
let modalInstance = null;
const openModal = () => {
  const modalElement = document.getElementById('createMenuDealModal');
  modalInstance = new Modal(modalElement, { backdrop: 'static', keyboard: false });
  modalInstance.show();
};

const closeModal = () => {
  if (modalInstance) modalInstance.hide();
};

const submitDeal = () => {
  const selected = selectedProducts.value.map((id) => ({
    id,
    name: products.find((p) => p.id === id)?.name,
    limit: productLimits[id],
    variations: productSelectedVariations[id] || {}
  }));

  const deal = {
    dealName: dealName.value,
    description: description.value,
    discount: discount.value,
    products: selected,
  };

  console.log('Deal Created:', deal);
  dealName.value = '';
  description.value = '';
  discount.value = '';
  selectedProducts.value = [];
  initializeProductData();
  closeModal();
};

onMounted(() => initializeProductData());
</script>

<style scoped>
.product-list {
  background-color: #f8f9fa;
}

.custom-modal {
  max-width: 500px;
}

.ms-4 .form-label {
  font-weight: 500;
}
</style>
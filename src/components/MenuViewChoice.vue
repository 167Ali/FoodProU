<template>
    <div class="container mt-4">
        <!-- Button to trigger modal for creating a choice -->
        <button class="btn btn-primary mb-4" @click="openModal()">Create Choice</button>

        <!-- Cards displaying choice names -->
        <div class="row">
            <div v-for="(choice, index) in choices" :key="index" class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{{ choice.choiceName }}</h5>
                        <p class="card-text">Min: {{ choice.min }}</p>
                        <ul>
                            <li v-for="(item, idx) in choice.items" :key="idx">{{ item.name }} - ${{ item.price }}</li>
                        </ul>
                        <button class="btn btn-secondary me-2" @click="viewChoice(index)">View/Edit</button>
                        <button class="btn btn-danger" @click="deleteChoice(index)">Delete</button>
                    </div>
                </div>
            </div>
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
import MenuCreateChoice from './MenuCreateChoice.vue'; // Import the form component

// Mock data for choices
const choices = ref([
    {
        choiceName: 'Pizza Toppings',
        min: '1',
        items: [{ name: 'Cheese', price: 2 }, { name: 'Pepperoni', price: 3 }],
    },
    {
        choiceName: 'Drink Sizes',
        min: '0',
        items: [{ name: 'Small', price: 1 }, { name: 'Medium', price: 1.5 }, { name: 'Large', price: 2 }],
    },
    {
        choiceName: 'Burger Add-ons',
        min: '1',
        items: [{ name: 'Bacon', price: 1.5 }, { name: 'Extra Cheese', price: 1 }],
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

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    max-width: 100%;
}
</style>

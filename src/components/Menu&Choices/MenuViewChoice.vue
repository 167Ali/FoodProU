<template>
    <div class="container mt-4">
        <!-- Button to trigger modal for creating a choice -->
        <button class="btn btn-primary mb-4" @click="openModal()">Create Choice</button>

        <!-- Cards displaying choice names -->
        <div class="row">
            <div v-for="(choice, index) in choices" :key="index" class="col-md-4 mb-4">
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

.card {
    max-width: 700px;
    border-radius: 8px;
    border: none;
}

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
</style>

<template>

    <div class="container">
        <div class="card p-4 scroller">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="fw-bold">Choices</h4>
                <button class="btn btn-primary" @click="openModal()" title="Add Choice">Add</button>
            </div>

            <div v-for="(choice, index) in processedChoices" :key="index" class="col-md-12 mb-4">
                <div class="card p-2 shadow-lg">
                    <div class="row solo-card">
                        <div class=" col-10">
                            <div class="card-body">
                                <h5 class="card-title">{{ choice.name }}</h5>
                                <div class="d-flex justify-content-between align-items-center mb-1">
                                    <p class="card-text py-1 my-1 mb-0 mr-2">
                                        <strong>Selection:</strong>
                                        {{ choice.is_required == 1 ? ' Required' : ' Optional' }}
                                    </p>
                                    <p class="card-text py-0 my-0 text-capital mb-0">
                                        <strong>Type:</strong> {{ choice.choice_type }}
                                    </p>
                                </div>
                                <!-- <ol class="scroller-card">
                            <li v-for="(item, idx) in choice.choiceitems" :key="idx">{{ item.name
                                }} - ${{ item.price }}
                            </li>
                        </ol> -->

                                <div class="table-responsive scroller-card">
                                    <table class="table table-striped">
                                        <!-- <thead>
                                            <tr>
                                                <th class="fs-6">Name</th> 
                                                <th class="fs-6">Price</th> 
                                            </tr>
                                        </thead> -->
                                        <tbody>
                                            <tr v-for="(item, idx) in choice.choices" :key="idx">
                                                <td class="small">{{ item.name }}</td>
                                                <!-- Smaller text for data -->
                                                <td class="small">{{ item.price }} pkr</td>
                                                <!-- Smaller text for data -->
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 d-flex flex-column justify-content-center">
                            <button class="btn btn-outline mb-3" @click="viewChoice(index)">
                                <i class="fa-regular fa-pen-to-square fa-xl" style="color: #343f50;"></i>
                            </button>
                            <button class="btn btn-outline" @click="deleteChoice(choice.id)">
                                <i class="fa-regular fa-trash-can fa-xl" style="color: #444e5f;"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Invoice Items -->
            <!-- <div v-for="(item, index) in items1" :key="index"
                class="d-flex justify-content-between align-items-center mt-3">
                <div class="d-flex align-items-center">
                    <img :src="item.image" alt="item.name" class="rounded img-fluid me-3"
                        style="width: 60px; height: 60px;" />
                    <div>
                        <h5 class="mb-0">{{ item.name }}</h5>
                        <small>{{ item.quantity }}x</small>
                        <p class="mb-0"><small>{{ item.note }}</small></p>
                    </div>
                </div>
                <h6 class="fw-bold">$55</h6>
            </div> -->



            <!-- Payment Options -->

            <!-- Place Order Button -->
        </div>
    </div>




    <div class="container mt-4">
        <!-- Button to trigger modal for creating a choice -->

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
import { ref, onMounted, computed } from 'vue';
import MenuCreateChoice from '../Menu&Choices/MenuCreateChoice.vue'; // Import the form component
import { useStore } from 'vuex';

const store = useStore();
const choices = computed(() => store.getters['menuChoice/allChoices']);
const processedChoices = computed(() => {
    return choices.value.map(item => {
        if (item.addons && item.addons.length > 0) {
            return {
                ...item,
                choices: item.addons,
                type: 'addon',
            };
        }
        else if (item.choices && item.choices.length > 0) {
            return {
                ...item,
                choices: item.choices,
                type: 'choice',
            };
        }
    });
});


onMounted(async () => {
    try {
        await store.dispatch('menuChoice/fetchChoices');
    } catch (error) {
        console.error('Error fetching Choices:', error);
    }
});


// formData.append('choice_group_name', choiceData.choicename);
// formData.append('is_required', choiceData.ischoice);
// formData.append('choice_type', choiceData.choicetype);
// formData.append('choice_items', JSON.stringify(
//     choiceData.choice_items.map(item => ({
//         name: item.name,
//         additional_price: item.additional_price
//     }))
// ));
// Mock data for choices
// const choices = ref([
//     {
//         choicename: 'Pizza Toppings',
//         ischoice: '1',
//         choicetype: 'size',
//         choice_items: [{ name: 'Cheese', additional_price: 2 }, { name: 'Pepperoni', additional_price: 3 }],
//     },
//     {
//         choicename: 'Drink Sizes',
//         ischoice: '0',
//         choicetype: 'additional',
//         choice_items: [{ name: 'Small', additional_price: 1 }, { name: 'Medium', additional_price: 15 }, { name: 'Large', additional_price: 2 }, { name: 'Medium', additional_price: 15 }, { name: 'Medium', additional_price: 15 }, { name: 'Medium', additional_price: 15 }],
//     },
//     {
//         choicename: 'Burger Add-ons',
//         ischoice: '1',
//         choicetype: 'additional',
//         choice_items: [{ name: 'Bacon', additional_price: 5 }, { name: 'Extra Cheese', additional_price: 1 }],
//     },
//     {
//         choicename: 'Drink Sizes',
//         ischoice: '0',
//         choicetype: 'additional',
//         choice_items: [{ name: 'Small', additional_price: 1 }, { name: 'Medium', additional_price: 5 }, { name: 'Large', additional_price: 2 }, { name: 'Medium', additional_price: 5 }, { name: 'Medium', additional_price: 5 }, { name: 'Medium', additional_price: 5 }],
//     },
//     {
//         choicename: 'Burger Add-ons',
//         ischoice: '1',
//         choicetype: 'additional',
//         choice_items: [{ name: 'Bacon', additional_price: 1 }, { name: 'Extra Cheese', additional_price: 1 }],
//     },
// ]);

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
    currentChoice.value = { ...processedChoices.value[index] };
    isEditMode.value = true;
    isFormVisible.value = true;
};

// Save function for the form component
const saveChoice = async (choice) => {
    try {
        if (isEditMode.value && currentEditIndex.value !== null) {

            const success = await store.dispatch('menuChoice/editChoice', choice);
            console.log("response edit choice ", success);
            //choices.value[currentEditIndex.value] = choice;
        } else {
            console.log("CC ", choice)
            const success = await store.dispatch('menuChoice/addChoice', choice);
            console.log("response choice ", success);
        }
        isFormVisible.value = false;
    } catch (error) {
        console.error('Error Adding/updating choice:', error);
    }
};

// Delete a choice
const deleteChoice = async (index) => {
    //choices.value.splice(index, 1);
    try {
        console.log("index ", index)
        const success = await store.dispatch('menuChoice/deleteChoice', index);
        console.log("response choice ", success);
    } catch (error) {
        console.error('Error Deleting Choice: ', error);
    }
};

</script>

<style scoped>
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
    height: 120px;
}

/* SCROLLER CHOICES */
.scroller {
    overflow-y: auto;
    height: 910px;
}

.modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 500px;
    max-width: 100%;
}

/* .card {
    max-width: 700px;
    border-radius: 8px;
    border: none;
} */

.card-title {
    font-size: 1.25rem;
    font-weight: bold;
}

.card-text i {
    font-size: 1.2rem;
    color: #666;
}

.text-capital {
    text-transform: capitalize;
    /* Capitalizes the first letter of the text */
}

.btn-outline-secondary {
    border-radius: 20px;
}

.btn-danger {
    border-radius: 20px;
}


.active {
    border-color: #007bff;
}

.solo-card {
    height: 225px;
}

.card {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
}

h4 {
    font-size: 1.5rem;
}

img {
    border-radius: 10px;
}

button.active {
    background-color: #007bff;
    color: #fff;
}

button i {
    margin-right: 5px;
}
</style>

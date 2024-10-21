<template>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Deals Management</h2>

        <form @submit.prevent="addDeal" class="mb-4">
            <div class="form-row">
                <div class="col-12 col-md-4 mb-3">
                    <input type="text" v-model="deal.title" class="form-control" placeholder="Deal Title" required />
                </div>
                <div class="col-12 col-md-4 mb-3">
                    <input type="number" v-model="deal.discount" class="form-control" placeholder="Discount (%)" required
                        min="1" max="100" />
                </div>
                <div class="col-12 col-md-4 mb-3">
                    <input type="text" v-model="deal.validity" @blur="validateDate" class="form-control"
                        placeholder="Validity Date (YYYY-MM-DD)" required />
                    <div v-if="invalidDate" class="text-danger">Invalid date format. Use YYYY-MM-DD.</div>
                </div>
            </div>
            <div class="form-row">
                <div class="col-12 mb-3">
                    <textarea v-model="deal.description" class="form-control" rows="3" placeholder="Deal Description"
                        required></textarea>
                </div>
                <div class="col-12 col-md-4">
                    <button type="submit" class="btn btn-success btn-block" :disabled="invalidDate">Add Deal</button>
                </div>
            </div>
        </form>

        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Title</th>
                    <th>Discount (%)</th>
                    <th>Validity</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(deal, index) in deals" :key="index">
                    <td>{{ deal.title }}</td>
                    <td>{{ deal.discount }}</td>
                    <td>{{ deal.validity }}</td>
                    <td>{{ deal.description }}</td>
                    <td>
                        <button @click="editDeal(index)" class="btn btn-warning btn-sm mr-2">Edit</button>
                        <button @click="deleteDeal(index)" class="btn btn-danger btn-sm ms-2">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
    name: 'DealsManagement',
    setup() {
        const deal = ref({ title: '', discount: '', validity: '', description: '' });
        const deals = ref([]);
        const invalidDate = ref(false);

        const addDeal = () => {
            if (deal.value.title && deal.value.discount && deal.value.validity && deal.value.description && !invalidDate.value) {
                deals.value.push({ ...deal.value });
                deal.value = { title: '', discount: '', validity: '', description: '' };
            }
        };

        const editDeal = (index) => {
            deal.value = { ...deals.value[index] };
            deals.value.splice(index, 1);
        };

        const deleteDeal = (index) => {
            deals.value.splice(index, 1);
        };

        const validateDate = () => {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            invalidDate.value = !dateRegex.test(deal.value.validity) || !isValidDate(deal.value.validity);
        };

        const isValidDate = (dateString) => {
            const date = new Date(dateString);
            return date instanceof Date && !isNaN(date);
        };

        return { deal, deals, addDeal, editDeal, deleteDeal, validateDate, invalidDate };
    },
};
</script>
  
<style scoped>
h2 {
    color: #00754a;
}

.form-row {
    display: flex;
    flex-wrap: wrap;
}

.table th,
.table td {
    vertical-align: middle;
    text-align: center;
}

.table {
    margin-top: 20px;
}

.text-danger {
    font-size: 0.85rem;
}

@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
    }
}
</style>
  
<template>
    <div class="container mt-5">
        <h2 class="text-center mb-4">Voucher Management</h2>
        <form @submit.prevent="addVoucher" class="mb-4">
            <div class="form-row">
                <div class="col-md-4">
                    <input type="text" v-model="voucher.code" class="form-control" placeholder="Voucher Code" required />
                </div>
                <div class="col-md-4 ms-4">
                    <input type="number" v-model="voucher.discount" class="form-control" placeholder="Discount (%)" required
                        min="0" />
                </div>
                <div class="col-md-4 ms-5">
                    <button type="submit" class="btn btn-success btn-block">Add Voucher</button>
                </div>
            </div>
        </form>

        <table class="table table-striped table-hover">
            <thead class="thead-dark">
                <tr>
                    <th>Code</th>
                    <th>Discount (%)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(voucher, index) in vouchers" :key="index">
                    <td>{{ voucher.code }}</td>
                    <td>{{ voucher.discount }}</td>
                    <td>
                        <button @click="editVoucher(index)" class="btn btn-warning btn-sm mr-2 ">Edit</button>
                        <button @click="deleteVoucher(index)" class="btn btn-danger btn-sm ms-2">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
    name: 'VoucherManagement',
    setup() {
        const voucher = ref({ code: '', discount: '' });
        const vouchers = ref([]);

        const addVoucher = () => {
            if (voucher.value.code && voucher.value.discount) {
                vouchers.value.push({ ...voucher.value });
                voucher.value = { code: '', discount: '' };
            }
        };

        const editVoucher = (index) => {
            voucher.value = { ...vouchers.value[index] };
            vouchers.value.splice(index, 1);
        };

        const deleteVoucher = (index) => {
            vouchers.value.splice(index, 1);
        };

        return { voucher, vouchers, addVoucher, editVoucher, deleteVoucher };
    },
};
</script>
  
<style scoped>
.container {
    max-width: 800px;
    margin: auto;
}

h2 {
    color: #00754a;
    font-family: 'Agrandir', 'Open Sans', sans-serif;
    font-weight: bold;
}

.form-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.table {
    margin-top: 20px;
    border-radius: 0.5rem;
    overflow: hidden;
}

.table th,
.table td {
    vertical-align: middle;
    text-align: center;
}

.table-striped tbody tr:nth-of-type(odd) {
    background-color: #f9f9f9;
}

.table-striped tbody tr:hover {
    background-color: #eaeaea;
}

.btn {
    transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
    transform: translateY(-2px);
}

.btn-success {
    background-color: #28a745;
    border: none;
}

.btn-warning {
    background-color: #ffc107;
    border: none;
}

.btn-danger {
    background-color: #dc3545;
    border: none;
}

.btn-success:hover {
    background-color: #218838;
}

.btn-warning:hover {
    background-color: #e0a800;
}

.btn-danger:hover {
    background-color: #c82333;
}
</style>
  
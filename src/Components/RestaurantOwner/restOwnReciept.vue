<template>
    <div class="container mt-4">
        <h2 class="text-center">Order List</h2>
        <ul class="list-group">
            <li v-for="order in orders" :key="order.id"
                class="list-group-item d-flex justify-content-between align-items-center list-group-item-action animate__animated animate__fadeInUp"
                @click="openModal(order)">
                {{ order.name }} 
                <button class="btn btn-primary animate__animated animate__bounceIn">View Receipt</button>
            </li>
        </ul>

        <!-- Receipt Modal -->
        <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="orderModalLabel">Order Receipt</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="receipt" ref="receiptContent">
                            <h5 class="text-center">Receipt</h5>
                            <hr />
                            <div class="row">
                                <div class="col-6">
                                    <p><strong>Order Number:</strong> {{ orderDetails.id }}</p>
                                    <p><strong>Date:</strong> {{ orderDetails.date }}</p>
                                    <p><strong>Time:</strong> {{ orderDetails.time }}</p>
                                </div>
                                <div class="col-6 text-end">
                                    <p><strong>Customer Name:</strong> {{ orderDetails.name }}</p>
                                    <p><strong>Phone Number:</strong> {{ orderDetails.phone }}</p>
                                    <p><strong>Address:</strong> {{ orderDetails.address }}</p>
                                </div>
                            </div>
                            <hr />
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Description</th>
                                        <th scope="col" class="text-end">Amount (PKR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Total Product Price</td>
                                        <td class="text-end">{{ orderDetails.totalPrice }} PKR</td>
                                    </tr>
                                    <tr>
                                        <td>Delivery Charges</td>
                                        <td class="text-end">200 PKR</td>
                                    </tr>
                                    <tr>
                                        <td>GST (16%)</td>
                                        <td class="text-end">{{ gstAmount }} PKR</td>
                                    </tr>
                                    <tr>
                                        <td>Food Pro Commission</td>
                                        <td class="text-end">{{ orderDetails.foodCommission }} PKR</td>
                                    </tr>
                                    <tr class="table-primary">
                                        <td><strong>Total Restaurant Got</strong></td>
                                        <td class="text-end"><strong>{{ totalRestaurantGot }} PKR</strong></td>
                                    </tr>
                                    <tr class="table-success">
                                        <td><strong>Profit</strong></td>
                                        <td class="text-end"><strong>{{ profit }} PKR</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="downloadReceiptAsPDF">Download Receipt</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Orders data
const orders = ref([
    { id: 1, name: "Ahmed Ali", phone: "0300-1234567", address: "Karachi", totalPrice: 1200, foodCommission: 50 },
    { id: 2, name: "Sara Khan", phone: "0312-9876543", address: "Lahore", totalPrice: 1500, foodCommission: 70 },
    { id: 3, name: "Bilal Siddiqui", phone: "0345-5556677", address: "Islamabad", totalPrice: 1800, foodCommission: 80 },
    { id: 4, name: "Asma Sheikh", phone: "0301-2345678", address: "Quetta", totalPrice: 1400, foodCommission: 60 },
    { id: 5, name: "Hina Raza", phone: "0307-9988776", address: "Peshawar", totalPrice: 2000, foodCommission: 90 },
    { id: 6, name: "Zainab Farooq", phone: "0322-4442233", address: "Faisalabad", totalPrice: 1600, foodCommission: 75 },
    { id: 7, name: "Omer Malik", phone: "0302-1122334", address: "Multan", totalPrice: 1100, foodCommission: 55 },
]);

const orderDetails = ref({});

// Computed properties for receipt
const gstAmount = computed(() => (orderDetails.value.totalPrice * 0.16).toFixed(2));
const totalRestaurantGot = computed(() => (
    orderDetails.value.totalPrice - gstAmount.value - orderDetails.value.foodCommission + 200
).toFixed(2));
const profit = computed(() => (orderDetails.value.foodCommission / 2).toFixed(2));

// Method to open the modal and display order details
const openModal = (order) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    orderDetails.value = {
        ...order,
        date: formattedDate,
        time: formattedTime,
    };
    
    const modal = new bootstrap.Modal(document.getElementById("orderModal"));
    modal.show();
};

// Method to download the receipt as a PDF
const downloadReceiptAsPDF = async () => {
    const receiptElement = document.querySelector('.receipt');
    const canvas = await html2canvas(receiptElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`Receipt_${orderDetails.value.id}.pdf`);
};
</script>

<style scoped>
.receipt {
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.receipt h5 {
    margin-bottom: 20px;
}
</style>

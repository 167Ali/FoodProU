<template>
    <div class="table-responsive">
        <table class="table table-hover table-striped">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Customer Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <!-- <th>Restaurant</th> -->
                    <th>Total Price</th>
                    <!-- <th>Food ProCom</th> -->
                    <th>Status</th>
                    <th>Date</th>
                    <th>View Details</th>
                </tr>
            </thead>
            <tbody>
                <transition-group name="fade" mode="out-in">
                    <tr v-for="order in filteredOrders" :key="order.id">
                        <td>{{ order.id }}</td>
                        <td>{{ order.user_name }}</td>
                        <td>{{ order.user_phone }}</td>
                        <td>{{ order.user_address }}</td>
                        <!-- <td>{{ order.restaurant }}</td> -->
                        <td>{{ formatCurrency(order.total_amount) }}</td>
                        <!-- <td>{{ formatCurrency(order.foodCommission) }}</td> -->
                        <td>{{ order.status }}</td>
                        <td>{{ order.estimated_delivery_time }}</td>
                        <td>
                            <button class="btn btn-details" @click="openModal(order)">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                        </td>
                    </tr>
                </transition-group>
            </tbody>
        </table>

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
                                <div class="col-6 ">
                                    <p><strong>Customer Name:</strong> {{ orderDetails.user_name }}</p>
                                    <p><strong>Phone Number:</strong> {{ orderDetails.user_phone }}</p>
                                    <p><strong>Address:</strong> {{ orderDetails.user_address }}</p>
                                </div>
                                <div class="col-6 d-flex flex-column align-items-end ">
                                    <p><strong>Order Number:</strong> {{ orderDetails.id }}</p>
                                    <p><strong>Date:</strong> {{ orderDetails.date }}</p>
                                    <p><strong>Time:</strong> {{ orderDetails.time }}</p>
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
                                        <td class="text-end">{{ orderDetails.total_amount }} PKR</td>
                                    </tr>
                                    <tr>
                                        <td>Delivery Charges</td>
                                        <td class="text-end">{{ orderDetails.delivery_charges }}</td>
                                    </tr>
                                    <tr class="table-primary">
                                        <td><strong>Total Restaurant Got</strong></td>
                                        <td class="text-end"><strong>{{ totalRestaurantGot }} PKR</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" @click="downloadReceiptAsPDF">Download
                            Receipt</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Accept filteredOrders as a prop
const props = defineProps({
    filteredOrders: {
        type: Array,
        required: true
    }
});

// Format currency function
const formatCurrency = (amount) => {
    return `Rs ${amount.toFixed(2)}`;
};



// Order details ref
const orderDetails = ref({});

// View details function
const openModal = (order) => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    orderDetails.value = {
        ...order,
        date: formattedDate,
        time: formattedTime,
        address: order.address || 'N/A' // Assuming address is in order
    };
    const modal = new bootstrap.Modal(document.getElementById("orderModal"));
    modal.show();
};

// Calculate GST
const gstAmount = computed(() => {
    return (orderDetails.value.total_amount * 0.16).toFixed(2);
});

// Calculate total amount restaurant got
const totalRestaurantGot = computed(() => {
    return (orderDetails.value.total_amount - gstAmount.value).toFixed(2);
});

// Calculate profit
const profit = computed(() => {
    return (orderDetails.value.foodCommission / 2).toFixed(2);
});

// Download receipt as PDF
const downloadReceiptAsPDF = async () => {
    const receiptElement = document.querySelector('.receipt'); // Use a query selector to get the receipt content

    try {
        // Use html2canvas to take a snapshot of the receipt content
        const canvas = await html2canvas(receiptElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        // Create a PDF using jsPDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = pageWidth - 20; // Leave some margin
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

        // Save the PDF with the order ID
        pdf.save(`Receipt_${orderDetails.value.id}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again later.');
    }
};
</script>

<style scoped>
.table-responsive {
    max-height: 500px;
    overflow-y: auto;
    margin: 20px;
    padding: 40px;
    border-radius: 10px;
    background-color: #fdfdfd;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

thead th {
    background-color: #00754A;
    color: #ffffff;
    padding: 15px;
    text-align: left;
    font-weight: 600;
    border-bottom: 2px solid #00754A;
}

tbody tr {
    transition: background-color 0.2s;
}

tbody tr:hover {
    background-color: #e8f0fe;
}

table td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
    vertical-align: middle;
    font-size: 14px;
}

.btn-details {
    display: inline-flex;
    align-items: center;
    background-color: #00754A;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    font-size: 14px;
}

.btn-details i {
    margin-right: 5px;
}

.btn-details:hover {
    background-color: #00754adc;
    transform: scale(1.05);
}

/* Receipt styles */
.receipt {
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.receipt h5 {
    margin-bottom: 20px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    table {
        font-size: 12px;
    }

    .btn-details {
        padding: 6px 10px;
    }

    .receipt {
        padding: 10px;
    }
}
</style>

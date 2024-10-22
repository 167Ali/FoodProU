<template>
  <div class="page-container">
    <!-- Off-canvas Toggle Button (Visible only on mobile) - Move it outside of the sidebar -->
    <button
      class="btn btn-link offcanvas-toggle d-md-none"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasOrderDetail"
      aria-controls="offcanvasOrderDetail"
    >
      <i class="fa-solid fa-bars"></i> <!-- Hamburger Icon -->
    </button>

    <!-- Order Details Sidebar (Visible on larger screens) -->
    <div class="order-detail">
      <div class="order-sidebar d-none d-md-block">
        <h2 class="order-title">Order Details</h2>
        <div class="order-status">
          <button class="status-btn active">Pending</button>
          <button class="status-btn">Rejected</button>
          <button class="status-btn">Deactivated</button>
        </div>
        <div class="order-items">
          <OrderItem
            v-for="item in orderItems"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>

      <!-- Off-canvas Sidebar (Visible on mobile when toggled) -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasOrderDetail"
        aria-labelledby="offcanvasOrderDetailLabel"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasOrderDetailLabel">Order Details</h5>
        </div>
        <div class="offcanvas-body">
          <div class="order-status">
            <button class="status-btn active">Pending</button>
            <button class="status-btn">Rejected</button>
            <button class="status-btn">Deactivated</button>
          </div>
          <div class="order-items">
            <OrderItem
              v-for="item in orderItems"
              :key="item.id"
              :item="item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import OrderItem from '@/Components/Admin/OrderItem.vue'

const orderItems = [
  {
    id: 1,
    name: 'Snow Ramen With Chicken Katsu',
    price: '$10.50',
    status: 'On Process',
    image: 'https://images.unsplash.com/photo-1477925518023-22b33cbd802c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 2,
    name: 'Spicy Tuna Roll',
    price: '$8.00',
    status: 'On Process',
    image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZvb2R8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 3,
    name: 'Beef Teriyaki Bento',
    price: '$12.00',
    status: 'On Process',
    image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZvb2R8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 4,
    name: 'Chicken Curry',
    price: '$9.00',
    status: 'On Process',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGN1cnJ5fGVufDB8fDB8fHww%3D%3D'
  },
  {
    id: 5,
    name: 'Salmon Sashimi',
    price: '$11.00',
    status: 'On Process',
    image: 'https://images.unsplash.com/photo-1487790343276-2fe56a7d9439?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2R8ZW58MHx8MHx8fDA%3D'
  },
]
</script>

<style scoped>
/* Container for the entire page */
.page-container {
  position: relative; /* Container for positioning toggle button */
}

/* Container for the entire order detail section */
.order-detail {
  width: 100%;
  max-width: 350px;
  margin: 30px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

/* Sidebar for larger screens */
.order-sidebar {
  width: 100%;
  margin-top: 20px;
}

/* Off-canvas toggle button */
.offcanvas-toggle {
  position: fixed; /* Fix the button to stay in place on mobile */
  top: 17px;
  right: -5px;
  z-index: 1050; /* Ensure it’s on top */
  background-color: transparent;
  color: black;
  border: none;
  font-size: 32px;
}

/* Order title styling */
.order-title {
  text-align: center;
  margin-bottom: 20px;
  color: #00754A;
}

/* Order status buttons */
.order-status {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.status-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #f4f4f4;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.status-btn:last-child {
  margin-right: 0;
}

.status-btn:hover {
  background-color: #e2e2e2;
}

.status-btn.active {
  background-color: #00754A;
  color: #fff;
}

/* Order items container with scrolling capability */
.order-items {
  margin-top: 20px;
  max-height: 510px;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 5px; /* Avoid clipping content due to scrollbar */
}

/* Scrollbar styling */
.order-items::-webkit-scrollbar {
  width: 6px;
}

.order-items::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

/* Responsive Adjustments */
@media (min-width: 768px) {
  /* Hide the off-canvas toggle button on larger screens */
  .offcanvas-toggle {
    display: none;
  }

  /* The sidebar should be visible on larger screens */
  .order-sidebar {
    display: block;
  }
}

@media (max-width: 767.98px) {
  /* Ensure the off-canvas toggle button is visible on mobile */
  .offcanvas-toggle {
    display: inline-block;
  }

  /* Hide the order sidebar on mobile screens */
  .order-sidebar {
    display: none;
  }
}
</style>
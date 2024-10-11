<template>
    <nav class="sidebar d-flex flex-column align-items-center">
        <!-- Logo -->
        <img src="https://plus.unsplash.com/premium_photo-1674670904769-544b31893a15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVyZ2VyJTIwbGFifGVufDB8fDB8fHww" alt="Logo" class="logo my-4" />

        <!-- Navigation -->
        <ul class="nav flex-column w-100 text-center">
            <li class="nav-item mb-3" v-for="item in navItems" :key="item.icon">
                <a href="#" class="nav-link text-dark d-flex flex-column align-items-center">
                    <i :class="item.icon + ' fs-3'"></i>
                    <span class="item-label">{{ item.label }}</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
  
<script>
import { ref } from 'vue';

export default {
    name: 'Sidebar',
    setup() {
        const navItems = ref([
            { icon: 'fas fa-home', label: 'Home' },
            { icon: 'fas fa-chart-line', label: 'Analytics' },
            { icon: 'fas fa-utensils', label: 'Orders' },
            { icon: 'fas fa-cogs', label: 'Settings' },
        ]);

        return { navItems };
    },
};
</script>
  
<style scoped>
/* Sidebar styles */
.sidebar {
    width: 90px;
    background-color: #f1f3f5;
    min-height: 100vh;
    border-right: 1px solid #e0e0e0;
    padding-top: 2rem;
    transition: all 0.3s ease-in-out;
}

.logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.logo:hover {
    transform: scale(1.1);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.nav {
    padding: 0;
    margin-top: 2rem;
}

.nav-item {
    width: 100%;
}

.nav-link {
    color: #495057;
    width: 100%;
    padding: 0.75rem;
    transition: all 0.3s ease;
    position: relative;
}

.nav-link:hover {
    background-color: #e9ecef;
    border-radius: 12px;
    color: #007bff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
}

.nav-link i {
    font-size: 1.6rem;
    margin-bottom: 5px;
}

.item-label {
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: 5px;
    color: #6c757d;
}

.nav-link.active {
    background-color: #007bff;
    color: white;
    border-radius: 12px;
    box-shadow: 0px 4px 8px rgba(0, 123, 255, 0.4);
}

.sidebar:hover {
    width: 200px;
}

.sidebar:hover .item-label {
    display: inline-block;
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
}

.item-label {
    display: none;
    opacity: 0;
    white-space: nowrap;
}
</style>
  
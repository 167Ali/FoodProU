<template>
  <footer class="footer">
    <div class="footer-links">
      <!-- Loop through the footer columns -->
      <div v-for="(column, index) in footerColumns" :key="index" class="footer-column">
        <ul>
          <!-- Loop through the links in each column -->
          <li v-for="(link, linkIndex) in column.links" :key="linkIndex">
            <a v-if="link.url" :href="link.url">{{ link.text }}</a>
            <span v-else>{{ link.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue';

// Footer columns data with links and URLs
const footerColumns = ref([
  {
    links: [
      { text: '© foodpro' },
    ],
  },
  {
    links: [
      { text: 'Press', url: '#' },
      { text: 'foodpro Terms and Conditions', url: '#' },
      { text: 'Security', url: '#' },
      { text: 'Careers', url: '#' },
      { text: 'Cashback Terms and Conditions', url: '#' },
      { text: 'Partner with Us', url: '#' },
      { text: 'Become an Affiliate', url: '#' },
    ],
  },
  {
    links: [
      { text: 'foodpro - Monthly Subscription Programme', url: '#' },
      { text: 'Help Center', url: '#' },
      { text: 'Terms and Conditions', url: '#' },
      { text: 'Suggest a Restaurant', url: '#' },
      { text: 'All cuisines', url: '#' },
      { text: 'Update on COVID-19 in Pakistan', url: '#' },
    ],
  },
  {
    links: [
      { text: 'Refunds with foodpay', url: '#' },
      { text: 'Privacy policy', url: '#' },
      { text: 'Human rights policy', url: '#' },
      { text: 'Corporate Customer', url: '#' },
      { text: 'foodpro Magazine', url: '#' },
      { text: 'foodpro Vouchers & Coupons', url: '#' },
      { text: 'foodpro Home Chef', url: '#' },
    ],
  },
]);
</script>

<style scoped>
.footer {
  background-color: #f7f7f7;
  padding: 40px 0;
  border-top: 1px solid #eaeaea;
  margin-top: 50px;
}

.footer-links {
  display: flex;
  justify-content: space-around;
  text-align: left;
}

.footer-column {
  flex: 1;
}

.footer-column ul {
  list-style-type: none;
  padding: 0;
}

.footer-column ul li {
  margin-left: 150px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #555;
}

.footer-column ul li a {
  color: #555;
  text-decoration: none;
}

.footer-column ul li a:hover {
  text-decoration: underline;
}
</style>
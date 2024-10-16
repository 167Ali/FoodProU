<template>
  <footer class="footer">
    <hr>
    <div class="footer-links">
      <!-- First Column -->
      <div class="footer-column">
        <ul>
          <li>&copy; foodpro</li>
        </ul>
      </div>
      <!-- Second Column -->
      <div class="footer-column">
        <ul>
          <li><a href="#">Press</a></li>
          <li><a href="#">foodpro Terms and Conditions</a></li>
          <li><a href="#">Security</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Cashback Terms and Conditions</a></li>
          <li><a href="#">Partner with Us</a></li>
          <li><a href="#">Become an Affiliate</a></li>
        </ul>
      </div>
      <!-- Third Column -->
      <div class="footer-column">
        <ul>
          <li><a href="#">foodpro - Monthly Subscription Programme</a></li>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Terms and Conditions</a></li>
          <li><a href="#">Suggest a Restaurant</a></li>
          <li><a href="#">All cuisines</a></li>
          <li><a href="#">Update on COVID-19 in Pakistan</a></li>
        </ul>
      </div>
      <!-- Fourth Column -->
      <div class="footer-column">
        <ul>
          <li><a href="#">Refunds with foodpay</a></li>
          <li><a href="#">Privacy policy</a></li>
          <li><a href="#">Human rights policy</a></li>
          <li><a href="#">Corporate Customer</a></li>
          <li><a href="#">foodpro Magazine</a></li>
          <li><a href="#">foodpro Vouchers & Coupons</a></li>
          <li><a href="#">foodpro Home Chef</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No need for defineComponent here
</script>

<style scoped>
.footer {
  background-color: #f9f9f9;
  padding: 40px 0;
  border-top: 1px solid #eaeaea;
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
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: #555;
  text-decoration: none;
}

.footer-column ul li a:hover {
  text-decoration: underline;
}

.footer-column ul li {
  font-size: 14px;
  color: #555;
}
</style>
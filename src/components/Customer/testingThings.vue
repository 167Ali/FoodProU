<template>
    <div>
      <!-- Button to toggle visibility -->
      <button @click="toggleBox"> BUTTON </button>
      <div ref="boxRef" class="box"> BOX 1
        <div class="box"> BOX 2 </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const boxRef = ref(null); // Reference to the box div
const toggleBox = () => {
  if (boxRef.value.style.display === 'none') {
    boxRef.value.style.display = 'block'; // Show the box
  } else {
    boxRef.value.style.display = 'none'; // Hide the box
  }
};
</script>  

<style scoped>
.box {
  width: 200px; height: 100px;
  background-color: blue;
  padding: 20PX;
  display: none; /* Initially hidden */
}
.box2{
    background-color: pink;
}
</style> 
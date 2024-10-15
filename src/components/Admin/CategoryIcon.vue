<template>
  <div class="category-icon" @click="handleClick">
    <font-awesome-icon :icon="icon" class="icon-image" />
    <p class="category-label">{{ label }}</p>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; // Import FontAwesomeIcon

// Define props to receive category details
const props = defineProps({
  icon: {
    type: Array, // Expecting an array for Font Awesome icon
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

// Emit event when the category icon is clicked
const emit = defineEmits();
const handleClick = () => {
  emit('category-selected', props.label); // Emit the label of the selected category
};
</script>

<style scoped>
/* Container for each category icon */
.category-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100px;
  background-color: #f1f0f0;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* Soft shadow for depth */
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s ease, background-color 0.3s;
  margin: 0 10px; /* Space between icons */
}

/* Hover effect for interactivity */
.category-icon:hover {
  transform: translateY(-3px); /* Lift the box slightly on hover */
  background-color: #f9f9f9;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); /* Stronger shadow on hover */
}

/* Icon styling */
.icon-image {
  font-size: 28px; /* Adjust size for better visibility */
  margin-bottom: 6px; /* Less margin to make it compact */
  color: #00754A; /* Consistent brand color */
}

/* Label styling */
.category-label {
  font-size: 0.8rem; /* Font size for readability */
  color: #333; /* Darker color for better contrast */
  font-weight: 500; /* Medium weight for clarity */
  text-align: center; /* Center the label text */
  line-height: 1.2; /* Set line height for better spacing */
  max-width: 80%; /* Limit the width to allow wrapping */
  white-space: normal; /* Allow text to wrap */
  overflow: hidden; /* Hide overflow if necessary */
  text-overflow: ellipsis; /* Optional: add ellipsis for overflow */
}
</style>

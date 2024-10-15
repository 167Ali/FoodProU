<template>
    <div class="recipe-card">
      <img :src="image" alt="Recipe image" class="recipe-image" />
      <div class="recipe-content">
        <div class="recipe-category">{{ category }}</div>
        <h3 class="recipe-title">{{ title }}</h3>
        <p class="recipe-description">{{ description }}</p>
        <div class="recipe-footer">
          <span class="author">{{ author }}</span>
          <span class="date">{{ date }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "RecipeCard",
    props: {
      image: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .recipe-card {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    width: 100%;
    max-width: 280px; /* Reduced width */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
  }
  
  .recipe-card:hover {
    transform: translateY(-5px);
  }
  
  .recipe-image {
    width: 100%;
    height: 150px; /* Reduced height */
    object-fit: cover;
  }
  
  .recipe-content {
    padding: 8px; /* Reduced padding */
  }
  
  .recipe-category {
    font-size: 11px; /* Slightly smaller */
    color: #00754A; /* Using preferred button color */
    margin-bottom: 6px; /* Less spacing */
    font-weight: bold;
  }
  
  .recipe-title {
    font-size: 16px; /* Smaller title */
    font-weight: 600;
    margin-bottom: 6px; /* Reduced margin */
    color: #333;
  }
  
  .recipe-description {
    font-size: 13px; /* Smaller description */
    color: #666;
    line-height: 1.3; /* Adjusted line height */
    margin-bottom: 12px; /* Less margin */
  }
  
  .recipe-footer {
    display: flex;
    justify-content: space-between;
    font-size: 11px; /* Smaller footer */
    color: #888;
  }
  
  .author {
    font-weight: 500;
  }
  
  .date {
    font-weight: 400;
  }
  </style>
  
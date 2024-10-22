<template>
  <div class="container">
    <div class="discount-banner mt-3">
      <div class="discount-text">
        <h2>Get Special Discount</h2>
        <p>40% off on all restaurants | T&C applied</p>
      </div>
      <button class="claim-btn">Claim Now</button>
    </div>
  </div>
</template>

<style scoped>
/* Main discount banner container */
.discount-banner {
  background-color: #00754A;
  color: white;
  padding: 25px 30px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Add a subtle shadow for depth */
  position: relative;
  overflow: hidden;
}

/* Discount text styling */
.discount-text h2 {
  font-size: 28px; /* Larger and bolder heading */
  margin-bottom: 8px;
  font-weight: 700; /* Bold title */
  letter-spacing: 1px; /* Slightly increase spacing for modern look */
}

.discount-text p {
  font-size: 16px; /* Refined paragraph size */
  font-weight: 500;
}

/* Claim button styling */
.claim-btn {
  background-color: #fff;
  color: #00754A;
  padding: 12px 30px;
  border-radius: 30px; /* More rounded corners for a modern button style */
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for a 3D effect */
}

.claim-btn:hover {
  background-color: #e6fff4; /* Add hover effect for interactivity */
  transform: translateY(-2px); /* Slight lift on hover */
}

.claim-btn:active {
  transform: translateY(1px); /* Button effect when clicked */
}

/* Decorative circle elements for extra style */
.discount-banner::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white circle */
  border-radius: 50%;
}

.discount-banner::after {
  content: '';
  position: absolute;
  bottom: -70px;
  left: -70px;
  width: 250px;
  height: 250px;
  background-color: rgba(255, 255, 255, 0.1); /* Larger, lighter circle */
  border-radius: 50%;
}

/* Media Queries for Responsiveness */

/* Small devices (up to 575.98px) */
@media (max-width: 575.98px) {
  .discount-banner {
    padding: 15px 20px; /* Reduce padding for smaller screens */
    flex-direction: column; /* Stack the text and button vertically */
    text-align: center; /* Center text and button */
  }

  .discount-text h2 {
    font-size: 20px; /* Reduce font size on smaller screens */
    margin-bottom: 5px;
  }

  .discount-text p {
    font-size: 14px; /* Reduce paragraph font size */
  }

  .claim-btn {
    width: 100%; /* Make the button full-width */
    margin-top: 15px; /* Add space between text and button */
  }

  /* Adjust the decorative circles */
  .discount-banner::before {
    width: 150px;
    height: 150px;
    top: -30px;
    right: -30px;
  }

  .discount-banner::after {
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: -50px;
  }
}

/* Medium devices (up to 767.98px) */
@media (max-width: 767.98px) {
  .discount-banner {
    padding: 20px 25px; /* Slightly reduce padding */
  }

  .discount-text h2 {
    font-size: 24px; /* Adjust heading font size */
  }

  .discount-text p {
    font-size: 15px;
  }

  .claim-btn {
    padding: 10px 25px; /* Slightly reduce button padding */
  }

  /* Adjust the decorative circles */
  .discount-banner::before {
    width: 180px;
    height: 180px;
    top: -40px;
    right: -40px;
  }

  .discount-banner::after {
    width: 220px;
    height: 220px;
    bottom: -60px;
    left: -60px;
  }
}

/* Large devices (up to 991.98px) */
@media (max-width: 991.98px) {
  .discount-banner {
    padding: 15px 15px;
  }

  .discount-text h2 {
    font-size: 26px; /* Slightly larger heading */
  }

  .discount-text p {
    font-size: 16px;
  }

  .claim-btn {
    padding: 12px 30px; /* Standard button size */
  }
}
</style>
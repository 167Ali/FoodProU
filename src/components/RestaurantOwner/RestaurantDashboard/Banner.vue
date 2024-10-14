<template>
    <div class="banner mb-4">
        <img src="https://images.unsplash.com/photo-1525596201491-f6eae338a205?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb2RzfGVufDB8fDB8fHww"
            alt="Delicious Food Banner" class="img-fluid banner-img" />
    </div>
</template>
  
<script>
export default {
    name: "Banner",
};
</script>
  
<style scoped>
.banner {
    width: 1000px;
    /* Set a fixed width */
    height: 220px;
    /* Set a fixed height */
    overflow: hidden;
    /* Hide any overflow */
    border-radius: 20px;
    /* Rounded corners */
    position: relative;
    justify-content: center;

}

.banner-img {
    width: 100%;
    /* Fill the width of the container */
    height: 100%;
    /* Fill the height of the container */
    object-fit: cover;
    /* Cover the area without distortion */
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 20px;
    /* Match the container's radius */
}

.banner-img:hover {
    transform: scale(1.05);
    filter: brightness(0.9);
}
</style>
  
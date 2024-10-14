<template>
    <div class="banner mb-4 d-flex justify-content-center align-items-center">
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
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.banner-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 20px;
}

.banner-img:hover {
    transform: scale(1.05);
    filter: brightness(0.9);
}
</style>
  
<template>
    <div class="fullpage">
        <div class="navbar">
            <p class="navbarheading">FoodPro</p>
        </div>
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
    
</template>
<style scoped>
    .fullpage{
        background-color: #f7f7f7;
        margin-bottom: -50px;
    }
    .navbar{
        background-color: #FFFFFFFF;
        height: 64px;
        width: 100%;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        justify-content: center;
        z-index: 100000;

        position: fixed;
        top: 0;
    }
    .navbarheading{
        color: #00754A;
        font-weight: bolder;
        font-size: 30px;
        display: inline-block;
    }
</style>
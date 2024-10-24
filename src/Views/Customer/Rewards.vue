<template>
<LoginHeader/>
    <!-- Points Display Section -->
    <div class="points-section">
        <div class="rewards-container text-dark">
            <div class="points-card">
                <div class="points-header">
                    <h6>Points</h6>
                    <i class="fa fa-info-circle" title="Information about points"></i>
                </div>
                <div class="points-value">

                    <h1>{{ totalPoints }} <i class=" fa-greater-than"></i></h1>
                    <img src="../../assets/bg3.gif" alt="Points Image" class="points-image">
                </div>

            </div>
        </div>
    </div>

    <!-- Info Boxes Section -->
    <div class="info-boxes">
        <div class="info-box large">
            <h4>New stamp cards are coming your way!</h4>
            <p>Get ready to earn points and redeem amazing rewards. Stay tuned!</p>
        </div>

    </div>
    <br>
    <div class="info-boxes">
        <div class="info-box badges">
            <div class="badges-left">
                <img src="https://via.placeholder.com/60x60" alt="Badges" />
                <div>
                    <p class="badge-title">Badges</p>
                    <p>Complete stamp cards to earn badges</p>
                </div>
            </div>
            <a href="#" class="see-all">See all</a>
        </div>
    </div>
    <br>
    <!-- Rewards Section -->
    <div class="rewards-section">
        <div class="rewards-header">
            <h4 class="rewards-title">Turn points into your fave rewards</h4>
            <a href="#" class="terms-link">Terms & conditions</a>
        </div>
        <br>

        <div class="rewards-list">
            <!-- Display available rewards -->
            <div v-for="reward in availableRewards" :key="reward.id" class="reward-box" @click="redeemPoints(reward)">
                <!-- Gift Icon -->
                <i class="fa-duotone fa-solid fa-gift gift-icon"></i>

                <!-- Voucher text and points requirement -->
                <p class="voucher-text">Voucher of Rs {{ reward.amount }}</p>
                <p class="points-text">{{ reward.pointsRequired }} Points</p>
            </div>
        </div>

    </div>
    <PageFooter/>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import LoginHeader from '@/Components/HeaderFooter/LoginHeader.vue';
import PageFooter from '@/Components/HeaderFooter/PageFooter.vue';
const store = useStore();

// Use the correct namespaced module ('rewards')
const totalPoints = computed(() => store.getters['rewards/totalPoints']);
const availableRewards = computed(() => store.getters['rewards/availableRewards']);

// Redeem points when a reward is clicked
const redeemPoints = (reward) => {
    if (reward.pointsRequired <= totalPoints.value) {
        store.dispatch('rewards/redeemReward', reward.pointsRequired);
    } else {
        alert('Not enough points to redeem this reward!');
    }
};
</script>

<style scoped>
/* Styles remain the same */
.rewards-container {
    padding: 10px;
    background-color: #f5f5f5;
    max-width: 1000px;
    height: 150px;
    margin: 0 auto;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Points Section */
.points-section {
    background-color: #00754A;
    padding: 30px;
    text-align: center;
    color: white;
    margin-bottom: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
}

.points-section:hover {
    transform: translateY(-5px);
    /* Subtle hover effect */
}

.points-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.points-value {
    display: flex;
    align-items: center;
    justify-content: space-between; 
}

.points-value h1 {
    margin: 0;
   font-size: x-large;
}

.points-value img {
    max-width: 100px;
    height: auto;
    mask-image: linear-gradient(to right, transparent, black 30%, black 70%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 30%, black 70%, transparent); 

}


.points-link {
    color: white;
    text-decoration: underline;
    font-size: 18px;
    /* Increased font size */
}

/* Info Boxes Section */
.info-boxes {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    margin: 0 auto;
    /* This centers the element horizontally */
    max-width: 50%;
}


.info-box {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    flex: 1;
    min-width: 250px;
    text-align: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    /* Shadow for depth */
    transition: transform 0.3s;
}

.info-box:hover {
    transform: translateY(-5px);
    /* Subtle hover effect */
}

.badges {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    text-align: unset;
}

.badges-left {
    display: flex;
    align-items: center;
    /* Aligns items vertically in the center */
    gap: 10px;
    /* Adds space between the image and the text */
}

.badges-left div {
    display: flex;
    flex-direction: column;
    /* Stacks the badge title and description vertically */
}

.badge-title {
    font-weight: bold;
}


.badges-left img {
    margin-right: 10px;
}

.see-all {
    text-decoration: none;
    color: #00754a;
    font-weight: bold;
}

/* Rewards Section */
.rewards-section {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 50%;
    margin: 0 auto;
}

.rewards-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.rewards-title {
    font-size: 20px;
    font-weight: bold;
}

.terms-link {
    color: #ec008c;
    font-size: 14px;
    text-decoration: underline;
}

.rewards-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    /* Adjusted min size for wider boxes */
    gap: 20px;
}

.reward-box {
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.1);
    /* Shadow for depth */
}

.reward-box:hover {
    background-color: #f4f4f4;
    transform: translateY(-5px);
    /* Subtle hover effect */
}

.voucher-text {
    font-size: 20px;
    /* Increased font size */
    font-weight: bold;
}

.points-text {
    font-size: 14px;
    color: #888;
}

/* Responsive Styles */
@media (max-width: 600px) {
    .points-value h1 {
        font-size: x-large;
    }

    .info-boxes {
        flex-direction: column;
    }

    .rewards-list {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
    .points-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin-right: 10px;
        font-weight: bold;
    }
}



@media (max-width: 576px) {
    /* Make points section text smaller for mobile */
    .points-value {
    display: flex;
    align-items: center;
    justify-content: space-between; 
}

.points-value h1 {
    margin: 0;
   font-size: larger;
   margin-bottom: auto
}

.points-value img {
    max-width: 80px;
    height: auto;
    margin-bottom: 50px;
    mask-image: linear-gradient(to right, transparent, black 30%, black 70%, transparent); /* Transparency on sides */
    -webkit-mask-image: linear-gradient(to right, transparent, black 30%, black 70%, transparent); /* For better browser support */

}

    /* Center align the points section for mobile */
    .points-section {
        padding: 25px;
        text-align: center;
    }

 

    /* Stack the info boxes vertically on small screens */
    .info-boxes {
        flex-direction: column;
        gap: 10px;
        max-width: 100%;
    }

    /* Adjust the rewards list to show one item per row */
    .voucher-text {
        font-size: 12px;
        font-weight: bold;
    }

    .rewards-list {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .reward-box {
        font-size: 14px;
        padding: 10px;
    }

    .terms-link {
        color: #ec008c;
        font-size: 10px;
        text-decoration: underline;
    }

    /* Adjust gift icon size on small screens */
    .gift-icon {
        font-size: 30px;
    }

    .rewards-container {
        padding: 10px;
        background-color: #f5f5f5;
        max-width: 300px;
        max-height: 100px;
    }
}


/* Gift Icon Styles */
.gift-icon {
    font-size: 50px;
    /* Increased icon size */
    margin-bottom: 10px;
    /* Space between icon and text */
    background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: block;
    /* Center the icon */
    color: #ff007f;
    /* Fallback color */
    transition: transform 0.3s;
    /* Animation for hover */
}

.reward-box:hover .gift-icon {
    transform: scale(1.2);
    /* Scale up on hover */
}
</style>

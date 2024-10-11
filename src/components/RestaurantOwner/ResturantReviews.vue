<template>
    <div class="reviews-container">
        <h1>My Restaurant Reviews</h1>
        <div v-if="loading">Loading reviews...</div>
        <div v-if="error">{{ error }}</div>
        <div v-else>
            <div v-for="review in reviews" :key="review.id" class="review-card">
                <h2>{{ review.customerName }}</h2>
                <p>Total Spend: {{ review.totalSpend }}</p>
                <p>Rating: {{ review.rating }}</p>
                <p>{{ review.comment }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'OwnerReviews',
    props: {
        restaurantId: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const store = useStore();

        const reviews = computed(() => store.getters['reviews/reviews']);
        const loading = computed(() => store.getters['reviews/loading']);
        const error = computed(() => store.getters['reviews/error']);

        onMounted(() => {
            store.dispatch('reviews/fetchOwnerReviews', props.restaurantId);
        });

        return {
            reviews,
            loading,
            error,
        };
    },
};
</script>

<style scoped>
.reviews-container {
    padding: 20px;
}
.review-card {
    background-color: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin: 10px 0;
}
</style>

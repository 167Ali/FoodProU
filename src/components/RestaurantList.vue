<!-- <template>
  <div class="restaurant-list">
    <RestaurantItem v-for="item in restaurants" :key="item.id" :restaurant="item" />
  </div>
</template>

<script setup>
import RestaurantItem from './RestaurantItem.vue';

const restaurants = [
  {
    id: 1,
    name: 'Snow Ramen, Kyoto',
    info: 'Drink, Sushi, Udon, Snack, Ramen, Dessert...',
    deliveryTime: '30 mins',
    rating: '4.9',
    reviews: '2000',
    image: 'https://images.unsplash.com/photo-1477925518023-22b33cbd802c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 2,
    name: 'Sushi Zen, Tokyo',
    info: 'Sushi, Sashimi, Tempura, Udon, Dessert...',
    deliveryTime: '25 mins',
    rating: '4.8',
    reviews: '1500',
    image: 'https://plus.unsplash.com/premium_photo-1663858367001-89e5c92d1e0e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGZvb2R8ZW58MHx8MHx8fDA%3D'
  },
  {
    id: 3,
    name: 'Pho Haven, Hanoi',
    info: 'Pho, Spring Rolls, Banh Mi, Soup, Dessert...',
    deliveryTime: '20 mins',
    rating: '4.7',
    reviews: '1800',
    image: 'https://images.unsplash.com/photo-1551601651-141d9c278c35?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGhvfGVufDB8fDB8fHww'
  },
  {
    id: 4,
    name: 'Taco Fiesta, Mexico City',
    info: 'Tacos, Burritos, Quesadillas, Drinks, Dessert...',
    deliveryTime: '35 mins',
    rating: '4.6',
    reviews: '2200',
    image: 'https://images.unsplash.com/photo-1618221191747-d14a5b0f2d22?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFjb3N8ZW58MHx8MHx8MA%3D%3D'
  },
  {
    id: 5,
    name: 'Pasta Fresca, Rome',
    info: 'Pasta, Pizza, Risotto, Salad, Dessert...',
    deliveryTime: '40 mins',
    rating: '4.9',
    reviews: '1700',
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d67c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFzdGF8ZW58MHx8MHx8MA%3D%3D'
  },
  {
    id: 6,
    name: 'Curry House, Mumbai',
    info: 'Curry, Naan, Biryani, Snacks, Drinks...',
    deliveryTime: '30 mins',
    rating: '4.7',
    reviews: '2500',
    image: 'https://images.unsplash.com/photo-1594037029753-3d8d4e05e617?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3Vycnl8ZW58MHx8MHx8MA%3D%3D'
  },
  {
    id: 7,
    name: 'Burger Shack, New York',
    info: 'Burgers, Fries, Shakes, Drinks, Snacks...',
    deliveryTime: '25 mins',
    rating: '4.5',
    reviews: '3000',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVyZ2Vyc3xlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 8,
    name: 'Peking Palace, Beijing',
    info: 'Peking Duck, Dim Sum, Noodles, Rice, Dessert...',
    deliveryTime: '30 mins',
    rating: '4.8',
    reviews: '2800',
    image: 'https://images.unsplash.com/photo-1576780902622-3b98a2f9d5dd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpbSUyMHN1bXxlbnwwfHwwfHx8MA%3D%3D'
  },
  {
    id: 9,
    name: 'Le Gourmet, Paris',
    info: 'Croissant, Baguette, Salad, Soup, Pastry...',
    deliveryTime: '45 mins',
    rating: '4.9',
    reviews: '1600',
    image: 'https://images.unsplash.com/photo-1590062592589-894838b7b3b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8MA%3D%3D'
  },
  {
    id: 10,
    name: 'Tapas Bar, Barcelona',
    info: 'Tapas, Paella, Seafood, Drinks, Dessert...',
    deliveryTime: '35 mins',
    rating: '4.7',
    reviews: '2100',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBhZWxsYXxlbnwwfHwwfHx8MA%3D%3D'
  }
];

</script>

<style scoped>
.restaurant-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
</style> -->
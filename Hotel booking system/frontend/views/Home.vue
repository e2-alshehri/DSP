<template>
  <div class="p-6">
    <div class="mb-4 text-center">
      <h1 class="text-3xl font-bold text-blue-700">Welcome to the Hotel Booking System</h1>
      <p class="text-gray-600">Find your perfect stay with ease</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="hotel in hotels" :key="hotel.id" class="border rounded-lg p-4 shadow-md bg-white">
        <h3 class="text-xl font-semibold">{{ hotel.name }}</h3>
        <p class="text-sm text-gray-500">{{ hotel.location }}</p>
        <p class="mt-2">£{{ hotel.price }} / night</p>
        <router-link :to="'/hotel/' + hotel.id" class="mt-3 inline-block bg-blue-500 text-white px-3 py-1 rounded">View Details</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return { hotels: [] };
  },
  mounted() {
    axios.get('/api/hotels').then(res => this.hotels = res.data);
  }
};
</script>
*/
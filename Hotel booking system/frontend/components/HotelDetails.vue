<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">{{ hotel.name }}</h1>
    <p class="mb-2">{{ hotel.location }} - {{ hotel.description }}</p>

    <h2 class="text-2xl mt-6 mb-3">Room Types</h2>
    <div v-for="room in rooms" :key="room.id" class="mb-4 p-4 border rounded bg-white shadow">
      <h3 class="text-xl font-semibold">{{ room.type }}</h3>
      <p>Price per night: £{{ room.price }}</p>
      <p>Availability: 
        <span v-if="room.availability === 1" class="text-green-600">Available</span>
        <span v-else class="text-red-600">Not Available</span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['hotelId'],
  data() {
    return {
      hotel: {},
      rooms: []
    };
  },
  mounted() {
    this.fetchHotelDetails();
  },
  methods: {
    fetchHotelDetails() {
      axios.get(`/api/hotels/${this.hotelId}`)
        .then(response => {
          this.hotel = response.data.hotel;
          this.rooms = response.data.rooms;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>


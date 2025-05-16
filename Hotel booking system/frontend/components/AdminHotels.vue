<template>
  <div class="p-5">
    <h2 class="text-2xl font-bold mb-4">Manage Hotels</h2>

    <!-- Add Hotel Form -->
    <div class="mb-5">
      <h3 class="text-xl mb-2">Add Hotel</h3>
      <input v-model="newHotel.name" placeholder="Name" class="input mb-2">
      <input v-model="newHotel.location" placeholder="Location" class="input mb-2">
      <input v-model="newHotel.description" placeholder="Description" class="input mb-2">
      <input v-model="newHotel.price" placeholder="Price" type="number" class="input mb-2">
      <button @click="addHotel" class="bg-blue-500 text-white p-2">Add Hotel</button>
    </div>

    <!-- List of Hotels -->
    <div>
      <h3 class="text-xl mb-2">Hotels</h3>
      <div v-for="hotel in hotels" :key="hotel.id" class="border p-3 mb-3">
        <input v-model="hotel.name" class="input mb-1">
        <input v-model="hotel.location" class="input mb-1">
        <input v-model="hotel.description" class="input mb-1">
        <input v-model="hotel.price" class="input mb-1" type="number">
        <button @click="updateHotel(hotel)" class="bg-green-500 text-white p-1 mr-2">Update</button>
        <button @click="deleteHotel(hotel.id)" class="bg-red-500 text-white p-1">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hotels: [],
      newHotel: {
        name: '',
        location: '',
        description: '',
        price: ''
      }
    };
  },
  mounted() {
    this.fetchHotels();
  },
  methods: {
    fetchHotels() {
      axios.get('/api/hotels')
        .then(response => {
          this.hotels = response.data;
        });
    },
    addHotel() {
      axios.post('/api/hotels', this.newHotel, { headers: { Authorization: localStorage.getItem('token') } })
        .then(() => {
          this.fetchHotels();
          this.newHotel = { name: '', location: '', description: '', price: '' };
        });
    },
    updateHotel(hotel) {
      axios.put(`/api/hotels/${hotel.id}`, hotel, { headers: { Authorization: localStorage.getItem('token') } })
        .then(() => {
          alert('Hotel updated');
        });
    },
    deleteHotel(id) {
      axios.delete(`/api/hotels/${id}`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(() => {
          this.fetchHotels();
        });
    }
  }
};
</script>

<style>
.input {
  display: block;
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 5px;
  width: 300px;
}
</style>

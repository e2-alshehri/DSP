<template>
  <div class="p-6 bg-white rounded shadow mt-6">
    <h2 class="text-2xl font-bold mb-4">Book this Room</h2>

    <div class="mb-4">
      <label>Start Date:</label>
      <input type="date" v-model="startDate" class="border p-2 rounded w-full">
    </div>

    <div class="mb-4">
      <label>End Date:</label>
      <input type="date" v-model="endDate" class="border p-2 rounded w-full">
    </div>

    <button @click="bookRoom" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Book Now
    </button>

    <p v-if="message" class="mt-3">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['hotelId', 'roomId'],
  data() {
    return {
      startDate: '',
      endDate: '',
      message: ''
    };
  },
  methods: {
    bookRoom() {
      axios.post('/api/bookings', {
        hotelId: this.hotelId,
        roomId: this.roomId,
        startDate: this.startDate,
        endDate: this.endDate
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        this.message = "Error booking room. Please check dates or login.";
        console.error(error);
      });
    }
  }
};
</script>

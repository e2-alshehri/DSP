<template>
  <div>
    <h2>My Bookings</h2>
    <ul>
      <li v-for="booking in bookings" :key="booking.id">
        {{ booking.hotelName }} from {{ booking.startDate }} to {{ booking.endDate }}
        <button @click="cancelBooking(booking.id)" class="bg-red-500 text-white p-2">Cancel</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      bookings: []
    }
  },
  mounted() {
    axios.get('/api/bookings/me').then(response => {
      this.bookings = response.data
    })
  },
  methods: {
    cancelBooking(id) {
      axios.delete(`/api/bookings/${id}`).then(() => {
        this.bookings = this.bookings.filter(b => b.id !== id)
      })
    }
  }
}
</script>

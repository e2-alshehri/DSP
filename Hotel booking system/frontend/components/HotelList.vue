<template>
  <ul>
    <li v-for="hotel in hotels" :key="hotel.id" class="p-4 border mb-2">
      <router-link :to="'/hotel/' + hotel.id">
        <h3>{{ hotel.name }}</h3>
        <p>{{ hotel.location }}</p>
        <p>{{ hotel.price }}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      hotels: []
    }
  },
  mounted() {
    axios.get('/api/hotels').then(response => {
      this.hotels = response.data
    })
  }
}
</script>

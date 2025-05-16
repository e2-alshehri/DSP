<template>
  <div>
    <h2 class="text-xl mb-4">Register</h2>
    <input v-model="email" placeholder="Email" class="border p-2 mb-2 block" />
    <input type="password" v-model="password" placeholder="Password" class="border p-2 mb-2 block" />
    <button @click="register" class="bg-green-500 text-white p-2">Register</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register() {
      await axios.post('/api/users/register', {
        email: this.email,
        password: this.password
      })
      alert('Registered successfully')
    }
  }
}
</script>

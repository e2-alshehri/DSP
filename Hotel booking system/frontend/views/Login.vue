<template>
  <div>
    <h2 class="text-xl mb-4">Login</h2>
    <input v-model="email" placeholder="Email" class="border p-2 mb-2 block" />
    <input type="password" v-model="password" placeholder="Password" class="border p-2 mb-2 block" />
    <button @click="login" class="bg-blue-500 text-white p-2">Login</button>
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
    async login() {
      const response = await axios.post('/api/users/login', {
        email: this.email,
        password: this.password
      })
      alert('Logged in: ' + response.data.token)
    }
  }
}
</script>

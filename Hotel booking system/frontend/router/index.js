import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserBookings from '../components/UserBookings.vue'
import AdminHotels from '../components/AdminHotels.vue'
import AdminBookings from '../components/AdminBookings.vue'
import HotelDetails from '../components/HotelDetails.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/my-bookings', name: 'UserBookings', component: UserBookings },
  {
    path: '/admin/hotels',
    name: 'AdminHotels',
    component: AdminHotels,
    meta: { requiresAdmin: true }
  },
  {
    path: '/admin/bookings',
    name: 'AdminBookings',
    component: AdminBookings,
    meta: { requiresAdmin: true }
  },
  {
    path: '/hotel/:hotelId',
    name: 'HotelDetails',
    component: HotelDetails,
    props: true
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (to.meta.requiresAdmin && (!user || user.role !== 'admin')) {
    return next('/');
  }
  next();
})

export default router
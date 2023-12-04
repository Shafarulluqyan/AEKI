<script>
import { mapActions, mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'
export default {
  computed: {
    ...mapWritableState(useCounterStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useCounterStore, ['logout']),
    handleLogout() {
      this.logout()
    }
  },
  created() {
    if(localStorage.access_token){
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  }
}
</script>

<template>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-md navbar-light rounded-3" style="background-color: #fff8c9">
    <div class="container">
      <a @click="$router.push('/')" class="navbar-brand" href="#">AEKI</a>
      <!-- Tombol Toggle untuk mode mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto">
          <!-- Kiri -->
          <li class="nav-item">
            <!-- <a @click="$router.push('/')" class="nav-link" href="#">Home</a> -->
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li v-if="!isLogin" class="nav-item">
            <!-- <a @click="$router.push('/login')" class="nav-link" href="#">Sign In</a> -->
            <router-link to="/login" class="nav-link">Sign In</router-link>
          </li>
          <li v-if="!isLogin" class="nav-item">
            <!-- <a @click="$router.push('/register')" class="nav-link" href="#">Sign Up</a> -->
            <router-link to="/register" class="nav-link">Sign Up</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <!-- Kanan -->
          <li v-if="isLogin" class="nav-item">
            <!-- <a @click="$router.push('/bookmark')" class="nav-link" href="#">Bookmark</a> -->
            <router-link to="/bookmark" class="nav-link">Bookmark</router-link>
          </li>
          <li v-if="isLogin" class="nav-item">
            <a class="nav-link" href="#" @click="handleLogout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

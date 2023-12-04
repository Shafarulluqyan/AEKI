<script>
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['loginHandler']),
    doLogin() {
      this.loginHandler({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<template>
  <!-- Login Section -->
  <div class="container mt-5 rounded-3">
    <div class="row justify-content-center">
      <div class="col-md-6 text-center">
        <h2 class="heading-section">Login</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 mt-3">
        <div class="card">
          <div class="card-body rounded-3" style="background-color: #fff8c9">
            <div class="row">
              <!-- Kotak gambar -->
              <div class="col-md-6">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  class="img-fluid"
                  alt="Login Image"
                />
              </div>
              <!-- Kotak form login -->
              <div class="col-md-6">
                <div
                  class="login-container"
                  style="background-color: white; padding: 20px; border-radius: 10px"
                >
                  <h3 class="mb-4">Sign In</h3>
                  <form @submit.prevent="doLogin" class="signin-form">
                    <div class="form-group mb-3">
                      <label for="name">Email</label>
                      <input v-model="email" type="text" class="form-control" placeholder="Email" required />
                    </div>
                    <div class="form-group mb-3">
                      <label for="password">Password</label>
                      <input v-model="password" type="password" class="form-control" placeholder="Password" required />
                    </div>
                    <p class="text-center">
                      Not a member?
                      <a @click="$router.push('/register')" href="#signup" class="btn btn-link">Sign Up</a>
                    </p>
                    <div class="form-group">
                      <button type="submit" class="btn btn-primary btn-block rounded px-3">
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

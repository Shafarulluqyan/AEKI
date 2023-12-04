import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DetailProduct from '../views/DetailProduct.vue'
import BookmarkView from '../views/BookmarkView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView
    },
    {
      name: 'login',
      path: '/login',
      component: LoginView
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterView
    },
    {
      name: 'detail',
      path: '/detail/:id',
      component: DetailProduct
    },
    {
      name: 'bookmark',
      path: '/bookmark',
      component: BookmarkView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.access_token

  if (to.name === 'bookmark' && !isAuthenticated) {
    next('/login')
  } else if (to.name === 'login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router

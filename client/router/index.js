import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Gallery from '../views/Gallery.vue';
import NewGallery from '../views/NewGallery.vue';
import User from '../views/User.vue';
import PageNotFound from '../views/PageNotFound.vue';
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!store.state.user.is_logged_in) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/newgallery',
    name: 'NewGallery',
    component: NewGallery
  },
  {
    path: '/gallery/:galleryId',
    name: 'Gallery',
    component: Gallery,
    beforeEnter: (to, from, next) => {
      if (!store.state.user.is_logged_in) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: '/settings',
    name: 'User',
    component: User,
    beforeEnter: (to, from, next) => {
      if (!store.state.user.is_logged_in) next({ name: 'Login' })
      else next()
    }
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: PageNotFound,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

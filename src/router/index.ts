import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'
import LoginPage from '@/views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('@/views/GamePage.vue'),
    }
  ]
})

router.beforeEach(authGuard)

export default router

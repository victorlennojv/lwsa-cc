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
      path: '/home',
      component: () => import('@/layouts/LoggedLayout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/GameHomePage.vue'),
        },
        {
          path: '/game',
          name: 'memory-game',
          component: () => import('@/views/MemoryGamePage.vue'),
        }
      ]
    }
  ]
})

router.beforeEach(authGuard)

export default router

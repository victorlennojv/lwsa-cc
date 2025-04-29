import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  if (to.path === '/game' && !authStore.isAuthenticated) {
    next('/')
  } else if (to.path === '/' && authStore.isAuthenticated) {
    next('/game')
  } else {
    next()
  }
} 
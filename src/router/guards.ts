import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore()

  if (to.path !== '/' && !authStore.isAuthenticated) {
    return next('/')
  }

  if (to.path === '/' && authStore.isAuthenticated) {
    return next('/home')
  }

  next()
}

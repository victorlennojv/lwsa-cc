import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, TokenPayload, AuthError } from '@/types/auth'

const STORAGE_KEY = 'auth_token'
const USER_KEY = 'user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem(USER_KEY) || 'null'))
  const isLoading = ref(false)
  const error = ref<AuthError | null>(null)
  const token = ref<string | null>(localStorage.getItem(STORAGE_KEY))

  const isAuthenticated = computed(() => user.value !== null)

  const parseToken = (token: string): TokenPayload => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  }

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem(STORAGE_KEY, newToken)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const setUser = (newUser: User | null) => {
    user.value = newUser
    if (newUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(newUser))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }

  const loginWithGoogle = async (credential: string) => {
    try {
      isLoading.value = true
      error.value = null

      const payload = parseToken(credential)
      setToken(credential)

      user.value = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture
      }

      setUser(user.value)
    } catch (err) {
      error.value = {
        code: 'LOGIN_ERROR',
        message: err instanceof Error ? err.message : 'Falha ao fazer login com Google'
      }
      console.error('Login error:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    setToken(null)
    setUser(null)
    error.value = null
  }

  return {
    user,
    isLoading,
    error,
    token,
    isAuthenticated,
    loginWithGoogle,
    logout,
  }
}) 
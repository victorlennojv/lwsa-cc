<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/auth/LoginForm.vue'
import { watch } from 'vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async (credential: string) => {
  await authStore.loginWithGoogle(credential)
}

watch(() => authStore.user, (user) => {
  if (user) {
    router.push('/game')
  }
})
</script>

<template>
  <div class="bg-gray-100 rounded-lg">
    <LoginForm
      :is-loading="authStore.isLoading"
      :error="authStore.error"
      @login="handleLogin"
    />
  </div>
</template>

<style lang="scss" scoped>
  
</style>

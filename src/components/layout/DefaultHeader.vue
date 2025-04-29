<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="mx-auto px-1">
    <div class="flex justify-between items-center mb-4">
      <div>
        <p class="text-gray-600">Bem-vindo, {{ authStore.user?.name }}!</p>
      </div>
      <BaseButton
        variant="primary"
        @click="handleLogout"
      >
        Sair
      </BaseButton>
    </div>
  </header>
</template>

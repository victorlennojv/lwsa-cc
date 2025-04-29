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
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Jogo da Memória</h1>
          <p class="mt-2 text-gray-600">Bem-vindo, {{ authStore.user?.name }}!</p>
        </div>
        <BaseButton
          variant="primary"
          @click="handleLogout"
        >
          Sair
        </BaseButton>
      </div>
    </div>
  </div>
</template> 
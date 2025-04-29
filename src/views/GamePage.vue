<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Jogo da Memória</h1>
          <p class="mt-2 text-gray-600">Bem-vindo, usuário!</p>
        </div>
        <BaseButton variant="primary">
          Sair
        </BaseButton>
      </div>
    </div>
  </div>
</template> 
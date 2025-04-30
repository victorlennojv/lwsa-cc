<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps<{
  minutes: string | number
  seconds: string | number
  turns: number
  score: number
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <h2 class="text-2xl font-bold text-center mb-6">Parabéns! 🎉</h2>
      
      <div class="space-y-4">
        <div class="text-center">
          <p class="text-gray-600">Seu score final:</p>
          <p class="text-4xl font-bold text-primary">{{ score }}</p>
        </div>

        <div class="text-center text-gray-600">
          <p>Tempo: {{ minutes }}:{{ seconds.toString().padStart(2, '0') }}</p>
          <p>Tentativas: {{ turns }}</p>
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <BaseButton @click="$emit('close')">
          Fechar
        </BaseButton>
      </div>
    </div>
  </div>
</template> 
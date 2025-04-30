<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue'

interface Props {
  minutes?: string | number
  seconds?: string | number
  turns?: number
  score?: number
  isSubmitting?: boolean
  error?: string | null
  success?: string | null
}

const { 
  minutes = 0, 
  seconds = 0, 
  turns = 0, 
  score = 0,
  isSubmitting = false,
  error = null,
  success = null
} = defineProps<Props>()

defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()
</script>

<template>
  <div class="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-500">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
      <h2 class="text-2xl font-bold text-center mb-6">Parabéns! 🎉</h2>
      
      <div class="space-y-4">
        <div class="text-center">
          <p class="text-gray-600">Seu score final:</p>
          <p data-testid="modal-score" class="text-4xl font-bold text-primary">{{ score }}</p>
        </div>

        <div class="text-center text-gray-600">
          <p data-testid="modal-time">Tempo: {{ minutes }}:{{ seconds.toString().padStart(2, '0') }}</p>
          <p data-testid="modal-turns">Tentativas: {{ turns }}</p>
        </div>

        <p v-if="error" class="text-center text-red-500 mt-4">
          {{ error }}
        </p>

        <p v-if="success" class="text-center text-green-500 mt-4">
          {{ success }}
        </p>
      </div>

      <div class="mt-8 flex justify-center gap-4">
        <BaseButton 
          variant="primary"
          :is-loading="isSubmitting"
          @click="$emit('submit')"
        >
          {{ isSubmitting ? 'Enviando...' : 'Enviar Score' }}
        </BaseButton>
        <BaseButton 
          variant="secondary"
          :disabled="isSubmitting"
          @click="$emit('close')"
        >
          Fechar
        </BaseButton>
      </div>
    </div>
  </div>
</template> 
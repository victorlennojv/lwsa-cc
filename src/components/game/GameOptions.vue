<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue'
import type { GameDifficulty } from '@/stores/game'

defineProps<{
  selectedDifficulty: GameDifficulty
}>()

const emit = defineEmits<{
  (e: 'update:difficulty', value: GameDifficulty): void
  (e: 'start'): void
  (e: 'showAbout'): void
}>()

const difficulties = [
  { value: 'easy' as GameDifficulty, label: 'Fácil' },
  { value: 'medium' as GameDifficulty, label: 'Médio' },
  { value: 'hard' as GameDifficulty, label: 'Difícil' }
]
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-center items-center gap-4 flex-col">
      <BaseButton
        variant="primary"
        @click="emit('start')"
      >
        Iniciar Jogo
      </BaseButton>
      <BaseButton
        variant="secondary"
        @click="emit('showAbout')"
      >
        Sobre o Jogo
      </BaseButton>
    </div>

    <div class="flex flex-col items-center space-y-4">
      <h2 class="text-xl font-semibold text-gray-800">Escolha a Dificuldade</h2>
      <div class="flex space-x-4">
        <BaseButton
          v-for="difficulty in difficulties"
          :key="difficulty.value"
          :variant="selectedDifficulty === difficulty.value ? 'primary' : 'secondary'"
          @click="emit('update:difficulty', difficulty.value)"
        >
          {{ difficulty.label }}
        </BaseButton>
      </div>
    </div>
  </div>
</template> 
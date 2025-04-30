<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue'
interface Props {
  turns: number
  minutes: string | number
  seconds: string | number
  isFinished: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'reset'): void
}>()
</script>

<template>
  <div class="flex justify-center gap-5 mb-5 items-center">
    <div class="turns">
      <span class="mr-2">Tentativas: </span>
      <span :class="['px-2.5 py-1.5 rounded', isFinished ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-800']">{{ turns }}</span>
    </div>
    <div class="time">
      <span class="mr-2">Tempo total: </span>
      <span :class="['px-2.5 py-1.5 rounded', isFinished ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-800']">{{ minutes }}:{{ seconds }}</span>
    </div>
    <BaseButton
      variant="secondary"
      @click="emit('reset')"
    >
      Reiniciar
    </BaseButton>
  </div>
</template>
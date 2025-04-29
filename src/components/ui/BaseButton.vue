<script lang="ts" setup>
import { computed } from 'vue'
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue'

interface Props {
  disabled?: boolean
  fullWidth?: boolean
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
}

const { 
  disabled = false, 
  fullWidth = false, 
  isLoading = false, 
  type = 'button', 
  variant = 'primary' 
} = defineProps<Props>()


const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200'
const variantClasses = computed(() => ({
  primary: 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400',
  secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-400',
}))

const buttonClasses = computed(() => [
  baseClasses,
  variantClasses.value[variant],
  fullWidth ? 'w-full' : '',
  disabled || isLoading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer ',
].join(' '))

const handleClick = (event: MouseEvent) => {
  if (!disabled && !isLoading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled || isLoading"
    @click="handleClick"
  >
    <slot name="prefix" />
    <span v-if="isLoading" class="mr-2">
      <SpinnerIcon class="h-4 w-4" />
    </span>
    <slot />
    <slot name="suffix" />
  </button>
</template> 
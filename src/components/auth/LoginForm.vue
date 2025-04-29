<script lang="ts" setup>
import { GoogleLogin } from 'vue3-google-login'
import GameBanner from '@/components/GameBanner.vue'

interface Props {
  isLoading: boolean
  error: { code: string; message: string } | null
}

interface Emits {
  (e: 'login', credential: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const handleGoogleLogin = (response: { credential: string }) => {
  emit('login', response.credential)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12">
    <div class="w-full max-w-md">
      <GameBanner />
      <div class="mt-8 flex flex-col items-center">
        <GoogleLogin :callback="handleGoogleLogin" />
        <p v-if="props.error" class="mt-2 text-sm text-red-500 text-center">
          {{ props.error.message }}
        </p>
      </div>
    </div>
  </div>
</template> 
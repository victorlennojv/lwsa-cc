<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue';
import GoogleIcon from '@/components/icons/GoogleIcon.vue';

const emit = defineEmits<{
  (e: 'login'): void;
}>();

const handleLogin = () => {
  emit('login');
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in with your google account
        </h2>
      </div>
      <div class="mt-8 space-y-6">
        <div>
          <BaseButton
            variant="primary"
            full-width
            @click="handleLogin"
          >
            <template #prefix>
              <GoogleIcon class="h-5 w-5 mr-2" />
            </template>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template> 
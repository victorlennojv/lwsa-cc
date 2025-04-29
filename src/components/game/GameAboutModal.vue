<script lang="ts" setup>
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-500"
    @click="emit('close')"
  >
    <div
      class="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-500"
      @click.stop
    >
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-2xl font-bold text-gray-900">Sobre o Jogo</h3>
      </div>
      <div class="space-y-4">
        <p class="text-gray-600 leading-relaxed text-justify">
          O Jogo da Memória é um jogo das antigas (clássico kk) onde você precisa encontrar pares de cartas iguais. <br />
          Quanto maior a dificuldade, mais cartas você terá que memorizar! <br />
          Nessa aplicação, você será recompensado pela agilidade e número de tentativas. <br />
          Quanto mais rápido você encontrar os pares e menos tentativas você precisar, mais pontos você receberá! <br />
          Boa sorte!
        </p>
        <div class="pt-4 flex justify-end">
          <BaseButton
            variant="secondary"
            @click="emit('close')"
          >
            Fechar
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template> 
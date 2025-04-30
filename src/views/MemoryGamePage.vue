<script lang="ts" setup>
import { onMounted, ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import GameCard from '@/components/game/GameCard.vue'
import GameInfo from '@/components/game/GameInfo.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useGameStore } from '@/stores/game'
import { getDogImages } from '@/services/images'
import { useMemoryGame } from '@/composables/useMemoryGame'
import { useAuthStore } from '@/stores/auth'
import { submitGameResult } from '@/services/gameResults'

const GameFinishModal = defineAsyncComponent(() => import('@/components/game/GameFinishModal.vue'))

const router = useRouter()
const gameStore = useGameStore()
const authStore = useAuthStore()
const { 
  sec, 
  min, 
  memoryCards, 
  turns, 
  finish, 
  flipCard, 
  resetGame
} = useMemoryGame()

const isLoading = ref(false)
const isSubmitting = ref(false)
const submitError = ref<string | null>(null)
const submitSuccess = ref<string | null>(null)

const finalScore = computed(() => {
  const timeInSeconds = Number(min.value) * 60 + Number(sec.value)
  return ((gameStore.pairsCount * 25) - timeInSeconds - turns.value)
})

const initializeGame = async () => {
  try {
    isLoading.value = true
    const dogImages = await getDogImages(gameStore.pairsCount)
    resetGame(dogImages)
  } catch (error) {
    console.error('Ocorreu um erro ao buscar os dados:', error)
    router.push('/home')
  } finally {
    isLoading.value = false
  }
}

const submitScore = async () => {
  try {
    isSubmitting.value = true
    submitError.value = null
    submitSuccess.value = null

    await submitGameResult({
      userId: authStore.user?.id || '',
      score: finalScore.value,
      time: {
        minutes: Number(min.value),
        seconds: Number(sec.value)
      },
      turns: turns.value,
      difficulty: gameStore.difficulty
    })

    submitSuccess.value = 'Score enviado com sucesso!'
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    router.push('/home')    
  } catch (error) {
    console.error('Erro ao enviar score:', error)
    submitError.value = 'Erro ao enviar score. Tente novamente. (erro por conta da API mockada)'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  initializeGame()
})
</script>

<template>
  <div class="memory-game bg-gray-100 rounded-lg min-h-screen p-4">
    <BaseLoader v-if="isLoading" />
    
    <div class="flex justify-center">
      <BaseButton
        class="mt-4 mb-8"
        @click="router.push('/')"
      >
        Voltar para o menu
      </BaseButton>
    </div>

    <GameInfo
      :turns="turns"
      :minutes="min"
      :seconds="sec"
      :is-finished="finish"
      @reset="initializeGame"
    />

    <div class="flex flex-wrap justify-center gap-4.5 max-w-[550px] mx-auto mb-8">
      <GameCard
        v-for="card in memoryCards"
        :key="card.id"
        :card="card"
        @flip="flipCard"
      />
    </div>

    <GameFinishModal
      v-if="finish"
      :minutes="min"
      :seconds="sec"
      :turns="turns"
      :score="finalScore"
      :is-submitting="isSubmitting"
      :error="submitError"
      :success="submitSuccess"
      @submit="submitScore"
      @close="initializeGame"
    />
  </div>
</template>
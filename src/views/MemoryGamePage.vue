<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GameCard from '@/components/game/GameCard.vue'
import GameInfo from '@/components/game/GameInfo.vue'
import GameLoader from '@/components/ui/GameLoader.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import GameFinishModal from '@/components/game/GameFinishModal.vue'
import { useGameStore } from '@/stores/game'
import { getDogImages } from '@/services/images'
import { useMemoryGame } from '@/composables/useMemoryGame'

const router = useRouter()
const gameStore = useGameStore()
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

onMounted(() => {
  initializeGame()
})
</script>

<template>
  <div class="memory-game bg-gray-100 rounded-lg p-4">
    <GameLoader v-if="isLoading" />
    
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

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-[550px] mx-auto mb-8">
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
      @close="initializeGame"
    />
  </div>
</template>
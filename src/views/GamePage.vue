<script lang="ts" setup>
import { ref } from 'vue'
import GameBanner from '@/components/GameBanner.vue'
import GameOptions from '@/components/game/GameOptions.vue'
import GameAboutModal from '@/components/game/GameAboutModal.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()
const showAboutModal = ref(false)

const handleStartGame = () => {
  console.log('Iniciando jogo com dificuldade:', gameStore.difficulty)
}

const handleShowAbout = () => {
  showAboutModal.value = true
}

const handleCloseAbout = () => {
  showAboutModal.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <GameBanner />
      <GameOptions
        :selected-difficulty="gameStore.difficulty"
        @update:difficulty="gameStore.setDifficulty"
        @start="handleStartGame"
        @show-about="handleShowAbout"
      />
      <GameAboutModal
        :show="showAboutModal"
        @close="handleCloseAbout"
      />
    </div>
  </div>
</template> 
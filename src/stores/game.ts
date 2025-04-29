import { defineStore } from 'pinia'
import { ref } from 'vue'

export type GameDifficulty = 'easy' | 'medium' | 'hard'

export const useGameStore = defineStore('game', () => {
  const difficulty = ref<GameDifficulty>('medium')
  const score = ref(0)
  const attempts = ref(0)

  const setDifficulty = (newDifficulty: GameDifficulty) => {
    difficulty.value = newDifficulty
  }

  const resetGame = () => {
    score.value = 0
    attempts.value = 0
  }

  return {
    difficulty,
    score,
    attempts,
    setDifficulty,
    resetGame
  }
}) 
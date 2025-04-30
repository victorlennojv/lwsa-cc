import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type GameDifficulty = 'easy' | 'medium' | 'hard'

const DIFFICULTY_PAIRS = {
  easy: 4,
  medium: 6,
  hard: 8
}

export const useGameStore = defineStore('game', () => {
  const difficulty = ref<GameDifficulty>('medium')
  const score = ref(0)
  const attempts = ref(0)

  const pairsCount = computed(() => DIFFICULTY_PAIRS[difficulty.value])

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
    pairsCount,
    setDifficulty,
    resetGame
  }
}) 
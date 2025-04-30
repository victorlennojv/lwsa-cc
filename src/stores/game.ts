import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type GameDifficulty = 'easy' | 'medium' | 'hard'

const DIFFICULTY_PAIRS = {
  easy: 8,
  medium: 10,
  hard: 12
}

export const useGameStore = defineStore('game', () => {
  const difficulty = ref<GameDifficulty>('medium')

  const pairsCount = computed(() => DIFFICULTY_PAIRS[difficulty.value])

  const setDifficulty = (newDifficulty: GameDifficulty) => {
    difficulty.value = newDifficulty
  }

  return {
    difficulty,
    pairsCount,
    setDifficulty
  }
}) 
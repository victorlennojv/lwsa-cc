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
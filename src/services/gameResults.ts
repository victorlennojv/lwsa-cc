import type { GameResult } from '@/types/game'
import { useAuthStore } from '@/stores/auth'

export const submitGameResult = async (result: GameResult): Promise<boolean> => {
  try {
    const authStore = useAuthStore()
    const token = authStore.token || ''

    const response = await fetch('https://api.mockada.com/game-results', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userId: result.userId,
        score: result.score,
        time: {
          minutes: result.time.minutes,
          seconds: result.time.seconds
        },
        turns: result.turns,
        difficulty: result.difficulty
      })
    })

    if (!response.ok) {
      throw new Error('Falha ao enviar score')
    }

    return true
  } catch (error) {
    console.error('Erro ao submeter resultado:', error)
    throw error
  }
} 
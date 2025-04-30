export interface GameResult {
  userId: string
  score: number
  time: {
    minutes: number
    seconds: number
  }
  turns: number
  difficulty: 'easy' | 'medium' | 'hard'
} 
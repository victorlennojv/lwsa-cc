export interface Card {
  id: string
  img: string
  isFlipped: boolean
  isMatched: boolean
}

export interface GameTime {
  minutes: number
  seconds: number
}

export interface MemoryGameState {
  cards: Card[]
  memoryCards: Card[]
  flippedCards: Card[]
  start: boolean
  turns: number
  finish: boolean
  isLoading: boolean
  totalTime: GameTime
} 
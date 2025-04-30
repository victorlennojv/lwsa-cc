import { ref } from 'vue'
import { useTimer } from './useTimer'
import { shuffle } from '@/utils/utils'
import type { Card } from '@/types/memory-game'
import type { DogImage } from '@/types/dog'


export const useMemoryGame = () => {
  const { sec, min, startTimer, stopTimer, resetTimer } = useTimer()

  const images = ref<DogImage[]>([])
  const cards = ref<Card[]>([])
  const memoryCards = ref<Card[]>([])
  const flippedCards = ref<Card[]>([])
  const start = ref(false)
  const finish = ref(false)
  const turns = ref(0)

  const setupCards = (imgs: DogImage[]) => {
    const baseCards = imgs.map(dog => ({
      id: dog.id.toString(),
      img: dog.url,
      isFlipped: false,
      isMatched: false,
    }))

    // I have to add this posfix to differentiate cards id in render (vueWarns)
    const pairs = baseCards.flatMap(card => [
      { ...card, id: `${card.id}-1` },
      { ...card, id: `${card.id}-2` },
    ])

    memoryCards.value = shuffle(pairs)
  }

  const resetGame = (imgs: DogImage[]) => {
    stopTimer()
    resetTimer()
    cards.value = []
    flippedCards.value = []
    turns.value = 0
    start.value = false
    finish.value = false
    images.value = imgs
    setupCards(imgs)
  }

  const flipCard = (card: Card) => {
    if (card.isMatched || card.isFlipped || flippedCards.value.length === 2) return
    if (!start.value) {
      startTimer()
      start.value = true
    }

    card.isFlipped = true
    flippedCards.value.push(card)

    if (flippedCards.value.length === 2) {
      setTimeout(checkMatch, 450)
    }
  }

  const getBaseCardIdWithoutPosfix = (cardId: string) => {
    // Here I remove the posfix to compare the cards
    return cardId.split('-')[0]
  }

  const checkMatch = () => {
    turns.value++

    const [card1, card2] = flippedCards.value
    const id1 = getBaseCardIdWithoutPosfix(card1.id)
    const id2 = getBaseCardIdWithoutPosfix(card2.id)

    if (id1 !== id2) {
      setTimeout(() => {
        flippedCards.value.forEach(c => (c.isFlipped = false))
        flippedCards.value = []
      }, 1000)
      return
    }

    flippedCards.value.forEach(flippedCard => (flippedCard.isMatched = true))
    flippedCards.value = []

    if (memoryCards.value.every(card => card.isMatched)) {
      stopTimer()
      finish.value = true
    }
  }

  return {
    sec,
    min,
    images,
    memoryCards,
    turns,
    finish,
    flipCard,
    resetGame,
    start,
  }
}
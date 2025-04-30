import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameFinishModal from '../GameFinishModal.vue'

describe('GameFinishModal', () => {
  const PAIRS_COUNT = 4 // Valor fixo para os testes (pode ser alterado conforme necessário)

  const calculateExpectedScore = (minutes: number, seconds: number) => {
    const timeInSeconds = minutes * 60 + seconds
    return ((PAIRS_COUNT * 20) - timeInSeconds) * PAIRS_COUNT
  }

  describe('time display', () => {
    it('should format time correctly', () => {
      const wrapper = mount(GameFinishModal, {
        props: {
          minutes: 1,
          seconds: 5,
        }
      })

      expect(wrapper.find('[data-testid="modal-time"]').text()).toBe('Tempo: 1:05')
    })

    it('should pad single digit seconds with zero', () => {
      const wrapper = mount(GameFinishModal, {
        props: {
          minutes: 2,
          seconds: 5,
        }
      })

      expect(wrapper.find('[data-testid="modal-time"]').text()).toBe('Tempo: 2:05')
    })
  })

  describe('turns display', () => {
    it('should display the number of turns', () => {
      const wrapper = mount(GameFinishModal, {
        props: {
          turns: 5,
        }
      })

      expect(wrapper.find('[data-testid="modal-turns"]').text()).toBe('Tentativas: 5')
    })
  })

  describe('score calculation scenarios', () => {
    it('should calculate score for quick game (30 seconds)', () => {
      const minutes = 0
      const seconds = 30
      const expectedScore = calculateExpectedScore(minutes, seconds)

      const wrapper = mount(GameFinishModal, {
        props: {
          minutes,
          seconds,
          turns: 3,
          score: expectedScore
        }
      })

      expect(wrapper.find('[data-testid="modal-score"]').text()).toBe(expectedScore.toString())
    })

    it('should calculate score for longer game (2 minutes)', () => {
      const minutes = 8
      const seconds = 0
      const expectedScore = calculateExpectedScore(minutes, seconds)

      const wrapper = mount(GameFinishModal, {
        props: {
          minutes,
          seconds,
          turns: 8,
          score: expectedScore
        }
      })

      expect(wrapper.find('[data-testid="modal-score"]').text()).toBe(expectedScore.toString())
    })
  })
}) 
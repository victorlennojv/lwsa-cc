import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GameCard from '../GameCard.vue'

describe('GameCard', () => {
  const createCard = (isFlipped = false, isMatched = false) => ({
    id: '1',
    img: 'test-image.jpg',
    isFlipped,
    isMatched
  })

  describe('Rendering', () => {
    it('should render correctly an unflipped card', () => {
      const wrapper = mount(GameCard, {
        props: {
          card: createCard()
        }
      })

      expect(wrapper.find('[data-testid="game-card"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="game-card-front"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="game-card-back"]').exists()).toBe(true)
      expect(wrapper.find('[data-testid="game-card"]').classes()).not.toContain('game-card--flipped')
      expect(wrapper.find('[data-testid="game-card"]').classes()).not.toContain('game-card--matched')
    })

    it('should apply flipped class when card is flipped', () => {
      const wrapper = mount(GameCard, {
        props: {
          card: createCard(true)
        }
      })

      expect(wrapper.find('[data-testid="game-card"]').classes()).toContain('game-card--flipped')
    })

    it('should apply matched class when card is matched', () => {
      const wrapper = mount(GameCard, {
        props: {
          card: createCard(true, true)
        }
      })

      expect(wrapper.find('[data-testid="game-card"]').classes()).toContain('game-card--matched')
    })
  })

  describe('Interactions', () => {
    it('should emit flip event when clicked', async () => {
      const card = createCard()
      const wrapper = mount(GameCard, {
        props: { card }
      })

      await wrapper.find('[data-testid="game-card"]').trigger('click')

      expect(wrapper.emitted()).toHaveProperty('flip')
      expect(wrapper.emitted('flip')?.[0]).toEqual([card])
    })

    it('should display the correct image on card back', () => {
      const card = createCard()
      const wrapper = mount(GameCard, {
        props: { card }
      })

      const img = wrapper.find('[data-testid="game-card-image"]')
      expect(img.attributes('src')).toBe(card.img)
    })
  })
}) 
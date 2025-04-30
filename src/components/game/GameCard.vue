<script lang="ts" setup>
interface Card {
  id: string
  img: string
  isFlipped: boolean
  isMatched: boolean
}

interface Props {
  card: Card
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'flip', card: Card): void
}>()

const handleClick = () => {
  emit('flip', props.card)
}
</script>

<template>
  <div
    data-testid="game-card"
    class="game-card"
    :class="{
      'game-card--flipped': card.isFlipped,
      'game-card--matched': card.isMatched
    }"
    @click="handleClick"
  >
    <div class="game-card__container">
      <div data-testid="game-card-front" class="game-card__front bg-indigo-300">
        <div class="game-card__pattern absolute inset-0 opacity-20"></div>
      </div>
      <div data-testid="game-card-back" class="game-card__back">
        <img 
          data-testid="game-card-image"
          :src="card.img" 
          alt="Dog" 
          class="game-card__image w-full h-full object-cover rounded-lg"
          :class="{ 'game-card__image--matched': card.isMatched }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.game-card {
  position: relative;
  height: 120px;
  width: 120px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.6s;

  &--flipped {
    transform: rotateY(180deg);
  }

  &--matched {
    cursor: default;
  }

  &__container {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
  }

  &__front,
  &__back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &__back {
    transform: rotateY(180deg);
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;

    &--matched {
      opacity: 0.7;
    }
  }
}
</style> 
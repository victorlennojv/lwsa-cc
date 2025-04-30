import { ref, computed } from 'vue'

export function useTimer() {
  const totalTime = ref({ minutes: 0, seconds: 0 })
  let interval: number | null = null

  const sec = computed(() =>
    totalTime.value.seconds < 10 ? `0${totalTime.value.seconds}` : totalTime.value.seconds
  )

  const min = computed(() =>
    totalTime.value.minutes < 10 ? `0${totalTime.value.minutes}` : totalTime.value.minutes
  )

  const startTimer = () => {
    const tick = () => {
      totalTime.value.seconds = (totalTime.value.seconds + 1) % 60
      if (totalTime.value.seconds === 0) {
        totalTime.value.minutes++
      }
    }

    tick()
    interval = setInterval(tick, 1000)
  }

  const stopTimer = () => {
    if (interval) clearInterval(interval)
  }

  const resetTimer = () => {
    totalTime.value.minutes = 0
    totalTime.value.seconds = 0
  }

  return { totalTime, sec, min, startTimer, stopTimer, resetTimer }
}
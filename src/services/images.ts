import type { DogImage } from '@/types/dog'

const BASE_URL = 'https://dog.ceo/api'

export const getDogImages = async (count: number): Promise<DogImage[]> => {
  try {
    const response = await fetch(`${BASE_URL}/breeds/image/random/${count}`)
    const data = await response.json()
    console.log(data)

    if (data.status !== 'success') {
      throw new Error('Failed to fetch dog images')
    }

    return data.message.map((url: string, index: number) => ({
      id: index,
      url
    }))
  } catch (error) {
    console.error('Error fetching dog images:', error)
    throw error
  }
} 
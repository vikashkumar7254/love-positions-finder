/**
 * Initialize default images with some sample data
 * This can be called on app startup to populate default images
 */

import { addDefaultImage } from './defaultImageManager'

const SAMPLE_DEFAULT_IMAGES = [
  {
    title: 'Romantic Journey',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center',
    category: 'romantic',
    description: 'Perfect for romantic and intimate moments',
    isActive: true
  },
  {
    title: 'Passionate Adventure',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
    category: 'passionate',
    description: 'Intense and passionate experiences',
    isActive: true
  },
  {
    title: 'Adventurous Exploration',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center',
    category: 'adventurous',
    description: 'Exciting and adventurous intimate moments',
    isActive: true
  },
  {
    title: 'Sensual Connection',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
    category: 'sensual',
    description: 'Deep sensual and emotional connections',
    isActive: true
  },
  {
    title: 'Playful Fun',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
    category: 'playful',
    description: 'Light-hearted and playful intimate moments',
    isActive: true
  },
  {
    title: 'Luxurious Indulgence',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop&crop=center',
    category: 'luxurious',
    description: 'Premium and luxurious intimate experiences',
    isActive: true
  },
  {
    title: 'Journey Default',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center',
    category: 'journey',
    description: 'Default image for journey planning',
    isActive: true
  },
  {
    title: 'General Default',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center',
    category: 'general',
    description: 'General purpose default image',
    isActive: true
  }
]

/**
 * Initialize default images if none exist
 */
export const initializeDefaultImages = (): void => {
  try {
    const existingImages = localStorage.getItem('default_images_custom')
    if (existingImages) {
      // Images already exist, don't initialize
      return
    }

    // Add sample default images
    SAMPLE_DEFAULT_IMAGES.forEach(imageData => {
      addDefaultImage(imageData)
    })

    console.log('Default images initialized successfully')
  } catch (error) {
    console.error('Failed to initialize default images:', error)
  }
}

/**
 * Check if default images need initialization
 */
export const needsDefaultImageInitialization = (): boolean => {
  try {
    const existingImages = localStorage.getItem('default_images_custom')
    return !existingImages
  } catch {
    return true
  }
}

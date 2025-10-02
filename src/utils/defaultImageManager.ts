/**
 * Default Image Manager
 * 
 * This utility manages default images that can be customized by admins.
 * It provides fallback images for different categories and styles.
 */

export interface DefaultImageItem {
  id: string
  title: string
  image: string
  category: string
  description: string
  isActive: boolean
  createdAt: string
}

const STORAGE_KEY = 'default_images_custom'

// Fallback default images for each category
const FALLBACK_IMAGES: Record<string, string> = {
  journey: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center',
  romantic: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center',
  passionate: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
  adventurous: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=300&fit=crop&crop=center',
  sensual: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
  playful: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center',
  luxurious: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=300&fit=crop&crop=center',
  general: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop&crop=center'
}

/**
 * Get all custom default images from localStorage
 */
export const getAllDefaultImages = (): DefaultImageItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: DefaultImageItem[] = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Get active default images for a specific category
 */
export const getDefaultImagesByCategory = (category: string): DefaultImageItem[] => {
  const allImages = getAllDefaultImages()
  return allImages.filter(item => item.category === category && item.isActive)
}

/**
 * Get the first available default image for a category
 * Falls back to hardcoded fallback if no custom images are available
 */
export const getDefaultImageForCategory = (category: string): string => {
  const categoryImages = getDefaultImagesByCategory(category)
  
  if (categoryImages.length > 0) {
    // Return the first active image for this category
    return categoryImages[0].image
  }
  
  // Fall back to hardcoded fallback
  return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.general
}

/**
 * Get a random default image for a category
 */
export const getRandomDefaultImageForCategory = (category: string): string => {
  const categoryImages = getDefaultImagesByCategory(category)
  
  if (categoryImages.length > 0) {
    const randomIndex = Math.floor(Math.random() * categoryImages.length)
    return categoryImages[randomIndex].image
  }
  
  // Fall back to hardcoded fallback
  return FALLBACK_IMAGES[category] || FALLBACK_IMAGES.general
}

/**
 * Get multiple default images for a category (useful for galleries)
 */
export const getDefaultImagesForCategory = (category: string, limit?: number): string[] => {
  const categoryImages = getDefaultImagesByCategory(category)
  
  if (categoryImages.length === 0) {
    return [FALLBACK_IMAGES[category] || FALLBACK_IMAGES.general]
  }
  
  const images = categoryImages.map(item => item.image)
  return limit ? images.slice(0, limit) : images
}

/**
 * Get default image for journey style
 */
export const getDefaultImageForJourneyStyle = (style: string): string => {
  // Map journey styles to categories
  const styleMap: Record<string, string> = {
    'romantic': 'romantic',
    'passionate': 'passionate', 
    'adventurous': 'adventurous',
    'mixed': 'general'
  }
  
  const category = styleMap[style] || 'general'
  return getDefaultImageForCategory(category)
}

/**
 * Get random default image for journey style
 */
export const getRandomDefaultImageForJourneyStyle = (style: string): string => {
  // Map journey styles to categories
  const styleMap: Record<string, string> = {
    'romantic': 'romantic',
    'passionate': 'passionate',
    'adventurous': 'adventurous', 
    'mixed': 'general'
  }
  
  const category = styleMap[style] || 'general'
  return getRandomDefaultImageForCategory(category)
}

/**
 * Check if there are custom default images for a category
 */
export const hasCustomDefaultImages = (category: string): boolean => {
  const categoryImages = getDefaultImagesByCategory(category)
  return categoryImages.length > 0
}

/**
 * Get statistics about default images
 */
export const getDefaultImageStats = () => {
  const allImages = getAllDefaultImages()
  const activeImages = allImages.filter(item => item.isActive)
  const inactiveImages = allImages.filter(item => !item.isActive)
  
  const byCategory = allImages.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  return {
    total: allImages.length,
    active: activeImages.length,
    inactive: inactiveImages.length,
    byCategory
  }
}

/**
 * Add a new default image
 */
export const addDefaultImage = (image: Omit<DefaultImageItem, 'id' | 'createdAt'>): boolean => {
  try {
    const allImages = getAllDefaultImages()
    const newImage: DefaultImageItem = {
      ...image,
      id: `default-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    }
    
    const updatedImages = [...allImages, newImage]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages))
    return true
  } catch {
    return false
  }
}

/**
 * Update an existing default image
 */
export const updateDefaultImage = (id: string, updates: Partial<DefaultImageItem>): boolean => {
  try {
    const allImages = getAllDefaultImages()
    const updatedImages = allImages.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages))
    return true
  } catch {
    return false
  }
}

/**
 * Delete a default image
 */
export const deleteDefaultImage = (id: string): boolean => {
  try {
    const allImages = getAllDefaultImages()
    const updatedImages = allImages.filter(item => item.id !== id)
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages))
    return true
  } catch {
    return false
  }
}

/**
 * Toggle active status of a default image
 */
export const toggleDefaultImageActive = (id: string): boolean => {
  try {
    const allImages = getAllDefaultImages()
    const updatedImages = allImages.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    )
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages))
    return true
  } catch {
    return false
  }
}

/**
 * Get fallback images (for reference)
 */
export const getFallbackImages = (): Record<string, string> => {
  return { ...FALLBACK_IMAGES }
}

/**
 * Reset to fallback images (clear all custom images)
 */
export const resetToFallbackImages = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch {
    return false
  }
}

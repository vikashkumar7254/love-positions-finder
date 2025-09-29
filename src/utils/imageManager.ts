/**
 * Utility functions for managing site images
 */

const STORAGE_KEY = 'site_images_custom'

export interface SiteImageItem {
  id: string
  title: string
  image: string
  category: string
  description?: string
  altText?: string
  width?: number
  height?: number
  size?: number
  uploadedAt?: string
}

/**
 * Get all custom images from localStorage
 */
export const getAllCustomImages = (): SiteImageItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: SiteImageItem[] = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Get images by category
 */
export const getImagesByCategory = (category: string): SiteImageItem[] => {
  const allImages = getAllCustomImages()
  return allImages.filter(item => item.category === category)
}

/**
 * Get a specific image by ID
 */
export const getImageById = (id: string): SiteImageItem | null => {
  const allImages = getAllCustomImages()
  return allImages.find(item => item.id === id) || null
}

/**
 * Get the first available image for a category, or fallback
 */
export const getCategoryImage = (category: string, fallbackUrl?: string): string => {
  const categoryImages = getImagesByCategory(category)
  if (categoryImages.length > 0) {
    return categoryImages[0].image
  }
  return fallbackUrl || 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop&crop=center'
}

/**
 * Get multiple images for a category (useful for galleries)
 */
export const getCategoryImages = (category: string, limit?: number): string[] => {
  const categoryImages = getImagesByCategory(category)
  const images = categoryImages.map(item => item.image)

  if (limit && images.length > limit) {
    return images.slice(0, limit)
  }

  return images
}

/**
 * Save custom images to localStorage
 */
export const saveCustomImages = (images: SiteImageItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images))
  } catch (error) {
    console.error('Failed to save custom images:', error)
  }
}

/**
 * Add a new custom image with metadata
 */
export const addCustomImage = (image: Omit<SiteImageItem, 'id' | 'uploadedAt'>): SiteImageItem => {
  const allImages = getAllCustomImages()
  const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  const newImage: SiteImageItem = {
    ...image,
    id,
    uploadedAt: new Date().toISOString()
  }

  const updatedImages = [...allImages, newImage]
  saveCustomImages(updatedImages)

  return newImage
}

/**
 * Update an existing custom image
 */
export const updateCustomImage = (id: string, updates: Partial<SiteImageItem>): SiteImageItem | null => {
  const allImages = getAllCustomImages()
  const imageIndex = allImages.findIndex(item => item.id === id)

  if (imageIndex === -1) {
    return null
  }

  const updatedImage = { ...allImages[imageIndex], ...updates }
  const updatedImages = [...allImages]
  updatedImages[imageIndex] = updatedImage

  saveCustomImages(updatedImages)
  return updatedImage
}

/**
 * Remove a custom image
 */
export const removeCustomImage = (id: string): boolean => {
  const allImages = getAllCustomImages()
  const filteredImages = allImages.filter(item => item.id !== id)

  if (filteredImages.length === allImages.length) {
    return false // Image not found
  }

  saveCustomImages(filteredImages)
  return true
}

/**
 * Search images by title, description, or category
 */
export const searchImages = (query: string): SiteImageItem[] => {
  const allImages = getAllCustomImages()
  const lowerQuery = query.toLowerCase()

  return allImages.filter(image =>
    image.title.toLowerCase().includes(lowerQuery) ||
    image.description?.toLowerCase().includes(lowerQuery) ||
    image.category.toLowerCase().includes(lowerQuery) ||
    image.altText?.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get images by multiple categories
 */
export const getImagesByCategories = (categories: string[]): SiteImageItem[] => {
  const allImages = getAllCustomImages()
  return allImages.filter(item => categories.includes(item.category))
}

/**
 * Get image statistics
 */
export const getImageStats = () => {
  const allImages = getAllCustomImages()
  const stats = {
    total: allImages.length,
    byCategory: {} as Record<string, number>,
    totalSize: 0,
    averageSize: 0
  }

  allImages.forEach(image => {
    stats.byCategory[image.category] = (stats.byCategory[image.category] || 0) + 1
    if (image.size) {
      stats.totalSize += image.size
    }
  })

  stats.averageSize = allImages.length > 0 ? Math.round(stats.totalSize / allImages.length) : 0

  return stats
}

/**
 * Get images with missing alt text
 */
export const getImagesWithoutAltText = (): SiteImageItem[] => {
  const allImages = getAllCustomImages()
  return allImages.filter(image => !image.altText || image.altText.trim() === '')
}

/**
 * Bulk update alt text for images
 */
export const bulkUpdateAltText = (updates: Record<string, string>): number => {
  const allImages = getAllCustomImages()
  let updatedCount = 0

  const updatedImages = allImages.map(image => {
    if (updates[image.id]) {
      updatedCount++
      return { ...image, altText: updates[image.id] }
    }
    return image
  })

  if (updatedCount > 0) {
    saveCustomImages(updatedImages)
  }

  return updatedCount
}

/**
 * Get optimized image URL with CDN support
 */
export const getOptimizedImageUrl = (url: string, options: {
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'jpg' | 'png'
} = {}): string => {
  // If it's already an Unsplash URL, optimize it
  if (url.includes('images.unsplash.com')) {
    let optimizedUrl = url

    // Add width and height parameters if provided
    if (options.width || options.height) {
      const params = new URLSearchParams()
      if (options.width) params.set('w', options.width.toString())
      if (options.height) params.set('h', options.height.toString())
      if (options.quality) params.set('q', options.quality.toString())
      if (options.format) params.set('fm', options.format)

      // Replace existing parameters or add new ones
      const [base, query] = optimizedUrl.split('?')
      const existingParams = new URLSearchParams(query || '')
      params.forEach((value, key) => existingParams.set(key, value))

      optimizedUrl = `${base}?${existingParams.toString()}`
    }

    return optimizedUrl
  }

  // For other URLs, return as-is (could add CDN integration here)
  return url
}

/**
 * Compress image data URL (client-side compression)
 */
export const compressImage = (file: File, maxWidth: number = 1200, quality: number = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img

      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          } else {
            reject(new Error('Failed to compress image'))
          }
        },
        'image/jpeg',
        quality
      )
    }

    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

import React from 'react'

interface MediaDisplayProps {
  src: string
  alt?: string
  className?: string
  type?: 'image' | 'video' | 'gif' | 'auto'
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({ 
  src, 
  alt = '', 
  className = '', 
  type = 'auto' 
}) => {
  // Auto-detect media type based on file extension
  const getMediaType = (url: string): 'image' | 'video' | 'gif' => {
    if (type !== 'auto') return type
    
    const extension = url.split('.').pop()?.toLowerCase()
    
    if (['gif'].includes(extension || '')) return 'gif'
    if (['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'].includes(extension || '')) return 'video'
    return 'image'
  }

  const mediaType = getMediaType(src)
  const baseClasses = "w-full h-auto rounded-lg shadow-md"

  if (mediaType === 'video') {
    return (
      <video 
        src={src} 
        controls 
        className={`${baseClasses} ${className}`}
        poster={src.replace(/\.[^/.]+$/, '.jpg')} // Try to use .jpg as poster
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
        Your browser does not support the video tag.
      </video>
    )
  }

  if (mediaType === 'gif') {
    return (
      <img 
        src={src} 
        alt={alt} 
        className={`${baseClasses} ${className}`}
        loading="lazy"
        onError={(e) => {
          // Fallback to static image if GIF fails
          const target = e.target as HTMLImageElement
          const fallbackSrc = src.replace(/\.gif$/i, '.jpg')
          if (fallbackSrc !== src) {
            target.src = fallbackSrc
          }
        }}
      />
    )
  }

  // Default to image
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`${baseClasses} ${className}`}
      loading="lazy"
      onError={(e) => {
        // Show placeholder if image fails to load
        const target = e.target as HTMLImageElement
        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4='
      }}
    />
  )
}

export default MediaDisplay

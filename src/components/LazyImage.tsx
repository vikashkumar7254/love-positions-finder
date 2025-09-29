import { useState, useRef, useEffect } from 'react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  onLoad?: () => void
  onError?: () => void
  onClick?: () => void
  width?: number
  height?: number
}

const LazyImage = ({
  src,
  alt,
  className = '',
  fallbackSrc = 'https://via.placeholder.com/400x300?text=Image+Loading',
  onLoad,
  onError,
  onClick,
  width,
  height
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imageSrc, setImageSrc] = useState(fallbackSrc)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Load image when in view
  useEffect(() => {
    if (isInView && !isLoaded && !hasError) {
      const img = new Image()

      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
        onLoad?.()
      }

      img.onerror = () => {
        setHasError(true)
        setImageSrc(fallbackSrc)
        onError?.()
      }

      img.src = src
    }
  }, [isInView, isLoaded, hasError, src, fallbackSrc, onLoad, onError])

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      width={width}
      height={height}
      loading="lazy"
      onLoad={() => setIsLoaded(true)}
      onError={() => {
        setHasError(true)
        setImageSrc(fallbackSrc)
      }}
      onClick={onClick}
    />
  )
}

export default LazyImage

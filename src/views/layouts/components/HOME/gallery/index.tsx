import * as React from 'react'
import Image from 'next/image'
import { bannerHome } from 'src/app/data/bannerHome'

const Gallery = () => {
  const galleryRef = React.useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollLeft, setScrollLeft] = React.useState(0)

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (galleryRef.current) {
      const scrollSpeed = 2.5
      galleryRef.current.scrollLeft += e.deltaY * scrollSpeed
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    if (galleryRef.current) {
      setStartX(e.pageX - galleryRef.current.offsetLeft)
      setScrollLeft(galleryRef.current.scrollLeft)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    if (galleryRef.current) {
      const x = e.pageX - galleryRef.current.offsetLeft
      const distance = (x - startX) * 2
      galleryRef.current.scrollLeft = scrollLeft - distance
    }
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Overlay Text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          pointerEvents: 'none'
        }}
      >
        Be Beauty - Be You
      </div>

      {/* Gallery */}
      <div
        ref={galleryRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          display: 'flex',
          overflowX: 'scroll',
          gap: '0.5rem',
          cursor: isDragging ? 'grabbing' : 'grab',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          position: 'relative',
          paddingBottom: '5px'
        }}
      >
        {bannerHome.map((src, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 auto',
              width: '600px',
              height: '100%',
              transition: 'transform 0.2s ease',
              transform: isDragging ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            <Image
              src={src.image}
              alt={`Gallery ${index}`}
              style={{
                objectFit: 'cover',
                borderRadius: '1rem',
                userSelect: 'none',
                pointerEvents: isDragging ? 'none' : 'auto'
              }}
              layout='responsive'
              width={16}
              height={9}
              priority={index < 2}
            />
          </div>
        ))}
        <style jsx global>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  )
}

export default Gallery

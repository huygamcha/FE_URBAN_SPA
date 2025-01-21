import * as React from 'react'
import Image from 'next/image'
import { bannerHome } from 'src/app/data/bannerHome'
import { Box, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TBanner } from 'src/types/banner'

type TProp = {
  banner: TBanner[]
}

const Gallery = (props: TProp) => {
  const { banner } = props

  const theme = useTheme()
  const { t, i18n } = useTranslation()

  const galleryRef = React.useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollLeft, setScrollLeft] = React.useState(0)
  //

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
    <Box sx={{ padding: '4% 0%', backgroundColor: '#ffe3c7' }}>
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
            pointerEvents: 'none',
            fontFamily: 'Playfair Display,sans-serif'
          }}
        >
          {t('Be_Beauty_Be_You').toUpperCase()}
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
          {banner.map((src : any, index) => (
            <Box
              key={index}
              sx={{
                flex: '0 0 auto',
                height: '80vh', // Set height to 80% of viewport height
                width: '35vw', // Set width to 40% of viewport width
                position: 'relative', // Required for the image to fill the container
                transition: 'transform 0.2s ease',
                transform: isDragging ? 'scale(0.98)' : 'scale(1)',
                [theme.breakpoints.down('lg')]: {
                  width: '90vw' // Set width to 40% of viewport width
                }
              }}
            >
              <Image
                src={src.link}
                alt={`Gallery ${index}`}
                style={{
                  objectFit: 'cover', // Ensures the image covers the container while maintaining its aspect ratio
                  borderRadius: '1.5rem',
                  userSelect: 'none',
                  pointerEvents: isDragging ? 'none' : 'auto'
                }}
                layout='fill' // This makes the image fill the container
                priority={index < 2}
              />
            </Box>
          ))}
          <style jsx global>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </Box>
  )
}

export default Gallery

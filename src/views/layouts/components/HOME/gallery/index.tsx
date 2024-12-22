'use client'

// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'
import Link from 'next/link'

// ** Mui
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// components
import Icon from 'src/components/Icon'
import UserDropdown from 'src/views/layouts/components/user-dropdown'
import ModeToggle from 'src/views/layouts/components/mode-toggle'
import LanguageDropdown from 'src/views/layouts/components/language-dropdown'
import CartProduct from 'src/views/layouts/components/cart-product'
import NotificationDropdown from 'src/views/layouts/components/notification-dropdown'

// ** Hooks
import { Box, Button } from '@mui/material'

// config
import Image from 'next/image'
import { bannerHome } from 'src/app/data/bannerHome'
import { IBannerHome } from 'src/types/bannerHome'

// ** React slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Gallery = () => {
  const galleryRef = React.useRef<HTMLDivElement | null>(null)

  // Handle the wheel event for horizontal scrolling
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault() // Prevent default vertical scrolling behavior
    if (galleryRef.current) {
      galleryRef.current.scrollLeft += e.deltaY // Scroll horizontally
    }
  }

  return (
    <div
      ref={galleryRef}
      onWheel={handleWheel}
      style={{
        display: 'flex',
        overflowX: 'hidden', // Allow horizontal scrolling
        gap: '0.5rem',
        // height: '300px',
        // padding: '16px',
        cursor: 'grab'
      }}
    >
      {bannerHome.map((src, index) => (
        <div
          key={index}
          style={{
            flex: '0 0 auto', // Prevent shrinking or growing
            width: '600px',
            height: '100%'
          }}
        >
          <Image
            src={src.image}
            alt={`Gallery ${index}`}
            style={{
              objectFit: 'cover', // Maintain aspect ratio
              borderRadius: '1rem'
            }}
            layout='responsive'
            width={16}
            height={9}
          />
        </div>
      ))}
    </div>
  )
}

export default Gallery

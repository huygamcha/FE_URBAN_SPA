'use client'

// ** React
import * as React from 'react'

// ** next
import { NextPage } from 'next'

// ** Mui
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

// ** views
import HorizontalLayout from 'src/views/layouts/HorizontalLayout'
import VerticalLayout from 'src/views/layouts/VerticalLayout'
import { Typography, useTheme } from '@mui/material'
import Image from 'next/image'

// ** React slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CustomCarousel from 'src/components/custom-carousel'
import { bannerHome } from 'src/app/data/bannerHome'
import { IBannerHome } from 'src/types/bannerHome'
import Footer from './components/footer'
import { useTranslation } from 'react-i18next'

type TProps = {
  children: React.ReactNode
}
const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true
}

const LayoutNotApp: NextPage<TProps> = ({ children }) => {
  const theme = useTheme()
  const {t, i18n} = useTranslation()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        // component='main'
        sx={{
          backgroundColor: theme => theme.palette.customBackground.secondary,
          flexGrow: 1,
          // bỏ phần này để ko có scrollBar
          // height: '100vh',
          overflow: 'auto'
        }}
      >
        <HorizontalLayout toggleDrawer={() => {}} open={false} isHideMenu />
        <Toolbar />

        <Box
          // đặt giới hạn chiều dài để sử dụng được slider
          sx={{
            // width: 'calc(100vw - 0px)',
            maxWidth: 'unset !important'
          }}
        >
          <div style={{ position: 'relative', overflow: 'hidden', maxHeight: 'calc(100vh - 64px)' }}>
            <Typography
              sx={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                color: 'white',
                fontSize: '6rem',
                textTransform: 'uppercase', // Making the text uppercase
                pointerEvents: 'none',
                fontFamily: 'Playfair Display, serif', // Same font family as seen in the image
                letterSpacing: '3px', // Add spacing to mimic the image style
                width: '100%',
                textAlign: 'center', // Center the text
                [theme.breakpoints.down('lg')]: {
                  fontSize: '3rem'
                }
              }}
            >
              URBAN SPA
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                top: '60%', // Adjusting position of subtitle
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
                color: 'white',
                fontSize: '1.5rem', // Subtitle font size
                fontWeight: 'normal',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontFamily: 'Arial, sans-serif', // Different font for subtitle
                [theme.breakpoints.down('lg')]: {
                  fontSize: '1rem'
                }
              }}
            >
              {t('Premium_Spa_And_Relaxation_And_Beauty').toUpperCase()}
            </Typography>
            <Slider {...settings}>
              {bannerHome?.map((item: IBannerHome, index: number) => (
                <Image
                  style={{ height: 'calc(100vh - 64px)' }}
                  key={index}
                  src={item.image}
                  alt='Responsive Image'
                  layout='responsive'
                  width={16}
                  height={9}
                />
              ))}
            </Slider>
          </div>
        </Box>
        <Container
          sx={{
            // m: 4,
            // width: 'calc(100vw - 32px)',
            maxWidth: 'unset !important',
            // overflow: 'auto',
            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
            padding: '0 !important',
            overflow: 'hidden'
            // borderRadius: '0.5rem'
          }}
        >
          {children}
        </Container>
        <Footer />
      </Box>
    </Box>
  )
}

export default LayoutNotApp

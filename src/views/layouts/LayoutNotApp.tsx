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
import { useTheme } from '@mui/material'
import Image from 'next/image'

// ** React slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import CustomCarousel from 'src/components/custom-carousel'
import { bannerHome } from 'src/app/data/bannerHome'
import { IBannerHome } from 'src/types/bannerHome'

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
          <Slider {...settings}>
            {bannerHome?.map((item: IBannerHome, index: number) => (
              <Image key={index} src={item.image} alt='Responsive Image' layout='responsive' width={16} height={9} />
            ))}
          </Slider>
        </Box>
        <Container
          sx={{
            // m: 4,
            // width: 'calc(100vw - 32px)',
            maxWidth: 'unset !important',
            overflow: 'auto',
            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
            padding: '0 !important'
            // borderRadius: '0.5rem'
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default LayoutNotApp

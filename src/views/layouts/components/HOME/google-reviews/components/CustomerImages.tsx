/* eslint-disable import/newline-after-import */
'use client'

// ** React
import React from 'react'

// ** Next
import Image from 'next/image'

// ** Mui Imports
import Box from '@mui/material/Box'
import { styled, Typography } from '@mui/material'

// ** React slick
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'src/views/css/customReactSlick.css'
import 'react-multi-carousel/lib/styles.css'

import { NextArrow, PrevArrow } from 'src/components/custom-react-slick'
import { customerImages } from 'src/app/data/customerImage'
import { useTranslation } from 'react-i18next'

// ** Types
interface TImage {
  id: number
  image: string
}
type TProps = {}

const CustomLayout = styled('div')(({ theme }) => ({
  padding: '0% 5%'
}))

const settings = {
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  draggable: false,
  centerMode: true, // Kích hoạt center mode
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
        arrows: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
        arrows: false
      }
    }
  ],
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
  // Custom padding for spacing
}

const CustomerImages = (props: TProps) => {
  const { t, i18n } = useTranslation()

  return (
    <CustomLayout className='slider-container'>
      <Box>
        <Typography
          sx={{
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: '700',
            lineHeight: '1.2',
            color: '#6b4241',
            fontFamily: 'Playfair Display,sans-serif',
            textAlign: 'center'
          }}
        >
          {t('Review_by_customer')}
        </Typography>
      </Box>
      <Slider {...settings}>
        {customerImages?.map((item: TImage, index: number) => (
          <Box
            overflow='hidden'
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              outline: '0',
              borderRadius: '0.5rem'
            }}
          >
            <Box
              sx={{
                '&:hover': {
                  transform: `scale(1.1)`,
                  transition: 'transform 1s ease'
                }
              }}
            >
              <Box
                key={index}
                sx={{
                  width: '100%',
                  height: { xs: '231px', sm: '231px' }, // Responsive heights for mobile and larger screens
                  position: 'relative', // Needed for Next.js <Image />
                  borderRadius: '0.5rem',
                  overflow: 'hidden'
                }}
              >
                <Image
                  style={{ objectFit: 'cover' }}
                  key={index}
                  src={item.image}
                  alt='about us'
                  fill // Allows the image to stretch to the Box dimensions
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
    </CustomLayout>
  )
}

export default CustomerImages

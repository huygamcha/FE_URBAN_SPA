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

const CustomLayout = styled('div')(({ theme }) => ({}))

const settings = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  draggable: false,
  centerMode: true, // Kích hoạt center mode
  cssEase: 'linear',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
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

            textAlign: 'center'
          }}
        >
          {t('Review_by_customer')}
        </Typography>
      </Box>
      <Slider {...settings}>
        {customerImages?.map((item: TImage, index: number) => (
          <Box
            key={index}
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: '309px', // Giới hạn chiều rộng tối đa
              maxHeight: '231px', // Giới hạn chiều cao tối đa
              aspectRatio: '4 / 3', // Giữ tỉ lệ 4:3
              overflow: 'hidden',
              outline: '0',
              borderRadius: '0.5rem'
            }}
          >
            <Image
              src={item.image}
              alt='about us'
              layout='fill' // Đảm bảo hình ảnh lấp đầy container
              objectFit='cover' // Hình ảnh giữ nội dung mà không bị méo
            />
          </Box>
        ))}
      </Slider>
    </CustomLayout>
  )
}

export default CustomerImages

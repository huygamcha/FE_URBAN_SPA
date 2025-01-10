import React from 'react'
import { Box, Typography, Container, Grid, Button, IconButton } from '@mui/material'
import ReactPlayer from 'react-player/lazy'
import Image from 'next/image'

// ** React Slider
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { bannerHome } from 'src/app/data/bannerHome'
import { IBannerHome } from 'src/types/bannerHome'

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

const AboutSpa = () => {
  return (
    <Box
      sx={{
        maxWidth: '80rem',
        width: '100%',
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        justifyContent: 'space-between'
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Box
            borderRadius='1rem'
            sx={{
              background: theme => theme.palette.common.white,
              padding: '1rem'
            }}
          >
            <Typography
              sx={{
                color: '#6c4241',
                marginTop: '0',
                marginBottom: '0',
                fontFamily: 'Playfair Display,sans-serif',
                fontSize: '3rem',
                fontWeight: '700',
                lineHeight: '1.2'
              }}
            >
              About Urban Spa
            </Typography>
            <Typography>Relax - Renew - Revitalize</Typography>
            <Typography variant='body1' mt={2}>
              Inspired by the nature and our modern <strong>BOHEMIAN life style</strong>,<strong> LABOHO Spa </strong>
              offers a wide range of treatments that helps you live in the moment. We will make you feel completely
              relaxed and comfortable in our spa vibe. We individually design our spa treatments to suit your skin type
              and personality. Our nourishing hair wash with natural herbal ingredients and skincare treatments with
              body scrub & wrap, blissful body massage and facial treatments, will leave your skin feeling like new.{' '}
              <strong>LABOHO Spa</strong> allows you to choose the best way to
              <strong> relax, unwind and recharge</strong> your body. <strong>LABOHO Spa</strong> offers a wide range of
              treatments :
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              borderRadius: '1rem',
              overflow: 'hidden',
              fontSize: '0px'
            }}
          >
            <Slider {...settings}>
              {bannerHome?.map((item: IBannerHome, index: number) => (
                <Image key={index} src={item.image} alt='about us' layout='responsive' width={596} height={795} />
              ))}
            </Slider>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AboutSpa

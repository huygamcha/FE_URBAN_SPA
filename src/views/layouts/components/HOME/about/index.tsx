import React, { useEffect, useRef } from 'react'
import { Box, Typography, Container, Grid, Button, IconButton } from '@mui/material'
import ReactPlayer from 'react-player/lazy'
import Image from 'next/image'

// ** React Slider
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { bannerHome } from 'src/app/data/bannerHome'
import { IBannerHome } from 'src/types/bannerHome'
import { useTranslation } from 'react-i18next'

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
  // ** Hooks
  const { t, i18n } = useTranslation()

  const allRefs = useRef<Array<HTMLDivElement | null>>([null, null])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // 10% thì xuất hiện item
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        } else {
          entry.target.classList.remove('show')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    allRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <Box
      sx={{
        maxWidth: '80rem',
        width: '100%',
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 2
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <Box
            height='745px'
            overflow='hidden'
            borderRadius='1rem'
            sx={{
              background: theme => theme.palette.common.white,
              padding: '1rem',
              position: 'relative'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                left: 0,
                zIndex: 1
              }}
            >
              <Image
                width={1}
                height={1}
                layout='responsive'
                alt='image'
                src='https://cdn.prod.website-files.com/6324b2bcf9793bf1b40b60cf/6515ad2b3f3181bfe1a7f0cd_partent%20right-01.svg'
              />
            </Box>
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                pt: '8rem'
              }}
            >
              <Typography
                ref={(el: HTMLDivElement | null) => {
                  allRefs.current[0] = el
                }}
                sx={{
                  height: '6px',
                  background: theme => theme.palette.customBackground.main,
                  margin: 'left',
                  width: '0rem',
                  opacity: 0,
                  // transform: 'translateY(50px)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1)',
                  '&.show': {
                    opacity: 1,
                    width: '5.33333rem'
                    // transform: 'translateY(0)'
                  }
                }}
                mb='1rem'
              ></Typography>
              <Box
                ref={(el: HTMLDivElement | null) => {
                  allRefs.current[1] = el
                }}
                sx={{
                  opacity: 0.05,
                  transition: 'opacity 0.8s ease-in-out',
                  '&.show': {
                    opacity: 1
                  }
                }}
              >
                <Box pb='2rem'>
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
                    {t('About_urban_spa')}
                  </Typography>
                </Box>
                <Box>
                  <Typography>Relax - Renew - Revitalize</Typography>
                  <Typography variant='body1' mt={2}>
                    Inspired by the nature and our modern <strong>BOHEMIAN life style</strong>,
                    <strong> URBAN Spa </strong>
                    offers a wide range of treatments that helps you live in the moment. We will make you feel
                    completely relaxed and comfortable in our spa vibe. We individually design our spa treatments to
                    suit your skin type and personality. Our nourishing hair wash with natural herbal ingredients and
                    skincare treatments with body scrub & wrap, blissful body massage and facial treatments, will leave
                    your skin feeling like new. <strong>URBAN Spa</strong> allows you to choose the best way to
                    <strong> relax, unwind and recharge</strong> your body. <strong>URBAN Spa</strong> offers a wide
                    range of treatments :
                  </Typography>
                  <Typography variant='body1' mt={2}>
                    Inspired by the nature and our modern <strong>BOHEMIAN life style</strong>,
                    <strong> URBAN Spa </strong>
                    offers a wide range of treatments that helps you live in the moment. We will make you feel
                    completely relaxed and comfortable in our spa vibe. We individually design our spa treatments to
                    suit your skin type and personality.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: '1rem',
              overflow: 'hidden',
              fontSize: '0px'
            }}
          >
            <Slider {...settings}>
              {bannerHome?.map((item: IBannerHome, index: number) => (
                <Box
                  key={index}
                  sx={{
                    width: '100%',
                    height: { xs: '545px', sm: '745px' }, // Responsive heights for mobile and larger screens
                    position: 'relative', // Needed for Next.js <Image />
                    borderRadius: '1.5rem',
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
              ))}
            </Slider>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AboutSpa

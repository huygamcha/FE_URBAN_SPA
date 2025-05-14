import React, { useEffect, useRef, useState } from 'react'
import { useTheme, Box, Typography, Grid, Button } from '@mui/material'
import Image from 'next/image'

// ** React Slider
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'src/views/css/customReactSlickBanner.css'
import { useTranslation } from 'react-i18next'
import { TParamsFetchAbout } from 'src/types/about'
import { displayValueByLanguage } from 'src/utils'
import { TBanner } from 'src/types/banner'
import useResponsiveScreen from 'src/hooks/useDeskTopScreen'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true
}

type TProps = {
  aboutUs: TParamsFetchAbout
  banner: TBanner[]
}

const AboutSpa = (props: TProps) => {
  // ** State
  const { aboutUs, banner } = props
  const [expanded, setExpanded] = useState<boolean>(false)
  // ** Hooks
  const { t, i18n } = useTranslation()
  const theme = useTheme()

  const isLg = useResponsiveScreen({ responsive: 'lg' })

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
            overflow='hidden'
            borderRadius='1rem'
            sx={{
              background: '#ffffffeb',
              padding: '1rem',
              position: 'relative',
              height: isLg ? '745px' : 'max-content'
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
                src='https://cdn.kampa.vn/sen%20gioi%20thieu.svg'
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
                <Box pb='1rem'>
                  <Typography
                    sx={{
                      color: '#6c4241',
                      marginTop: '0',
                      marginBottom: '0',
                      fontFamily: 'Playfair Display,sans-serif',
                      fontSize: '3rem',
                      fontWeight: '700',
                      lineHeight: '1.2',
                      [theme.breakpoints.down('lg')]: {
                        fontSize: '3rem'
                      }
                    }}
                  >
                    {t('About_urban_spa')}
                  </Typography>
                </Box>

                {isLg ? (
                  <>
                    <Box
                      dangerouslySetInnerHTML={{
                        __html: displayValueByLanguage({ language: i18n.language, value: aboutUs, field: 'name' })
                      }}
                    ></Box>
                  </>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: expanded ? 'unset' : 5
                      }}
                      dangerouslySetInnerHTML={{
                        __html: displayValueByLanguage({ language: i18n.language, value: aboutUs, field: 'name' })
                      }}
                    ></Box>
                    <Box mt={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Typography
                        sx={{
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                        onClick={() => setExpanded(prev => !prev)}
                      >
                        {expanded ? t('View_less') : t('View_more')}
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={0} md={6}>
          <Box
            sx={{
              borderRadius: '1rem',
              overflow: 'hidden',
              fontSize: '0px'
            }}
          >
            <Slider {...settings} className='slider-banner'>
              {banner?.map((item: TBanner, index: number) => (
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
                    src={item.link}
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

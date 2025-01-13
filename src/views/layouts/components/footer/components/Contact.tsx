'use client'

import React, { useEffect, useRef } from 'react'
import { Grid, Box, IconButton, Typography, Link } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  // ** Hooks
  const { t } = useTranslation()

  const allRefs = useRef<Array<HTMLDivElement | null>>([])

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
    <Box sx={{ flexGrow: 1, padding: 2, zIndex: 2, position: 'relative' }}>
      <Box>
        <Typography
          ref={(el: HTMLDivElement | null) => {
            allRefs.current[0] = el
          }}
          sx={{
            height: '6px',
            background: theme => theme.palette.customBackground.main,
            width: '0%',
            transition: 'width 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)',
            '&.show': {
              width: '5.33333rem'
            }
          }}
        ></Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Left Grid: Social Media Icons */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              opacity: 0.05,
              transition: 'opacity 0.8s ease-in-out',
              '&.show': {
                opacity: 1
              }
            }}
            ref={(el: HTMLDivElement | null) => {
              allRefs.current[1] = el
            }}
          >
            <Typography
              sx={{
                marginTop: '1rem',
                marginBottom: '0.5rem',
                fontSize: '2.5rem',
                fontWeight: '700',
                lineHeight: '1.2',
                color: '#6b4241',
                fontFamily: 'Playfair Display,sans-serif'
              }}
            >
              {t('Contact_Us')}
            </Typography>
          </Box>

          <Box>
            <Box
              sx={{
                opacity: 0.05,
                transition: 'opacity 0.8s ease-in-out',
                '&.show': {
                  opacity: 1
                }
              }}
              ref={(el: HTMLDivElement | null) => {
                allRefs.current[2] = el
              }}
            >
              <Typography>{t('contact_1')}</Typography>
              <Typography>{t('contact_2')}</Typography>
              <Typography>{t('contact_3')}</Typography>
            </Box>
            <Box
              sx={{
                opacity: 0, // Ban đầu ẩn
                transform: 'translateY(-30px)', // Ban đầu ở trên
                transition: 'opacity 2s ease-in-out, transform 0.8s ease-in-out', // Hiệu ứng mượt mà
                '&.show': {
                  opacity: 1, // Hiện nội dung
                  transform: 'translateY(0)' // Trả về vị trí ban đầu
                }
              }}
              ref={(el: HTMLDivElement | null) => {
                allRefs.current[3] = el
              }}
              pt='0.5rem'
              display='flex'
              flexDirection='column'
              alignItems='flex-start'
              justifyContent='center'
            >
              <Box sx={{ cursor: 'pointer' }}>
                <Box mt='0.375rem'>
                  <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://blog.naver.com/kampavn'>
                    <Image
                      src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_blog.svg'
                      width={25}
                      height={25}
                      alt='Picture of the author'
                    />
                  </Link>
                  <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://cafe.naver.com/vietnamtrip'>
                    <Image
                      src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_cafe.svg'
                      width={25}
                      height={25}
                      alt='Picture of the author'
                    />
                  </Link>
                  <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://www.facebook.com/kampavietnam'>
                    <Image
                      src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_facebook.svg'
                      width={25}
                      height={25}
                      alt='Picture of the author'
                    />
                  </Link>
                  <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://www.instagram.com/kampavietnam/'>
                    <Image
                      src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_instragram.svg'
                      width={25}
                      height={25}
                      alt='Picture of the author'
                    />
                  </Link>
                  <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://cafe.naver.com/vietnamtrip'>
                    <Image
                      src='https://pub-50bb58cfabdd4b93abb4e154d0eada9e.r2.dev/youtubeic.webp'
                      width={32}
                      height={22}
                      alt='Picture of the author'
                    />
                  </Link>
                  <Link target='_blank' href='https://zalo.me/1579840813471644356'>
                    <Image
                      src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/Icon_of_Zalo.svg.webp'
                      width={25}
                      height={25}
                      alt='zalo'
                    />
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Grid: Google Maps */}
        <Grid item xs={12} md={6}>
          <Box mt='1rem' display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
            <a
              style={{
                color: '#020b27',
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 500,
                width: 'max-content'
              }}
              href='https://maps.app.goo.gl/gEnYXd4D1fNkfNNj7'
              target='_blank'
              rel='noreferrer'
            ></a>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29792.312891707443!2d105.849959!3d21.031121!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abbfd1259fed%3A0xb1507bcd1cc0981a!2sUrban%20Oasis%20Spa!5e0!3m2!1sko!2sus!4v1736442871997!5m2!1sko!2sus'
              width='100%'
              height='300'
              loading='lazy'
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact

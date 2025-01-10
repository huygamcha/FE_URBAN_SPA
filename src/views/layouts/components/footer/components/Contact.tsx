'use client'

import React from 'react'
import { Grid, Box, IconButton, Typography, Link } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const Contact = () => {
  // ** Hooks
  const { t } = useTranslation()

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {/* Left Grid: Social Media Icons */}
        <Grid item xs={12} md={6}>
          <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Contact Us
            </Typography>
            <Box>
              <Box mt='0.375rem'>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://blog.naver.com/kampavn'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_blog.svg'
                    width={50}
                    height={50}
                    alt='Picture of the author'
                  />
                </Link>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://cafe.naver.com/vietnamtrip'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_cafe.svg'
                    width={50}
                    height={50}
                    alt='Picture of the author'
                  />
                </Link>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://www.facebook.com/kampavietnam'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_facebook.svg'
                    width={50}
                    height={50}
                    alt='Picture of the author'
                  />
                </Link>
              </Box>
              <Box mt='0.375rem'>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://www.instagram.com/kampavietnam/'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_instragram.svg'
                    width={50}
                    height={50}
                    alt='Picture of the author'
                  />
                </Link>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://cafe.naver.com/vietnamtrip'>
                  <Image
                    src='https://pub-50bb58cfabdd4b93abb4e154d0eada9e.r2.dev/youtubeic.webp'
                    width={64}
                    height={44}
                    alt='Picture of the author'
                  />
                </Link>
                <Link target='_blank' href='https://zalo.me/1579840813471644356'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/Icon_of_Zalo.svg.webp'
                    width={50}
                    height={50}
                    alt='zalo'
                  />
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Right Grid: Google Maps */}
        <Grid item xs={12} md={6}>
          <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Visit Us
            </Typography>
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

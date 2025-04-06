'use client'

import React from 'react'
import { Box, Grid, Typography, Link } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

const ContactPage = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Box overflow='hidden'>
      <Box overflow='hidden'>
        <Box sx={{ background: '#440a09' }} padding='2% 5%'>
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: '80rem',
              width: '100%',
              minHeight: '64px',
              alignItems: 'center',
              margin: '0 auto',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 2
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Box>
                  <Typography sx={{ color: '#fff' }} textAlign='center' fontSize='1.5rem' fontWeight='500'>
                    {t('Support_Ready')}
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize='1rem' textAlign='center' sx={{ color: '#fff' }}>
                    {t('Contact_Info')}
                  </Typography>
                </Box>

                <Box pt='1rem' display='flex' justifyContent='center'>
                  <Box sx={{ cursor: 'pointer', display: 'flex' }}>
                    <Box mt='0.375rem' sx={{ display: 'flex' }}>
                      <Link
                        style={{ paddingRight: '1rem' }}
                        target='_blank'
                        href='https://www.facebook.com/hanoiurbanoasisspa'
                        sx={{
                          animation: 'slideUpFadeIn 0.5s ease-in forwards',
                          animationDelay: '0.1s',
                          opacity: 0,
                          '@keyframes slideUpFadeIn': {
                            '0%': {
                              transform: 'translateY(20px)',
                              opacity: 0
                            },
                            '100%': {
                              transform: 'translateY(0)',
                              opacity: 1
                            }
                          }
                        }}
                      >
                        <Image src='https://cdn.kampa.vn/fb-spa.webp' width={40} height={40} alt='fb' />
                      </Link>

                      <Link
                        style={{ paddingRight: '1rem' }}
                        target='_blank'
                        href=''
                        sx={{
                          animation: 'slideUpFadeIn 0.5s ease-in forwards',
                          animationDelay: '0.3s',
                          opacity: 0
                        }}
                      >
                        <Image src='https://cdn.kampa.vn/kakaotalk-spa.svg' width={40} height={40} alt='kakao' />
                      </Link>

                      <Link
                        style={{ paddingRight: '1rem' }}
                        target='_blank'
                        href=''
                        sx={{
                          animation: 'slideUpFadeIn 0.5s ease-in forwards',
                          animationDelay: '0.5s',
                          opacity: 0
                        }}
                      >
                        <Image src='https://cdn.kampa.vn/line-spa.png' width={40} height={40} alt='line' />
                      </Link>

                      <Link
                        target='_blank'
                        href=''
                        sx={{
                          animation: 'slideUpFadeIn 0.5s ease-in forwards',
                          animationDelay: '0.7s',
                          opacity: 0
                        }}
                      >
                        <Image src='https://cdn.kampa.vn/what-app-spa.webp' width={40} height={40} alt='whatsapp' />
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Box overflow='hidden'>
        <Box
          sx={{
            animation: 'fadeIn 0.5s ease-in',
            '@keyframes fadeIn': {
              '0%': { opacity: 0 },
              '100%': { opacity: 1 }
            },
            position: 'relative',
            zIndex: 1,
            background: theme => theme.palette.customBackground.secondary
          }}
          padding='2% 10%'
        >
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: '80rem',
              width: '100%',
              minHeight: '64px',
              alignItems: 'center',
              margin: '0 auto',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 2
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                {/* Slide from top + fade in */}
                <Box
                  sx={{
                    animation: 'slideDownFadeIn 1s ease-in',
                    '@keyframes slideDownFadeIn': {
                      '0%': {
                        transform: 'translateY(-20px)',
                        opacity: 0
                      },
                      '100%': {
                        transform: 'translateY(0)',
                        opacity: 1
                      }
                    }
                  }}
                >
                  <Typography textAlign='center' fontSize='1.5rem' fontWeight='500' sx={{ color: 'rgb(179, 130, 22)' }}>
                    {t('Our_Location')}
                  </Typography>
                </Box>

                <Box>
                  <Typography fontSize='1rem' textAlign='center' sx={{ color: 'rgb(179, 130, 22)' }}>
                    {t('Location_Description')}
                  </Typography>
                </Box>

                {/* Slide and fade iframe */}
                <Box
                  mt='1rem'
                  display='flex'
                  flexDirection='column'
                  alignItems='flex-start'
                  justifyContent='center'
                  sx={{
                    animation: 'slideDownFadeInFast 0.6s ease-in',
                    '@keyframes slideDownFadeInFast': {
                      '0%': {
                        transform: 'translateY(-20px)',
                        opacity: 0
                      },
                      '100%': {
                        transform: 'translateY(0)',
                        opacity: 1
                      }
                    }
                  }}
                >
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
                    height='400'
                    loading='lazy'
                    style={{
                      borderRadius: '0.5rem',
                      textAlign: 'center'
                    }}
                  ></iframe>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              zIndex: 1,
              bottom: 0,
              right: 0,
              left: 0,
              fontSize: '0px'
            }}
          >
            <Image
              width={16}
              height={9}
              layout='responsive'
              alt='image'
              src='https://cdn.kampa.vn/footerurbanspa1.svg'
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactPage

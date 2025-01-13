/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Typography, Link, List, ListItem, ListItemText, Avatar, useTheme, Grid, Button } from '@mui/material'
import Image from 'next/image'

// ** Redux

// ** Components

// ** Config

// ** Services

// ** Utils
import { useRouter } from 'next/navigation'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { TPackage } from 'src/types/package'
import { displayValueByLanguage, formatCurrency } from 'src/utils'
import { useDrawer } from 'src/hooks/useDrawer'
import useResponsiveScreen from 'src/hooks/useDeskTopScreen'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {
  packages: TPackage
}

const PackagePage: NextPage<TProps> = props => {
  // ** Translate
  const { t, i18n } = useTranslation()

  // ** Hook
  const ref = useRef<HTMLElement | null>(null)

  // ** Props
  const { packages } = props

  // ** Context
  const isLg = useResponsiveScreen({ responsive: 'lg' })

  // ** theme
  const theme = useTheme()
  const router = useRouter()

  // ** Context
  const { openBookingForm, setOpenBookingForm } = useDrawer()

  const handleBooking = () => {
    router.push(`${ROUTE_CONFIG.BOOKING.INDEX}/${packages.slug}`)
    // ;() => router.push(ROUTE_CONFIG.BOOKING.INDEX)
  }

  // fetch api
  // ** fetch api
  // ** Scroll to ref on initial load
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (!isLg) {
      if (openBookingForm) {
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
      } else {
        document.body.style.overflow = 'auto'
        document.body.style.position = 'static'
      }

      return () => {
        document.body.style.overflow = 'auto'
        document.body.style.position = 'static'
      }
    }
  }, [openBookingForm])

  return (
    <>
      <Box sx={{ padding: '2% 5%', position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            color: 'var(--red-text)',
            backgroundColor: '#ffffffc7',
            borderRadius: '20px',
            flexDirection: 'column',
            padding: '20px 40px',
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '2rem',
                fontWeight: 600
              }}
              textAlign='center'
              color='text.secondary'
              gutterBottom
            >
              {displayValueByLanguage({ language: i18n.language, value: packages, field: 'name' })}
            </Typography>

            <Grid container spacing={5}>
              <Grid item xs={12} lg={6}>
                <Box>
                  <Box
                    sx={{
                      overflow: 'hidden',
                      borderRadius: 'inherit',
                      fontSize: '0px'
                    }}
                  >
                    <Image
                      src={packages.image}
                      alt='packages image'
                      width={626}
                      height={417}
                      layout='responsive' // Sử dụng layout responsive
                      style={{
                        borderRadius: '8px',
                        objectFit: 'cover' // Giữ tỷ lệ ảnh đúng, cắt khi cần
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box border='1px solid #492828' borderRadius='8px' p='1rem' pt='0rem'>
                  {packages.services.map((item, index) => (
                    <Box
                      py='1rem'
                      key={index}
                      borderBottom={index !== packages.services.length - 1 ? '1px solid #492828' : 'none'}
                    >
                      <Typography
                        sx={{
                          background: theme => theme.palette.customBackground.main
                        }}
                        p='0.2rem 1rem'
                        borderRadius='0.5rem'
                        color='#fff'
                        width='max-content'
                        mb='0.5rem'
                        variant='subtitle2'
                        fontSize='0.9rem'
                      >
                        {displayValueByLanguage({
                          language: i18n.language,
                          value: item,
                          field: 'name'
                        })}
                      </Typography>

                      <Box
                        sx={{
                          pb: '0.5rem'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: displayValueByLanguage({
                            language: i18n.language,
                            value: item,
                            field: 'description'
                          })
                        }}
                      />

                      <Box pb='0.5rem' pl='1rem'>
                        {item.options.map((option: any, optionIndex: number) => (
                          <Box
                            pb='0.3rem'
                            width='100%'
                            display='flex'
                            alignItems='center'
                            key={optionIndex}
                            borderTop={optionIndex === 0 ? '1px dashed #bdbdbd' : 'none'}
                            borderBottom='1px dashed #bdbdbd'
                            padding='0.5rem 0'
                          >
                            <Typography width='50%' fontWeight='500'>
                              {displayValueByLanguage({
                                language: i18n.language,
                                value: option,
                                field: 'title'
                              })}
                            </Typography>
                            <Typography width='20%' textAlign='center' color='textSecondary'>
                              {option.duration} {t('minutes')}
                            </Typography>
                            <Typography width='30%' textAlign='right' fontWeight='bold'>
                              {formatCurrency(option.price)}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>

            <Box mt='1rem' display='flex' justifyContent='end'>
              <Button onClick={handleBooking} variant='contained'>
                {t('Booking_now')}
              </Button>
            </Box>
          </Box>
        </Box>
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
            width={16}
            height={9}
            layout='responsive'
            alt='image'
            src='https://cdn.prod.website-files.com/6324b2bcf9793bf1b40b60cf/6515aa4ad40879fbf1594f50_pattenr%203-01.svg'
          />
        </Box>
        <Box
          ref={ref}
          sx={{
            background: 'red',
            position: 'absolute',
            zIndex: 1,
            top: '-3rem'
          }}
        ></Box>
      </Box>
    </>
  )
}

export default PackagePage

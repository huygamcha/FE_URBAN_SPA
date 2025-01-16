import React, { useEffect } from 'react'
import { Container, Box, Grid, Typography, Link, Divider, Button } from '@mui/material'
import Contact from './components/Contact'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { ROUTE_CONFIG } from 'src/configs/route'
import { useRouter } from 'next/navigation'
import CustomerImages from '../HOME/google-reviews/components/CustomerImages'
// import FacebookIcon from '@mui/icons-material/Facebook'
// import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {
  const { t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.trustindex.io/loader.js?25395fd393746564284627faa4a'
    script.defer = true
    script.async = true

    // Chèn script vào phần tử có ID "google-reviews"
    const targetElement = document.getElementById('google-reviews')
    if (targetElement) {
      targetElement.appendChild(script)
    }

    // Cleanup: Xóa script khi component bị unmount
    // return () => {
    //   if (targetElement) {
    //     targetElement.removeChild(script)
    //   }
    // }
  }, []) // Chỉ chạy một lần khi component được mount

  return (
    <>
      <Box
        p='2% 5%'
        sx={{
          background: '#fff'
        }}
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
          <CustomerImages />
          <div id='google-reviews'></div>
          <Box
            sx={{
              position: 'relative',
              padding: '15px',
              backgroundColor: 'rgb(84, 19, 13)',
              color: 'white',
              borderRadius: '0.5rem',
              overflow: 'hidden'
            }}
          >
            {/* Background Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: theme => theme.palette.customBackground.secondary,
                opacity: 0.8,
                zIndex: 0
              }}
            />

            {/* Content Container */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Grid container alignItems='center' justifyContent='center'>
                {/* Text Content */}
                <Grid item xs={12} md={9}>
                  <Typography color='#fff' variant='body1' sx={{ marginBottom: 2 }}>
                    {t('Hanoi_Urban_Oasis_Spa_Discount')}
                  </Typography>
                </Grid>

                {/* Booking Button */}
                <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
                  <Button
                    onClick={() => router.push(ROUTE_CONFIG.BOOKING.INDEX)}
                    variant='outlined'
                    sx={{
                      borderRadius: '99px',
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        backgroundColor: 'white',
                        color: 'rgb(84, 19, 13)'
                      }
                    }}
                  >
                    {t('Booking_now')}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box overflow='hidden'>
        <Box
          sx={{
            background: theme => theme.palette.customBackground.secondary
          }}
          padding='2% 5%'
        >
          <Contact />
        </Box>
      </Box>
    </>
  )
}

export default Footer

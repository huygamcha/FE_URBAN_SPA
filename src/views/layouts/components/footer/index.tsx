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
              borderRadius: 2,
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
        {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
          <path
            fill='#5e8172'
            fill-opacity='1'
            d='M0,96L48,90.7C96,85,192,75,288,64C384,53,480,43,576,48C672,53,768,75,864,85.3C960,96,1056,96,1152,96C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
          ></path>
        </svg> */}
        {/* <Box
          sx={{
            position: 'relative',
            zIndex: 1
          }}
        >
          <Box
            mt={{
              xs: '-1rem',
              lg: '-10rem'
            }}
            sx={{ backgroundColor: theme => theme.palette.customBackground.main }}
          >
            <Container
              sx={{
                position: 'relative',
                zIndex: 2
              }}
              maxWidth='lg'
            >
              <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Link href='/' underline='none'>
                  <img
                    src='https://cdn.kampa.vn/urban-oasis-spa-logo.png'
                    alt='urbanspa Logo'
                    width={250}
                    style={{ display: 'block', margin: '0 auto' }}
                  />
                </Link>
              </Box>

              <Grid container spacing={4} justifyContent='center' sx={{ marginBottom: '2rem' }}>
                <Grid item>
                  <Link href='/#about'>
                    <Typography color='title.light' variant='subtitle2'>
                      {t('About_Us')}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href='/#package' color='title.light'>
                    <Typography color='title.light' variant='subtitle2'>
                      {t('Package')}
                    </Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Typography
                    onClick={() => router.push(ROUTE_CONFIG.BOOKING.INDEX)}
                    color='title.light'
                    variant='subtitle2'
                  >
                    {t('Booking_now')}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Typography variant='subtitle1' gutterBottom color='title.light'>
                  {t('Opening_Daily')} 9h00 - 22h00
                </Typography>
              </Box>

              <Grid container spacing={4} justifyContent='center' sx={{ marginBottom: '2rem' }}>
                <Grid item>
                  <Box textAlign='center'>
                    <Typography variant='subtitle1' gutterBottom color='title.light'>
                      {t('Email')}
                    </Typography>
                    <Link
                      href='mailto:spa39ahanghanh@gmail.com'
                      color='title.light'
                      underline='hover'
                      variant='subtitle1'
                    >
                      spa39ahanghanh@gmail.com
                    </Link>
                  </Box>
                </Grid>
                <Grid item>
                  <Box textAlign='center'>
                    <Typography variant='subtitle1' gutterBottom color='title.light'>
                      {t('Hotline')}
                    </Typography>
                    <Link href='tel:+842433543333' color='title.light' underline='hover' variant='subtitle1'>
                      (+84) 243.354.3333
                    </Link>
                  </Box>
                </Grid>
                <Grid item>
                  <Box textAlign='center'>
                    <Typography variant='subtitle1' gutterBottom color='title.light'>
                      {t('Inbox_Facebook')}
                    </Typography>
                    <Link
                      href=''
                      color='title.light'
                      underline='hover'
                      target='_blank'
                      rel='noopener noreferrer'
                      variant='subtitle1'
                    >
                      www.facebook.com
                    </Link>
                  </Box>
                </Grid>
              </Grid>

              <Box textAlign='center' sx={{ paddingBottom: '1rem' }}>
                <Typography variant='body2' color='title.light'>
                  © 2016 Urban Oasis Spa.Allright resserved.
                </Typography>
              </Box>
            </Container>

            <Box
              sx={{
                position: 'absolute',
                bottom: '-10rem',
                right: 0,
                left: 0,
                zIndex: 1
              }}
            >
              <Image
                width={16 * 1.5}
                height={9 * 1.5}
                layout='responsive'
                alt='image'
                src='https://cdn.kampa.vn/hoaspa.svg'
              />
            </Box>
          </Box>
        </Box> */}
      </Box>
    </>
  )
}

export default Footer

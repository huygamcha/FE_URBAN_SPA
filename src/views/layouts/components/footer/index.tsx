import React from 'react'
import { Container, Box, Grid, Typography, Link, Divider } from '@mui/material'
import Contact from './components/Contact'
// import FacebookIcon from '@mui/icons-material/Facebook'
// import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {
  return (
    <>
      <Box padding='2% 5%'>
        <Contact />
      </Box>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#5e8172'
          fill-opacity='1'
          d='M0,96L48,90.7C96,85,192,75,288,64C384,53,480,43,576,48C672,53,768,75,864,85.3C960,96,1056,96,1152,96C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        ></path>
      </svg>
      <Box
        mt={{
          xs: '-1rem',
          lg: '-10rem'
        }}
        sx={{ backgroundColor: theme => theme.palette.customBackground.main }}
      >
        <Container maxWidth='lg'>
          {/* Logo Section */}
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

          {/* Navigation Links */}
          <Grid container spacing={2} justifyContent='center' sx={{ marginBottom: '2rem' }}>
            <Grid item>
              <Link href='/#about' underline='hover'>
                <Typography color='title.light' variant='subtitle2'>
                  About Us
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href='/#services' color='title.light' underline='hover'>
                <Typography color='title.light' variant='subtitle2'>
                  Services
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href='/promotions' color='title.light' underline='hover'>
                <Typography color='title.light' variant='subtitle2'>
                  Booking Now
                </Typography>
              </Link>
            </Grid>
          </Grid>

          {/* Contact Info */}
          <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Typography variant='subtitle1' gutterBottom color='title.light'>
              Opening daily 9h00 - 22h00
            </Typography>
          </Box>

          {/* Contact Methods */}
          <Grid container spacing={4} justifyContent='center' sx={{ marginBottom: '2rem' }}>
            <Grid item>
              <Box textAlign='center'>
                <Typography variant='subtitle1' gutterBottom color='title.light'>
                  Email
                </Typography>
                <Link href='mailto:cskh.spa@laboho.vn' color='title.light' underline='hover' variant='subtitle1'>
                  spa39ahanghanh@gmail.com
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Box textAlign='center'>
                <Typography variant='subtitle1' gutterBottom color='title.light'>
                  Hotline (WhatsApp / Zalo)
                </Typography>
                <Link href='tel:+84986320372' color='title.light' underline='hover' variant='subtitle1'>
                  (+84) 243.354.3333
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Box textAlign='center'>
                <Typography variant='subtitle1' gutterBottom color='title.light'>
                  Inbox Facebook
                </Typography>
                <Link
                  href='https://www.facebook.com/laboho.spa'
                  color='title.light'
                  underline='hover'
                  target='_blank'
                  rel='noopener noreferrer'
                  variant='subtitle1'
                >
                  www.facebook.com/laboho.spa
                </Link>
              </Box>
            </Grid>
          </Grid>

          {/* <Divider sx={{ marginBottom: '2rem' }} /> */}

          {/* Footer Bottom */}
          <Box textAlign='center' sx={{ paddingBottom: '1rem' }}>
            <Typography variant='body2' color='title.light'>
              © 2016 Urban Oasis Spa.Allright resserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default Footer

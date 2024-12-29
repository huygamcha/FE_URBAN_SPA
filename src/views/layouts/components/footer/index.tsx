import React from 'react'
import { Container, Box, Grid, Typography, Link, Divider } from '@mui/material'
// import FacebookIcon from '@mui/icons-material/Facebook'
// import InstagramIcon from '@mui/icons-material/Instagram'

const Footer = () => {
  return (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#5e8172'
          fill-opacity='1'
          d='M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,149.3C672,139,768,149,864,165.3C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'
        ></path>
      </svg>
      <Box
        mt={{
          xs: '-1rem',
          lg: '-5rem'
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
                  Promotions
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
          <Box textAlign='center' sx={{ marginBottom: '1rem' }}>
            <Typography variant='body2' color='title.light'>
              © 2016 Urban Oasis Spa.Allright resserved.
            </Typography>
          </Box>

          {/* Social Links */}
          <Box textAlign='center'>
            <Typography variant='body2' color='title.light' gutterBottom>
              Follow Us:
            </Typography>
            <Box display='flex' justifyContent='center' gap={2}>
              <Link
                href='https://www.facebook.com/laboho.spa'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ color: 'inherit' }}
              >
                {/* <FacebookIcon />  */}
              </Link>
              <Link
                href='https://www.instagram.com/laboho.spa'
                target='_blank'
                rel='noopener noreferrer'
                sx={{ color: 'inherit' }}
              >
                {/* <InstagramIcon /> */}
              </Link>
            </Box>
          </Box>

          {/* Legal Links */}
          {/* <Box textAlign='center' sx={{ marginTop: '2rem' }}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item>
              <Link href='/legal-policies/privacy-policy' color='title.light' underline='hover'>
                Privacy Policy
              </Link>
            </Grid>
            <Grid item>
              <Link href='/legal-policies/terms-of-service' color='title.light' underline='hover'>
                Terms of Use
              </Link>
            </Grid>
            <Grid item>
              <Link href='/legal-policies/cookies-policy' color='title.light' underline='hover'>
                Cookies Regulations
              </Link>
            </Grid>
          </Grid>
        </Box> */}
        </Container>
      </Box>
    </>
  )
}

export default Footer

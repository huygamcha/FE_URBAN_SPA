'use client'

import React from 'react'
import { Grid, Box, IconButton, Typography, Link } from '@mui/material'

const Contact = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {/* Left Grid: Social Media Icons */}
        <Grid item xs={12} md={6}>
          <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              Follow Us
            </Typography>
            <Box display='flex' gap={2}>
              {/* Facebook Icon */}
              <IconButton
                component='a'
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                color='primary'
              >
                {/* <FacebookIcon fontSize='large' /> */}
              </IconButton>

              {/* Zalo Icon */}
              <IconButton
                component='a'
                href='https://zalo.me'
                target='_blank'
                rel='noopener noreferrer'
                color='primary'
              >
                {/* <ZaloIcon style={{ width: 32, height: 32 }} /> */}
              </IconButton>

              {/* WhatsApp Icon */}
              <IconButton
                component='a'
                href='https://www.whatsapp.com'
                target='_blank'
                rel='noopener noreferrer'
                color='primary'
              >
                {/* <WhatsAppIcon fontSize='large' /> */}
              </IconButton>
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
            >
              31231
            </a>
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29792.312891707443!2d105.849959!3d21.031121!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abbfd1259fed%3A0xb1507bcd1cc0981a!2sUrban%20Oasis%20Spa!5e0!3m2!1sko!2sus!4v1736442871997!5m2!1sko!2sus'
              width='600'
              height='450'
              loading='lazy'
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact

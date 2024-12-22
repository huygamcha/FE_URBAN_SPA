import React from 'react'
import { Box, Typography, Container, Grid, Button, IconButton } from '@mui/material'
import Slider from 'react-slick'
import ReactPlayer from 'react-player/lazy'

const AboutSpa = () => {
  return (
    <Box
      sx={{
        maxWidth: '80rem',
        width: '100%',
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
        margin: '0 auto',
        justifyContent: 'space-between'
      }}
    >
      <Grid container spacing={8}>
        <Grid item xs={6}>
          <Box
            sx={{
              background: theme => theme.palette.common.white,
              padding: '1rem'
            }}
          >
            <Typography>Relax - Renew - Revitalize</Typography>
            <Typography variant='body1' mt={2}>
              Inspired by the nature and our modern <strong>BOHEMIAN life style</strong>,<strong> LABOHO Spa </strong>
              offers a wide range of treatments that helps you live in the moment. We will make you feel completely
              relaxed and comfortable in our spa vibe. We individually design our spa treatments to suit your skin type
              and personality. Our nourishing hair wash with natural herbal ingredients and skincare treatments with
              body scrub & wrap, blissful body massage and facial treatments, will leave your skin feeling like new.{' '}
              <strong>LABOHO Spa</strong> allows you to choose the best way to
              <strong> relax, unwind and recharge</strong> your body. <strong>LABOHO Spa</strong> offers a wide range of
              treatments :
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <ReactPlayer
            width='100%'
            url='https://www.youtube.com/watch?v=EkHTsc9PU2A&list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA&index=7&ab_channel=JasonMraz'
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AboutSpa

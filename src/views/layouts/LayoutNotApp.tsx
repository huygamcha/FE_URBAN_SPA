'use client'

// ** React
import * as React from 'react'

// ** next
import { NextPage } from 'next'

// ** Mui
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'

// ** views
import HorizontalLayout from 'src/views/layouts/HorizontalLayout'
import VerticalLayout from 'src/views/layouts/VerticalLayout'
import { useTheme } from '@mui/material'
import Image from 'next/image'

type TProps = {
  children: React.ReactNode
}

const LayoutNotApp: NextPage<TProps> = ({ children }) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        // component='main'
        sx={{
          backgroundColor: theme => theme.palette.customBackground.secondary,
          flexGrow: 1
          // bỏ phần này để ko có scrollBar
          // height: '100vh',
          // overflow: 'auto'
        }}
      >
        <HorizontalLayout toggleDrawer={() => {}} open={false} isHideMenu />
        <Toolbar />
        <Image
          src='https://urbanoasisspa.vn/wp-content/uploads/2022/07/urban_oasis_spa_8-scaled.jpg'
          alt='Responsive Image'
          layout='responsive'
          width={16}
          height={9} // Tỉ lệ khung hình 16:9
        />
        <Container
          sx={{
            m: 4,
            width: 'calc(100vw - 32px)',
            maxWidth: 'unset !important',
            overflow: 'auto',
            maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight} - 32px)`,
            padding: '0 !important',
            borderRadius: '15px'
          }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  )
}

export default LayoutNotApp

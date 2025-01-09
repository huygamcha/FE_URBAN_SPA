'use client'

// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'
import Link from 'next/link'

// ** Mui
import { styled } from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// components
import Icon from 'src/components/Icon'
import UserDropdown from 'src/views/layouts/components/user-dropdown'
import ModeToggle from 'src/views/layouts/components/mode-toggle'
import LanguageDropdown from 'src/views/layouts/components/language-dropdown'
import CartProduct from 'src/views/layouts/components/cart-product'
import NotificationDropdown from 'src/views/layouts/components/notification-dropdown'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

// config
import { ROUTE_CONFIG } from 'src/configs/route'
import { createUrlQuery } from 'src/utils'
import { useTranslation } from 'react-i18next'
import i18nConfig from 'src/app/i18nConfig'
import Image from 'next/image'
import useResponsiveScreen from 'src/hooks/useDeskTopScreen'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

type TProps = {
  open: boolean
  toggleDrawer: () => void
  isHideMenu?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: 1000,
  background: theme.palette.customBackground.secondary,
  // backgroundColor:
  //   theme.palette.mode === 'light' ? theme.palette.customColors.lightPaperBg : theme.palette.customColors.darkPaperBg,
  color: theme.palette.text.primary,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const CustomLayout = styled('div')(({ theme }) => ({
  // 1188
  // maxWidth: '74.25rem',
  // width: '100%',
  // margin: '0 auto',
  zIndex: theme.zIndex.drawer + 1,
  padding: '0px 5%'
  // Cấu hình marginTop cho các breakpoints khác nhau
  // [theme.breakpoints.up('lg')]: {
  //   padding: '0px'
  // }
  // padding: '0 0.5rem'
}))

const HorizontalLayout: NextPage<TProps> = ({ open, toggleDrawer, isHideMenu }) => {
  const { user } = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const { i18n } = useTranslation()
  const currentLang = i18n.language
  const urlDefault = currentLang === i18nConfig.defaultLocale ? '/' : `/${currentLang}`
  const urlLogin = currentLang === i18nConfig.defaultLocale ? '/login' : `/${currentLang}/login`

  // ** Context
  const isLg = useResponsiveScreen({ responsive: 'lg' })
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const toggleMobileMenu = (open: boolean) => {
    setMobileMenuOpen(open)
  }

  const handleNavigateLogin = () => {
    if (pathName !== urlDefault) {
      router.replace('/login' + '?' + createUrlQuery('returnUrl', pathName))
    } else {
      router.replace('/login')
    }
  }

  return (
    // <AppBar position='absolute' open={open}>
    <>
      <CustomLayout
        sx={{
          position: 'fixed',
          background: theme => theme.palette.customBackground.secondary,
          left: '0',
          right: '0',
          boxShadow: '0 2px 5px #0003'
        }}
      >
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
          {/* {!isHideMenu && (
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' })
            }}
          >
            <Icon icon='ic:round-menu' />
          </IconButton>
        )} */}
          <Box>
            <Typography component='h1' variant='h6' color='primary' noWrap sx={{ flexGrow: 1, fontWeight: '600' }}>
              <Link style={{ color: 'inherit' }} href={ROUTE_CONFIG.HOME}>
                <Image alt='logo urban' src='https://cdn.kampa.vn/urban-oasis-spa-logo.png' width={80} height={46} />
              </Link>
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            {isLg && (
              <Box gap={10} display='flex' alignItems='center'>
                <Link href={''}>
                  <Typography variant='subtitle2' fontWeight='500'>
                    Home
                  </Typography>
                </Link>
                <Link href={''}>
                  <Typography variant='subtitle2' fontWeight='500'>
                    About us
                  </Typography>
                </Link>
                <Link href={''}>
                  <Typography variant='subtitle2' fontWeight='500'>
                    Service
                  </Typography>
                </Link>
                <Link href={''}>
                  <Typography variant='subtitle2' fontWeight='500'>
                    Promotions
                  </Typography>
                </Link>
              </Box>
            )}

            <Box pl='2rem'>
              <LanguageDropdown />
            </Box>

            {user && (
              <>
                <UserDropdown />
              </>
            )}

            {!isLg && (
              <IconButton
                edge='end'
                color='inherit'
                aria-label='menu'
                onClick={() => toggleMobileMenu(!mobileMenuOpen)}
                sx={{
                  display: 'flex',
                  marginRight: '0rem !important',
                  paddingRight: '0rem !important'
                }}
              >
                {!mobileMenuOpen ? <Icon icon='ic:round-menu' /> : <Icon icon='iwwa:delete' />}
              </IconButton>
            )}
          </Box>
        </Box>
      </CustomLayout>
      {/* Mobile Drawer */}
      <Drawer
        anchor='top'
        open={mobileMenuOpen}
        onClose={() => toggleMobileMenu(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '100%',
            padding: '1rem',
            background: theme => theme.palette.customBackground.main
          }
          // zIndex: 1102
        }}
      >
        <Toolbar />
        <Box>
          <List>
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link href=''>
                  <Typography color='title.light' variant='subtitle1'>
                    Home
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link href=''>
                  <Typography color='title.light' variant='subtitle1'>
                    About us
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link href=''>
                  <Typography color='title.light' variant='subtitle1'>
                    Service
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link href=''>
                  <Typography color='title.light' variant='subtitle1'>
                    Promotions
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
    // </AppBar>
  )
}

export default HorizontalLayout

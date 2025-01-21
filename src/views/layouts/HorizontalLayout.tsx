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
import { checkLanguage, createUrlQuery } from 'src/utils'
import { useTranslation } from 'react-i18next'
import i18nConfig from 'src/app/i18nConfig'
import Image from 'next/image'
import useResponsiveScreen from 'src/hooks/useDeskTopScreen'
import BookingForm from '../pages/booking-form/BookingForm'
import { useDrawer } from 'src/hooks/useDrawer'

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

type TProps = {
  open: boolean
  toggleDrawer: () => void
  isHideMenu?: boolean
}

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
  // ** Hooks
  const { user } = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const { i18n, t } = useTranslation()
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
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Typography
              component='h1'
              variant='h6'
              color='primary'
              noWrap
              sx={{
                flexGrow: 1,
                fontWeight: '600',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 1s ease'
                }
              }}
            >
              <Link
                style={{
                  color: 'inherit'
                }}
                href={ROUTE_CONFIG.HOME}
              >
                <Image alt='logo urban' src='https://cdn.kampa.vn/urban-oasis-spa-logo.png' width={80} height={46} />
              </Link>
            </Typography>
          </Box>
          <Box display='flex' alignItems='center'>
            {isLg && (
              <Box
                gap={10}
                display='flex'
                alignItems='center'
                sx={{
                  '& a:hover .MuiTypography-root': {
                    opacity: 0.8
                  }
                }}
              >
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE}${checkLanguage(i18n.language, 'vi') ? '' : `/${i18n.language}`}`}
                >
                  <Typography variant='subtitle2' color='common.white' fontWeight='500'>
                    {t('Home')}
                  </Typography>
                </Link>
                {/* <Link href='#about'>
                  <Typography variant='subtitle2' color='common.white' fontWeight='500'>
                    {t('About_Us')}
                  </Typography>
                </Link> */}
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE}${checkLanguage(i18n.language, 'vi') ? '' : `/${i18n.language}`}/packages`}
                >
                  <Typography variant='subtitle2' color='common.white' fontWeight='500'>
                    {t('Package')}
                  </Typography>
                </Link>
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE}${checkLanguage(i18n.language, 'vi') ? '/' : `/${i18n.language}`}/contact`}
                >
                  <Typography variant='subtitle2' color='common.white' fontWeight='500'>
                    {t('Contact')}
                  </Typography>
                </Link>
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
                {!mobileMenuOpen ? (
                  <Icon color='#fff' icon='ic:round-menu' />
                ) : (
                  <Icon color='#fff' icon='iwwa:delete' />
                )}
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
            padding: '1rem'
          }
          // zIndex: 1102
        }}
      >
        <Toolbar />
        <Box>
          <List>
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE}${checkLanguage(i18n.language, 'vi') ? '' : `/${i18n.language}`}`}
                >
                  <Typography color='title.main' variant='subtitle1'>
                    {t('Home')}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
            {/* <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link href='#about'>
                  <Typography color='title.main' variant='subtitle1'>
                    {t('About_Us')}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem> */}
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE}${checkLanguage(i18n.language, 'vi') ? '/' : `/${i18n.language}`}/packages`}
                >
                  <Typography color='title.main' variant='subtitle1'>
                    {t('Package')}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link
                  href={`${process.env.NEXT_PUBLIC_SITE}${checkLanguage(i18n.language, 'vi') ? '/' : `/${i18n.language}`}/contact`}
                >
                  <Typography color='title.main' variant='subtitle1'>
                    {t('Contact')}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>

            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Button
                  onClick={() => router.push(ROUTE_CONFIG.BOOKING.INDEX)}
                  variant='outlined'
                  sx={{
                    borderRadius: '99px',
                    color: 'rgb(84, 19, 13)',
                    borderColor: 'rgb(84, 19, 13)',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: 'rgb(84, 19, 13)'
                    }
                  }}
                >
                  {t('Booking_now')}
                </Button>
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

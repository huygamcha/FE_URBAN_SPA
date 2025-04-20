'use client'

// ** React
import * as React from 'react'

// ** Next
import { NextPage } from 'next'
import Link from 'next/link'

// ** Mui
import { styled } from '@mui/material/styles'
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// components
import Icon from 'src/components/Icon'
import UserDropdown from 'src/views/layouts/components/user-dropdown'
import LanguageDropdown from 'src/views/layouts/components/language-dropdown'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import { Box, Button, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'

// config
import { ROUTE_CONFIG } from 'src/configs/route'
import { accessLink, checkLanguage } from 'src/utils'
import { useTranslation } from 'react-i18next'
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

  const links = [
    { label: 'Home', path: '/' },
    { label: 'About_Us', path: '/#about' },
    { label: 'Package', path: ROUTE_CONFIG.PACKAGE },
    { label: 'Contact', path: ROUTE_CONFIG.CONTACT },
    { label: 'Blog', path: ROUTE_CONFIG.BLOG }
  ]

  const isActive = (target: string) => pathName === target || pathName.includes(target)

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
                <Image
                  priority
                  alt='logo urban'
                  src='https://cdn.kampa.vn/urban-oasis-spa-logo.png'
                  width={80}
                  height={46}
                />
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
                  position: 'relative',
                  '& .MuiTypography-root': {
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: '-4px',
                      width: '0%',
                      height: '2px',
                      background: '#fff',
                      transition: 'width 0.3s ease'
                    }
                  },
                  '& .MuiTypography-root:hover': {
                    opacity: 0.8,
                    '&::after': {
                      width: '100%'
                    }
                  }
                }}
              >
                {links.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      '& .MuiTypography-root::after': {
                        width:
                          index === 0
                            ? `${item.path}${currentLang === 'vi' ? '' : `${currentLang}`}` === pathName
                              ? '100%'
                              : '0%'
                            : isActive(item.path)
                              ? '100%'
                              : '0%'
                      }
                    }}
                    onClick={e => {
                      router.push(accessLink(i18n.language, `${item.path}`))
                    }}
                  >
                    <Typography variant='subtitle2' color='common.white' fontWeight='500'>
                      {t(`${item.label}`)}
                    </Typography>
                  </Box>
                ))}

                <Button
                  onClick={e => {
                    router.push(accessLink(i18n.language, ROUTE_CONFIG.BOOKING.INDEX))
                  }}
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
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Box
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={e => {
                    router.push('/#about') // Chuyển hướng đến trang gốc và cuộn đến ID
                  }}
                >
                  <Typography color='title.main' variant='subtitle1'>
                    {t('About_Us')}
                  </Typography>
                </Box>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link href={ROUTE_CONFIG.PACKAGE}>
                  <Typography color='title.main' variant='subtitle1'>
                    {t('Package')}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>
            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link href={ROUTE_CONFIG.CONTACT}>
                  <Typography color='title.main' variant='subtitle1'>
                    {t('Contact')}
                  </Typography>
                </Link>
              </ListItemText>
            </ListItem>

            <ListItem onClick={() => toggleMobileMenu(false)}>
              <ListItemText>
                <Link href={ROUTE_CONFIG.BLOG}>
                  <Typography color='title.main' variant='subtitle1'>
                    {t('Blog')}
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

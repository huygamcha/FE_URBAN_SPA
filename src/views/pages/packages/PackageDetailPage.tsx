/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Typography, useTheme, Grid, Button } from '@mui/material'
import Image from 'next/image'

// ** Redux

// ** Components

// ** Config

// ** Services

// ** Utils
import { useParams, useRouter } from 'next/navigation'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { TPackage } from 'src/types/package'
import { displayValueByLanguage, formatCurrency } from 'src/utils'
import { useDrawer } from 'src/hooks/useDrawer'
import useResponsiveScreen from 'src/hooks/useDeskTopScreen'
import { ROUTE_CONFIG } from 'src/configs/route'
import { getAllPackages } from 'src/services/packages'
import Spinner from 'src/components/spinner'

type TProps = {
  packages?: TPackage
}

const PackageDetailPage: NextPage<TProps> = props => {
  // ** Hook
  const [packageItem, setPackageItem] = useState<TPackage>({
    _id: '',
    slug: '',
    name: '',
    nameEn: '',
    nameKo: '',
    nameJp: '',
    image: '',
    description: '',
    descriptionKo: '',
    descriptionJp: '',
    descriptionEn: '',
    services: []
  })
  const [loading, setLoading] = useState<boolean>(false)

  // ** Translate
  const { t, i18n } = useTranslation()
  const { packageId } = useParams()

  // ** Hook
  const ref = useRef<HTMLElement | null>(null)

  // ** Props
  // const { packages } = props

  // ** Context
  const isLg = useResponsiveScreen({ responsive: 'lg' })

  // ** theme
  const theme = useTheme()
  const router = useRouter()

  // ** Context
  // const { openBookingForm, setOpenBookingForm } = useDrawer()

  const handleBooking = () => {
    router.push(`${ROUTE_CONFIG.BOOKING.INDEX}/${packageItem?.slug}`)
  }

  useEffect(() => {
    if (packageId) {
      setLoading(true)
      const getPackages = async (search: string) => {
        try {
          await getAllPackages({ params: { limit: -1, page: -1, search: search } }).then(res => {
            setPackageItem(res?.data.packages[0])
            setLoading(false)
          })
        } catch (error) {
          throw new Error()
        }
      }
      getPackages(packageId as string)
    }
  }, [packageId])

  return (
    <>
      <Box
        sx={{
          padding: '2% 5%',
          position: 'relative',
          zIndex: 1,
          [theme.breakpoints.down('md')]: { padding: '0%' }
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
          {' '}
          <Box
            sx={{
              color: 'var(--red-text)',
              backgroundColor: '#ffffffc7',
              borderRadius: '20px',
              flexDirection: 'column',
              padding: '20px 40px',
              display: 'flex',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 2,
              [theme.breakpoints.down('md')]: { borderRadius: '0px', padding: '20px' }
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '2rem',
                  fontWeight: 600,
                  fontFamily: 'Playfair Display,sans-serif',
                  animation: 'slideDownFadeIn 1s ease-in',
                  '@keyframes slideDownFadeIn': {
                    '0%': {
                      transform: 'translateY(-20px)',
                      opacity: 0
                    },
                    '100%': {
                      transform: 'translateY(0)',
                      opacity: 1
                    }
                  }
                }}
                textAlign='center'
                color='text.secondary'
                gutterBottom
              >
                {displayValueByLanguage({ language: i18n.language, value: packageItem, field: 'name' })}
              </Typography>

              <Grid container spacing={5}>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      animation: 'slideDownFadeIn 1s ease-in',
                      '@keyframes slideDownFadeIn': {
                        '0%': {
                          transform: 'translateY(-20px)',
                          opacity: 0
                        },
                        '100%': {
                          transform: 'translateY(0)',
                          opacity: 1
                        }
                      }
                    }}
                  >
                    <Box
                      sx={{
                        overflow: 'hidden',
                        borderRadius: 'inherit',
                        fontSize: '0px'
                      }}
                    >
                      <Image
                        src={packageItem?.image}
                        alt='packages image'
                        width={626}
                        height={417}
                        priority
                        layout='responsive' // Sử dụng layout responsive
                        style={{
                          borderRadius: '8px',
                          objectFit: 'cover' // Giữ tỷ lệ ảnh đúng, cắt khi cần
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      animation: 'slideDownFadeIn 1s ease-in',
                      '@keyframes slideDownFadeIn': {
                        '0%': {
                          transform: 'translateY(-20px)',
                          opacity: 0
                        },
                        '100%': {
                          transform: 'translateY(0)',
                          opacity: 1
                        }
                      }
                    }}
                    border='1px solid #492828'
                    borderRadius='8px'
                    p='1rem'
                    pt='0rem'
                  >
                    {packageItem?.services.map((item, index) => (
                      <Box
                        py='1rem'
                        key={index}
                        borderBottom={index !== packageItem?.services.length - 1 ? '1px solid #492828' : 'none'}
                      >
                        <Box>
                          <Typography
                            sx={{
                              background: theme => theme.palette.customBackground.main
                            }}
                            p='0.2rem 1rem'
                            borderRadius='0.5rem'
                            color='#fff'
                            width='auto'
                            mb='0.5rem'
                            variant='subtitle2'
                            fontSize='0.9rem'
                          >
                            {displayValueByLanguage({
                              language: i18n.language,
                              value: item,
                              field: 'name'
                            })}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            pb: '0.5rem',
                            color: '#575757',
                            fontWeight: '500',
                            fontSize: '0.9rem',
                            '& p': {
                              fontFamily:
                                'Montserrat, Inter, "Playfair Display", "Public Sans", sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
                            }
                          }}
                          dangerouslySetInnerHTML={{
                            __html: displayValueByLanguage({
                              language: i18n.language,
                              value: item,
                              field: 'description'
                            })
                          }}
                        />

                        <Box pb='0.5rem' pl='1rem'>
                          <Box pb='0.3rem' width='100%' display='flex' alignItems='center' padding='0.5rem 0'>
                            <Typography
                              sx={{
                                width: 'calc(100% / 3)', // Chiều rộng
                                color: 'common.black', // Màu sắc (dùng palette của Material-UI)
                                fontWeight: 'bold' // Chữ đậm
                              }}
                            >
                              {t('Time')}
                            </Typography>
                            <Typography
                              sx={{
                                width: 'calc(100% / 3)', // Chiều rộng
                                color: 'common.black', // Màu sắc (dùng palette của Material-UI)
                                fontWeight: 'bold' // Chữ đậm
                              }}
                            >
                              {t('Price')}
                            </Typography>
                            <Typography
                              sx={{
                                width: 'calc(100% / 3)', // Chiều rộng
                                color: 'common.black', // Màu sắc (dùng palette của Material-UI)
                                fontWeight: 'bold' // Chữ đậm
                              }}
                            >
                              {t('Promotional_price')}
                            </Typography>
                          </Box>
                        </Box>

                        <Box pb='0.5rem' pl='1rem'>
                          {item.options.map((option: any, optionIndex: number) => (
                            <Box
                              pb='0.3rem'
                              width='100%'
                              display='flex'
                              alignItems='center'
                              key={optionIndex}
                              borderTop={optionIndex === 0 ? '1px dashed #bdbdbd' : 'none'}
                              borderBottom='1px dashed #bdbdbd'
                              padding='0.5rem 0'
                            >
                              <Typography
                                sx={{
                                  width: 'calc(100% / 3)', // Chiều rộng
                                  color: 'common.black' // Màu sắc (dùng palette của Material-UI)
                                }}
                              >
                                {option?.duration ? `${option?.duration} ${t('minutes')}` : ''}
                              </Typography>
                              <Typography
                                sx={{
                                  width: 'calc(100% / 3)', // Chiều rộng
                                  color: 'common.black', // Màu sắc (dùng palette của Material-UI)
                                  fontWeight: 'bold' // Chữ đậm
                                }}
                              >
                                {formatCurrency(option.price)}
                              </Typography>
                              <Box
                                sx={{
                                  position: 'relative',
                                  width: 'max-content'
                                }}
                              >
                                <Typography
                                  sx={{
                                    width: 'calc(100% / 3)', // Chiều rộng
                                    fontWeight: 'bold', // Chữ đậm
                                    color: '#d32f2f'
                                  }}
                                >
                                  {formatCurrency(option?.discountPrice ? option.discountPrice : option.price)}
                                </Typography>
                                <Box
                                  sx={{
                                    position: 'absolute',
                                    top: '-10px',
                                    right: '-25px',
                                    backgroundColor: '#d32f2f',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.5rem',
                                    borderRadius: '50%',
                                    width: '22px',
                                    height: '22px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  {Math.floor(
                                    ((option?.price - (option?.discountPrice ? option?.discountPrice : option.price)) /
                                      option?.price) *
                                      100
                                  ) || 0}
                                  %
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      animation: 'slideDownFadeIn 1s ease-in',
                      '@keyframes slideDownFadeIn': {
                        '0%': {
                          transform: 'translateY(-20px)',
                          opacity: 0
                        },
                        '100%': {
                          transform: 'translateY(0)',
                          opacity: 1
                        }
                      }
                    }}
                    mt='1rem'
                    display='flex'
                    justifyContent='start'
                  >
                    <Button onClick={handleBooking} variant='contained'>
                      {t('Booking_now')}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box
            ref={ref}
            sx={{
              background: 'red',
              position: 'absolute',
              zIndex: 1,
              top: '-3rem'
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: 1,
            fontSize: '0px'
          }}
        >
          <Image priority width={16} height={9} layout='responsive' alt='image' src='https://cdn.kampa.vn/sen.svg' />
        </Box>
      </Box>
    </>
  )
}

export default PackageDetailPage

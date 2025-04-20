'use client'

import { useEffect, useRef } from 'react'
import { TPackage } from 'src/types/package'
import { useTheme, Grid, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { displayValueByLanguage, formatCurrency } from 'src/utils'
import { useRouter } from 'next/navigation'
import { ROUTE_CONFIG } from 'src/configs/route'
import Image from 'next/image'
import useResponsiveScreen from 'src/hooks/useDeskTopScreen'

type TProps = {
  packages: TPackage[]
}

const Packages = (props: TProps) => {
  const { i18n, t } = useTranslation()
  const { packages } = props
  const isLg = useResponsiveScreen({ responsive: 'lg' })
  const router = useRouter()
  const theme = useTheme()
  const allRefs = useRef<Array<HTMLDivElement | HTMLSpanElement | null>>([])

  const handleDetail = (item: TPackage) => {
    router.push(`${ROUTE_CONFIG.PACKAGE}/${item.slug}`)
  }

  allRefs.current = Array(100).fill(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.2 }
    )

    allRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])
  const refIndex = useRef(1)

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: '80rem',
        width: '100%',
        minHeight: '64px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}
    >
      <Box>
        <Typography
          ref={el => {
            allRefs.current[0] = el
          }}
          sx={{
            height: '6px',
            background: theme.palette.common.white,
            margin: 'auto',
            width: '0%',
            transition: 'width 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)',
            '&.show': {
              width: '6rem'
            }
          }}
        />
      </Box>

      <Typography
        sx={{
          marginTop: '1rem',
          marginBottom: '1.5rem',
          fontSize: '2.5rem',
          fontWeight: 700,
          textAlign: 'center',
          color: 'common.white',
          fontFamily: 'Playfair Display,sans-serif',
          [theme.breakpoints.down('lg')]: {
            fontSize: '2rem'
          }
        }}
      >
        {t('Spa_Package')}
      </Typography>

      <Grid container spacing={4}>
        {packages
          ?.filter(u => u?.services?.length > 0)
          .map((pkg, i) =>
            pkg?.services?.map((item, index) => {
              const currentRefIndex = refIndex.current++

              return (
                <Grid item xs={12} sm={6} md={6} key={index}>
                  <Box
                    onClick={() => handleDetail(pkg)}
                    ref={el => {
                      allRefs.current[currentRefIndex] = el as HTMLDivElement | HTMLSpanElement | null
                    }}
                    sx={{
                      opacity: 0,
                      transform: 'translateY(50px)',
                      borderRadius: '1.25rem',
                      cursor: 'pointer',
                      backgroundColor: '#f4efea',
                      overflow: 'hidden',
                      transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1)',
                      '&.show': {
                        opacity: 1,
                        transform: 'translateY(0)',
                        height: '280px'
                      },
                      '&:hover': {
                        transform: 'scale(0.96)',
                        transition: 'transform 0.5s ease'
                      }
                    }}
                  >
                    {/* Top Title Bar */}
                    <Box
                      sx={{
                        backgroundColor: '#6c4241',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        borderTopLeftRadius: '1.25rem',
                        borderTopRightRadius: '1.25rem'
                      }}
                    >
                      {displayValueByLanguage({ language: i18n.language, value: item, field: 'name' })}
                    </Box>

                    <Box
                      sx={{
                        display: {
                          xs: 'block', // stack vertically on mobile
                          sm: 'flex' // side-by-side on larger screens
                        },
                        padding: '1rem',
                        gap: '1rem',
                        alignItems: 'center'
                      }}
                    >
                      {/* Image */}
                      <Box
                        sx={{
                          width: {
                            xs: '100%', // full width on mobile
                            sm: '40%' // original width on desktop
                          },
                          height: {
                            xs: '150px', // can be dynamic or fixed with aspectRatio
                            sm: '150px'
                          },
                          aspectRatio: {
                            xs: '1 / 1', // makes it square on mobile; remove for rectangle
                            sm: 'unset'
                          },
                          borderRadius: {
                            xs: '0.5rem',
                            sm: '1rem'
                          },
                          overflow: 'hidden'
                        }}
                      >
                        <Image
                          src={pkg.image}
                          alt={item.name}
                          width={300}
                          height={300}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>

                      {/* Text + Price */}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            mb: 1,
                            fontSize: {
                              xs: '0.7rem',
                              sm: '0.8rem',
                              md: '0.9rem',
                              lg: '1rem'
                            },
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                          dangerouslySetInnerHTML={{
                            __html: displayValueByLanguage({
                              language: i18n.language,
                              value: item,
                              field: 'description'
                            })
                          }}
                        ></Typography>

                        {/* Price header */}
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: '0.7fr 0.8fr 1fr auto',
                            mb: 1,
                            mt: 2,
                            '& .MuiTypography-root': {
                              fontWeight: 'bold',
                              fontSize: {
                                xs: '0.7rem',
                                sm: '0.8rem',
                                md: '0.9rem',
                                lg: '1rem'
                              }
                            }
                          }}
                        >
                          <Typography>{t('Time')}</Typography>
                          <Typography>{t('Price')}</Typography>
                          <Typography>{t('Promotional_price')}</Typography>
                        </Box>

                        {item.options.map((option: any, idx: number) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: '0.7fr 0.8fr 1fr auto',
                              alignItems: 'center',
                              mb: 5
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: {
                                  xs: '0.7rem',
                                  sm: '0.8rem',
                                  md: '0.9rem',
                                  lg: '1rem'
                                }
                              }}
                            >
                              {option.duration} {t('minutes')}
                            </Typography>
                            <Typography
                              sx={{
                                textDecoration: 'line-through',
                                fontSize: {
                                  xs: '0.7rem',
                                  sm: '0.8rem',
                                  md: '0.9rem',
                                  lg: '1rem'
                                }
                              }}
                            >
                              {formatCurrency(option.price)}
                            </Typography>
                            <Box>
                              <Box
                                sx={{
                                  position: 'relative',
                                  width: 'max-content'
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontWeight: 'bold',
                                    color: '#d32f2f',
                                    fontSize: {
                                      xs: '0.7rem',
                                      sm: '0.8rem',
                                      md: '0.9rem',
                                      lg: '1rem'
                                    }
                                  }}
                                >
                                  {formatCurrency(option.price)}
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
                                  20%
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            })
          )}
      </Grid>
    </Box>
  )
}

export default Packages

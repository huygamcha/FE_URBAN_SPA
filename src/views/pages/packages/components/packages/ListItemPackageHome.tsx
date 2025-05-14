import { useEffect, useRef } from 'react'
import { TPackage } from 'src/types/package'
import { useTheme, Grid, Typography, Box, keyframes, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { displayValueByLanguage } from 'src/utils'
import { useRouter } from 'next/navigation'
import { ROUTE_CONFIG } from 'src/configs/route'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'src/views/css/customReactSlickPakages.css'
import 'react-multi-carousel/lib/styles.css'
import { NextArrow, PrevArrow } from 'src/components/custom-react-slick'
import useResponsiveScreen from 'src/hooks/useDeskTopScreen'

type TProps = {
  packages: TPackage[]
}

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
  centerMode: true, // Kích hoạt center mode
  cssEase: 'linear',
  arrows: false,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
  // Custom padding for spacing
}

const ListItemPackageHome = (props: TProps) => {
  const { i18n, t } = useTranslation()
  const { packages } = props

  const isLg = useResponsiveScreen({ responsive: 'lg' })

  // ** Hooks
  const router = useRouter()
  const theme = useTheme()

  const allRefs = useRef<Array<HTMLDivElement | null>>([])

  // Khởi tạo refs cho cả Typography và packages
  allRefs.current = Array(packages?.length + 1).fill(null)

  const handleDetail = (item: TPackage) => {
    router.push(`${ROUTE_CONFIG.PACKAGE}/${item.slug}`)
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // 10% thì xuất hiện item
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
        }
        //  else {
        //   entry.target.classList.remove('show')
        // }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    allRefs.current.forEach(ref => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
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
        {/* Dòng ngang với hiệu ứng mở rộng */}
        <Box>
          <Typography
            ref={(el: HTMLDivElement | null) => {
              allRefs.current[0] = el // Typography ở vị trí đầu tiên
            }}
            sx={{
              height: '6px',
              background: theme => theme.palette.common.white,
              margin: 'auto',
              width: '0%', // Ban đầu dòng có chiều rộng bằng 0
              transition: 'width 0.8s cubic-bezier(0.17, 0.55, 0.55, 1)',
              '&.show': {
                width: '6rem' // Mở rộng chiều dài khi xuất hiện
              }
            }}
          ></Typography>
        </Box>

        {/* Tiêu đề */}
        <Typography
          sx={{
            marginTop: '1rem',
            marginBottom: '1.5rem',
            fontSize: '2.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
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

        {/* Danh sách packages */}

        {isLg ? (
          <Grid container spacing={4}>
            {packages.map((item: TPackage, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  onClick={() => handleDetail(item)}
                  ref={(el: HTMLDivElement | null) => {
                    allRefs.current[index + 1] = el // Packages refs bắt đầu từ vị trí thứ 2
                  }}
                  sx={{
                    opacity: 0,
                    transform: 'translateY(50px)',
                    borderRadius: '1.25rem',
                    cursor: 'pointer',
                    background: theme => theme.palette.customBackground.main,
                    transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1)',
                    '&.show': {
                      opacity: 1,
                      transform: 'translateY(0)'
                    },
                    '&:hover': {
                      transform: `scale(0.96)`,
                      transition: 'transform 0.5s ease',
                      backgroundColor: 'rgb(211, 146, 80)',
                      borderRadius: '1.25rem',
                      borderColor: 'rgba(192, 192, 211, 0)'
                    },
                    '&:hover .view-detail': {
                      // Hiệu ứng hover
                      bottom: '4rem',
                      opacity: 1
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                      borderColor: 'rgba(192, 192, 211, 0.2)'
                    }}
                  >
                    <Box
                      key={index}
                      sx={{
                        width: '100%',
                        height: { xs: '410px', sm: '410px' }, // Responsive height
                        position: 'relative', // Needed for Next.js <Image />
                        borderRadius: '1.25rem',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Image */}
                      <Image
                        style={{
                          objectFit: 'cover'
                        }}
                        alt={item.name}
                        src={item.image}
                        fill // Ensures the image stretches to fill the Box
                      />
                      {/* Overlay */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#3533335e', // Semi-transparent overlay
                          zIndex: 2, // Ensure overlay is above the image
                          display: 'flex',
                          justifyContent: 'center',
                          borderRadius: '1.25rem'
                        }}
                      ></Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          zIndex: 3, // Ensure overlay is above the image
                          display: 'flex',
                          justifyContent: 'center',
                          borderRadius: '1.25rem'
                        }}
                      >
                        <Typography
                          sx={{
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'end',
                            textTransform: 'uppercase',
                            paddingBottom: '2rem',
                            fontFamily: 'Playfair Display,sans-serif'
                          }}
                        >
                          {displayValueByLanguage({ language: i18n.language, value: item, field: 'name' })}
                        </Typography>
                      </Box>
                      {/* <Box
                      className='view-detail'
                      sx={{
                        position: 'absolute',
                        transform: 'translateX(-50%)',
                        borderRadius: 99,
                        bottom: '2rem',
                        left: '50%',
                        opacity: 0,
                        zIndex: 3, // Ensure overlay is above the image
                        transition: 'bottom 1s ease, opacity 0.3s ease'
                      }}
                    >
                      <Button
                        variant='outlined'
                        sx={{
                          width: '6rem', // Chiều rộng bằng chiều cao để tạo hình tròn
                          height: '6rem', // Chiều cao của button
                          borderRadius: '50%', // Bo tròn 100% để thành hình tròn
                          color: 'white',
                          borderColor: 'white',
                          display: 'flex', // Đảm bảo nội dung căn giữa
                          alignItems: 'center', // Căn giữa theo chiều dọc
                          justifyContent: 'center', // Căn giữa theo chiều ngang
                          whiteSpace: 'nowrap',
                          '&:hover': {
                            backgroundColor: 'white',
                            color: 'rgb(84, 19, 13)'
                          }
                        }}
                      >
                        {t('View_Detail')}
                      </Button>
                    </Box> */}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Slider className='mobile-package' {...settings}>
            {packages?.map((item: TPackage, index: number) => (
              <Box
                onClick={() => handleDetail(item)}
                key={index}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: { xs: '410px', sm: '410px' }, // Responsive height
                  aspectRatio: '4 / 3',
                  overflow: 'hidden',
                  outline: '0',
                  borderRadius: '0.5rem'
                }}
              >
                <Image src={item.image} alt='about us' layout='fill' objectFit='cover' />

                {/* Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.2)', // Black overlay with 50% opacity
                    borderRadius: '0.5rem'
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 3, // Ensure overlay is above the image
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '1.25rem'
                  }}
                >
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'end',
                      textTransform: 'uppercase',
                      paddingBottom: '2rem',
                      fontFamily: 'Playfair Display,sans-serif'
                    }}
                  >
                    {displayValueByLanguage({ language: i18n.language, value: item, field: 'name' })}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Slider>
        )}
      </Box>
    </>
  )
}

export default ListItemPackageHome

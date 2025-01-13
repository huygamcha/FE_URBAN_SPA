import { useEffect, useRef } from 'react'
import { TPackage } from 'src/types/package'
import { Grid, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { displayValueByLanguage } from 'src/utils'
import { useRouter } from 'next/navigation'
import { ROUTE_CONFIG } from 'src/configs/route'
import Image from 'next/image'

type TProps = {
  packages: TPackage[]
}

const Packages = (props: TProps) => {
  const { i18n, t } = useTranslation()
  const { packages } = props

  // ** Hooks
  const router = useRouter()

  const allRefs = useRef<Array<HTMLDivElement | null>>([])

  // Khởi tạo refs cho cả Typography và packages
  allRefs.current = Array(packages.length + 1).fill(null)

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
        } else {
          entry.target.classList.remove('show')
        }
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
      <Box sx={{ flexGrow: 1, position: 'relative', zIndex: 2 }}>
        {/* Dòng ngang với hiệu ứng mở rộng */}
        <Box>
          <Typography
            ref={(el: HTMLDivElement | null) => {
              allRefs.current[0] = el // Typography ở vị trí đầu tiên
            }}
            sx={{
              height: '6px',
              background: theme => theme.palette.customBackground.main,
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
            color: '#6b4241',
            fontFamily: 'Playfair Display,sans-serif'
          }}
        >
          {t('Spa_Package')}
        </Typography>

        {/* Danh sách packages */}
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
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  background: theme => theme.palette.customBackground.main,
                  transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1)',
                  '&.show': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    borderColor: 'rgba(192, 192, 211, 0.2)',
                    '&:hover': {
                      transform: `scale(1.02)`,
                      transition: 'transform 2s ease',
                      backgroundColor: 'rgb(211, 146, 80)',
                      borderRadius: '0.75rem',
                      borderColor: 'rgba(192, 192, 211, 0)',
                      '& > .MuiBox-root > .MuiBox-root > img': {
                        transform: 'scale(1.1)',
                        transition: 'transform 1s ease'
                      }
                    }
                  }}
                >
                  <Box
                    p='1rem'
                    sx={{
                      top: 0,
                      overflow: 'hidden',
                      transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',
                      transformStyle: 'preserve-3d',
                      position: 'relative',
                      zIndex: 2 // Nội dung chính
                    }}
                  >
                    <Box
                      sx={{
                        overflow: 'hidden',
                        borderRadius: '0.5rem',
                        fontSize: '0px'
                      }}
                    >
                      <img
                        width='100%'
                        height='auto'
                        alt={item.name}
                        src={item.image}
                        style={{
                          transition: 'transform 1s ease'
                        }}
                      />
                    </Box>
                    <Box pt='1rem'>
                      <Typography
                        sx={{
                          fontFamily: 'Playfair Display, serif', // Same font family as seen in the image
                          fontWeight: 700,
                          fontSize: '26px'
                        }}
                        variant='subtitle2'
                        color='#fff'
                      >
                        {displayValueByLanguage({ language: i18n.language, value: item, field: 'name' })}
                      </Typography>

                      <Box
                        color='#fff'
                        dangerouslySetInnerHTML={{
                          __html: displayValueByLanguage({
                            language: i18n.language,
                            value: item,
                            field: 'description'
                          })
                        }}
                      ></Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      left: 0,
                      zIndex: 1
                    }}
                  >
                    <Image
                      width={16 * 1.5}
                      height={9 * 1.5}
                      layout='responsive'
                      alt='image'
                      src='https://cdn.prod.website-files.com/6324b2bcf9793bf1b40b60cf/65167d720479a2589c73e28b_leav-01.svg'
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default Packages

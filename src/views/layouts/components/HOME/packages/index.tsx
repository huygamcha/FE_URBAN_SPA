import { useEffect, useRef } from 'react'
import { TPackage } from 'src/types/package'
import { Grid, Typography, Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { displayValueByLanguage } from 'src/utils'
import { useRouter } from 'next/navigation'
import { ROUTE_CONFIG } from 'src/configs/route'

type TProps = {
  packages: TPackage[]
}

const Packages = (props: TProps) => {
  const { i18n } = useTranslation()
  const { packages } = props

  // ** Hooks
  const router = useRouter()

  const allRefs = useRef<Array<HTMLDivElement | null>>([])

  // Khởi tạo refs cho cả Typography và packages
  allRefs.current = Array(packages.length + 1).fill(null)

  const handleDetail = (item: TPackage) => {
    const slug = item.slug
    // const params = new URLSearchParams(slug)
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
      <Box sx={{ flexGrow: 1 }}>
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
                width: '5.33333rem' // Mở rộng chiều dài khi xuất hiện
              }
            }}
          ></Typography>
        </Box>

        {/* Tiêu đề */}
        <Typography
          sx={{
            marginTop: '1rem',
            marginBottom: '0.5rem',
            fontSize: '2.5rem',
            fontWeight: '700',
            lineHeight: '1.2',
            textAlign: 'center',
            color: '#6b4241',
            fontFamily: 'Playfair Display,sans-serif'
          }}
        >
          SPA PACKAGE
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
                  transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1)',
                  '&.show': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }}
              >
                <Box
                  p='1rem'
                  sx={{
                    background: theme => theme.palette.customBackground.main,
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',
                    transformStyle: 'preserve-3d',
                    borderColor: 'rgba(192, 192, 211, 0.2)',
                    '&:hover': {
                      transform: `scale(1.02)`,
                      transition: 'transform 1s ease',
                      backgroundColor: 'rgb(211, 146, 80)',
                      borderColor: 'rgba(192, 192, 211, 0)',
                      '& img': {
                        transform: 'scale(1.1)',
                        transition: 'transform 1s ease'
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
                    <Typography variant='subtitle2' color='#fff'>
                      {displayValueByLanguage({ language: i18n.language, value: item, field: 'name' })}
                    </Typography>

                    <Box
                      // pb='1rem'
                      // sx={{
                      //   fontSize: '1rem',
                      //   fontWeight: 600
                      // }}
                      color='#fff'
                      dangerouslySetInnerHTML={{
                        __html: displayValueByLanguage({
                          language: i18n.language,
                          value: item,
                          field: 'description'
                        })
                      }}
                    ></Box>
                    {/* <Typography color='#fff'>
                      {displayValueByLanguage({ language: i18n.language, value: item, field: 'description' })}
                    </Typography> */}
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

'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Grid, Box, Typography, useTheme } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { displayValueByLanguage } from 'src/utils'
import Image from 'next/image'
import { ROUTE_CONFIG } from 'src/configs/route'

type TBlog = {
  _id: string
  name: string
  nameEn: string
  nameKo: string
  nameJp: string
  description: string
  descriptionEn: string
  descriptionKo: string
  descriptionJp: string
  slug: string
  thumbnail: string
  createdAt: string
}

type Props = {
  blogs: TBlog[]
}

const BlogListPage = ({ blogs }: Props) => {
  const { i18n, t } = useTranslation()
  const theme = useTheme()
  const router = useRouter()
  const allRefs = useRef<Array<HTMLDivElement | null>>([])
  const refIndex = useRef(1)

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

  return (
    <>
      <Box sx={{ padding: '2% 5%', position: 'relative', zIndex: 1 }}>
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
              ref={(el: HTMLDivElement | null) => {
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

              [theme.breakpoints.down('lg')]: {
                fontSize: '2rem'
              }
            }}
          >
            {t('Blog')}
          </Typography>

          <Grid container spacing={4}>
            {blogs.map((blog, index) => {
              const currentRefIndex = refIndex.current++

              return (
                <Grid item xs={12} sm={6} md={4} key={blog._id}>
                  <Box
                    ref={(el: HTMLDivElement | null) => {
                      allRefs.current[currentRefIndex] = el
                    }}
                    onClick={() => router.push(`${ROUTE_CONFIG.BLOG}/${blog.slug}`)}
                    sx={{
                      opacity: 0,
                      transform: 'translateY(50px)',
                      transition: 'all 1s cubic-bezier(0.17, 0.55, 0.55, 1)',
                      '&.show': {
                        opacity: 1,
                        transform: 'translateY(0)'
                      },
                      '&:hover': {
                        transform: 'scale(0.96)',
                        transition: 'transform 0.5s ease'
                      },
                      borderRadius: '1rem',
                      backgroundColor: '#f4efea',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%'
                    }}
                  >
                    {/* Title */}
                    <Box
                      sx={{
                        backgroundColor: '#6c4241',
                        color: 'white',
                        padding: '0.75rem 1.5rem',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        borderTopLeftRadius: '1rem',
                        borderTopRightRadius: '1rem',

                        // 👇 Cần thiết để line-clamp hoạt động
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}
                    >
                      {displayValueByLanguage({ language: i18n.language, value: blog, field: 'name' })}
                    </Box>

                    {/* Creation Time */}
                    <Box
                      sx={{
                        backgroundColor: '#8a6665',
                        color: 'white',
                        padding: '0.5rem 1.5rem',
                        fontSize: '0.875rem',
                        fontStyle: 'italic',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <circle cx='12' cy='12' r='10' />
                        <polyline points='12 6 12 12 16 14' />
                      </svg>
                      {new Date(blog.createdAt).toLocaleDateString(i18n.language, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Box>

                    {/* Thumbnail */}
                    <Box
                      sx={{
                        flex: 1,
                        padding: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: {
                            xs: '150px',
                            md: '200px'
                          },
                          borderRadius: '0.75rem',
                          overflow: 'hidden'
                        }}
                      >
                        <Image
                          src={blog.thumbnail || '/placeholder.svg'}
                          alt={blog.name}
                          width={300}
                          height={300}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            })}
          </Grid>
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
          <Image width={16} height={9} layout='responsive' alt='image' src='https://cdn.kampa.vn/sen.svg' />
        </Box>
      </Box>
    </>
  )
}

export default BlogListPage

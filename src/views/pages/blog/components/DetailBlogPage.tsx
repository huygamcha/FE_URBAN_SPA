'use client'

import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import { useTranslation } from 'react-i18next'
import { displayValueByLanguage } from 'src/utils'

type TBlog = {
  _id: string
  slug: string
  name: string
  nameEn: string
  nameKo: string
  nameJp: string
  description: string
  descriptionEn?: string
  descriptionKo?: string
  descriptionJp?: string
  thumbnail: string
  createdAt?: string
}

type TDetailBlogPage = {
  detailBlog: TBlog
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function DetailBlogPage({ detailBlog }: TDetailBlogPage) {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { data, isLoading, error } = useSWR(
    `http://localhost:3001/api/v1.0/blogs/random?currentSlug=${detailBlog.slug}`,
    fetcher
  )

  const relatedBlogs = data?.data || []
  const allRefs = useRef<HTMLDivElement[]>([])
  const refIndex = useRef(0)

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
  }, [relatedBlogs])

  return (
    <Box>
      {/* MAIN BLOG SECTION */}
      <Box sx={{ background: '#440a09', padding: '2% 5%' }}>
        <Box
          sx={{
            flexGrow: 1,
            maxWidth: '80rem',
            width: '100%',
            margin: '0 auto',
            zIndex: 2,
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Date */}
              {detailBlog.createdAt && (
                <Typography variant='caption' sx={{ color: '#ccc', display: 'block', mb: 1 }}>
                  {new Date(detailBlog.createdAt).toLocaleDateString(i18n.language, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Typography>
              )}

              {/* Title */}
              <Typography fontSize='1.5rem' fontWeight={600} color='#fff' mb={2}>
                {displayValueByLanguage({
                  field: 'name',
                  value: detailBlog,
                  language: i18n.language
                })}
              </Typography>

              {/* Content */}
              <Box
                sx={{
                  color: '#fff',
                  lineHeight: 1.8,
                  img: {
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block',
                    margin: '1rem auto',
                    borderRadius: '8px'
                  }
                }}
                dangerouslySetInnerHTML={{
                  __html: displayValueByLanguage({
                    field: 'description',
                    value: detailBlog,
                    language: i18n.language
                  })
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* RELATED BLOGS SECTION */}
      <Box sx={{ maxWidth: '80rem', margin: '0 auto', px: 4, py: 6 }}>
        <Typography
          sx={{
            fontSize: '2rem',
            fontWeight: 600,
            fontFamily: 'Playfair Display,sans-serif',
            animation: 'slideDownFadeIn 1s ease-in',
            opacity: 1,
            color: '#fff'
          }}
          textAlign='center'
          color='text.secondary'
          gutterBottom
        >
          {t('Các bài viết liên quan')}
        </Typography>

        {isLoading ? (
          <Typography color='white'>{t('Đang tải...')}</Typography>
        ) : error ? (
          <Typography color='error'>{t('Không thể tải các bài viết liên quan')}</Typography>
        ) : (
          <Grid container spacing={4}>
            {relatedBlogs.map((blog, index) => {
              const currentIndex = refIndex.current++

              return (
                <Grid item xs={12} sm={6} md={4} key={blog._id}>
                  <Box
                    ref={el => {
                      if (el instanceof HTMLDivElement) allRefs.current[currentIndex] = el
                    }}
                    onClick={() => router.push(`/blog/${blog.slug}`)}
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
                        borderTopRightRadius: '1rem'
                      }}
                    >
                      {displayValueByLanguage({
                        language: i18n.language,
                        value: blog,
                        field: 'name'
                      })}
                    </Box>

                    {/* Date */}
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
                          height: { xs: '150px', md: '200px' },
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
        )}
      </Box>
    </Box>
  )
}

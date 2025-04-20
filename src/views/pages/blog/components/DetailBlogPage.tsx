'use client'

import { Box, Grid, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

type TDetailBlogPage = {
  detailBlog: any
}

export default function DetailBlogPage({ detailBlog }: TDetailBlogPage) {
  console.log('««««« detailBlog »»»»»', detailBlog)
  const { t, i18n } = useTranslation()

  return (
    <>
      <Box overflow='hidden'>
        <Box overflow='hidden'>
          <Box sx={{ background: '#440a09' }} padding='2% 5%'>
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Box>
                    <Typography fontSize='1rem' sx={{ color: '#fff' }}>
                      {detailBlog.name}
                    </Typography>

                    <Box
                      sx={{
                        color: '#fff',
                        mt: 4,
                        lineHeight: 1.8,
                        img: { maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }
                      }}
                      dangerouslySetInnerHTML={{ __html: detailBlog.description }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

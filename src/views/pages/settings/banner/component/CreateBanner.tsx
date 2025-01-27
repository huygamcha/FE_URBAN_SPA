/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// ** React
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Mui
import { Box, Button, FormHelperText, Grid, IconButton, Typography, useTheme } from '@mui/material'

// ** Component
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
import Spinner from 'src/components/spinner'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { createBannerAsync } from 'src/stores/banner/actions'
import { uploadMultipleImage, uploadMultipleImageBanner } from 'src/utils'
import Image from 'next/image'
import { getDetailsBanner } from 'src/services/banners'
import WrapperFileUploadMultiple from 'src/components/upload-multiple'

interface TCreateEditBanner {
  open: boolean
  onClose: () => void
  idBanner?: string
}

type TDefaultValue = {
  links: string[]
}

const CreateBanner = (props: TCreateEditBanner) => {
  // State
  const [loading, setLoading] = useState(false)
  const [imageCloudflare, setImageCloudflare] = useState<any[]>([])

  // ** Props
  const { open, onClose, idBanner } = props

  // Hooks
  const theme = useTheme()
  const { t } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    links: yup.array().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    links: ['']
  }

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
    setValue,
    setError
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // handle
  const onSubmit = async (data: any) => {
    setLoading(true)
    const result = await uploadMultipleImageBanner(imageCloudflare)
    dispatch(
      createBannerAsync({
        links: result
      })
    )
    setImageCloudflare([])
    setLoading(false)
  }

  // fetch
  const fetchDetailsBanner = async (id: string) => {
    setLoading(true)
    await getDetailsBanner(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            links: data.links
          })
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  // handleImage huygamcha
  const handleUploadAvatar = async (pics: File[]) => {
    const errorImage = pics.some(item => item.size > 10000000)

    if (!errorImage) {
      const arrayOfFile: FormData[] = []

      // sử lí đồng bộ
      const filePreviews: string[] = await Promise.all(
        pics.map(
          pic =>
            new Promise<string>((resolve, reject) => {
              const data = new FormData()
              data.append('file', pic)
              arrayOfFile.push(data)

              const reader = new FileReader()
              reader.readAsDataURL(pic)
              reader.onload = e => resolve(e.target?.result as string)
              reader.onerror = e => reject(e)
            })
        )
      )

      // Update the form with previews
      filePreviews.forEach((preview, index) => {
        setValue(`links.${index}`, preview)
      })

      // Update cloudflare images
      setImageCloudflare(prev => [...prev, ...arrayOfFile])
    } else {
      setError('links', { type: 'custom', message: t('Image_Size_Limit') })
    }
  }

  const handleDelete = async (id: number) => {
    const remove = imageCloudflare.filter((_, index) => index !== id)
    const removeYup = getValues('links').filter((_, index) => index !== id)
    setImageCloudflare(remove)

    setValue('links', removeYup)
  }

  useEffect(() => {
    if (!open) {
      reset({ ...defaultValues })
    } else if (idBanner && open) {
      fetchDetailsBanner(idBanner)
    }
  }, [open, idBanner])

  return (
    <>
      {loading && <Spinner />}
      <CustomModal
        open={open}
        onClose={() => {
          onClose()
          setImageCloudflare([])
        }}
      >
        <Box
          sx={{
            padding: '20px',
            borderRadius: '15px',
            backgroundColor: theme.palette.customColors.bodyBg
          }}
          minWidth={{ md: '90vw', xs: '90vw' }}
          maxWidth={{ md: '90vw', xs: '90vw' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingBottom: '20px' }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              {t('Create_banner')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <Controller
                    name='links'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, value } }) => (
                      <>
                        {/* Phần hiển thị ảnh */}
                        <Grid container spacing={2}>
                          {value?.map((item, index) => (
                            <Grid item xs={3} key={index}>
                              {' '}
                              {/* Mỗi ảnh chiếm 3/12 cột */}
                              {item && (
                                <Box sx={{ position: 'relative' }}>
                                  <Box>
                                    <Image src={item} layout='responsive' width={16} height={9} alt='image' />
                                  </Box>
                                  <IconButton
                                    onClick={() => {
                                      handleDelete(index)
                                    }} // Xóa ảnh
                                  >
                                    <Icon icon='material-symbols-light:delete-outline' />
                                  </IconButton>
                                </Box>
                              )}
                            </Grid>
                          ))}
                        </Grid>

                        {/* Phần tải ảnh lên */}
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                          <WrapperFileUploadMultiple
                            uploadFunc={async files => {
                              await handleUploadAvatar(files) // Hàm xử lý upload
                            }}
                            objectAcceptFile={{
                              'image/jpeg': ['.jpg', '.jpeg'],
                              'image/webp': ['.webp'],
                              'image/png': ['.png'],
                              'image/svg': ['.svg']
                            }}
                          >
                            <Button
                              variant='outlined'
                              sx={{ width: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}
                            >
                              <Icon icon='ph:camera-thin' />
                              {t('Upload_banner_image')}
                            </Button>
                          </WrapperFileUploadMultiple>
                        </Box>

                        {errors?.links?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.links
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`,
                              fontSize: '1rem'
                            }}
                          >
                            {errors?.links?.message}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idBanner ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default CreateBanner

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
import CustomTextField from 'src/components/text-field'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { createBannerAsync, updateBannerAsync } from 'src/stores/banner/actions'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import CustomEditor from 'src/components/custom-editor'
import { convertHTMLToDraft, stringToSlug, uploadMultipleImage } from 'src/utils'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import Image from 'next/image'
import { getDetailsBanner } from 'src/services/banners'

interface TCreateEditBanner {
  open: boolean
  onClose: () => void
  idBanner?: string
}

type TDefaultValue = {
  link: string
}

const CreateEditBanner = (props: TCreateEditBanner) => {
  // State
  const [loading, setLoading] = useState(false)
  const [imageCloudflare, setImageCloudflare] = useState<{ image: any }>({ image: '' })

  // ** Props
  const { open, onClose, idBanner } = props

  // Hooks
  const theme = useTheme()
  const { t } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    link: yup.string().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    link: ''
  }

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // handle
  const onSubmit = async (data: any) => {
    const result = await uploadMultipleImage(imageCloudflare)

    if (!Object.keys(errors).length) {
      dispatch(
        updateBannerAsync({
          ...data,
          image: result.image ? result.image : data?.image,
          id: idBanner
        })
      )
    }
  }

  // fetch
  const fetchDetailsBanner = async (id: string) => {
    setLoading(true)
    await getDetailsBanner(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            link: data.link
          })
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  // handleImage huygamcha
  const handleUploadAvatar = async (pics: File, field: string) => {
    const data = new FormData()
    data.append('file', pics)
    setImageCloudflare(prev => ({
      ...prev,
      [field]: data
    }))

    // hiển thị ảnh để preview
    // Use FileReader to read the file and display it
    const reader = new FileReader()
    reader.onload = (e: any) => {
      setValue('link', e.target.result)
    }
    reader.readAsDataURL(pics)
    // setImageURL(null)
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
      <CustomModal open={open} onClose={onClose}>
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
              {t('Change_banner_image')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='link'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, value } }) => (
                      <>
                        {/* Phần hiển thị ảnh */}
                        <Box sx={{ position: 'relative' }}>
                          {value && (
                            <Box>
                              <Image src={value} layout='responsive' width={16} height={9} alt='image' />
                            </Box>
                          )}
                        </Box>

                        {/* Phần tải ảnh lên */}
                        <Box display='flex' alignItems='center' justifyContent='space-between'>
                          <WrapperFileUpload
                            uploadFunc={async file => {
                              await handleUploadAvatar(file, 'image') // Hàm xử lý upload
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
                              {t('Change_banner_image')}
                            </Button>
                          </WrapperFileUpload>
                          {value && (
                            <IconButton
                              onClick={() => {
                                onChange('')
                                setImageCloudflare(prev => ({
                                  ...prev,
                                  image: ''
                                }))
                              }} // Xóa ảnh
                            >
                              <Icon icon='material-symbols-light:delete-outline' />
                            </IconButton>
                          )}
                        </Box>

                        {errors?.link?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.link
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`,
                              fontSize: '1rem'
                            }}
                          >
                            {errors?.link?.message}
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

export default CreateEditBanner

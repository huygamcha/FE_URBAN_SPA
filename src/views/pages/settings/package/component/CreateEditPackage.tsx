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
import { createPackageAsync, updatePackageAsync } from 'src/stores/package/actions'
import { getDetailsPackage } from 'src/services/packages'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import CustomEditor from 'src/components/custom-editor'
import { convertHTMLToDraft, stringToSlug, uploadMultipleImage } from 'src/utils'
import WrapperFileUpload from 'src/components/wrapper-file-upload'
import Image from 'next/image'

interface TCreateEditPackage {
  open: boolean
  onClose: () => void
  idPackage?: string
}

type TDefaultValue = {
  name: string
  nameKo: string
  nameEn: string
  nameJp: string
  image: string
  slug: string
}

interface FieldConfig {
  name: keyof TDefaultValue
  label: string
}

const fields: FieldConfig[] = [
  { name: 'slug', label: 'Slug' },
  { name: 'name', label: 'Name' },
  { name: 'nameKo', label: 'Name_Korean' },
  { name: 'nameEn', label: 'Name_English' },
  { name: 'nameJp', label: 'Name_Japanese' }
]

const CreateEditPackage = (props: TCreateEditPackage) => {
  // State
  const [loading, setLoading] = useState(false)
  const [imageCloudflare, setImageCloudflare] = useState<{ image: any }>({ image: '' })

  // ** Props
  const { open, onClose, idPackage } = props

  // Hooks
  const theme = useTheme()
  const { t } = useTranslation()

  // ** Redux
  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field')),
    nameKo: yup.string().required(t('Required_field')),
    nameEn: yup.string().required(t('Required_field')),
    nameJp: yup.string().required(t('Required_field')),
    image: yup.string().required(t('Required_field')),
    slug: yup.string().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    name: '',
    nameKo: '',
    nameEn: '',
    nameJp: '',
    image: '',
    slug: ''
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
    let resultImage
    if (Object.values(imageCloudflare)[0]) {
      resultImage = await uploadMultipleImage(imageCloudflare)
    }

    if (!Object.keys(errors).length) {
      if (idPackage) {
        // update
        dispatch(
          updatePackageAsync({
            ...data,
            image: resultImage?.image ? resultImage?.image : data?.image,
            id: idPackage
          })
        )
      } else {
        dispatch(
          createPackageAsync({
            ...data,
            image: resultImage?.image ? resultImage?.image : data?.image
          })
        )
      }
    }

    setImageCloudflare({ image: '' })
    setLoading(false)
    // onClose()
  }

  // fetch
  const fetchDetailPackage = async (id: string) => {
    setLoading(true)
    await getDetailsPackage(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            name: data.name,
            nameKo: data.nameKo,
            nameEn: data.nameEn,
            nameJp: data.nameJp,
            slug: data.slug,
            image: data.image
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
    if (pics?.size < 10000000) {
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
        setValue(field as keyof TDefaultValue, e.target.result)
      }
      reader.readAsDataURL(pics)
      // setImageURL(null)
    } else {
      setError('image', { type: 'custom', message: t('Image_Size_Limit') })
    }
  }

  useEffect(() => {
    if (!idPackage) {
      reset({ ...defaultValues })
    } else if (idPackage && open) {
      fetchDetailPackage(idPackage)
    }
  }, [open, idPackage])

  return (
    <>
      {loading && <Spinner />}
      <CustomModal
        open={open}
        onClose={() => {
          onClose()
          setImageCloudflare({ image: '' })
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
              {idPackage ? t('Edit_category') : t('Create_category')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Controller
                    name='image'
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
                              const uploadedImageUrl = await handleUploadAvatar(file, 'image') // Hàm xử lý upload
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
                              {value ? t('Change_image') : t('Upload_image')}
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

                        {errors?.image?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.image
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`,
                              fontSize: '1rem'
                            }}
                          >
                            {errors?.image?.message}
                          </FormHelperText>
                        )}
                      </>
                    )}
                  />
                </Grid>

                {fields.map(({ name, label }) => (
                  <Grid item md={6} xs={12} key={name}>
                    <Controller
                      control={control}
                      name={name}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          required
                          fullWidth
                          // disabled={name === 'slug' ? true : false}
                          label={t(label)}
                          // onChange={onChange}
                          onChange={e => {
                            const value = e.target.value
                            if (name === 'nameEn') {
                              const replaced = stringToSlug(value)
                              onChange(value)
                              reset({
                                ...getValues(),
                                slug: replaced
                              })
                            } else {
                              onChange(value)
                            }
                          }}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t(`Enter_${label}`)}
                          error={Boolean(errors?.name)}
                          helperText={errors?.name?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idPackage ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default CreateEditPackage

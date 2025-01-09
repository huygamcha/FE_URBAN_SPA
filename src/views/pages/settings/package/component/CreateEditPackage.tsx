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
import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material'

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
import { convertHTMLToDraft, stringToSlug } from 'src/utils'

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
  description: EditorState
  descriptionKo: EditorState
  descriptionEn: EditorState
  descriptionJp: EditorState
  image: string
  slug: string
}

interface FieldConfig {
  name: keyof TDefaultValue
  label: string
}

const fields: FieldConfig[] = [
  { name: 'name', label: 'Name' },
  { name: 'nameKo', label: 'Name (Korean)' },
  { name: 'nameEn', label: 'Name (English)' },
  { name: 'nameJp', label: 'Name (Japanese)' },
  { name: 'image', label: 'Image URL' },
  { name: 'slug', label: 'Slug' }
]

const descriptionFields: FieldConfig[] = [
  { name: 'description', label: 'Description (Default)' },
  { name: 'descriptionKo', label: 'Description (Korean)' },
  { name: 'descriptionEn', label: 'Description (English)' },
  { name: 'descriptionJp', label: 'Description (Japanese)' }
]

const CreateEditPackage = (props: TCreateEditPackage) => {
  // State
  const [loading, setLoading] = useState(false)

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
    description: yup.object().required(t('Required_field')),
    descriptionKo: yup.object().required(t('Required_field')),
    descriptionEn: yup.object().required(t('Required_field')),
    descriptionJp: yup.object().required(t('Required_field')),
    image: yup.string().url(t('Invalid_URL')).required(t('Required_field')),
    slug: yup.string().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    name: '',
    nameKo: '',
    nameEn: '',
    nameJp: '',
    description: EditorState.createEmpty(),
    descriptionKo: EditorState.createEmpty(),
    descriptionEn: EditorState.createEmpty(),
    descriptionJp: EditorState.createEmpty(),
    image: '',
    slug: ''
  }

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // handle
  const onSubmit = (data: any) => {
    if (!Object.keys(errors).length) {
      if (idPackage) {
        // update
        dispatch(
          updatePackageAsync({
            ...data,
            description: data.description ? draftToHtml(convertToRaw(data.description.getCurrentContent())) : '',
            descriptionKo: data.descriptionKo ? draftToHtml(convertToRaw(data.descriptionKo.getCurrentContent())) : '',
            descriptionEn: data.descriptionEn ? draftToHtml(convertToRaw(data.descriptionEn.getCurrentContent())) : '',
            descriptionJp: data.descriptionJp ? draftToHtml(convertToRaw(data.descriptionJp.getCurrentContent())) : '',
            id: idPackage
          })
        )
      } else {
        dispatch(
          createPackageAsync({
            ...data,
            description: data.description ? draftToHtml(convertToRaw(data.description.getCurrentContent())) : '',
            descriptionKo: data.descriptionKo ? draftToHtml(convertToRaw(data.descriptionKo.getCurrentContent())) : '',
            descriptionEn: data.descriptionEn ? draftToHtml(convertToRaw(data.descriptionEn.getCurrentContent())) : '',
            descriptionJp: data.descriptionJp ? draftToHtml(convertToRaw(data.descriptionJp.getCurrentContent())) : ''
          })
        )
      }
    }
  }

  // fetch
  const fetchDetailsPackage = async (id: string) => {
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
            image: data.image,
            description: data.description ? convertHTMLToDraft(data.description) : '',
            descriptionEn: data.descriptionEn ? convertHTMLToDraft(data.descriptionEn) : '',
            descriptionJp: data.descriptionJp ? convertHTMLToDraft(data.descriptionJp) : '',
            descriptionKo: data.descriptionKo ? convertHTMLToDraft(data.descriptionKo) : ''
          })
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!open) {
      reset({ ...defaultValues })
    } else if (idPackage && open) {
      fetchDetailsPackage(idPackage)
    }
  }, [open, idPackage])

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
              {idPackage ? t('Edit_package') : t('Create_package')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container spacing={2}>
                {fields.map(({ name, label }) => (
                  <Grid item md={12} xs={12} key={name}>
                    <Controller
                      control={control}
                      name={name}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          required
                          fullWidth
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
                          placeholder={t(`Enter_${label.toLowerCase().replace(/\s/g, '_')}`)}
                          error={Boolean(errors?.name)}
                          helperText={errors?.name?.message}
                        />
                      )}
                    />
                  </Grid>
                ))}
                {descriptionFields.map(({ name, label }) => (
                  <Grid item md={12} xs={12} key={name}>
                    <Controller
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomEditor
                          onEditorStateChange={onChange}
                          label={`${t(label)}`}
                          onBlur={onBlur}
                          editorState={value as EditorState}
                          placeholder={t(`Enter_${label.replace(/\s/g, '_')}`)}
                          error={Boolean(errors?.[name])}
                          helperText={errors?.[name]?.message}
                        />
                      )}
                      name={name}
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

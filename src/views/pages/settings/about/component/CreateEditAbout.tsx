'use client'

// ** React
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Mui
import { Box, Button, Grid, useTheme } from '@mui/material'

// ** Redux

// ** Draft.js
import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { convertHTMLToDraft } from 'src/utils'

// ** Components
import CustomEditor from 'src/components/custom-editor'
import Spinner from 'src/components/spinner'
import { queryKeys } from 'src/configs/queryKey'
import { getDetailAbout } from 'src/services/about'
import { useQuery } from '@tanstack/react-query'
import { useMutationEditAbout } from 'src/queries/about-us'
import toast from 'react-hot-toast'

interface TCreateEditAbout {
  open: boolean
  onClose: () => void
  idAbout?: string
}

type TDefaultValue = {
  name: EditorState
  nameKo: EditorState
  nameEn: EditorState
  nameJp: EditorState
}

interface FieldConfig {
  name: keyof TDefaultValue
  label: string
}

const descriptionFields: FieldConfig[] = [
  { name: 'name', label: 'About_Us' },
  { name: 'nameKo', label: 'About_Us_Korean' },
  { name: 'nameEn', label: 'About_Us_English' },
  { name: 'nameJp', label: 'About_Us_Japanese' }
]

const CreateEditAbout = (props: TCreateEditAbout) => {
  const { open, onClose, idAbout } = props
  const theme = useTheme()
  const { t } = useTranslation()

  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)

  // ** Default Values
  const defaultValues: TDefaultValue = {
    name: EditorState.createEmpty(),
    nameKo: EditorState.createEmpty(),
    nameEn: EditorState.createEmpty(),
    nameJp: EditorState.createEmpty()
  }

  // ** Validation Schema
  const schema = yup.object().shape({
    name: yup.object().required(t('Required_field')),
    nameKo: yup.object().required(t('Required_field')),
    nameEn: yup.object().required(t('Required_field')),
    nameJp: yup.object().required(t('Required_field'))
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const { isSuccess: isSuccessEdit, mutate: mutateEditAbout } = useMutationEditAbout({
    onSuccess: () => {
      toast.success(t('Update_successfully'))
    },
    onError: err => {
      toast.error(t('Update_about_error'))
    }
  })

  const onSubmit = (data: any) => {
    if (idAbout) {
      mutateEditAbout({
        name: draftToHtml(convertToRaw(data.name.getCurrentContent())),
        nameKo: draftToHtml(convertToRaw(data.nameKo.getCurrentContent())),
        nameEn: draftToHtml(convertToRaw(data.nameEn.getCurrentContent())),
        nameJp: draftToHtml(convertToRaw(data.nameJp.getCurrentContent())),
        id: idAbout
      })
    }
  }

  const { data: aboutDetail, isFetching: isLoadingDetails } = useQuery({
    queryKey: [queryKeys.detail_about, idAbout],
    queryFn: () => getDetailAbout(idAbout || ''),
    select: aboutDetail => aboutDetail?.data,
    refetchOnWindowFocus: false,
    // refetchOnReconnect: false,
    staleTime: 5000,
    gcTime: 10000,
    enabled: !!idAbout
  })

  useEffect(() => {
    if (aboutDetail) {
      reset({
        name: aboutDetail.name ? convertHTMLToDraft(aboutDetail.name) : '',
        nameEn: aboutDetail.nameEn ? convertHTMLToDraft(aboutDetail.nameEn) : '',
        nameJp: aboutDetail.nameJp ? convertHTMLToDraft(aboutDetail.nameJp) : '',
        nameKo: aboutDetail.nameKo ? convertHTMLToDraft(aboutDetail.nameKo) : ''
      })
    }
  }, [aboutDetail])

  return (
    <>
      {loading && <Spinner />}
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ borderRadius: '0.5rem' }}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Grid container spacing={4}>
                {/* Editor Fields */}
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button type='submit' variant='contained'>
                  {idAbout ? t('Update') : t('Create')}
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Box>
    </>
  )
}

export default CreateEditAbout

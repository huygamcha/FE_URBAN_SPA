'use client'

// ** React
import React, { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Mui
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'

// ** Components
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
import Spinner from 'src/components/spinner'
import CustomTextField from 'src/components/text-field'
import CustomEditor from 'src/components/custom-editor'

// ** Configs, Services, Utils
import { queryKeys } from 'src/configs/queryKey'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { stringToSlug } from 'src/utils'
import { convertHTMLToDraft } from 'src/utils'
import { createBlog, getDetailsBlog } from 'src/services/blog'
import { TParamsCreateBlog } from 'src/types/blog'
import { useMutationEditBlog } from 'src/queries/blog'
import draftToHtml from 'draftjs-to-html'
import { EditorState, convertToRaw } from 'draft-js'

interface TCreateEditBlog {
  open: boolean
  onClose: () => void
  idBlog?: string
  sortBy: string
  searchBy: string
}

const CreateEditBlog = (props: TCreateEditBlog) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const { open, onClose, idBlog, sortBy, searchBy } = props
  const queryClient = useQueryClient()

  const fetchCreateBlog = async (data: TParamsCreateBlog) => {
    const res = await createBlog(data)

    return res.data
  }

  const { isPending: isLoadingCreate, mutate: mutateCreateBlog } = useMutation({
    mutationFn: fetchCreateBlog,
    mutationKey: [queryKeys.blog_create],
    onSuccess: newBlog => {
      queryClient.setQueryData([queryKeys.blog_list, sortBy, searchBy, -1, -1], (oldData: any) => {
        return { ...oldData, blogs: [...oldData.blogs, newBlog] }
      })
      onClose()
      toast.success(t('Create_blog_success'))
    },
    onError: () => {
      toast.error(t('Create_blog_error'))
    }
  })

  const { isPending: isLoadingEdit, mutate: mutateEditBlog } = useMutationEditBlog({
    onSuccess: newBlog => {
      queryClient.setQueryData([queryKeys.blog_list, sortBy, searchBy, -1, -1], (oldData: any) => {
        if (!oldData) return oldData
        const updateData = oldData?.blogs?.map((item: any) =>
          item._id === newBlog._id ? { ...item, ...newBlog } : item
        )

        return { ...oldData, blogs: updateData }
      })
      onClose()
      toast.success(t('Update_blog_success'))
    },
    onError: () => {
      toast.error(t('Update_blog_error'))
    }
  })

  const defaultValues = {
    name: '',
    nameKo: '',
    nameEn: '',
    nameJp: '',
    description: EditorState.createEmpty(),
    descriptionKo: EditorState.createEmpty(),
    descriptionEn: EditorState.createEmpty(),
    descriptionJp: EditorState.createEmpty()
  }

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field')),
    nameKo: yup.string().required(t('Required_field')),
    nameEn: yup.string(),
    nameJp: yup.string(),
    description: yup.object().required(),
    descriptionKo: yup.object().required(),
    descriptionEn: yup.object().required(),
    descriptionJp: yup.object().required()
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      description: draftToHtml(convertToRaw(data.description.getCurrentContent())),
      descriptionKo: draftToHtml(convertToRaw(data.descriptionKo.getCurrentContent())),
      descriptionEn: draftToHtml(convertToRaw(data.descriptionEn.getCurrentContent())),
      descriptionJp: draftToHtml(convertToRaw(data.descriptionJp.getCurrentContent()))
    }

    if (idBlog) {
      mutateEditBlog({ ...payload, id: idBlog })
    } else {
      mutateCreateBlog(payload)
    }
  }

  const fetchDetailsBlog = async (id: string) => {
    const res = await getDetailsBlog(id)

    return res.data
  }

  const { data: blogsDetails, isFetching: isLoadingDetails } = useQuery({
    queryKey: [queryKeys.blog_detail, idBlog],
    queryFn: () => fetchDetailsBlog(idBlog || ''),
    refetchOnWindowFocus: false,
    staleTime: 5000,
    gcTime: 10000,
    enabled: !!idBlog,
    placeholderData: () => {
      const blogs = (queryClient.getQueryData([queryKeys.blog_list, sortBy, searchBy]) as any)?.blogs

      return blogs?.find((item: { _id: string }) => item._id === idBlog)
    }
  })

  useEffect(() => {
    if (!open) {
      reset(defaultValues)
    }
  }, [open, idBlog])

  useEffect(() => {
    if (blogsDetails) {
      reset({
        name: blogsDetails?.name || '',
        nameKo: blogsDetails?.nameKo || '',
        nameEn: blogsDetails?.nameEn || '',
        nameJp: blogsDetails?.nameJp || '',
        description: convertHTMLToDraft(blogsDetails?.description),
        descriptionKo: convertHTMLToDraft(blogsDetails?.descriptionKo),
        descriptionEn: convertHTMLToDraft(blogsDetails?.descriptionEn),
        descriptionJp: convertHTMLToDraft(blogsDetails?.descriptionJp)
      })
    }
  }, [blogsDetails])

  return (
    <>
      {(isLoadingCreate || isLoadingDetails || isLoadingEdit) && <Spinner />}
      <CustomModal open={open} onClose={onClose}>
        <Box
          sx={{
            padding: '1.25rem',
            borderRadius: '15px',
            backgroundColor: theme.palette.customColors.bodyBg
          }}
          minWidth={{ md: '600px', xs: '90vw' }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingBottom: '1.25rem' }}>
            <Typography variant='h4' sx={{ fontWeight: 600 }}>
              {idBlog ? t('Edit_blog') : t('Create_blog')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-0.25rem', right: '-0.625rem' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'1.875rem'} />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box
              sx={{
                width: '100%',
                backgroundColor: theme.palette.background.paper,
                padding: '1.875rem 1.25rem',
                borderRadius: '15px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              {/* Name fields */}
              {[
                { name: 'name', label: t('Name_blog'), required: true },
                { name: 'nameKo', label: t('Name_blog_ko'), required: true },
                { name: 'nameEn', label: t('Name_blog_en') },
                { name: 'nameJp', label: t('Name_blog_jp') }
              ].map(({ name, label, required }) => (
                <Controller
                  key={name}
                  control={control}
                  rules={{ required }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required={required}
                      fullWidth
                      label={label}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={label}
                      error={Boolean(errors?.[name as keyof typeof errors])}
                      helperText={errors?.[name as keyof typeof errors]?.message}
                    />
                  )}
                  name={name as keyof typeof defaultValues}
                />
              ))}

              {/* Description fields with CustomEditor */}
              {[
                { name: 'description', label: t('Description') },
                { name: 'descriptionKo', label: t('Description_ko') },
                { name: 'descriptionEn', label: t('Description_en') },
                { name: 'descriptionJp', label: t('Description_jp') }
              ].map(({ name, label }) => (
                <Controller
                  key={name}
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomEditor
                      onEditorStateChange={onChange}
                      onBlur={onBlur}
                      editorState={value as EditorState}
                      label={label}
                      placeholder={label}
                      error={Boolean(errors?.[name as keyof typeof errors])}
                      helperText={errors?.[name as keyof typeof errors]?.message}
                    />
                  )}
                  name={name as keyof typeof defaultValues}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                {!idBlog ? t('Create') : t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default memo(CreateEditBlog)

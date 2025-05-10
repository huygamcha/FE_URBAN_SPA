/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// ** React
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import * as yup from 'yup'

// ** Mui
import {
  Tabs,
  Tab,
  TabsProps,
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  styled,
  Typography,
  useTheme
} from '@mui/material'

// ** Component
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
import Spinner from 'src/components/spinner'
import CustomTextField from 'src/components/text-field'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { createServiceAsync, updateServiceAsync } from 'src/stores/service/actions'
import { useGetListPackages } from 'src/queries/packages'
import { getDetailsService } from 'src/services/service'
import { convertToRaw, EditorState } from 'draft-js'
import { convertHTMLToDraft, displayValueByLanguage } from 'src/utils'
import draftToHtml from 'draftjs-to-html'
import CustomEditor from 'src/components/custom-editor'

interface TCreateEditService {
  open: boolean
  onClose: () => void
  idService?: string
}

type TOption = {
  duration: string
  price: number
  discountPrice: number
}

type TDefaultValue = {
  name: string
  nameKo: string
  nameEn: string
  nameJp: string
  packageId: string
  description: EditorState
  descriptionKo: EditorState
  descriptionEn: EditorState
  descriptionJp: EditorState
  options: TOption[]
}

interface FieldConfig {
  name: keyof TDefaultValue
  label: string
}

const descriptionFields: FieldConfig[] = [
  { name: 'description', label: 'Description' },
  { name: 'descriptionKo', label: 'Description_Korean' },
  { name: 'descriptionEn', label: 'Description_English' },
  { name: 'descriptionJp', label: 'Description_Japanese' }
]

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  // marginLeft: '1rem',
  [theme.breakpoints.down('lg')]: {
    marginLeft: '0rem',
    '& .MuiTab-root': {
      padding: '0rem 0.8rem'
    }
  },
  '& .MuiTabs-root': {
    borderBottom: 'none'
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  }
}))

const CreateEditService = (props: TCreateEditService) => {
  const [loading, setLoading] = useState(false)
  const { open, onClose, idService } = props
  const theme = useTheme()
  const { t, i18n } = useTranslation()

  const dispatch: AppDispatch = useDispatch()

  // ** React query
  const { data: allPackages, isPending } = useGetListPackages(
    { limit: -1, page: -1 },
    {
      select: data => data?.packages,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 10000
    }
  )

  // fetch
  const fetchDetailsService = async (id: string) => {
    setLoading(true)
    try {
      const res = await getDetailsService(id)
      const data = res.data

      if (data) {
        const mappedData = {
          name: data.name || '',
          nameKo: data.nameKo || '',
          nameEn: data.nameEn || '',
          nameJp: data.nameJp || '',
          packageId: data.packageId || '',
          description: data.description ? convertHTMLToDraft(data.description) : '',
          descriptionEn: data.descriptionEn ? convertHTMLToDraft(data.descriptionEn) : '',
          descriptionJp: data.descriptionJp ? convertHTMLToDraft(data.descriptionJp) : '',
          descriptionKo: data.descriptionKo ? convertHTMLToDraft(data.descriptionKo) : '',
          options:
            data.options?.map((option: any) => ({
              duration: option.duration || '',
              price: option.price || 0,
              discountPrice: option.discountPrice || 0
            })) || []
        }
        reset(mappedData)
      }
    } catch (error) {
      console.error('Failed to fetch service details:', error)
    } finally {
      setLoading(false)
    }
  }

  // Validation Schema
  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field')),
    nameKo: yup.string().required(t('Required_field')),
    nameEn: yup.string().required(t('Required_field')),
    nameJp: yup.string().required(t('Required_field')),
    description: yup.object().required(t('Required_field')),
    descriptionKo: yup.object().required(t('Required_field')),
    descriptionEn: yup.object().required(t('Required_field')),
    descriptionJp: yup.object().required(t('Required_field')),
    packageId: yup.string().required(t('Required_field')),
    options: yup.array().of(
      yup.object().shape({
        duration: yup.string(),
        price: yup.number().typeError(t('Must_be_a_number')).required(t('Required_field')),
        discountPrice: yup.number().typeError(t('Must_be_a_number')).required(t('Required_field'))
      })
    )
  })

  const defaultValues: TDefaultValue = {
    name: '',
    nameKo: '',
    nameEn: '',
    nameJp: '',
    packageId: '',
    description: EditorState.createEmpty(),
    descriptionKo: EditorState.createEmpty(),
    descriptionEn: EditorState.createEmpty(),
    descriptionJp: EditorState.createEmpty(),
    options: [{ duration: '', price: 0, discountPrice: 0 }]
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const {
    fields: optionFields,
    append,
    remove
  } = useFieldArray({
    control,
    name: 'options'
  })

  const onSubmit = (data: any) => {
    if (idService) {
      dispatch(
        updateServiceAsync({
          ...data,
          id: idService,
          description: data.description ? draftToHtml(convertToRaw(data.description.getCurrentContent())) : '',
          descriptionKo: data.descriptionKo ? draftToHtml(convertToRaw(data.descriptionKo.getCurrentContent())) : '',
          descriptionEn: data.descriptionEn ? draftToHtml(convertToRaw(data.descriptionEn.getCurrentContent())) : '',
          descriptionJp: data.descriptionJp ? draftToHtml(convertToRaw(data.descriptionJp.getCurrentContent())) : ''
        })
      )
    } else {
      dispatch(
        createServiceAsync({
          ...data,
          description: data.description ? draftToHtml(convertToRaw(data.description.getCurrentContent())) : '',
          descriptionKo: data.descriptionKo ? draftToHtml(convertToRaw(data.descriptionKo.getCurrentContent())) : '',
          descriptionEn: data.descriptionEn ? draftToHtml(convertToRaw(data.descriptionEn.getCurrentContent())) : '',
          descriptionJp: data.descriptionJp ? draftToHtml(convertToRaw(data.descriptionJp.getCurrentContent())) : ''
        })
      )
    }
  }

  useEffect(() => {
    if (!open) {
      reset({ ...defaultValues })
    } else if (idService && open) {
      fetchDetailsService(idService)
    }
  }, [open, idService])

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
              {idService ? t('Edit_Service') : t('Create_Service')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div>
                        <label
                          style={{
                            fontSize: '0.813rem',
                            marginBottom: '0.5rem',
                            display: 'block',
                            color: errors?.packageId ? theme.palette.error.main : theme.palette.primary.main
                          }}
                        >
                          <Typography
                            variant='body2'
                            sx={{
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              color: errors?.packageId
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                            color={theme.palette.common.black}
                          >
                            {t('Category')} *
                          </Typography>
                        </label>
                        <StyledTabs
                          sx={{
                            '& .MuiTabs-flexContainer': {
                              flexWrap: 'wrap',
                              gap: '0.5rem'
                            }
                          }}
                          onChange={(event: React.SyntheticEvent, newValue: string) => {
                            onChange(newValue) // Truyền giá trị mới đến react-hook-form
                          }}
                          value={value}
                        >
                          {allPackages?.map((opt: any) => {
                            return (
                              <Tab
                                sx={{
                                  borderRadius: '1.875rem',
                                  backgroundColor: theme.palette.customBackground.tabs,
                                  fontWeight: 'normal',
                                  fontSize: '0.9rem',
                                  '&. MuiTouchRipple-root': {
                                    display: 'none !important'
                                  },
                                  [theme.breakpoints.down('lg')]: {
                                    fontSize: '0.7rem'
                                  }
                                }}
                                key={opt._id}
                                value={opt._id}
                                label={displayValueByLanguage({ language: i18n.language, value: opt, field: 'name' })}
                              />
                            )
                          })}
                        </StyledTabs>

                        {errors?.packageId?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.packageId
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`,
                              fontSize: '0.8125rem'
                            }}
                          >
                            {errors?.packageId?.message}
                          </FormHelperText>
                        )}
                      </div>
                    )}
                    name='packageId'
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name='name'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        required
                        label={t('Name')}
                        error={Boolean(errors?.name)}
                        placeholder={t('Enter_Name')}
                        helperText={errors?.name?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name='nameKo'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        required
                        placeholder={t('Enter_Name_Korean')}
                        label={t('Name_Korean')}
                        error={Boolean(errors?.nameKo)}
                        helperText={errors?.nameKo?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name='nameJp'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        required
                        label={t('Name_Japanese')}
                        placeholder={t('Enter_Name_Japanese')}
                        error={Boolean(errors?.nameJp)}
                        helperText={errors?.nameJp?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    name='nameEn'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        required
                        label={t('Name_English')}
                        placeholder={t('Enter_Name_English')}
                        error={Boolean(errors?.nameEn)}
                        helperText={errors?.nameEn?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Box sx={{ height: '1rem' }}></Box>
              <Grid container spacing={4}>
                {descriptionFields.map(({ name, label }) => (
                  <Grid item md={6} xs={12} key={name}>
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

              {/* Options */}
              <Typography variant='h6' sx={{ mt: 4, mb: 1 }}>
                {t('Options')}
              </Typography>
              {optionFields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{
                    mb: 4,
                    display: 'flex',
                    gap: 2,
                    background: theme => theme.palette.customBackground.tabs,
                    padding: '1rem',
                    borderRadius: '0.5rem'
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={11 / 3}>
                      <Controller
                        control={control}
                        name={`options.${index}.duration`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CustomTextField
                            value={value}
                            fullWidth
                            onChange={e => {
                              const numValue = e.target.value.replace(/\D/g, '')
                              onChange(numValue)
                            }}
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              minLength: 1
                            }}
                            label={t('Duration')}
                            placeholder={t('Enter_Duration')}
                            error={Boolean(errors?.options?.[index]?.duration)}
                            helperText={errors?.options?.[index]?.duration?.message}
                            onBlur={onBlur}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={11 / 3}>
                      <Controller
                        control={control}
                        name={`options.${index}.price`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CustomTextField
                            value={value}
                            onChange={e => {
                              const numValue = e.target.value.replace(/\D/g, '')
                              onChange(numValue)
                            }}
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              minLength: 1
                            }}
                            fullWidth
                            placeholder={t('Enter_Price')}
                            label={t('Price')}
                            error={Boolean(errors?.options?.[index]?.price)}
                            helperText={errors?.options?.[index]?.price?.message}
                            onBlur={onBlur}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={11 / 3}>
                      <Controller
                        control={control}
                        name={`options.${index}.discountPrice`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CustomTextField
                            value={value}
                            onChange={e => {
                              const numValue = e.target.value.replace(/\D/g, '')
                              onChange(numValue)
                            }}
                            inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              minLength: 1
                            }}
                            fullWidth
                            placeholder={t('Enter_discountPrice')}
                            label={t('discountPrice')}
                            error={Boolean(errors?.options?.[index]?.discountPrice)}
                            helperText={errors?.options?.[index]?.discountPrice?.message}
                            onBlur={onBlur}
                          />
                        )}
                      />
                    </Grid>
                    <Grid
                      sx={{
                        display: 'flex',
                        alignItems: 'end'
                      }}
                      item
                      xs={1}
                    >
                      <IconButton onClick={() => remove(index)}>
                        <Icon icon='material-symbols:delete-outline' />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Button
                variant='outlined'
                sx={{ mt: 2 }}
                onClick={() => append({ duration: '', price: 0, discountPrice: 0 })}
              >
                {t('Add_Option')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button type='submit' variant='contained'>
                {idService ? t('Update') : t('Create')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default CreateEditService

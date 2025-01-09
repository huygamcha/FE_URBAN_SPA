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
import CustomSelect from 'src/components/custom-select'
import { getDetailsService } from 'src/services/service'

interface TCreateEditService {
  open: boolean
  onClose: () => void
  idService?: string
}

type TOption = {
  title: string
  titleKo: string
  titleJp: string
  titleEn: string
  duration: string
  price: number
}

type TDefaultValue = {
  name: string
  nameKo: string
  nameEn: string
  nameJp: string
  packageId: string
  options: TOption[]
}

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
  },
  '& .MuiTab-root': {
    marginRight: '0.5rem'
  }
}))

const CreateEditService = (props: TCreateEditService) => {
  const [loading, setLoading] = useState(false)
  const { open, onClose, idService } = props
  const theme = useTheme()
  const { t } = useTranslation()

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
          options:
            data.options?.map((option: any) => ({
              title: option.title || '',
              titleKo: option.titleKo || '',
              titleJp: option.titleJp || '',
              titleEn: option.titleEn || '',
              duration: option.duration || '',
              price: option.price || 0
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
    packageId: yup.string().required(t('Required_field')),
    options: yup.array().of(
      yup.object().shape({
        title: yup.string().required(t('Required_field')),
        titleKo: yup.string().required(t('Required_field')),
        titleJp: yup.string().required(t('Required_field')),
        titleEn: yup.string().required(t('Required_field')),
        duration: yup.string().required(t('Required_field')),
        price: yup.number().typeError(t('Must_be_a_number')).required(t('Required_field'))
      })
    )
  })

  const defaultValues: TDefaultValue = {
    name: '',
    nameKo: '',
    nameEn: '',
    nameJp: '',
    packageId: '',
    options: [{ title: '', titleKo: '', titleJp: '', titleEn: '', duration: '', price: 0 }]
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
      dispatch(updateServiceAsync({ ...data, id: idService }))
    } else {
      dispatch(createServiceAsync(data))
    }
    onClose()
  }

  useEffect(() => {
    if (!open) {
      reset({ ...defaultValues })
    } else if (idService) {
      fetchDetailsService(idService)
      // Fetch and populate data for editing
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
              <Grid container spacing={2}>
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
                            marginBottom: '0.25rem',
                            display: 'block',
                            color: errors?.packageId ? theme.palette.error.main : theme.palette.primary.main
                          }}
                        >
                          <Typography variant='body2' color={theme.palette.common.black}>
                            {t('package')} <span style={{ color: theme.palette.error.main }}>*</span>
                          </Typography>
                        </label>
                        {/* huyg  packageId*/}
                        <StyledTabs
                          sx={{
                            '& .MuiTabs-flexContainer': {
                              flexWrap: 'wrap'
                            },
                            '& .MuiTab-root': {
                              marginTop: '0.5rem'
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
                                label={t(`${opt.name}`)}
                              />
                            )
                          })}
                        </StyledTabs>

                        {errors?.packageId?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.packageId
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
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
                        label={t('Name')}
                        error={Boolean(errors?.name)}
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
                        label={t('NameKo')}
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
                        label={t('NameJp')}
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
                        label={t('NameEn')}
                        error={Boolean(errors?.nameEn)}
                        helperText={errors?.nameEn?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {/* Options */}
              <Typography variant='h6' sx={{ mt: 4 }}>
                {t('Options')}
              </Typography>
              {optionFields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{
                    mt: 4,
                    display: 'flex',
                    gap: 2,
                    background: theme => theme.palette.customBackground.tabs,
                    padding: '1rem',
                    borderRadius: '0.5rem'
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        name={`options.${index}.title`}
                        render={({ field }) => (
                          <CustomTextField
                            fullWidth
                            label={t('Title')}
                            error={Boolean(errors?.options?.[index]?.title)}
                            helperText={errors?.options?.[index]?.title?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        name={`options.${index}.titleKo`}
                        render={({ field }) => (
                          <CustomTextField
                            fullWidth
                            label={t('TitleKo')}
                            error={Boolean(errors?.options?.[index]?.titleKo)}
                            helperText={errors?.options?.[index]?.titleKo?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        name={`options.${index}.titleJp`}
                        render={({ field }) => (
                          <CustomTextField
                            fullWidth
                            label={t('TitleJp')}
                            error={Boolean(errors?.options?.[index]?.titleJp)}
                            helperText={errors?.options?.[index]?.titleJp?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        name={`options.${index}.titleEn`}
                        render={({ field }) => (
                          <CustomTextField
                            fullWidth
                            label={t('TitleEn')}
                            error={Boolean(errors?.options?.[index]?.titleEn)}
                            helperText={errors?.options?.[index]?.titleEn?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        name={`options.${index}.duration`}
                        render={({ field }) => (
                          <CustomTextField
                            fullWidth
                            label={t('Duration')}
                            error={Boolean(errors?.options?.[index]?.duration)}
                            helperText={errors?.options?.[index]?.duration?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        name={`options.${index}.price`}
                        render={({ field }) => (
                          <CustomTextField
                            fullWidth
                            label={t('Price')}
                            error={Boolean(errors?.options?.[index]?.price)}
                            helperText={errors?.options?.[index]?.price?.message}
                            {...field}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={1}>
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
                onClick={() => append({ title: '', titleKo: '', titleJp: '', titleEn: '', duration: '', price: 0 })}
              >
                {t('Add Option')}
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

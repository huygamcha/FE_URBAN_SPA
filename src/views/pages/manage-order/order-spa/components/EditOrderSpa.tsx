'use client'

// ** React
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

// ** Mui
import { Box, Button, FormHelperText, Grid, IconButton, InputLabel, Typography, useTheme } from '@mui/material'

// ** Component
import Icon from 'src/components/Icon'
import CustomModal from 'src/components/custom-modal'
import Spinner from 'src/components/spinner'
import CustomTextField from 'src/components/text-field'
import CustomSelect from 'src/components/custom-select'
import CustomDatePicker from 'src/components/custom-date-picker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// ** Redux
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { updateOrderSpaAsync } from 'src/stores/order-spa/actions'
import { getDetailsOrderSpa } from 'src/services/order-spa'
import { useGetListPackages } from 'src/queries/packages'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import { getAllPackages } from 'src/services/packages'

const STATUS_OF_SPA = [
  {
    label: 'Pending',
    value: 'Pending'
  },
  {
    label: 'Completed',
    value: 'Completed'
  },
  {
    label: 'Cancelled',
    value: 'Cancelled'
  }
]

interface TCreateEditOrderSpa {
  open: boolean
  onClose: () => void
  idOrder?: string
}

type TDefaultValue = {
  name: string
  phoneNumber: string
  email: string
  packageId: string
  appointmentDate: string
  status: string
  note: string
  totalPrice: number
  language: string
  duration: string
  quantity: number
}

const EditOrderSpa = (props: TCreateEditOrderSpa) => {
  const [loading, setLoading] = useState(false)
  const [optionPackages, setOptionPackages] = useState<{ label: string; value: string }[]>([])

  const { open, onClose, idOrder } = props

  const theme = useTheme()
  const { t } = useTranslation()

  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field')),
    phoneNumber: yup.string().required(t('Required_field')).matches(/^\d+$/, t('Must_be_numeric')),
    email: yup.string().email(t('Invalid_email')).required(t('Required_field')),
    packageId: yup.string().required(t('Required_field')),
    appointmentDate: yup.string().required(t('Required_field')),
    status: yup.string().required(t('Required_field')),
    quantity: yup.number().required(t('Required_field')),
    duration: yup.string().required(t('Required_field')),
    note: yup.string(),
    totalPrice: yup.number().typeError(t('Must_be_a_number')).required(t('Required_field')),
    language: yup.string().required(t('Required_field'))
  })

  const defaultValues: TDefaultValue = {
    name: '',
    phoneNumber: '',
    email: '',
    packageId: '',
    appointmentDate: '',
    status: '',
    note: '',
    totalPrice: 0,
    language: '',
    quantity: 0,
    duration: '9:00'
  }

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
    if (idOrder) {
      dispatch(
        updateOrderSpaAsync({
          id: idOrder,
          ...data
        })
      )
    }
  }

  const fetchDetailsOrder = async (id: string) => {
    setLoading(true)
    await getDetailsOrderSpa(id)
      .then(res => {
        const data = res.data
        if (data) {
          reset({
            name: data.name,
            phoneNumber: data.phoneNumber,
            email: data.email,
            packageId: data.packageId._id,
            appointmentDate: data.appointmentDate,
            status: data.status,
            note: data.note,
            totalPrice: data.totalPrice,
            language: data.language,
            duration: data.duration,
            quantity: data.quantity
          })
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  const fetchAllPackages = async () => {
    setLoading(true)
    await getAllPackages({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data.packages
        if (data) {
          setOptionPackages(
            data.map((item: { name: string; _id: string }) => ({
              label: item.name,
              value: item._id
            }))
          )
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (open) {
      // fetchAllPackages()
      if (idOrder) {
        fetchDetailsOrder(idOrder)
      }
    } else {
      reset({ ...defaultValues })
    }
  }, [open, idOrder])

  useEffect(() => {
    fetchAllPackages()
  }, [])

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
              {t('Edit_order')}
            </Typography>
            <IconButton sx={{ position: 'absolute', top: '-4px', right: '-10px' }} onClick={onClose}>
              <Icon icon='material-symbols-light:close' fontSize={'30px'} />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
            <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: '15px', py: 5, px: 4 }}>
              <Grid container spacing={4}>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name='phoneNumber'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={t('Phone Number')}
                        error={Boolean(errors?.phoneNumber)}
                        helperText={errors?.phoneNumber?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name='email'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={t('Email')}
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
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
                            color: errors?.appointmentDate ? theme.palette.error.main : theme.palette.primary.main
                          }}
                        >
                          <Typography
                            variant='body2'
                            color={theme.palette.common.black}
                            sx={{
                              lineHeight: `1.2 !important`
                            }}
                          >
                            {t('appointmentDate')} <span style={{ color: theme.palette.error.main }}>*</span>
                          </Typography>
                        </label>

                        <Box
                          sx={{
                            '& .MuiStack-root': {
                              paddingTop: '0rem !important', // Xóa khoảng cách trên cùng
                              overflow: 'hidden' // Ẩn tràn nội dung
                            },
                            '& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd': {
                              paddingTop: '0.58rem', // Thêm khoảng cách trên cho input
                              paddingBottom: '0.58rem' // Thêm khoảng cách dưới cho input
                            },
                            '& .MuiOutlinedInput-root': {
                              borderColor: 'black', // Đường viền luôn màu đen
                              borderRadius: '0.5rem',
                              '& fieldset': {
                                borderColor: 'black' // Đường viền của fieldset luôn màu đen
                              }
                              // '&:hover fieldset': {
                              //   borderColor: 'black' // Màu viền đen khi hover
                              // },
                              // '&.Mui-focused fieldset': {
                              //   borderColor: 'black' // Màu viền đen khi focus
                              // }
                            }
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateTimePicker']}>
                              <DatePicker
                                sx={{
                                  '& .MuiOutlinedInput-root': {
                                    background: '#fff'
                                  }
                                }}
                                value={dayjs(value) || null}
                                onChange={onChange}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </Box>

                        {errors?.appointmentDate?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.appointmentDate
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                          >
                            {errors?.appointmentDate?.message}
                          </FormHelperText>
                        )}
                      </div>
                    )}
                    name='appointmentDate'
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Box>
                        <InputLabel
                          sx={{
                            fontSize: '13px',
                            marginBottom: '4px',
                            display: 'block',
                            color: errors?.status
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main}, 0.68)`
                          }}
                        >
                          {t('status')} *
                        </InputLabel>
                        <CustomSelect
                          fullWidth
                          onChange={onChange}
                          options={STATUS_OF_SPA}
                          error={Boolean(errors?.status)}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t('Select')}
                        />
                        {errors?.status?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.status
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`
                            }}
                          >
                            {errors?.status?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name='totalPrice'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={t('Total Price')}
                        error={Boolean(errors?.totalPrice)}
                        helperText={errors?.totalPrice?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name='language'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={t('Language')}
                        error={Boolean(errors?.language)}
                        helperText={errors?.language?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name='duration'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={t('duration')}
                        error={Boolean(errors?.duration)}
                        helperText={errors?.duration?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name='quantity'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={t('quantity')}
                        error={Boolean(errors?.quantity)}
                        helperText={errors?.quantity?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name='packageId'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Box>
                        <InputLabel
                          sx={{
                            fontSize: '13px',
                            marginBottom: '4px',
                            display: 'block',
                            color: errors?.packageId
                              ? theme.palette.error.main
                              : `rgba(${theme.palette.customColors.main}, 0.68)`
                          }}
                        >
                          {t('packageId')} *
                        </InputLabel>
                        <CustomSelect
                          fullWidth
                          onChange={onChange}
                          options={optionPackages}
                          error={Boolean(errors?.packageId)}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t('Select')}
                        />
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
                      </Box>
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name='note'
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        label={t('Note')}
                        error={Boolean(errors?.note)}
                        helperText={errors?.note?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button type='submit' variant='contained'>
                {t('Update')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default EditOrderSpa

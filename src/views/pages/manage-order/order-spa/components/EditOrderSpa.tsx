/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// ** React
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Form
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
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
import { createOrderSpaAsync, updateOrderSpaAsync } from 'src/stores/order-spa/actions'
import { getDetailsOrderSpa } from 'src/services/order-spa'
import { useGetListPackages } from 'src/queries/packages'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
import { getAllPackages } from 'src/services/packages'
import { getAllServices } from 'src/services/service'
import { formatCurrency } from 'src/utils'
import { visitTime } from 'src/app/data/visitTime'
import { LANGUAGE_OPTIONS } from 'src/configs/i18n'
import { LANGUAGES } from 'src/app/data/language'

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

type allServices = {
  packageId: string
  serviceId: string
  optionId: string
  quantity: number
  totalPrice: number
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
  allServices: allServices[]
}

const EditOrderSpa = (props: TCreateEditOrderSpa) => {
  const [loading, setLoading] = useState(false)
  const [optionPackages, setOptionPackages] = useState<{ label: string; value: string }[]>([])
  // lấy danh sách dịch vụ theo danh mục
  const [optionServices, setOptionServices] = useState<Record<string, any[]>>({})
  const [optionOptions, setOptionOptions] = useState<Record<string, any[]>>({})
  const [optionItem, setOptionItem] = useState<Record<string, any>>({})
  const firstRenderTotalPrice = useRef(true)
  const firstRenderService = useRef(true)
  const firstRenderOption = useRef(true)

  const { open, onClose, idOrder } = props

  const theme = useTheme()
  const { t } = useTranslation()

  const dispatch: AppDispatch = useDispatch()

  const schema = yup.object().shape({
    name: yup.string().required(t('Required_field')),
    phoneNumber: yup.string().required(t('Required_field')).matches(/^\d+$/, t('Must_be_numeric')),
    email: yup.string().email(t('Invalid_email')).required(t('Required_field')),
    appointmentDate: yup.string().required(t('Required_field')),
    status: yup.string().required(t('Required_field')),
    quantity: yup.number().required(t('Required_field')),
    duration: yup.string().required(t('Required_field')),
    note: yup.string(),
    totalPrice: yup.number().typeError(t('Must_be_a_number')).required(t('Required_field')),
    language: yup.string().required(t('Required_field')),
    allServices: yup.array().of(
      yup.object().shape({
        packageId: yup.string().required(t('Required_field')),
        serviceId: yup.string().required(t('Required_field')),
        optionId: yup.string().required(t('Required_field')),
        quantity: yup.number().typeError(t('Must_be_a_number')).required(t('Required_field')),
        totalPrice: yup.number().typeError(t('Must_be_a_number')).required(t('Required_field'))
      })
    )
  })

  const defaultValues: TDefaultValue = {
    name: '',
    phoneNumber: '',
    email: '',
    packageId: '',
    appointmentDate: '',
    status: 'Completed',
    note: '',
    totalPrice: 0,
    language: 'vi',
    quantity: 1,
    duration: '14:00:00',
    allServices: [{ packageId: '', serviceId: '', optionId: '', quantity: 1, totalPrice: 0 }]
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue
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
    name: 'allServices'
  })

  const onSubmit = (data: any) => {
    if (idOrder) {
      dispatch(
        updateOrderSpaAsync({
          id: idOrder,
          ...data
        })
      )
    } else {
      const date = dayjs(`${dayjs(data.appointmentDate).format('YYYY-MM-DD')} ${data.duration}`).format(
        'YYYY-MM-DD HH:mm'
      )
      dispatch(createOrderSpaAsync({ ...data, appointmentDate: date }))
    }
  }

  const fetchDetailsOrder = async (id: string) => {
    setLoading(true)
    await getDetailsOrderSpa(id)
      .then(res => {
        const data = res.data

        if (data) {
          const mappedAllServices = (data.allServices || []).map((service: any) => ({
            packageId: service.packageId || '',
            serviceId: service.serviceId || '',
            optionId: service.optionId || '',
            quantity: service.quantity || 1,
            totalPrice: service.totalPrice || 0
          }))

          reset({
            name: data.name,
            phoneNumber: data.phoneNumber,
            email: data.email,
            appointmentDate: data.appointmentDate,
            status: data.status,
            note: data.note,
            totalPrice: data.totalPrice || 0,
            language: data.language || 'vi',
            duration: data.duration || '14:00:00',
            quantity: data.quantity || 1,
            allServices: mappedAllServices
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

  const fetchAllServices = async (id: string) => {
    setLoading(true)
    await getAllServices({ params: { limit: -1, page: -1, packageId: id } })
      .then(res => {
        const data = res?.data?.services
        if (data) {
          // lấy danh sách dịch vụ theo danh mục
          setOptionServices(prev => ({
            ...prev,
            [id]: data.map((item: { name: string; _id: string; options: any[] }) => ({
              label: item.name,
              value: item._id,
              options: item.options
            }))
          }))
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const fetchAllOptions = async (serviceId: string, index: number) => {
    setOptionOptions(prev => ({
      ...prev,
      [serviceId]: optionServices[getValues(`allServices.${index}.packageId`)]
        ?.find((item: any) => item.value === serviceId)
        ?.options.map((item: { _id: string; duration: string; price: number }) => ({
          value: item._id,
          label: `${item.duration} phút - ${formatCurrency(item.price)}`,
          duration: item.duration,
          price: item.price
        }))
    }))
  }

  const handleSetOptionItem = (id: string, index: number) => {
    const result = optionOptions[getValues(`allServices.${index}.serviceId`)]?.find((item: any) => item.value === id)

    setOptionItem(prev => ({ ...prev, [id]: result }))
  }

  useEffect(() => {
    if (open) {
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

  useEffect(() => {
    if (getValues('name') && firstRenderOption.current && idOrder) {
      const result = getValues('allServices') || []

      const handleFetchServicesAndOptions = async () => {
        try {
          // Fetch all services first
          await Promise.all(
            result.map(async item => {
              await fetchAllServices(item.packageId)
            })
          )

          console.log('All data fetched successfully name')
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      handleFetchServicesAndOptions()
    }
  }, [getValues('name')])

  useEffect(() => {
    if (
      firstRenderService.current &&
      Object.keys(optionServices).length === getValues('allServices')?.length &&
      idOrder
    ) {
      const result = getValues('allServices') || []

      const handleFetchServicesAndOptions = async () => {
        try {
          await Promise.all(
            result.map(async (item, index) => {
              await fetchAllOptions(item.serviceId, index)
            })
          )

          console.log('All data fetched successfully service')
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      handleFetchServicesAndOptions()

      firstRenderService.current = false
    }
  }, [optionServices])

  useEffect(() => {
    if (
      firstRenderOption.current &&
      Object.keys(optionServices).length === getValues('allServices')?.length &&
      idOrder
    ) {
      const result = getValues('allServices') || []

      const handleFetchServicesAndOptions = async () => {
        try {
          result.map((item, index) => {
            handleSetOptionItem(item.optionId, index)
          })

          console.log('All data fetched successfully option')
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      handleFetchServicesAndOptions()

      firstRenderOption.current = false
    }
  }, [optionOptions])

  return (
    <>
      {/* {loading && <Spinner />} */}
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
              {idOrder ? t('Edit_order') : t('Create_order')}
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
                        required
                        label={t('Full_name')}
                        placeholder={t('Enter_your_full_name')}
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
                        required
                        placeholder={t('Enter_your_phone')}
                        label={t('Phone_number')}
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
                        required
                        label={t('Email')}
                        placeholder={t('Enter_email')}
                        error={Boolean(errors?.email)}
                        helperText={errors?.email?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    name='appointmentDate'
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div>
                        <label
                          style={{
                            marginBottom: '0.25rem',
                            display: 'block',
                            color: errors?.appointmentDate ? theme.palette.error.main : theme.palette.primary.main
                          }}
                        >
                          <Typography
                            variant='body2'
                            color={theme.palette.common.black}
                            sx={{
                              lineHeight: `1.2 !important`,
                              color: errors?.appointmentDate ? theme.palette.error.main : theme.palette.common.black,
                              fontSize: '0.9rem',
                              fontWeight: '600'
                            }}
                          >
                            {t('Pickup_time')} <span>*</span>
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
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'black !important'
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
                                : `rgba(${theme.palette.customColors.main}, 0.42)`,
                              fontSize: '0.8125rem'
                            }}
                          >
                            {errors?.appointmentDate?.message}
                          </FormHelperText>
                        )}
                      </div>
                    )}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Controller
                    name='duration'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Box>
                        <InputLabel
                          sx={{
                            lineHeight: `1.2 !important`,
                            color: errors?.duration ? theme.palette.error.main : theme.palette.common.black,
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '0.25rem'
                          }}
                        >
                          {t('time_service')} *
                        </InputLabel>
                        <CustomSelect
                          fullWidth
                          required
                          onChange={onChange}
                          options={visitTime}
                          isNotText
                          error={Boolean(errors?.duration)}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t('Select')}
                        />
                        {errors?.duration?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.duration
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`,
                              fontSize: '0.8125rem'
                            }}
                          >
                            {errors?.duration?.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
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
                            lineHeight: `1.2 !important`,
                            color: errors?.status ? theme.palette.error.main : theme.palette.common.black,
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '0.25rem'
                          }}
                        >
                          {t('Status')} *
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
                                : `rgba(${theme.palette.customColors.main}, 0.42)`,
                              fontSize: '0.8125rem'
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
                    name='language'
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Box>
                        <InputLabel
                          sx={{
                            lineHeight: `1.2 !important`,
                            color: errors?.language ? theme.palette.error.main : theme.palette.common.black,
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '0.25rem'
                          }}
                        >
                          {t('Language')} *
                        </InputLabel>
                        <CustomSelect
                          fullWidth
                          onChange={onChange}
                          options={LANGUAGES}
                          error={Boolean(errors?.language)}
                          onBlur={onBlur}
                          value={value}
                          placeholder={t('Select')}
                        />
                        {errors?.language?.message && (
                          <FormHelperText
                            sx={{
                              color: errors?.language
                                ? theme.palette.error.main
                                : `rgba(${theme.palette.customColors.main}, 0.42)`,
                              fontSize: '0.8125rem'
                            }}
                          >
                            {errors?.language?.message}
                          </FormHelperText>
                        )}
                      </Box>
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
                        required
                        label={t('Quantity_quest')}
                        error={Boolean(errors?.quantity)}
                        helperText={errors?.quantity?.message}
                        {...field}
                      />
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
                        placeholder={t('Enter_your_notes')}
                        label={t('Note')}
                        error={Boolean(errors?.note)}
                        helperText={errors?.note?.message}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Typography
                sx={{
                  mt: 4,
                  mb: 1,
                  lineHeight: `1.2 !important`,
                  color: errors?.appointmentDate ? theme.palette.error.main : theme.palette.common.black,
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginBottom: '0.25rem'
                }}
              >
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
                    <Grid item xs={3.5}>
                      <Controller
                        control={control}
                        name={`allServices.${index}.packageId`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Box>
                            <InputLabel
                              sx={{
                                lineHeight: `1.2 !important`,
                                color: errors?.allServices?.[index]?.packageId
                                  ? theme.palette.error.main
                                  : theme.palette.common.black,
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                marginBottom: '0.25rem'
                              }}
                            >
                              {t('Category')} *
                            </InputLabel>
                            <CustomSelect
                              fullWidth
                              onChange={(event: any) => {
                                const packageId = event.target.value
                                onChange(packageId)
                                fetchAllServices(packageId)
                              }}
                              options={optionPackages}
                              error={Boolean(errors?.allServices?.[index]?.packageId)}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Select')}
                            />
                            {errors?.allServices?.[index]?.packageId?.message && (
                              <FormHelperText
                                sx={{
                                  color: errors?.allServices?.[index]?.packageId
                                    ? theme.palette.error.main
                                    : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                  fontSize: '0.8125rem'
                                }}
                              >
                                {errors?.allServices?.[index]?.packageId?.message}
                              </FormHelperText>
                            )}
                          </Box>
                        )}
                      />
                    </Grid>

                    <Grid item xs={3.5}>
                      <Controller
                        control={control}
                        name={`allServices.${index}.serviceId`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Box>
                            <InputLabel
                              sx={{
                                lineHeight: `1.2 !important`,
                                color: errors?.allServices?.[index]?.serviceId
                                  ? theme.palette.error.main
                                  : theme.palette.common.black,
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                marginBottom: '0.25rem'
                              }}
                            >
                              {t('Package')} *
                            </InputLabel>
                            <CustomSelect
                              fullWidth
                              onChange={(event: any) => {
                                const serviceId = event.target.value
                                onChange(serviceId)
                                fetchAllOptions(serviceId, index)
                              }}
                              options={optionServices[getValues(`allServices.${index}.packageId`)]}
                              error={Boolean(errors?.allServices?.[index]?.serviceId)}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Select')}
                            />
                            {errors?.allServices?.[index]?.serviceId?.message && (
                              <FormHelperText
                                sx={{
                                  color: errors?.allServices?.[index]?.serviceId
                                    ? theme.palette.error.main
                                    : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                  fontSize: '0.8125rem'
                                }}
                              >
                                {errors?.allServices?.[index]?.serviceId?.message}
                              </FormHelperText>
                            )}
                          </Box>
                        )}
                      />
                    </Grid>

                    <Grid item xs={3.5}>
                      <Controller
                        control={control}
                        name={`allServices.${index}.optionId`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Box>
                            <InputLabel
                              sx={{
                                lineHeight: `1.2 !important`,
                                color: errors?.allServices?.[index]?.optionId
                                  ? theme.palette.error.main
                                  : theme.palette.common.black,
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                marginBottom: '0.25rem'
                              }}
                            >
                              {t('Options')} *
                            </InputLabel>
                            <CustomSelect
                              fullWidth
                              onChange={(event: any) => {
                                const optionId = event.target.value
                                onChange(optionId)
                                handleSetOptionItem(optionId, index)

                                const result = optionOptions[getValues(`allServices.${index}.serviceId`)]?.find(
                                  (item: any) => item.value === optionId
                                )
                                const quantity = getValues(`allServices.${index}.quantity`)
                                setValue(`allServices.${index}.totalPrice`, quantity * result?.price)

                                const allServices = getValues('allServices') || []
                                const total = allServices.reduce((acc, cur) => acc + cur.totalPrice, 0)
                                setValue('totalPrice', total)
                                // fetchAllOptions(optionId, index)
                              }}
                              options={optionOptions[getValues(`allServices.${index}.serviceId`)]}
                              error={Boolean(errors?.allServices?.[index]?.optionId)}
                              onBlur={onBlur}
                              value={value}
                              placeholder={t('Select')}
                            />
                            {errors?.allServices?.[index]?.optionId?.message && (
                              <FormHelperText
                                sx={{
                                  color: errors?.allServices?.[index]?.optionId
                                    ? theme.palette.error.main
                                    : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                  fontSize: '0.8125rem'
                                }}
                              >
                                {errors?.allServices?.[index]?.optionId?.message}
                              </FormHelperText>
                            )}
                          </Box>
                        )}
                      />
                    </Grid>

                    <Grid item xs={3.5}>
                      <Controller
                        control={control}
                        name={`allServices.${index}.quantity`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            onChange={e => {
                              onChange(e) // Cập nhật giá trị cho React Hook Form
                              const quantity = e.target.value
                              const optionPrice = optionItem[getValues(`allServices.${index}.optionId`)]?.price ?? 0
                              setValue(`allServices.${index}.totalPrice`, +quantity * +optionPrice) // Cập nhật totalPrice

                              // Cập nhật tổng giá
                              const allServices = getValues('allServices') || []
                              const total = allServices.reduce((acc, cur) => acc + cur.totalPrice, 0)
                              setValue('totalPrice', total)
                            }}
                            value={value}
                            label={t('Quantity_quest')}
                            error={Boolean(errors?.allServices?.[index]?.quantity)}
                            helperText={errors?.allServices?.[index]?.quantity?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* huygamcha */}

                    <Grid item xs={3.5}>
                      <Controller
                        control={control}
                        name={`allServices.${index}.totalPrice`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <CustomTextField
                            fullWidth
                            required
                            onChange={onChange}
                            value={value}
                            label={t('Total_price')}
                            error={Boolean(errors?.allServices?.[index]?.totalPrice)}
                            helperText={errors?.allServices?.[index]?.totalPrice?.message}
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
                      xs={1.5}
                    >
                      <IconButton
                        onClick={() => {
                          remove(index)
                          // Cập nhật tổng giá
                          const allServices = getValues('allServices') || []
                          const total = allServices.reduce((acc, cur) => acc + cur.totalPrice, 0)
                          setValue('totalPrice', total)
                        }}
                      >
                        <Icon icon='material-symbols:delete-outline' />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Box display='flex' justifyContent='space-between'>
                {' '}
                <Button
                  variant='outlined'
                  sx={{ mt: 2, height: '40px' }}
                  onClick={() => append({ packageId: '', serviceId: '', optionId: '', quantity: 1, totalPrice: 0 })}
                >
                  {t('Add_Option')}
                </Button>
                <Box
                  sx={{
                    background: theme => theme.palette.customBackground.tabs,
                    padding: '0.5rem',
                    borderRadius: '0.5rem'
                  }}
                  width='40%'
                >
                  <Grid width='100%' item xs={6}>
                    <Controller
                      control={control}
                      name='totalPrice'
                      render={({ field }) => (
                        <CustomTextField
                          fullWidth
                          required
                          label={t('Total_price_pay')}
                          error={Boolean(errors?.totalPrice)}
                          helperText={errors?.totalPrice?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button type='submit' variant='contained'>
                {idOrder ? t('Update') : t('Create')}
              </Button>
            </Box>
          </form>
        </Box>
      </CustomModal>
    </>
  )
}

export default EditOrderSpa

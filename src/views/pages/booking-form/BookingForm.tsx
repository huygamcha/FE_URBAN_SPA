/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { FormHelperText, Grid, Tab, Tabs, useTheme, styled, TabsProps, MenuItem } from '@mui/material'
import { useDrawer } from 'src/hooks/useDrawer'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import CustomTextField from 'src/components/text-field'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useGetListPackages } from 'src/queries/packages'
import { useParams } from 'next/navigation'
import { AppDispatch } from 'src/stores'
import { useDispatch } from 'react-redux'
import { createOrderSpaAsync } from 'src/stores/order-spa/actions'
import Link from 'next/link'
import Image from 'next/image'
import IconifyIcon from 'src/components/Icon'
import { ROUTE_CONFIG } from 'src/configs/route'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { visitTime } from 'src/app/data/visitTime'

dayjs.extend(utc)

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
    gap: '1rem'
    // marginRight: '0.5rem',
    // marginBottom: '0.5rem'
  }
}))

// Form field type

const BookingForm = () => {
  // Context
  const { openBookingForm, setOpenBookingForm } = useDrawer()

  // ** State
  const [choosePackage, setChoosePackage] = useState<string>('')

  // ** redux
  const dispatch: AppDispatch = useDispatch()

  // Hooks
  const { t, i18n } = useTranslation()
  const theme = useTheme()
  const { packageId } = useParams()

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

  // ** Form
  // Validation Schema
  const schema = yup.object({
    name: yup.string().required(t('Required_field')),
    email: yup.string().email('Invalid email format').required(t('Required_field')),
    phoneNumber: yup
      .string()
      .required(t('Required_field'))
      .matches(/^\d+$/, 'Phone number must contain only numbers')
      .min(9, 'Phone number must be at least 9 digits'),
    quantity: yup
      .number()
      .typeError(t('Required_field'))
      .required('Quantity is required')
      .min(1, 'Minimum quantity is 1'),
    date: yup.string().required(t('Required_field'))!,
    duration: yup.string().required(t('Required_field')),
    packages: yup.string().required(t('Required_field'))!,
    notes: yup.string().optional()
  })

  // React Hook Form
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      date: '',
      quantity: 1,
      packages: '',
      duration: '',
      notes: ''
    }
  })

  const onSubmit = (data: any) => {
    dispatch(
      createOrderSpaAsync({
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        email: data?.email,
        appointmentDate: dayjs(`${dayjs(data.date).format('YYYY-MM-DD')} ${data.duration}`).format('YYYY-MM-DD HH:mm'),
        packageId: data?.packages,
        duration: data?.duration,
        quantity: data?.quantity,
        language: i18n.language,
        note: data?.notes
      })
    )
    reset()
  }

  useEffect(() => {
    if (allPackages?.length && packageId) {
      const available = allPackages.find((item: any) => item.slug === packageId)
      if (available) {
        setChoosePackage(available._id)
        setValue('packages', available._id)
      }
    }
  }, [allPackages, openBookingForm])

  return (
    <Box
      sx={{
        padding: '2% 5%',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          maxWidth: '80rem',
          width: '100%',
          minHeight: '64px',
          alignItems: 'center',
          margin: '0 auto',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 2
        }}
      >
        <Grid
          sx={{
            zIndex: 2,
            position: 'relative'
          }}
          container
          spacing={4}
        >
          <Grid item xs={12} lg={8}>
            <Box
              sx={{
                backgroundColor: '#fffffff0',
                p: '1rem',
                borderRadius: '1rem'
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Playfair Display, serif' // Same font family as seen in the image
                }}
                fontSize='2rem'
                textAlign='center'
                variant='subtitle2'
              >
                {t('Booking_now').toUpperCase()}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
                <Grid container spacing={6}>
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
                              display: 'block',
                              marginBottom: '0.2rem',
                              color: errors?.packages ? theme.palette.error.main : theme.palette.primary.main
                            }}
                          >
                            <Typography
                              variant='body2'
                              sx={{
                                color: errors?.packages ? theme.palette.error.main : theme.palette.common.black,
                                fontSize: '0.9rem',
                                fontWeight: '600'
                              }}
                            >
                              {t('Package')} <span>*</span>
                            </Typography>
                          </label>
                          {/* huyg  packages*/}
                          <StyledTabs
                            sx={{
                              '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                              }
                            }}
                            onChange={(event: React.SyntheticEvent, value: string) => {
                              onChange(value)
                              setChoosePackage(value)
                            }}
                            value={choosePackage}
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
                                      fontSize: '0.8rem'
                                    }
                                  }}
                                  key={opt._id}
                                  value={opt._id}
                                  label={t(`${opt.name}`)}
                                />
                              )
                            })}
                          </StyledTabs>

                          {errors?.packages?.message && (
                            <FormHelperText
                              sx={{
                                color: errors?.packages
                                  ? theme.palette.error.main
                                  : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                fontSize: '0.8125rem'
                              }}
                            >
                              {errors?.packages?.message}
                            </FormHelperText>
                          )}
                        </div>
                      )}
                      name='packages'
                    />
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Controller
                      name='name'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          required
                          fullWidth
                          label={t('Full_name')}
                          placeholder={t('Enter_your_full_name')}
                          error={Boolean(errors?.name)}
                          helperText={errors?.name?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Controller
                      name='phoneNumber'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          required
                          fullWidth
                          label={t('Phone_number')}
                          placeholder={t('Enter_your_phone')}
                          error={Boolean(errors?.phoneNumber)}
                          helperText={errors?.phoneNumber?.message}
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Controller
                      name='quantity'
                      control={control}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <CustomTextField
                          required
                          fullWidth
                          label={t('Quantity_quest')}
                          placeholder={t('Enter_your_quantity')}
                          error={Boolean(errors?.quantity)}
                          onChange={e => {
                            const numValue = e.target.value.replace(/\D/g, '')
                            onChange(numValue)
                          }}
                          onBlur={onBlur}
                          value={value}
                          inputProps={{
                            inputMode: 'numeric',
                            pattern: '[0-9]*',
                            minLength: 8
                          }}
                          helperText={errors?.quantity?.message}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Controller
                      name='email'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          required
                          fullWidth
                          label={t('Email')}
                          placeholder={t('Enter_your_email')}
                          error={Boolean(errors?.email)}
                          helperText={errors?.email?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} lg={6}>
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
                              color: errors?.date ? theme.palette.error.main : theme.palette.primary.main
                            }}
                          >
                            <Typography
                              variant='body2'
                              sx={{
                                lineHeight: `1.2 !important`,
                                color: errors?.date ? theme.palette.error.main : theme.palette.common.black,
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
                                  value={value || null}
                                  onChange={onChange}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Box>

                          {errors?.date?.message && (
                            <FormHelperText
                              sx={{
                                color: errors?.date
                                  ? theme.palette.error.main
                                  : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                fontSize: '0.8125rem'
                              }}
                            >
                              {errors?.date?.message}
                            </FormHelperText>
                          )}
                        </div>
                      )}
                      name='date'
                    />
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Controller
                      name='notes'
                      control={control}
                      render={({ field }) => (
                        <CustomTextField
                          fullWidth
                          label={t('Others_packages')}
                          placeholder={t('Enter_your_notes')}
                          error={Boolean(errors?.notes)}
                          helperText={errors?.notes?.message}
                          {...field}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} lg={12}>
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
                              display: 'block',
                              marginBottom: '0.2rem',
                              color: errors?.duration ? theme.palette.error.main : theme.palette.primary.main
                            }}
                          >
                            <Typography
                              variant='body2'
                              sx={{
                                color: errors?.duration ? theme.palette.error.main : theme.palette.common.black,
                                fontSize: '0.9rem',
                                fontWeight: '600'
                              }}
                            >
                              {t('time_service')} <span>*</span>
                            </Typography>
                          </label>
                          {/* huyg  duration*/}
                          <StyledTabs
                            sx={{
                              '& .MuiTabs-flexContainer': {
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                [theme.breakpoints.down('md')]: {
                                  justifyContent: 'space-between',
                                  gap: '0.7rem'
                                }
                              },
                              [theme.breakpoints.down('md')]: {
                                '& .MuiTab-root': {
                                  padding: '0rem 1.2rem'
                                }
                              }
                            }}
                            onChange={(event: React.SyntheticEvent, value: string) => {
                              onChange(value)
                            }}
                            value={value}
                          >
                            {visitTime?.map((opt: any) => {
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
                                      fontSize: '0.8rem'
                                    }
                                  }}
                                  key={opt.value}
                                  value={opt.value}
                                  label={opt.label}
                                />
                              )
                            })}
                          </StyledTabs>

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
                        </div>
                      )}
                      name='duration'
                    />
                  </Grid>
                </Grid>

                <Box mt='1.5rem' display='flex'>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ width: '100%', display: 'flex', alignItems: 'center', py: '0.8rem' }}
                  >
                    <IconifyIcon icon='teenyicons:appointments-outline' />
                    <Typography fontSize='1rem' pl='0.5rem' color='#fff'>
                      {t('Booking_now')}
                    </Typography>
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                backgroundColor: 'background.paper',
                borderRadius: '1rem',
                boxShadow: 1
              }}
            >
              {/* Logo Section */}
              <Box sx={{ marginRight: 2 }}>
                <Typography component='h1' variant='h6' color='primary' noWrap sx={{ flexGrow: 1, fontWeight: '600' }}>
                  <Link style={{ color: 'inherit' }} href={ROUTE_CONFIG.HOME}>
                    <Image
                      alt='logo urban'
                      src='https://cdn.kampa.vn/urban-oasis-spa-logo.png'
                      width={80}
                      height={46}
                      priority
                    />
                  </Link>
                </Typography>
              </Box>

              {/* Information Section */}
              <Box>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                  Urban Spa & Massage
                </Typography>
                <Typography color='text.secondary'>
                  {t('Hotline_short')}:
                  <Typography fontSize='0.9rem' component='span' sx={{ fontWeight: 'bold' }}>
                    {' '}
                    0243.354.3333
                  </Typography>
                </Typography>
                <Typography color='text.secondary'>
                  {t('time_opening')}:{' '}
                  <Typography fontSize='0.9rem' component='span' sx={{ fontWeight: 'bold' }}>
                    09:00 - 22:00
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 1,
          fontSize: '0px'
        }}
      >
        <Image width={16} height={9} layout='responsive' alt='image' src='https://cdn.kampa.vn/sen.svg' />
      </Box>
    </Box>
  )
}

export default BookingForm

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
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

// Form field type

const duration = [
  { value: '15', label: '15' },
  { value: '30', label: '30' },
  { value: '45', label: '45' },
  { value: '60', label: '60' },
  { value: '75', label: '75' },
  { value: '90', label: '90' }
]
type BookingFormValues = {
  name: string
  email: string
  phoneNumber: string
  quantity: number
  date: string
  packages: string
  duration: string
  notes: string
}

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
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^\d+$/, 'Phone number must contain only numbers')
      .min(9, 'Phone number must be at least 9 digits'),
    quantity: yup
      .number()
      .typeError('Quantity must be a number')
      .required('Quantity is required')
      .min(1, 'Minimum quantity is 1'),
    date: yup.string().required(t('Required_field'))!,
    duration: yup.string().required(t('Required_field'))!,
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
      duration: '15',
      notes: ''
    }
  })

  const onSubmit = (data: any) => {
    dispatch(
      createOrderSpaAsync({
        name: data?.name,
        phoneNumber: data?.phoneNumber,
        email: data?.email,
        appointmentDate: data?.date,
        packageId: data?.packages,
        duration: data?.duration,
        quantity: data?.quantity,
        language: i18n.language,
        note: data?.notes
      })
    )
    reset()
    setOpenBookingForm(false)
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
    <Modal
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto'
      }}
      open={openBookingForm}
      onClose={() => setOpenBookingForm(false)}
    >
      <Box
        sx={{
          padding: '1.5rem',
          borderRadius: '15px',
          backgroundColor: theme.palette.background.paper,
          width: { xs: '90%', md: '50%' },
          maxHeight: { xs: '90vh', md: '80vh' }, // Set max height to allow scroll
          overflowY: 'auto' // Enable vertical scrolling for content
        }}
      >
        <Typography variant='subtitle2'>{t('Booking Form')}</Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
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
                        color: errors?.packages ? theme.palette.error.main : theme.palette.primary.main
                      }}
                    >
                      <Typography variant='body2' color={theme.palette.common.black}>
                        {t('package')} <span style={{ color: theme.palette.error.main }}>*</span>
                      </Typography>
                    </label>
                    {/* huyg  packages*/}
                    <StyledTabs
                      sx={{
                        '& .MuiTabs-flexContainer': {
                          flexWrap: 'wrap'
                        },
                        '& .MuiTab-root': {
                          marginTop: '0.5rem'
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

                    {errors?.packages?.message && (
                      <FormHelperText
                        sx={{
                          color: errors?.packages
                            ? theme.palette.error.main
                            : `rgba(${theme.palette.customColors.main}, 0.42)`
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
                    fullWidth
                    label={t('Name')}
                    placeholder={t('Enter your name')}
                    error={Boolean(errors?.name)}
                    helperText={errors?.name?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              {' '}
              <Controller
                name='phoneNumber'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label={t('Phone Number')}
                    placeholder={t('Enter your phone number')}
                    error={Boolean(errors?.phoneNumber)}
                    helperText={errors?.phoneNumber?.message}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              {' '}
              <Controller
                name='quantity'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label={t('quantity')}
                    placeholder={t('Enter your quantity')}
                    error={Boolean(errors?.quantity)}
                    helperText={errors?.quantity?.message}
                    {...field}
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
                    fullWidth
                    label={t('Email')}
                    placeholder={t('Enter your email')}
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
                        color={theme.palette.common.black}
                        sx={{
                          lineHeight: `1.2 !important`
                        }}
                      >
                        {t('Pickup_time')} <span style={{ color: theme.palette.error.main }}>*</span>
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
                          <DateTimePicker value={value || null} onChange={onChange} />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>

                    {errors?.date?.message && (
                      <FormHelperText
                        sx={{
                          color: errors?.date
                            ? theme.palette.error.main
                            : `rgba(${theme.palette.customColors.main}, 0.42)`
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
                name='duration'
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <CustomTextField
                    select
                    fullWidth
                    label={t('Duration')}
                    placeholder={t('Select your duration')}
                    error={Boolean(errors?.duration)}
                    helperText={errors?.duration?.message}
                    onChange={onChange}
                    value={value}
                    {...field}
                  >
                    {duration.map(item => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.label} {t('minutes')}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )}
              />
            </Grid>

            <Grid item xs={12} lg={12}>
              <Controller
                name='notes'
                control={control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    label={t('notes')}
                    placeholder={t('Enter your notes')}
                    error={Boolean(errors?.notes)}
                    helperText={errors?.notes?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3 }}>
                {t('Submit')}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default BookingForm

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
import Link from 'next/link'
import Image from 'next/image'

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
                        display: 'block',
                        marginBottom: '0.2rem',
                        color: errors?.packages ? theme.palette.error.main : theme.palette.primary.main
                      }}
                    >
                      <Typography
                        variant='body2'
                        sx={{
                          color: errors?.packages
                            ? theme.palette.error.main
                            : `rgba(${theme.palette.customColors.main}, 0.42)`
                        }}
                      >
                        {t('Package')} <span style={{ color: theme.palette.error.main }}>*</span>
                      </Typography>
                    </label>
                    {/* huyg  packages*/}
                    <StyledTabs
                      sx={{
                        '& .MuiTabs-flexContainer': {
                          flexWrap: 'wrap'
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
              {' '}
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
                          color: errors?.date
                            ? theme.palette.error.main
                            : `rgba(${theme.palette.customColors.main}, 0.42)`
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
                    label={t('Others_packages')}
                    placeholder={t('Enter_your_notes')}
                    error={Boolean(errors?.notes)}
                    helperText={errors?.notes?.message}
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt='1rem' sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Box maxWidth='50%' sx={{ cursor: 'pointer' }}>
              <Box mt='1rem'>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://blog.naver.com/kampavn'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_blog.svg'
                    width={25}
                    height={25}
                    alt='Picture of the author'
                  />
                </Link>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://www.facebook.com/kampavietnam'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_facebook.svg'
                    width={25}
                    height={25}
                    alt='fb'
                  />
                </Link>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://www.instagram.com/kampavietnam/'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/social_instragram.svg'
                    width={25}
                    height={25}
                    alt='ig'
                  />
                </Link>
                <Link style={{ paddingRight: '1rem' }} target='_blank' href='https://cafe.naver.com/vietnamtrip'>
                  <Image
                    src='https://pub-50bb58cfabdd4b93abb4e154d0eada9e.r2.dev/youtubeic.webp'
                    width={32}
                    height={22}
                    alt='utube'
                  />
                </Link>
                <Link target='_blank' href='https://zalo.me/1579840813471644356'>
                  <Image
                    src='https://pub-172edbed9e21458e8e1f85de78accde8.r2.dev/Icon_of_Zalo.svg.webp'
                    width={25}
                    height={25}
                    alt='zalo'
                  />
                </Link>
              </Box>
            </Box>
            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mt: 3, height: '30px' }}>
                {t('Booking_now')}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default BookingForm

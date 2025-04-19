'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useState } from 'react'

// ** Mui
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
  styled
} from '@mui/material'
import MuiCard from '@mui/material/Card'

// ** Components
import CustomTextField from 'src/components/text-field'
import Icon from 'src/components/Icon'

// ** form
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Config
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'

// ** Images

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { signIn, useSession } from 'next-auth/react'
import {
  clearLocalPreTokenAuthSocial,
  getLocalDeviceToken,
  getLocalPreTokenAuthSocial,
  getLocalRememberLoginAuthSocial,
  setLocalPreTokenAuthSocial,
  setLocalRememberLoginAuthSocial
} from 'src/helpers/storage'
import FallbackSpinner from 'src/components/fall-back'
import { ROUTE_CONFIG } from 'src/configs/route'
// import useFcmToken from 'src/hooks/useFcmToken'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type TProps = {}

type TDefaultValue = {
  email: string
  password: string
}

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: '0px auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px'
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 0.313rem 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -0.313rem',
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 0.313rem 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -0.313rem'
  })
}))

const LoginPage: NextPage<TProps> = () => {
  // State
  const [showPassword, setShowPassword] = useState(false)
  const [isRemember, setIsRemember] = useState(true)
  const prevTokenLocal = getLocalPreTokenAuthSocial()

  // ** Translate
  const { t } = useTranslation()

  // ** context
  const { login, loginGoogle, loginFacebook } = useAuth()

  // ** theme
  const theme = useTheme()

  // ** Hooks
  const { data: session, status } = useSession()
  // const { fcmToken } = useFcmToken()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const schema = yup.object().shape({
    email: yup.string().required(t('Required_field')).matches(EMAIL_REG, t('Rules_email')),
    password: yup.string().required(t('Required_field')).matches(PASSWORD_REG, t('Rules_password'))
  })

  const defaultValues: TDefaultValue = {
    email: 'admin@gmail.com',
    password: '1234Kha@'
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: { email: string; password: string }) => {
    if (!Object.keys(errors)?.length) {
      // login({ ...data, rememberMe: isRemember, deviceToken: fcmToken }, err => {
      login({ ...data, rememberMe: isRemember, deviceToken: '' }, err => {
        if (err?.response?.data?.typeError === 'INVALID') toast.error(t('The_email_or_password_wrong'))
      })
    }
  }

  const handleLoginGoogle = () => {
    signIn('google')
    clearLocalPreTokenAuthSocial()
  }

  const handleLoginFacebook = () => {
    signIn('facebook')
    clearLocalPreTokenAuthSocial()
  }

  const handleNavigateRegister = () => {
    const params = new URLSearchParams(searchParams)
    const fullUrl = `${pathName}?${params}`
    router.push(fullUrl.replace(`/login`, `/register`))
  }

  useEffect(() => {
    if ((session as any)?.accessToken && (session as any)?.accessToken !== prevTokenLocal) {
      const rememberLocal = getLocalRememberLoginAuthSocial()
      const deviceToken = getLocalDeviceToken()
      if ((session as any)?.provider === 'facebook') {
        loginFacebook(
          {
            idToken: (session as any)?.accessToken,
            rememberMe: rememberLocal ? rememberLocal === 'true' : true,
            deviceToken: deviceToken ? deviceToken : ''
          },
          err => {
            if (err?.response?.data?.typeError === 'INVALID') toast.error(t('The_email_or_password_wrong'))
          }
        )
      } else {
        loginGoogle(
          {
            idToken: (session as any)?.accessToken,
            rememberMe: rememberLocal ? rememberLocal === 'true' : true,
            deviceToken: deviceToken ? deviceToken : ''
          },
          err => {
            if (err?.response?.data?.typeError === 'INVALID') toast.error(t('The_email_or_password_wrong'))
          }
        )
      }
      setLocalPreTokenAuthSocial((session as any)?.accessToken)
    }
  }, [(session as any)?.accessToken])

  return (
    <>
      {status === 'loading' && <FallbackSpinner />}
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          backgroundColor: '#f9fcff',
          padding: { xs: '1.25rem', lg: '100px' }
        }}
      >
        <Card variant='outlined'>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h5'>
              {t('Login')}
            </Typography>
            <form style={{ width: '80%' }} onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box sx={{ mt: 4 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Email')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_email')}
                      error={Boolean(errors?.email)}
                      helperText={errors?.email?.message}
                    />
                  )}
                  name='email'
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t('Password')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={t('Enter_password')}
                      error={Boolean(errors?.password)}
                      helperText={errors?.password?.message}
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                <Icon icon='material-symbols:visibility-outline' />
                              ) : (
                                <Icon icon='ic:outline-visibility-off' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='password'
                />
              </Box>

              <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='rememberMe'
                      checked={isRemember}
                      onChange={e => {
                        setIsRemember(e.target.checked)
                        setLocalRememberLoginAuthSocial(JSON.stringify(e.target.checked))
                      }}
                      color='primary'
                    />
                  }
                  label={t('Remember_me')}
                />
                <Typography
                  variant='body2'
                  onClick={() => {
                    router.push(`${ROUTE_CONFIG.FORGOT_PASSWORD}`)
                  }}
                >
                  {t('Forgot_password')}?
                </Typography>
              </Box>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                {/* Sign in */}
                {t('Sign_in')}
              </Button>
              {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                <Typography>{t('You_dont_have_account')}</Typography>
                <Typography
                  onClick={handleNavigateRegister}
                  style={{
                    color: theme.palette.primary.main,
                    cursor: 'pointer'
                  }}
                >
                  <Typography color={theme.palette.primary.main}> {t('Register')}</Typography>
                </Typography>
              </Box> */}
              {/* <Typography sx={{ textAlign: 'center', mt: 4, mb: 2 }}>{t('Or')}</Typography> */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem' }}>
                {/* <IconButton data-testId='btn-google' sx={{ color: '#497ce2' }} onClick={handleLoginFacebook}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    role='img'
                    fontSize='1.375rem'
                    className='iconify iconify--mdi'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z'
                    ></path>
                  </svg>
                </IconButton> */}

                {/* <Button
                  sx={{
                    border: '0.063rem solid rgb(160, 174, 192)'
                  }}
                  fullWidth
                  variant='outlined'
                  onClick={handleLoginGoogle}
                >
                  <svg width='36' height='36' fill='none'>
                    <path
                      d='M18.498 11.795a6.17 6.17 0 013.983 1.454l3.12-2.972a10.485 10.485 0 00-16.507 3.062l3.519 2.712a6.211 6.211 0 015.885-4.256z'
                      fill='#D94F3D'
                    ></path>
                    <path
                      d='M12.295 17.998c0-.662.108-1.32.318-1.947l-3.519-2.712a10.467 10.467 0 000 9.318l3.519-2.712a6.174 6.174 0 01-.318-1.947z'
                      fill='#F2C042'
                    ></path>
                    <path
                      d='M28.567 16.09H18.546v4.294h5.678a5.119 5.119 0 01-2.173 2.94l3.49 2.692c2.232-2.002 3.542-5.258 3.026-9.927z'
                      fill='#5085ED'
                    ></path>
                    <path
                      d='M22.05 23.324a6.67 6.67 0 01-3.552.877 6.211 6.211 0 01-5.886-4.256l-3.518 2.712a10.51 10.51 0 009.404 5.84c2.573.07 5.081-.815 7.042-2.482l-3.49-2.69z'
                      fill='#57A75C'
                    ></path>
                  </svg>
                  <Typography> {t('Sign_in_with_Google')}</Typography>
                </Button> */}
                {/* <IconButton sx={{ color: theme.palette.error.main }} onClick={handleLoginGoogle}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    role='img'
                    fontSize='1.375rem'
                    className='iconify iconify--mdi'
                    width='1em'
                    height='1em'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='currentColor'
                      d='M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81Z'
                    ></path>
                  </svg>
                  Sign in with Facebook
                </IconButton> */}
              </Box>
            </form>
          </Box>
        </Card>

        {/* </Box> */}
      </Box>
    </>
  )
}

export default LoginPage

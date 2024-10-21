// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import BlankLayout from 'src/views/layouts/BlankLayout'
import LoginPage from 'src/views/pages/login'

type TProps = {}

const Login: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper guestGuard getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <LoginPage />
    </AuthLayoutWrapper>
  )
}

export default Login



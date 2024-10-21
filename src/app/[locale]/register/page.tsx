// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import BlankLayout from 'src/views/layouts/BlankLayout'
import RegisterPage from 'src/views/pages/register'

type TProps = {}

const Register: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper guestGuard getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <RegisterPage />
    </AuthLayoutWrapper>
  )
}

export default Register

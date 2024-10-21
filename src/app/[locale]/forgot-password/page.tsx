// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import BlankLayout from 'src/views/layouts/BlankLayout'
import ForgotPasswordPage from 'src/views/pages/forgot-password'

type TProps = {}

const ForgotPassword: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper guestGuard getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <ForgotPasswordPage />
    </AuthLayoutWrapper>
  )
}

export default ForgotPassword


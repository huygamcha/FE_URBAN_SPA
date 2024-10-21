// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import BlankLayout from 'src/views/layouts/BlankLayout'
import ResetPasswordPage from 'src/views/pages/reset-password'

type TProps = {}

const ResetPassword: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper guestGuard getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
      <ResetPasswordPage />
    </AuthLayoutWrapper>
  )
}

export default ResetPassword



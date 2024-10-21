// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

// ** views
import ChangePasswordPage from 'src/views/pages/change-password'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page:ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <ChangePasswordPage />
    </AuthLayoutWrapper>
  )
}

export default Index

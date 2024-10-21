// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** views
import MyProfilePage from 'src/views/pages/my-profile'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <MyProfilePage />
    </AuthLayoutWrapper>
  )
}

export default Index


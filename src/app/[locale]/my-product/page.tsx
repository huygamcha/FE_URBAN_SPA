// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import MyProductPage from 'src/views/pages/my-product'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <MyProductPage />
    </AuthLayoutWrapper>
  )
}

export default Index


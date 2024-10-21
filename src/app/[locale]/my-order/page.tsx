// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import MyOrderPage from 'src/views/pages/my-order'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <MyOrderPage />
    </AuthLayoutWrapper>
  )
}

export default Index

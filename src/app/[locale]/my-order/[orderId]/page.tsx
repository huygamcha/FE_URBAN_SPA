// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import MyOrderDetailsPage from 'src/views/pages/my-order/DetailsOrder'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <MyOrderDetailsPage />
    </AuthLayoutWrapper>
  )
}

export default Index

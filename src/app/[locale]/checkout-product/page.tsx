// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import CheckoutProductPage from 'src/views/pages/checkout-product'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <CheckoutProductPage />
    </AuthLayoutWrapper>
  )
}

export default Index

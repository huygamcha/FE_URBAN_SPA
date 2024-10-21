// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import MyCartPage from 'src/views/pages/my-cart'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}>
      <MyCartPage />
    </AuthLayoutWrapper>
  )
}

export default Index

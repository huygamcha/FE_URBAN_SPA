// ** Import Next
import { NextPage } from 'next'

// ** Config
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** Pages
import PaymentTypeListPage from 'src/views/pages/settings/payment-type/PaymentTypeList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <PaymentTypeListPage />
    </AuthLayoutWrapper>
  )
}

export default Index


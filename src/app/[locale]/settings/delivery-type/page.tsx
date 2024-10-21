// ** Import Next
import { NextPage } from 'next'

// ** Hoc
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** Pages
import DeliveryTypeListPage from 'src/views/pages/settings/delivery-type/DeliveryTypeList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <DeliveryTypeListPage />
    </AuthLayoutWrapper>
  )
}

export default Index


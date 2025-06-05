// ** Import Next
import { NextPage } from 'next'

// ** Configs
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import OrderSpaListPage from 'src/views/pages/manage-order/order-spa/OrderSpaList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]}>
      <OrderSpaListPage />
    </AuthLayoutWrapper>
  )
}

export default Index

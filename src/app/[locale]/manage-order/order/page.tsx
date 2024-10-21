// ** Import Next
import { NextPage } from 'next'

// ** Configs
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import OrderProductListPage from 'src/views/pages/manage-order/order-product/OrderProductList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.MANAGE_ORDER.ORDER.VIEW]}>
      <OrderProductListPage />
    </AuthLayoutWrapper>
  )
}

export default Index


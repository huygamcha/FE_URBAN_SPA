// ** Import Next
import { NextPage } from 'next'

// ** Pages
import ProductListPage from 'src/views/pages/manage-product/product/ProductList'

// ** Config
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'


type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.MANAGE_PRODUCT.PRODUCT.VIEW]}>
      <ProductListPage />
    </AuthLayoutWrapper>
  )
}

export default Index


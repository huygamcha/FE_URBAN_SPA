// ** Import Next
import { NextPage } from 'next'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** Pages
import ProductTypeListPage from 'src/views/pages/manage-product/product-type/ProductTypeList'

// ** Config


type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <ProductTypeListPage />
    </AuthLayoutWrapper>
  )
}

export default Index


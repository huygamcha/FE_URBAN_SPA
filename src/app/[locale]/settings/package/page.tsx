// ** Import Next
import { NextPage } from 'next'

// ** Config
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** Pages
import PackageListPage from 'src/views/pages/settings/package/PackagePage'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <PackageListPage/>
    </AuthLayoutWrapper>
  )
}
// Index.permission = [PERMISSIONS.SETTING.CITY.VIEW]
export default Index


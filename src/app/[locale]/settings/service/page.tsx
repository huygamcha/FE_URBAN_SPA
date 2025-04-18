// ** Import Next
import { NextPage } from 'next'

// ** Config
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** Pages
import CityListPage from 'src/views/pages/settings/city/CityList'
import PackageListPage from 'src/views/pages/settings/package/PackagePage'
import ServiceListPage from 'src/views/pages/settings/service/ServicePage'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <ServiceListPage/>
    </AuthLayoutWrapper>
  )
}
// Index.permission = [PERMISSIONS.SETTING.CITY.VIEW]
export default Index


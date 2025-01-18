// ** Import Next
import { NextPage } from 'next'

// ** Config
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import AboutListPage from 'src/views/pages/settings/about/PackagePage'

// ** Pages
import CityListPage from 'src/views/pages/settings/city/CityList'
import PackageListPage from 'src/views/pages/settings/package/PackagePage'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <AboutListPage />
    </AuthLayoutWrapper>
  )
}
// Index.permission = [PERMISSIONS.SETTING.CITY.VIEW]
export default Index

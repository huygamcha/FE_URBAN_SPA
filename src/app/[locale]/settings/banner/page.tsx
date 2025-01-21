// ** Import Next
import { NextPage } from 'next'

// ** Config
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import BannerListPage from 'src/views/pages/settings/banner/BannerPage'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <BannerListPage />
    </AuthLayoutWrapper>
  )
}
// Index.permission = [PERMISSIONS.SETTING.CITY.VIEW]
export default Index

import { Metadata } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getDetailAbout } from 'src/services/about'
import { getAllBanners } from 'src/services/banners'
import { getAllPackages } from 'src/services/packages'
import { TParamsFetchAbout } from 'src/types/about'
import { TBanner } from 'src/types/banner'
import { TPackage } from 'src/types/package'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import ContactPage from 'src/views/pages/contact'
import HomePage from 'src/views/pages/home'
import ListPackagePage from 'src/views/pages/packages/ListPackagePage'


export default async function Home() {

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp isHiddenBanner={true}>{page}</LayoutNotApp>}
    >
      <ContactPage  />
    </AuthLayoutWrapper>
  )
}

// Home.title = "Danh sách sản phẩm của cửa hàng Lập trình thật dễ"
// export const dynamic = 'force-dynamic'
// export const revalidate = 10
// export const maxDuration = 60

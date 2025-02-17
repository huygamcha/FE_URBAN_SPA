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
import ListPackagePage from 'src/views/pages/packages/ListPackagePage'

const getPackages = async () => {
  try {
    let packages: TPackage[] = []
    await getAllPackages({ params: { limit: -1, page: -1 } }).then(res => {
      packages = res?.data?.packages
    })

    return {
      packages
    }
  } catch (error) {
    return {
      packages: []
    }
  }
}

export default async function Home() {
  const { packages } = await getPackages()

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp isHiddenBanner={true}>{page}</LayoutNotApp>}
    >
      <ListPackagePage packages={packages} />
    </AuthLayoutWrapper>
  )
}

// Home.title = "Danh sách sản phẩm của cửa hàng Lập trình thật dễ"
export const dynamic = 'force-static'
export const revalidate = 120
export const maxDuration = 180

import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import PackageDetailPage from 'src/views/pages/packages/PackageDetailPage'

interface Props {
  params: { packageId: string }
}

export default async function Home({ params }: Props) {
  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <PackageDetailPage />
    </AuthLayoutWrapper>
  )
}

export const dynamic = 'force-dynamic'
// export const revalidate = 10
// export const maxDuration = 60

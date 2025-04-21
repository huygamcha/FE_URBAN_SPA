import { Metadata } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getAllPackages } from 'src/services/packages'
import { TPackage } from 'src/types/package'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import PackagePage from 'src/views/pages/packages'

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
      <PackagePage />
    </AuthLayoutWrapper>
  )
}

export const dynamic = 'force-dynamic'
// export const revalidate = 10
// export const maxDuration = 60

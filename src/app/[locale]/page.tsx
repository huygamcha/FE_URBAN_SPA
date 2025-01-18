import { Metadata } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getDetailAbout } from 'src/services/about'
import { getAllPackages } from 'src/services/packages'
import { TParamsFetchAbout } from 'src/types/about'
import { TPackage } from 'src/types/package'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import HomePage from 'src/views/pages/home'

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

const getAboutUs = async () => {
  try {
    let aboutUs: TParamsFetchAbout = {
      _id: '',
      name: '',
      nameEn: '',
      nameJp: '',
      nameKo: ''
    }
    await getDetailAbout('6788bd95f809cf516d23119c').then(res => {
      aboutUs = res?.data
    })

    return {
      aboutUs
    }
  } catch (error) {
    return {
      aboutUs: { _id: '', name: '', nameEn: '', nameJp: '', nameKo: '' }
    }
  }
}

export const metadata: Metadata = {
  title: 'UrbanSpa',
  description:
    'Bán hàng điện tử, điện thoại, máy tính bảng, khóa học nextjs 14 reactjs typescript pro 2024 by Lập trình thật dễ - Xây dựng website bán hàng',
  keywords: `Lập trình thật dễ - ReactJS, NextJS 14, Typescript, Lập trình thật dễ`,
  openGraph: {
    title: 'UrbanSpa',
    description:
      'Bán hàng điện tử, điện thoại, máy tính bảng, khóa học nextjs 14 reactjs typescript pro 2024 by Lập trình thật dễ - Xây dựng website bán hàng',
    type: 'website',
    url: `https://convert-app-router.vercel.app/home`
  },
  twitter: {
    title: 'UrbanSpa',
    description:
      'Bán hàng điện tử, điện thoại, máy tính bảng, khóa học nextjs 14 reactjs typescript pro 2024 by Lập trình thật dễ - Xây dựng website bán hàng'
  }
}

export default async function Home() {
  const { packages } = await getPackages()
  const { aboutUs } = await getAboutUs()

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <HomePage aboutUs={aboutUs} packages={packages} />
    </AuthLayoutWrapper>
  )
}

// Home.title = "Danh sách sản phẩm của cửa hàng Lập trình thật dễ"
// export const dynamic = 'force-dynamic'
// export const revalidate = 10
// export const maxDuration = 60

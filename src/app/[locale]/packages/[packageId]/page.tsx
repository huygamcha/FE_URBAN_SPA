import { Metadata } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getAllPackages } from 'src/services/packages'
import { getAllProductsPublic } from 'src/services/product'
import { getAllProductTypes } from 'src/services/product-type'
import { TPackage } from 'src/types/package'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import HomePage from 'src/views/pages/home'
import PackagePage from 'src/views/pages/packages'

interface Props {
  params: { packageId: string }
}

const getPackages = async (search: string) => {
  try {
    let packages: TPackage = {
      _id: '',
      slug: '',
      name: '',
      nameEn: '',
      nameKo: '',
      nameJp: '',
      image: '',
      description: '',
      descriptionKo: '',
      descriptionJp: '',
      descriptionEn: '',
      services: []
    }
    await getAllPackages({ params: { limit: -1, page: -1, search: search } }).then(res => {
      packages = res?.data.packages[0]
    })

    return {
      packages
    }
  } catch (error) {
    return {
      packages: {
        _id: '',
        slug: '',
        name: '',
        nameEn: '',
        nameKo: '',
        nameJp: '',
        image: '',
        description: '',
        descriptionKo: '',
        descriptionJp: '',
        descriptionEn: '',
        services: []
      }
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

export default async function Home({ params }: Props) {
  const { packageId } = params
  const { packages } = await getPackages(packageId)

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <PackagePage packages={packages} />
    </AuthLayoutWrapper>
  )
}

// Home.title = "Danh sách sản phẩm của cửa hàng Lập trình thật dễ"
export const dynamic = 'force-dynamic'
// export const revalidate = 10
// export const maxDuration = 60

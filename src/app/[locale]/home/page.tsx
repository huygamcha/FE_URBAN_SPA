import { Metadata } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getAllProductsPublic } from 'src/services/product'
import { getAllProductTypes } from 'src/services/product-type'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'

// ** Pages
import HomePage from 'src/views/pages/home'

interface TOptions {
  label: string
  value: string
}

// const getBanners = async () => {
//   try {
//     const banners: TOptions[] = []
//     await getAllBanners({ params: { limit: -1, page: -1 } }).then(res => {
//       const data = res?.data.banners
//       if (data) {
//         data?.map((item: { link: string; type: string; image: string; language: string }) => {
//           banners.push({ link: item.link, type: item.type, image: item.image, language: item.language })
//         })
//       }
//     })

//     return {
//       banners
//     }
//   } catch (error) {
//     return {
//       banners: []
//     }
//   }
// }

const getProductData = async () => {
  const limit = 10
  const page = 1
  const order = 'createdAt desc'
  try {
    const productTypes: TOptions[] = []
    await getAllProductTypes({ params: { limit: -1, page: -1 } }).then(res => {
      const data = res?.data.productTypes
      if (data) {
        data?.map((item: { name: string; _id: string }) => {
          productTypes.push({ label: item.name, value: item._id })
        })
      }
    })
    const res = await getAllProductsPublic({
      params: { limit: limit, page: page, order, productType: productTypes?.[0]?.value }
    })

    const data = res.data

    return {
      products: data?.products,
      totalCount: data?.totalCount,
      productTypes: productTypes || [],
      params: {
        limit,
        page,
        order,
        productType: productTypes?.[0]?.value || ''
      }
    }
  } catch (error) {
    return {
      products: [],
      totalCount: 0,
      productTypes: [],
      params: {
        limit,
        page,
        order,
        productType: ''
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

export default async function Home() {
  const { products, totalCount, params, productTypes } = await getProductData()

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <HomePage products={products} totalCount={totalCount} paramsServer={params} productTypesServer={productTypes} />
    </AuthLayoutWrapper>
  )
}

// Home.title = "Danh sách sản phẩm của cửa hàng Lập trình thật dễ"
export const dynamic = 'force-static'
export const revalidate = 10
export const maxDuration = 60

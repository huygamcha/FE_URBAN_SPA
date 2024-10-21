// ** Import Next
import { NextPage } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getDetailsProductPublicBySlug, getListRelatedProductBySlug } from 'src/services/product'
import { TProduct } from 'src/types/product'

// ** views
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import DetailsProductPage from 'src/views/pages/product/DetailsProduct'

type TProps = {
  productData: TProduct
  listRelatedProduct: TProduct[]
}

export async function generateMetadata({ params: { slugId } }: { params: { slugId: string } }) {
  const res = await getDetailsProductPublicBySlug(
    slugId
  )
  const productData = res.data

  return {
    title: `Lập trình thật dễ - ${productData?.name}`,
    description: `${productData.description}`,
    keywords: `Lập trình thật dễ - ${productData?.name} - ${productData.slug}`,
    openGraph: {
      image: productData.image,
      title: `Lập trình thật dễ - ${productData?.name}`,
      description: `${productData.description}`,
      type: 'website',
      url: `https://convert-app-router.vercel.app/product/${productData.slug}`
    },
    twitter: {
      image: productData.image,
      title: `Lập trình thật dễ - ${productData?.name}`,
      description: `${productData.description}`,
    },
  }
}

const getDetailsProduct = async (slugId: string) => {
  try {
    const res = await getDetailsProductPublicBySlug(
      slugId, true
    )
    const resRelated = await getListRelatedProductBySlug({ params: { slug: slugId } })

    const productData = res.data
    const listRelatedProduct = resRelated?.data?.products

    if (!productData?._id) {
      return {
        notFound: true
      }
    }

    return {
      productData: productData,
      listRelatedProduct,
    }
  } catch (error) {
    return {
      productData: {},
      listRelatedProduct: []
    }
  }
}

const Index = async ({ params: { productId } }: { params: { productId: string } }) => {
  const { productData, listRelatedProduct } = await getDetailsProduct(productId)
  const description = ''

  return (
    <AuthLayoutWrapper
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
      authGuard={false}
      guestGuard={false}
    >
      <Head>
        <meta
          name='description'
          content={description}
        />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name="author" content="Lập trình thật dễ" />
        <meta name="name" content="Khóa học NextJS 14 typescript PRO 2024" />
        <meta name="image" content={productData?.image} />
        {/* facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Lập trình thật dễ - ${productData?.name}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={productData?.image} />
        {/* twitter */}
        <meta property="twitter:card" content="website" />
        <meta property="twitter:title" content={`Lập trình thật dễ - ${productData?.name}`} />
        <meta property="twitter:description" content={productData?.description} />
        <meta property="twitter:image" content={`Lập trình thật dễ - ${productData?.name}`} />
      </Head>
      <DetailsProductPage productData={productData} productsRelated={listRelatedProduct} />
    </AuthLayoutWrapper>
  )
}

export default Index

export const dynamic = 'force-dynamic'
export const maxDuration = 60

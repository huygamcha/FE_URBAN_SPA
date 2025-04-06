import { Metadata } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import ContactPage from 'src/views/pages/contact'

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const locale = params?.locale // Đặt giá trị mặc định là 'vi'

  return {
    title: locale === 'vi' ? 'Liên hệ' : locale === 'en' ? 'Contact' : locale === 'ko' ? '연락처' : '連絡先',
    description:
      locale === 'ko'
        ? '베트남 현지 여행사, 호텔, 투어, 항공권, 픽업 샌딩 차량, 관광지 티켓, 스파 및 마사지 예약을 전문으로 합니다. 여행의 전 과정에 상담을 지원하기도 합니다.'
        : 'Spa cao cấp, thư giãn và làm đẹp',
    keywords: locale === 'ko' ? '베트남 현지 여행사, 호텔, 투어' : 'Spa cao cấp, thư giãn và làm đẹp',
    openGraph: {
      title: locale === 'ko' ? 'Urban Spa, 베트남 현지 여행사' : 'Urban Spa, Spa cao cấp, thư giãn và làm đẹp',
      description:
        locale === 'ko'
          ? '베트남 현지 여행사, 호텔, 투어, 항공권, 픽업 샌딩 차량, 관광지 티켓, 스파 및 마사지 예약을 전문으로 합니다. 여행의 전 과정에 상담을 지원하기도 합니다.'
          : 'Spa cao cấp, thư giãn và làm đẹp',
      type: 'website',
      url: `https://cdn.kampa.vn`,
      images: [
        {
          url: 'https://cdn.kampa.vn/opengraph.png',
          width: 1200,
          height: 630
        }
      ]
    },
    twitter: {
      title: locale === 'ko' ? 'Urban Spa, 베트남 현지 여행사' : 'Urban Spa, Spa cao cấp, thư giãn và làm đẹp',
      description:
        locale === 'ko'
          ? '베트남 현지 여행사, 호텔, 투어, 항공권, 픽업 샌딩 차량, 관광지 티켓, 스파 및 마사지 예약을 전문으로 합니다. 여행의 전 과정에 상담을 지원하기도 합니다.'
          : 'Spa cao cấp, thư giãn và làm đẹp'
    },
    icons: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon.svg'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon.svg'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicon.svg'
      }
    ]
  }
}

export default async function Home() {
  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp isHiddenBanner={true}>{page}</LayoutNotApp>}
    >
      <ContactPage />
    </AuthLayoutWrapper>
  )
}

// Home.title = "Danh sách sản phẩm của cửa hàng Lập trình thật dễ"
// export const dynamic = 'force-dynamic'
// export const revalidate = 10
// export const maxDuration = 60

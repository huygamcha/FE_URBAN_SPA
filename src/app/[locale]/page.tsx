import { Metadata } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getDetailAbout } from 'src/services/about'
import { getAllBanners } from 'src/services/banners'
import { TParamsFetchAbout } from 'src/types/about'
import { TBanner } from 'src/types/banner'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import HomePage from 'src/views/pages/home/HomePage'

const getBanner = async () => {
  try {
    let banner: TBanner[] = []
    await getAllBanners({ params: { limit: -1, page: -1 } }).then(res => {
      banner = res?.data?.banners
    })

    return {
      banner
    }
  } catch (error) {
    return {
      banner: []
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
    // await getDetailAbout('678f33bca37abbb25c8d15f9').then(res => {
    //   aboutUs = res?.data
    // })

    await getDetailAbout('68e0c02770a5eb03b4c3f804').then(res => {
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

export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
  const locale = params?.locale // Đặt giá trị mặc định là 'vi'

  return {
    title: 'Urban Oasis Spa',
    description:
      locale === 'ko'
        ? '베트남 현지 여행사, 호텔, 투어, 항공권, 픽업 샌딩 차량, 관광지 티켓, 스파 및 마사지 예약을 전문으로 합니다. 여행의 전 과정에 상담을 지원하기도 합니다.'
        : 'Spa cao cấp, thư giãn và làm đẹp',
    keywords: locale === 'ko' ? '베트남 현지 여행사, 호텔, 투어' : 'Spa cao cấp, thư giãn và làm đẹp',
    openGraph: {
      title:
        locale === 'ko' ? 'Urban Oasis Spa, 베트남 현지 여행사' : 'Urban Oasis Spa, Spa cao cấp, thư giãn và làm đẹp',
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
      title:
        locale === 'ko' ? 'Urban Oasis Spa, 베트남 현지 여행사' : 'Urban Oasis Spa, Spa cao cấp, thư giãn và làm đẹp',
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
  const { aboutUs } = await getAboutUs()
  const { banner } = await getBanner()

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => (
        <LayoutNotApp banner={banner} isHiddenBanner={true}>
          {page}
        </LayoutNotApp>
      )}
    >
      <HomePage banner={banner} aboutUs={aboutUs} />
    </AuthLayoutWrapper>
  )
}

export const dynamic = 'force-static'

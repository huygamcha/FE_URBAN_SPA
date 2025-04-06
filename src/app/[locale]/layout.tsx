import React from 'react'
import initTranslations from 'src/configs/i18n'
import TranslationProvider from 'src/app/[locale]/TranslationProvider'
import { StoreWrapper } from 'src/hoc/StoreWrapper'
import { Metadata } from 'next'

const i18nNamespaces = ['translation']

export default async function Layout({ children, params: { locale } }: any) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <TranslationProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
      <StoreWrapper>{children}</StoreWrapper>
    </TranslationProvider>
  )
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
// export const generateMetadata = async ({ params }: any): Promise<Metadata> => {
//   const locale = params?.locale // Đặt giá trị mặc định là 'vi'
//   console.log('««««« locale here »»»»»', locale)

//   return {
//     title: locale === 'ko' ? 'Urban Spa, 베트남 현지 여행사' : 'Urban Spa, Spa cao cấp, thư giãn và làm đẹp',
//     description:
//       locale === 'ko'
//         ? '베트남 현지 여행사, 호텔, 투어, 항공권, 픽업 샌딩 차량, 관광지 티켓, 스파 및 마사지 예약을 전문으로 합니다. 여행의 전 과정에 상담을 지원하기도 합니다.'
//         : 'Spa cao cấp, thư giãn và làm đẹp',
//     keywords: locale === 'ko' ? '베트남 현지 여행사, 호텔, 투어' : 'Spa cao cấp, thư giãn và làm đẹp',
//     openGraph: {
//       title: locale === 'ko' ? 'Urban Spa, 베트남 현지 여행사' : 'Urban Spa, Spa cao cấp, thư giãn và làm đẹp',
//       description:
//         locale === 'ko'
//           ? '베트남 현지 여행사, 호텔, 투어, 항공권, 픽업 샌딩 차량, 관광지 티켓, 스파 및 마사지 예약을 전문으로 합니다. 여행의 전 과정에 상담을 지원하기도 합니다.'
//           : 'Spa cao cấp, thư giãn và làm đẹp',
//       type: 'website',
//       url: `https://cdn.kampa.vn`,
//       images: [
//         {
//           url: 'https://cdn.kampa.vn/opengraph.png',
//           width: 1200,
//           height: 630
//         }
//       ]
//     },
//     twitter: {
//       title: locale === 'ko' ? 'Urban Spa, 베트남 현지 여행사' : 'Urban Spa, Spa cao cấp, thư giãn và làm đẹp',
//       description:
//         locale === 'ko'
//           ? '베트남 현지 여행사, 호텔, 투어, 항공권, 픽업 샌딩 차량, 관광지 티켓, 스파 및 마사지 예약을 전문으로 합니다. 여행의 전 과정에 상담을 지원하기도 합니다.'
//           : 'Spa cao cấp, thư giãn và làm đẹp'
//     },
//     icons: [
//       {
//         rel: 'icon',
//         type: 'image/png',
//         sizes: '32x32',
//         url: '/favicon.svg'
//       },
//       {
//         rel: 'icon',
//         type: 'image/png',
//         sizes: '16x16',
//         url: '/favicon.svg'
//       },
//       {
//         rel: 'apple-touch-icon',
//         sizes: '180x180',
//         url: '/favicon.svg'
//       }
//     ]
//   }
// }

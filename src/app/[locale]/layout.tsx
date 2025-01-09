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

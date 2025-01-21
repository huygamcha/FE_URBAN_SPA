import { Metadata } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getAllPackages } from 'src/services/packages'
import { TPackage } from 'src/types/package'
import BookingForm from 'src/views/pages/booking-form/BookingForm'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import HomePage from 'src/views/pages/home'

export default async function Home() {
  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      <BookingForm />
    </AuthLayoutWrapper>
  )
}

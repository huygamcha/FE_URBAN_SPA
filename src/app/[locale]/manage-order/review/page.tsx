// ** Import Next
import { NextPage } from 'next'

// ** Config

import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import ReviewListPage from 'src/views/pages/manage-order/reviews/ReviewList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <ReviewListPage />
    </AuthLayoutWrapper>
  )
}

export default Index


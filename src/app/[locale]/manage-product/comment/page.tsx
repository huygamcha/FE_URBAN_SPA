// ** Import Next
import { NextPage } from 'next'

// ** Config
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views
import CommentListPage from 'src/views/pages/manage-product/comment/CommentList'

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper>
      <CommentListPage />
    </AuthLayoutWrapper>
  )
}

export default Index


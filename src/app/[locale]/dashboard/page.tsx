// ** Import Next
import { NextPage } from 'next'
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import DashboardPage from 'src/views/pages/dashboard'

// ** views

type TProps = {}

const Index: NextPage<TProps> = () => {
 

  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.DASHBOARD]}>
      <DashboardPage />
    </AuthLayoutWrapper>
  )
}

export default Index


// ** Import Next
import { NextPage } from 'next'
import ControlCalendar from 'src/components/CustomizingCalendar/CustomizingCalendar'
import { PERMISSIONS } from 'src/configs/permission'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

// ** views

type TProps = {}

const Index: NextPage<TProps> = () => {
  return (
    <AuthLayoutWrapper permission={[PERMISSIONS.DASHBOARD]}>
      <ControlCalendar />
    </AuthLayoutWrapper>
  )
}

export default Index

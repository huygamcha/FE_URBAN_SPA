// ** Import Next
import { NextPage } from 'next'
import { ReactNode } from 'react'

// ** views
import PaymentVNPay from 'src/views/pages/payment/vnpay'
import BlankLayout from 'src/views/layouts/BlankLayout'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'

type TProps = {}

const Index: NextPage<TProps> = () => {
    return (
        <AuthLayoutWrapper getLayout={(page: ReactNode) => <BlankLayout>{page}</BlankLayout>}>
            <PaymentVNPay />
        </AuthLayoutWrapper>
    )
}

export default Index

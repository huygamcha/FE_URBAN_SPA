import FallbackSpinner from "src/components/fall-back"
import AuthLayoutWrapper from "src/hoc/AuthLayoutWrapper"
import BlankLayout from "src/views/layouts/BlankLayout"

const Index = () => {
      return (
            <AuthLayoutWrapper getLayout={(page) => <BlankLayout>{page}</BlankLayout>}>
                  <FallbackSpinner />
            </AuthLayoutWrapper>
      )
}

export default Index
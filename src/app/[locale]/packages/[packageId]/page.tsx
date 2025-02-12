import { Metadata } from 'next'
import { ReactNode } from 'react'
import AuthLayoutWrapper from 'src/hoc/AuthLayoutWrapper'
import { getAllPackages } from 'src/services/packages'
import { TPackage } from 'src/types/package'

// layouts
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import PackagePage from 'src/views/pages/packages'

interface Props {
  params: { packageId: string }
}

// const getPackages = async (search: string) => {
//   try {
//     let packages: TPackage = {
//       _id: '',
//       slug: '',
//       name: '',
//       nameEn: '',
//       nameKo: '',
//       nameJp: '',
//       image: '',
//       description: '',
//       descriptionKo: '',
//       descriptionJp: '',
//       descriptionEn: '',
//       services: []
//     }
//     await getAllPackages({ params: { limit: -1, page: -1, search: search } }).then(res => {
//       packages = res?.data.packages[0]
//     })

//     return {
//       packages
//     }
//   } catch (error) {
//     return {
//       packages: {
//         _id: '',
//         slug: '',
//         name: '',
//         nameEn: '',
//         nameKo: '',
//         nameJp: '',
//         image: '',
//         description: '',
//         descriptionKo: '',
//         descriptionJp: '',
//         descriptionEn: '',
//         services: []
//       }
//     }
//   }
// }

export default async function Home({ params }: Props) {
  // const { packageId } = params
  // const { packages } = await getPackages(packageId)

  return (
    <AuthLayoutWrapper
      guestGuard={false}
      authGuard={false}
      getLayout={(page: ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>}
    >
      {/* <PackagePage packages={packages} /> */}
      <PackagePage />
    </AuthLayoutWrapper>
  )
}

// Home.title = "Danh sách sản phẩm của cửa hàng Lập trình thật dễ"
export const dynamic = 'force-dynamic'
// export const revalidate = 10
// export const maxDuration = 60

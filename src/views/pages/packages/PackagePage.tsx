'use client'

// ** Next
import 'react-big-calendar/lib/css/react-big-calendar.css'

// ** React

// ** Mui

// ** Redux

// ** Components

// ** Config

// ** Services

// ** Utils
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// calender

import '@schedule-x/theme-default/dist/index.css'
import { useGetListPackages } from 'src/queries/packages'
import ListPackageShow from './components/ListPackageShow'
import Spinner from 'src/components/spinner'

const PackagePage = () => {
  // ** Props
  const { data: allPackages, isFetching } = useGetListPackages(
    { limit: -1, page: -1 },
    {
      select: data => data?.packages,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000 // 5 PHÚT
    }
  )

  return (
    <>
      {isFetching && <Spinner />}
      {allPackages?.length && <ListPackageShow packages={allPackages} />}
    </>
  )
}

export default PackagePage

'use client'

// ** Next
import { NextPage } from 'next'
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
import { TPackage } from 'src/types/package'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
// calender

import '@schedule-x/theme-default/dist/index.css'
import { Box } from '@mui/material'
import Image from 'next/image'
import Packages from 'src/views/layouts/components/HOME/packages'
import { useGetListPackages } from 'src/queries/packages'
import ListPackageShow from './components/ListPackageShow'
import Spinner from 'src/components/spinner'

const ListPackagePage = () => {
  // ** Props
  const { data: allPackages, isPending } = useGetListPackages(
    { limit: -1, page: -1, showImage: true },
    {
      select: data => data?.packages,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000 // 5 PHÚT
    }
  )

  console.log('««««« allPackages »»»»»', allPackages)

  return (
    <>
      {isPending && <Spinner />}
      <ListPackageShow packages={allPackages} />
    </>
  )
}

export default ListPackagePage

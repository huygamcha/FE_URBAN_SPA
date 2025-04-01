'use client'

// ** Next
import { NextPage } from 'next'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { motion } from 'framer-motion'

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
import ControlCalendar from 'src/components/CustomizingCalendar/CustomizingCalendar'
import { Box } from '@mui/material'
import Gallery from 'src/views/layouts/components/HOME/gallery'
import AboutSpa from 'src/views/layouts/components/HOME/about'
import Image from 'next/image'
import Packages from 'src/views/layouts/components/HOME/packages'
import { TParamsFetchAbout } from 'src/types/about'
import { TBanner } from 'src/types/banner'
import { useEffect, useState } from 'react'
import { getAllPackages } from 'src/services/packages'
import Spinner from 'src/components/spinner'
import { useGetListPackages } from 'src/queries/packages'

type TProps = {
  aboutUs: TParamsFetchAbout
  banner: TBanner[]
}

const HomePage: NextPage<TProps> = props => {
  // ** Props
  const { aboutUs, banner } = props
  const { t, i18n } = useTranslation()
  const router = useRouter()

  // const [allPackages, setAllPackages] = useState<TPackage[]>([])

  // useEffect(() => {
  //   const getPackages = async () => {
  //     try {
  //       setLoading(true)
  //       let packages: TPackage[] = []
  //       await getAllPackages({ params: { limit: -1, page: -1 } }).then(res => {
  //         packages = res?.data?.packages
  //         setAllPackages(packages)
  //       })
  //     } catch (error) {
  //       console.log('««««« error »»»»»', error)
  //     }
  //     setLoading(false)
  //   }
  //   getPackages()
  // }, [])

  // ** React query
  const { data: allPackages, isPending } = useGetListPackages(
    { limit: -1, page: -1, showImage: true },
    {
      select: data => data?.packages,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 5 * 60 * 1000
    }
  )

  return (
    <>
      {/* <ChatBotAI /> */}
      {/* <ControlCalendar /> */}
      {allPackages?.length && (
        <>
          {' '}
          <div id='about'></div>
          <Box>
            <Box sx={{ padding: '5%', position: 'relative', zIndex: 1 }}>
              <AboutSpa banner={banner} aboutUs={aboutUs} />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  left: 0,
                  zIndex: 1,
                  fontSize: '0px'
                }}
              >
                <Image width={16} height={9} layout='responsive' alt='image' src='https://cdn.kampa.vn/sen.svg' />
              </Box>
            </Box>
          </Box>
          <Box>
            <Gallery banner={banner} />
          </Box>
          <div id='package'></div>
          <Box sx={{ padding: '5%', position: 'relative', zIndex: 1 }}>
            <Packages packages={allPackages} />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 1,
                fontSize: '0px'
              }}
            >
              <Image width={16} height={9} layout='responsive' alt='image' src='https://cdn.kampa.vn/sen.svg' />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default HomePage

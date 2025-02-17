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

type TProps = {
  packages: TPackage[]
}

const ListPackagePage: NextPage<TProps> = props => {
  // ** Props
  const { packages } = props
  const { t, i18n } = useTranslation()
  const router = useRouter()

  return (
    <>
      {/* {loading && <Spinner />} */}
      <div id='package'></div>
      <Box sx={{ padding: '2% 5%', position: 'relative', zIndex: 1 }}>
        <Packages packages={packages} />
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
  )
}

export default ListPackagePage

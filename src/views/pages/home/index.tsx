'use client'

// ** Next
import { NextPage } from 'next'

// ** React

// ** Mui
import { Box } from '@mui/material'

// ** Redux

// ** Components

// ** Config

// ** Services

// ** Utils
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import AboutSpa from 'src/views/layouts/components/HOME/about'
import Gallery from 'src/views/layouts/components/HOME/gallery'
import { TPackage } from 'src/types/package'
import Packages from 'src/views/layouts/components/HOME/packages'
import Image from 'next/image'

type TProps = {
  packages: TPackage[]
}

const HomePage: NextPage<TProps> = props => {
  // ** Props
  const { packages } = props
  
  return (
    <>
      {/* {loading && <Spinner />} */}
      {/* <ChatBotAI /> */}

      <div id='about'></div>
      <Box>
        <Box sx={{ padding: '5%', position: 'relative', zIndex: 1 }}>
          <AboutSpa />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              left: 0,
              zIndex: 1
            }}
          >
            <Image
              width={16}
              height={9}
              layout='responsive'
              alt='image'
              src='https://cdn.prod.website-files.com/6324b2bcf9793bf1b40b60cf/6515a98d12efd8698e527eb1_partent-01.svg'
            />
          </Box>
        </Box>
      </Box>
      <Box>
        <Gallery />
      </Box>
      <div id='package'></div>
      <Box sx={{ padding: '5%', position: 'relative', zIndex: 1 }}>
        <Packages packages={packages} />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            zIndex: 1
          }}
        >
          <Image
            width={16}
            height={9}
            layout='responsive'
            alt='image'
            src='https://cdn.prod.website-files.com/6324b2bcf9793bf1b40b60cf/6515aa4ad40879fbf1594f50_pattenr%203-01.svg'
          />
        </Box>
      </Box>
    </>
  )
}

export default HomePage

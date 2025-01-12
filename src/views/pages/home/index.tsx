'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Grid, Typography, useTheme, Tab, Tabs, TabsProps } from '@mui/material'

// ** Redux

// ** Components
import Spinner from 'src/components/spinner'
import CustomPagination from 'src/components/custom-pagination'
import CardProduct from 'src/views/pages/product/components/CardProduct'
import FilterProduct from 'src/views/pages/product/components/FilterProduct'
import InputSearch from 'src/components/input-search'
import NoData from 'src/components/no-data'

// ** Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'

// ** Services
import { getAllProductTypes } from 'src/services/product-type'
import { getAllCities } from 'src/services/city'
import { getAllProductsPublic } from 'src/services/product'

// ** Utils
import { formatFilter } from 'src/utils'
import { TProduct } from 'src/types/product'
import { styled } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import toast from 'react-hot-toast'
import { resetInitialState } from 'src/stores/product'
import { OBJECT_TYPE_ERROR_PRODUCT } from 'src/configs/error'
import CustomSelect from 'src/components/custom-select'
import CardSkeleton from 'src/views/pages/product/components/CardSkeleton'
import ChatBotAI from 'src/components/chat-bot-ai'
import { useRouter } from 'next/navigation'
import Slider from 'react-slick'
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
  // ** Translate
  const { t, i18n } = useTranslation()

  // ** Props
  const { packages } = props

  // State

  // ** Ref
  const firstRender = useRef<boolean>(false)
  const isServerRendered = useRef<boolean>(false)

  // ** Redux
  const {
    isSuccessLike,
    isErrorLike,
    isErrorUnLike,
    typeError,
    isSuccessUnLike,
    messageErrorLike,
    messageErrorUnLike,
    isLoading
  } = useSelector((state: RootState) => state.product)
  const dispatch: AppDispatch = useDispatch()

  // ** theme
  const theme = useTheme()
  const router = useRouter()

  // fetch api
  // ** fetch api

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

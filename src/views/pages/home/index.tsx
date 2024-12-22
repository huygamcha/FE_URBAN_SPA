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

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}
interface TOptions {
  label: string
  value: string
}

type TProps = {
  products: TProduct[]
  totalCount: number
  productTypesServer: TOptions[]
  paramsServer: {
    limit: number
    page: number
    order: string
    productType: string
  }
}

interface TProductPublicState {
  data: TProduct[]
  total: number
}

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
  '&.MuiTabs-root': {
    borderBottom: 'none'
  }
}))

const HomePage: NextPage<TProps> = props => {
  // ** Translate
  const { t } = useTranslation()

  // ** Props
  const { products, totalCount, paramsServer, productTypesServer } = props

  // State
  const [sortBy, setSortBy] = useState('createdAt desc')
  const [searchBy, setSearchBy] = useState('')
  const [productTypeSelected, setProductTypeSelected] = useState('')
  const [reviewSelected, setReviewSelected] = useState('')
  const [locationSelected, setLocationSelected] = useState('')

  const [optionCities, setOptionCities] = useState<{ label: string; value: string }[]>([])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (!firstRender.current) {
      firstRender.current = true
    }
    setProductTypeSelected(newValue)
  }

  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [optionTypes, setOptionTypes] = useState<{ label: string; value: string }[]>([])
  const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({})
  const [loading, setLoading] = useState(false)
  const [productsPublic, setProductsPublic] = useState<TProductPublicState>({
    data: [],
    total: 0
  })

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
  const handleGetListProducts = async () => {
    setLoading(true)
    const query = {
      params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
    }
    await getAllProductsPublic(query).then(res => {
      if (res?.data) {
        setLoading(false)
        setProductsPublic({
          data: res?.data?.products,
          total: res?.data?.totalCount
        })
      }
    })
  }

  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
    if (!firstRender.current) {
      firstRender.current = true
    }
  }

  const handleFilterProduct = (value: string, type: string) => {
    switch (type) {
      case 'review': {
        setReviewSelected(value)
        if (!firstRender.current) {
          firstRender.current = true
        }
        break
      }
      case 'location': {
        setLocationSelected(value)
        if (!firstRender.current) {
          firstRender.current = true
        }
        break
      }
    }
  }

  const handleResetFilter = () => {
    setLocationSelected('')
    setReviewSelected('')
  }

  // ** fetch api

  const fetchAllCities = async () => {
    setLoading(true)
    await getAllCities({ params: { limit: -1, page: -1 } })
      .then(res => {
        const data = res?.data.cities
        if (data) {
          setOptionCities(data?.map((item: { name: string; _id: string }) => ({ label: item.name, value: item._id })))
        }
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchAllCities()
  }, [])

  useEffect(() => {
    if (!isServerRendered.current && paramsServer && totalCount && !!products.length && !!productTypesServer.length) {
      setPage(paramsServer.page)
      setPageSize(paramsServer.limit)
      setSortBy(paramsServer.order)
      if (paramsServer.productType) {
        setProductTypeSelected(paramsServer.productType)
      }
      setProductsPublic({
        data: products,
        total: totalCount
      })
      setOptionTypes(productTypesServer)
      isServerRendered.current = true
    }
  }, [paramsServer, products, totalCount, productTypesServer])

  useEffect(() => {
    if (isServerRendered.current && firstRender.current) {
      handleGetListProducts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize, filterBy])

  useEffect(() => {
    if (isServerRendered.current && firstRender.current) {
      setFilterBy({ productType: productTypeSelected, minStar: reviewSelected, productLocation: locationSelected })
    }
  }, [productTypeSelected, reviewSelected, locationSelected])

  useEffect(() => {
    if (isSuccessLike) {
      toast.success(t('Like_product_success'))
      handleGetListProducts()
      dispatch(resetInitialState())
    } else if (isErrorLike && messageErrorLike && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_PRODUCT[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        toast.error(t('Like_product_error'))
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessLike, isErrorLike, messageErrorLike, typeError])

  useEffect(() => {
    if (isSuccessUnLike) {
      toast.success(t('Unlike_product_success'))
      dispatch(resetInitialState())
      handleGetListProducts()
    } else if (isErrorUnLike && messageErrorUnLike && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_PRODUCT[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        toast.error(t('Unlike_product_error'))
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUnLike, isErrorUnLike, messageErrorUnLike, typeError])

  return (
    <>
      {loading && <Spinner />}
      {/* <ChatBotAI /> */}

      <Box>
        <Gallery /> 
      </Box>
      <Box sx={{ padding: '5%' }}>
        <AboutSpa />
      </Box>
    </>
  )
}

export default HomePage

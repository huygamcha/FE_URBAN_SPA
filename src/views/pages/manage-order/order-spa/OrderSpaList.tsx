'use client'
// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Chip, ChipProps, Grid, Typography, styled, useTheme } from '@mui/material'
import { GridColDef, GridSortModel } from '@mui/x-data-grid'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/order-spa'
// import {
//   deleteOrderSpaAsync,
//   getAllOrderSpasAsync,
//   updateStatusOrderSpaAsync
// } from 'src/stores/order-product/actions'

// ** Components
import GridDelete from 'src/components/grid-delete'
import GridEdit from 'src/components/grid-edit'
import InputSearch from 'src/components/input-search'
import CustomDataGrid from 'src/components/custom-data-grid'
import Spinner from 'src/components/spinner'
import CustomPagination from 'src/components/custom-pagination'
import CustomSelect from 'src/components/custom-select'
// import EditOrderSpa from 'src/views/pages/manage-order/order-product/components/EditOrderSpa'
// ** Others
import toast from 'react-hot-toast'
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/error'
import { formatFilter } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** Hooks
import { usePermission } from 'src/hooks/usePermission'

// ** Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'

// ** Services
import { getAllCities } from 'src/services/city'

// ** Types
import { TParamsStatusOrderUpdate } from 'src/types/order-product'
import { getCountOrderStatus } from 'src/services/report'
import { deleteOrderSpaAsync, getAllOrderSpasAsync } from 'src/stores/order-spa/actions'
import { STATUS_ORDER_SPA } from 'src/configs/orderSpa'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import MoreButton from './components/MoreButton'
import EditOrderSpa from './components/EditOrderSpa'
import ConfirmationDialog from 'src/components/confirmation-dialog'

dayjs.extend(utc)

type TProps = {}

interface StatusOrderChipT extends ChipProps {
  background: string
}

const OrderStatusStyled = styled(Chip)<StatusOrderChipT>(({ theme, background }) => ({
  backgroundColor: background,
  color: theme.palette.common.white,
  fontSize: '14px',
  padding: '8px 4px',
  fontWeight: 400
}))

const OrderSpaListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()

  // State

  const [openEdit, setOpenEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteOrder, setOpenDeleteOrder] = useState({
    open: false,
    id: ''
  })
  const [sortBy, setSortBy] = useState('createdAt desc')
  const [searchBy, setSearchBy] = useState('')
  const [optionCities, setOptionCities] = useState<{ label: string; value: string }[]>([])
  const [citySelected, setCitySelected] = useState<string[]>([])
  const [statusSelected, setStatusSelected] = useState<string[]>([])

  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({})
  const [countOrderStatus, setCountOrderStatus] = useState<{
    data: Record<number, number>
    total: number
  }>({} as any)

  const isRendered = useRef<boolean>(false)

  // ** Hooks
  const { VIEW, UPDATE, DELETE } = usePermission('SYSTEM.MANAGE_ORDER.ORDER', ['CREATE', 'VIEW', 'UPDATE', 'DELETE'])
  const { i18n } = useTranslation()

  /// ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    orderSpas,
    isSuccessEdit,
    isErrorEdit,
    isLoading,
    messageErrorEdit,
    isErrorDelete,
    isSuccessDelete,
    messageErrorDelete,
    typeError
  } = useSelector((state: RootState) => state.orderSpa)

  // ** theme
  const theme = useTheme()

  const STATUS_ORDER_SPA_STYLE = {
    Pending: {
      label: 'Chờ khách hàng',
      background: theme.palette.warning.main
    },
    Completed: {
      label: 'Đã thanh toán',
      background: theme.palette.success.main
    },
    Cancelled: {
      label: 'Huỷ đơn',
      background: theme.palette.secondary.main
    }
  }

  // fetch api
  const handleGetListOrderSpas = () => {
    const query = {
      params: { limit: pageSize, page: page, search: searchBy, order: sortBy, ...formatFilter(filterBy) }
    }
    dispatch(getAllOrderSpasAsync(query))
  }

  // handle
  const handleCloseConfirmDeleteOrder = () => {
    setOpenDeleteOrder({
      open: false,
      id: ''
    })
  }

  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0]
    if (sortOption) {
      setSortBy(`${sortOption.field} ${sortOption.sort}`)
    } else {
      setSortBy('createdAt desc')
    }
  }

  const handleCloseEdit = () => {
    setOpenEdit({
      open: false,
      id: ''
    })
  }

  const handleUpdateStatusOrder = (data: TParamsStatusOrderUpdate) => {
    // dispatch(updateStatusOrderSpaAsync(data))
  }

  const handleDeleteOrderSpa = () => {
    dispatch(deleteOrderSpaAsync(openDeleteOrder.id))
  }

  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('name'),
      hideSortIcons: true,
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.name}</Typography>
      }
    },
    {
      field: 'phoneNumber',
      headerName: t('Phone_number'),
      minWidth: 150,
      maxWidth: 150,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.phoneNumber}</Typography>
      }
    },
    {
      field: 'appointmentDate',
      headerName: t('Pickup_time'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{dayjs(row?.appointmentDate).utc().format('HH:mm, DD/MM/YYYY')}</Typography>
      }
    },

    {
      field: 'quantity',
      headerName: t('Quantity_quest'),
      minWidth: 150,
      maxWidth: 150,
      renderCell: params => {
        const { row } = params

        return <Typography>{row.quantity}</Typography>
      }
    },

    {
      field: 'email',
      headerName: t('email'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row.email}</Typography>
      }
    },
    {
      field: 'totalPrice',
      headerName: t('Total_price'),
      minWidth: 200,
      maxWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row.totalPrice}</Typography>
      }
    },

    {
      field: 'status',
      headerName: t('Status'),
      minWidth: 180,
      maxWidth: 180,
      renderCell: params => {
        const { row } = params

        return (
          <>
            {
              <OrderStatusStyled
                background={(STATUS_ORDER_SPA_STYLE as any)[row.status]?.background}
                label={t((STATUS_ORDER_SPA_STYLE as any)[row.status]?.label)}
              />
            }
          </>
        )
      }
    },

    {
      field: 'action',
      headerName: t('Actions'),
      minWidth: 180,
      sortable: false,
      align: 'left',
      renderCell: params => {
        const { row } = params

        return (
          <>
            <GridEdit
              disabled={!UPDATE}
              onClick={() =>
                setOpenEdit({
                  open: true,
                  id: String(params.id)
                })
              }
            />
            <GridDelete
              disabled={!DELETE}
              onClick={() =>
                setOpenDeleteOrder({
                  open: true,
                  id: String(params.id)
                })
              }
            />
            <MoreButton data={row} memoOptionStatus={memoOptionStatus} />
          </>
        )
      }
    }
  ]

  const PaginationComponent = () => {
    return (
      <CustomPagination
        onChangePagination={handleOnchangePagination}
        pageSizeOptions={PAGE_SIZE_OPTION}
        pageSize={pageSize}
        page={page}
        rowLength={orderSpas.total}
      />
    )
  }

  // fetch api
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

  const fetchAllCountStatusOrder = async () => {
    setLoading(true)
    await getCountOrderStatus()
      .then(res => {
        const data = res?.data
        setLoading(false)
        setCountOrderStatus({
          data: data?.data,
          total: data?.total
        })
      })
      .catch(e => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (isRendered.current) {
      setFilterBy({ status: statusSelected })
    }
  }, [statusSelected, citySelected])

  useEffect(() => {
    fetchAllCities()
    fetchAllCountStatusOrder()
    isRendered.current = true
  }, [])

  useEffect(() => {
    if (isRendered.current) {
      handleGetListOrderSpas()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, i18n.language, page, pageSize, filterBy])

  useEffect(() => {
    if (isSuccessEdit) {
      toast.success(t('Update_order_product_success'))
      handleGetListOrderSpas()
      handleCloseEdit()
      dispatch(resetInitialState())
    } else if (isErrorEdit && messageErrorEdit && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        toast.error(t('Update_order_product_error'))
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessEdit, isErrorEdit, messageErrorEdit, typeError])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('Delete_order_product_success'))
      handleGetListOrderSpas()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteOrder()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t('Delete_order_product_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  const memoOptionStatus = useMemo(() => {
    return Object.values(STATUS_ORDER_SPA).map(item => ({
      label: t(item.label),
      value: item.value
    }))
  }, [])

  // const dataListOrderStatus = [
  //   {
  //     icon: 'lets-icons:order-light',
  //     status: 4
  //   },
  //   {
  //     icon: 'ic:twotone-payment',
  //     status: STATUS_ORDER_PRODUCT[0].value
  //   },
  //   {
  //     status: STATUS_ORDER_PRODUCT[1].value,
  //     icon: 'carbon:delivery'
  //   },
  //   {
  //     icon: 'ic:baseline-done-all',
  //     iconSize: '18',
  //     status: STATUS_ORDER_PRODUCT[2].value
  //   },
  //   {
  //     icon: 'line-md:cancel',
  //     status: STATUS_ORDER_PRODUCT[3].value
  //   }
  // ]

  return (
    <>
      {loading && <Spinner />}
      <ConfirmationDialog
        open={openDeleteOrder.open}
        handleClose={handleCloseConfirmDeleteOrder}
        handleCancel={handleCloseConfirmDeleteOrder}
        handleConfirm={handleDeleteOrderSpa}
        title={t('Title_delete_order_product')}
        description={t('Confirm_delete_order_product')}
      />

      {/* 
      
      {isLoading && <Spinner />}
      <Box sx={{ backgroundColor: 'inherit', width: '100%', mb: 4 }}>
        <Grid container spacing={6} sx={{ height: '100%' }}>
          {dataListOrderStatus?.map((item: any, index: number) => {
            return (
              <Grid item xs={12} md={3} sm={6} key={index}>
                <CardCountStatusOrder {...item} countStatusOrder={countOrderStatus} />
              </Grid>
            )
          })}
        </Grid>
      </Box> */}
      <EditOrderSpa open={openEdit.open} onClose={handleCloseEdit} idOrder={openEdit.id} />

      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          height: '100%',
          width: '100%',
          borderRadius: '15px'
        }}
      >
        <Grid container sx={{ height: '100%', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, mb: 4, width: '100%' }}>
            {/* <Box sx={{ width: '200px' }}>
              <CustomSelect
                fullWidth
                onChange={e => {
                  setCitySelected(e.target.value as string[])
                }}
                multiple
                options={optionCities}
                value={citySelected}
                placeholder={t('City')}
              />
            </Box> */}
            <Box sx={{ width: '200px' }}>
              <CustomSelect
                fullWidth
                onChange={e => {
                  setStatusSelected(e.target.value as string[])
                }}
                multiple
                options={memoOptionStatus}
                value={statusSelected}
                placeholder={t('Status')}
              />
            </Box>
            <Box sx={{ width: '200px' }}>
              <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
            </Box>
          </Box>
          <CustomDataGrid
            rows={orderSpas.data}
            columns={columns}
            autoHeight
            sx={{
              '.row-selected': {
                backgroundColor: `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                color: `${theme.palette.primary.main} !important`
              }
            }}
            sortingOrder={['desc', 'asc']}
            sortingMode='server'
            onSortModelChange={handleSort}
            getRowId={row => row._id}
            disableRowSelectionOnClick
            slots={{
              pagination: PaginationComponent
            }}
            disableColumnFilter
          />
        </Grid>
      </Box>
    </>
  )
}

export default OrderSpaListPage

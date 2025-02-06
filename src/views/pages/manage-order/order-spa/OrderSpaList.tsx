/* eslint-disable react-hooks/exhaustive-deps */
'use client'
// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Chip, ChipProps, Grid, Typography, styled, useTheme } from '@mui/material'
import { GridColDef, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'

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
import { deleteMultipleOrderSpaAsync, deleteOrderSpaAsync, getAllOrderSpasAsync } from 'src/stores/order-spa/actions'
import { STATUS_ORDER_SPA } from 'src/configs/orderSpa'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import MoreButton from './components/MoreButton'
import EditOrderSpa from './components/EditOrderSpa'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import GridCreate from 'src/components/grid-create'
import TableHeader from 'src/components/table-header'
import { deleteMultipleOrderSpa } from 'src/services/order-spa'

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
  const [statusSelected, setStatusSelected] = useState<string[]>([])
  const [openDeleteMultipleOrder, setOpenDeleteMultipleOrder] = useState(false)

  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [filterBy, setFilterBy] = useState<Record<string, string | string[]>>({})

  const [selectedRow, setSelectedRow] = useState<string[]>([])

  // ** Hooks
  const { VIEW, UPDATE, DELETE, CREATE } = usePermission('SYSTEM.MANAGE_ORDER.ORDER', [
    'CREATE',
    'VIEW',
    'UPDATE',
    'DELETE'
  ])
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
    typeError,
    isSuccessMultipleDelete,
    isErrorMultipleDelete,
    messageErrorMultipleDelete,
    isSuccessUpdateStatus,
    isErrorUpdateStatus,
    messageErrorUpdateStatus
  } = useSelector((state: RootState) => state.orderSpa)

  // ** theme
  const theme = useTheme()

  const STATUS_ORDER_SPA_STYLE = {
    Pending: {
      label: 'Pending',
      background: theme.palette.warning.main
    },
    Completed: {
      label: 'Completed',
      background: theme.palette.success.main
    },
    Cancelled: {
      label: 'Cancelled',
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

  const handleCloseConfirmDeleteMultipleOrder = () => {
    setOpenDeleteMultipleOrder(false)
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

  const handleDeleteOrderSpa = () => {
    dispatch(deleteOrderSpaAsync(openDeleteOrder.id))
  }

  const handleDeleteMultipleOrder = () => {
    dispatch(
      deleteMultipleOrderSpaAsync({
        appointmentIds: selectedRow
      })
    )
  }

  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }
  const handleAction = (action: string) => {
    switch (action) {
      case 'delete': {
        setOpenDeleteMultipleOrder(true)
        break
      }
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name'),
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

  useEffect(() => {
    setFilterBy({ status: statusSelected })
  }, [statusSelected])

  useEffect(() => {
    handleGetListOrderSpas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, i18n.language, page, pageSize, filterBy])

  useEffect(() => {
    if (isSuccessEdit) {
      if (!openEdit.id) {
        toast.success(t('Create_order_success'))
      } else {
        toast.success(t('Update_successfully'))
      }
      handleGetListOrderSpas()
      handleCloseEdit()
      setSelectedRow([])
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
    console.log('««««« 123 »»»»»', 123)
    if (isSuccessUpdateStatus) {
      toast.success(t('Update_order_product_success'))
      handleGetListOrderSpas()
      dispatch(resetInitialState())
    } else if (isErrorUpdateStatus && messageErrorUpdateStatus) {
      toast.error(t('Update_order_product_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessUpdateStatus, isErrorUpdateStatus, messageErrorUpdateStatus])

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

  useEffect(() => {
    if (isSuccessMultipleDelete) {
      toast.success(t('Delete_multiple_order_success'))
      handleGetListOrderSpas()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteMultipleOrder()
      setSelectedRow([])
    } else if (isErrorMultipleDelete && messageErrorMultipleDelete) {
      toast.error(t('Delete_multiple_order_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessMultipleDelete, isErrorMultipleDelete, messageErrorMultipleDelete])

  const memoOptionStatus = useMemo(() => {
    return Object.values(STATUS_ORDER_SPA).map(item => ({
      label: t(item.label),
      value: item.value
    }))
  }, [])

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

      <ConfirmationDialog
        open={openDeleteMultipleOrder}
        handleClose={handleCloseConfirmDeleteMultipleOrder}
        handleCancel={handleCloseConfirmDeleteMultipleOrder}
        handleConfirm={handleDeleteMultipleOrder}
        title={t('Title_delete_multiple_Order')}
        description={t('Confirm_delete_multiple_Order')}
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
            <GridCreate
              disabled={!CREATE}
              onClick={() => {
                setOpenEdit({
                  open: true,
                  id: ''
                })
              }}
            />
          </Box>

          {selectedRow?.length > 0 && (
            <TableHeader
              numRow={selectedRow?.length}
              onClear={() => setSelectedRow([])}
              handleAction={handleAction}
              actions={[{ label: t('Xóa'), value: 'delete', disabled: !DELETE }]}
            />
          )}

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
            checkboxSelection
            sortingOrder={['desc', 'asc']}
            sortingMode='server'
            onSortModelChange={handleSort}
            getRowId={row => row._id}
            disableRowSelectionOnClick
            slots={{
              pagination: PaginationComponent
            }}
            disableColumnFilter
            onRowSelectionModelChange={(row: GridRowSelectionModel) => {
              setSelectedRow(row as string[])
            }}
          />
        </Grid>
      </Box>
    </>
  )
}

export default OrderSpaListPage

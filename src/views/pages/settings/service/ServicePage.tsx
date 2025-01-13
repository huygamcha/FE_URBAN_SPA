'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Grid, Typography, useTheme } from '@mui/material'
import { GridColDef, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'

// ** Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'

// ** Components
import GridDelete from 'src/components/grid-delete'
import GridEdit from 'src/components/grid-edit'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CustomDataGrid from 'src/components/custom-data-grid'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import CustomPagination from 'src/components/custom-pagination'
import TableHeader from 'src/components/table-header'

// ** Others
import toast from 'react-hot-toast'
import { OBJECT_TYPE_ERROR_CITY } from 'src/configs/error'

// ** Hooks
import { usePermission } from 'src/hooks/usePermission'

// ** Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'

// ** Utils
import { formatDate } from 'src/utils/date'
import { hexToRGBA } from 'src/utils/hex-to-rgba'
import { deleteMultipleServiceAsync, deleteServiceAsync, getAllServicesAsync } from 'src/stores/service/actions'
import CreateEditService from './component/CreateEditService'
import { resetInitialState } from 'src/stores/service'

type TProps = {}

const ServiceListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()

  // State

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteService, setOpenDeleteService] = useState({
    open: false,
    id: ''
  })
  const [openDeleteMultipleService, setOpenDeleteMultipleService] = useState(false)
  const [sortBy, setSortBy] = useState('createdAt desc')
  const [searchBy, setSearchBy] = useState('')

  const [loading, setLoading] = useState(false)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)
  const [selectedRow, setSelectedRow] = useState<string[]>([])

  // ** Hooks
  const { VIEW, UPDATE, DELETE, CREATE } = usePermission('SETTING.CITY', ['CREATE', 'VIEW', 'UPDATE', 'DELETE'])

  /// ** redux
  const dispatch: AppDispatch = useDispatch()
  const {
    services,
    isSuccessCreateEdit,
    isErrorCreateEdit,
    isLoading,
    messageErrorCreateEdit,
    isErrorDelete,
    isSuccessDelete,
    messageErrorDelete,
    typeError,
    isSuccessMultipleDelete,
    isErrorMultipleDelete,
    messageErrorMultipleDelete
  } = useSelector((state: RootState) => state.services)

  // ** theme
  const theme = useTheme()

  // fetch api
  const handleGetListServices = () => {
    const query = { params: { limit: pageSize, page: page, search: searchBy, order: sortBy } }
    dispatch(getAllServicesAsync(query))
  }

  // handle
  const handleCloseConfirmDeleteService = () => {
    setOpenDeleteService({
      open: false,
      id: ''
    })
  }

  const handleCloseConfirmDeleteMultipleService = () => {
    setOpenDeleteMultipleService(false)
  }

  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0]
    if (sortOption) {
      setSortBy(`${sortOption.field} ${sortOption.sort}`)
    } else {
      setSortBy('createdAt desc')
    }
  }

  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({
      open: false,
      id: ''
    })
  }

  const handleDeleteService = () => {
    dispatch(deleteServiceAsync(openDeleteService.id))
  }

  const handleDeleteMultipleService = () => {
    dispatch(
      deleteMultipleServiceAsync({
        serviceIds: selectedRow
      })
    )
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'delete': {
        setOpenDeleteMultipleService(true)
        break
      }
    }
  }

  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  const columns: GridColDef[] = [
    {
      field: 'packageId',
      headerName: t('Category'),
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.packageId?.name}</Typography>
      }
    },
    {
      field: 'name',
      headerName: t('Name'),
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.name}</Typography>
      }
    },
    {
      field: 'nameKo',
      headerName: t('Name_Korean'),
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.nameKo}</Typography>
      }
    },
    {
      field: 'nameEn',
      headerName: t('Name_English'),
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.nameEn}</Typography>
      }
    },
    {
      field: 'nameJp',
      headerName: t('Name_Japanese'),
      flex: 1,
      minWidth: 200,
      renderCell: params => {
        const { row } = params

        return <Typography>{row?.nameJp}</Typography>
      }
    },

    {
      field: 'action',
      headerName: t('Actions'),
      minWidth: 150,
      sortable: false,
      align: 'left',
      renderCell: params => {
        const { row } = params

        return (
          <>
            <GridEdit
              disabled={!UPDATE}
              onClick={() =>
                setOpenCreateEdit({
                  open: true,
                  id: String(params.id)
                })
              }
            />
            <GridDelete
              disabled={!DELETE}
              onClick={() =>
                setOpenDeleteService({
                  open: true,
                  id: String(params.id)
                })
              }
            />
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
        rowLength={services.total}
      />
    )
  }

  useEffect(() => {
    handleGetListServices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize])

  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (!openCreateEdit.id) {
        toast.success(t('Create_service_success'))
      } else {
        toast.success(t('Update_service_success'))
      }
      handleGetListServices()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_CITY[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        if (openCreateEdit.id) {
          toast.error(t('Update_service_error'))
        } else {
          toast.error(t('Create_service_error'))
        }
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit, typeError])

  useEffect(() => {
    if (isSuccessMultipleDelete) {
      toast.success(t('Delete_multiple_service_success'))
      handleGetListServices()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteMultipleService()
      setSelectedRow([])
    } else if (isErrorMultipleDelete && messageErrorMultipleDelete) {
      toast.error(t('Delete_multiple_service_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessMultipleDelete, isErrorMultipleDelete, messageErrorMultipleDelete])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('Delete_service_success'))
      handleGetListServices()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteService()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t('Delete_service_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  return (
    <>
      {loading && <Spinner />}
      <ConfirmationDialog
        open={openDeleteService.open}
        handleClose={handleCloseConfirmDeleteService}
        handleCancel={handleCloseConfirmDeleteService}
        handleConfirm={handleDeleteService}
        title={t('Title_delete_service')}
        description={t('Confirm_delete_service')}
      />
      <ConfirmationDialog
        open={openDeleteMultipleService}
        handleClose={handleCloseConfirmDeleteMultipleService}
        handleCancel={handleCloseConfirmDeleteMultipleService}
        handleConfirm={handleDeleteMultipleService}
        title={t('Title_delete_multiple_service')}
        description={t('Confirm_delete_multiple_service')}
      />
      <CreateEditService open={openCreateEdit.open} onClose={handleCloseCreateEdit} idService={openCreateEdit.id} />
      {isLoading && <Spinner />}
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
          {!selectedRow?.length && (
            <Box
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, mb: 4, width: '100%' }}
            >
              <Box sx={{ width: '200px' }}>
                <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} />
              </Box>
              <GridCreate
                disabled={!CREATE}
                onClick={() => {
                  setOpenCreateEdit({
                    open: true,
                    id: ''
                  })
                }}
              />
            </Box>
          )}
          {selectedRow?.length > 0 && (
            <TableHeader
              numRow={selectedRow?.length}
              onClear={() => setSelectedRow([])}
              handleAction={handleAction}
              actions={[{ label: t('Xóa'), value: 'delete', disabled: !DELETE }]}
            />
          )}
          <CustomDataGrid
            rows={services.data}
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
            rowSelectionModel={selectedRow}
            onRowSelectionModelChange={(row: GridRowSelectionModel) => {
              setSelectedRow(row as string[])
            }}
            disableColumnFilter
          />
        </Grid>
      </Box>
    </>
  )
}

export default ServiceListPage

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
import { deleteBannerAsync, deleteMultipleBannerAsync, getAllBannersAsync } from 'src/stores/banner/actions'
import { resetInitialState } from 'src/stores/banner'

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
import CreateEditBanner from 'src/views/pages/settings/banner/component/CreateEditBanner'

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
import Image from 'next/image'
import CreateBanner from './component/CreateBanner'

type TProps = {}

const BannerListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()

  // State

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteBanner, setOpenDeleteBanner] = useState({
    open: false,
    id: ''
  })
  const [openDeleteMultipleBanner, setOpenDeleteMultipleBanner] = useState(false)
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
    banners,
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
  } = useSelector((state: RootState) => state.banners)

  // ** theme
  const theme = useTheme()

  // fetch api
  const handleGetListBanners = () => {
    const query = { params: { limit: pageSize, page: page, search: searchBy, order: sortBy } }
    dispatch(getAllBannersAsync(query))
  }

  // handle
  const handleCloseConfirmDeleteBanner = () => {
    setOpenDeleteBanner({
      open: false,
      id: ''
    })
  }

  const handleCloseConfirmDeleteMultipleBanner = () => {
    setOpenDeleteMultipleBanner(false)
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

  const handleDeleteBanner = () => {
    dispatch(deleteBannerAsync(openDeleteBanner.id))
  }

  const handleDeleteMultipleBanner = () => {
    dispatch(
      deleteMultipleBannerAsync({
        bannerIds: selectedRow
      })
    )
  }

  const handleAction = (action: string) => {
    switch (action) {
      case 'delete': {
        setOpenDeleteMultipleBanner(true)
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
      field: 'image',
      headerName: t('Image'),
      minWidth: 200,
      flex: 1,
      renderCell: params => {
        const { row } = params

        // return <Typography>{row?.image}</Typography>
        return <Image src={row?.link} layout='responsive' width={16} height={9} alt='image' />
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
                setOpenDeleteBanner({
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
        rowLength={banners.total}
      />
    )
  }

  useEffect(() => {
    handleGetListBanners()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, searchBy, page, pageSize])

  useEffect(() => {
    if (isSuccessCreateEdit) {
      if (!openCreateEdit.id) {
        toast.success(t('Create_banner_success'))
      } else {
        toast.success(t('Update_banner_success'))
      }
      handleGetListBanners()
      handleCloseCreateEdit()
      dispatch(resetInitialState())
    } else if (isErrorCreateEdit && messageErrorCreateEdit && typeError) {
      const errorConfig = OBJECT_TYPE_ERROR_CITY[typeError]
      if (errorConfig) {
        toast.error(t(errorConfig))
      } else {
        if (openCreateEdit.id) {
          toast.error(t('Update_banner_error'))
        } else {
          toast.error(t('Create_banner_error'))
        }
      }
      dispatch(resetInitialState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit, typeError])

  useEffect(() => {
    if (isSuccessMultipleDelete) {
      toast.success(t('Delete_banner_success'))
      handleGetListBanners()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteMultipleBanner()
      setSelectedRow([])
    } else if (isErrorMultipleDelete && messageErrorMultipleDelete) {
      toast.error(t('Delete_banner_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessMultipleDelete, isErrorMultipleDelete, messageErrorMultipleDelete])

  useEffect(() => {
    if (isSuccessDelete) {
      toast.success(t('Delete_banner_success'))
      handleGetListBanners()
      dispatch(resetInitialState())
      handleCloseConfirmDeleteBanner()
    } else if (isErrorDelete && messageErrorDelete) {
      toast.error(t('Delete_banner_error'))
      dispatch(resetInitialState())
    }
  }, [isSuccessDelete, isErrorDelete, messageErrorDelete])

  return (
    <>
      {loading && <Spinner />}
      <ConfirmationDialog
        open={openDeleteBanner.open}
        handleClose={handleCloseConfirmDeleteBanner}
        handleCancel={handleCloseConfirmDeleteBanner}
        handleConfirm={handleDeleteBanner}
        title={t('Title_delete_banner')}
        description={t('Confirm_delete_banner')}
      />
      <ConfirmationDialog
        open={openDeleteMultipleBanner}
        handleClose={handleCloseConfirmDeleteMultipleBanner}
        handleCancel={handleCloseConfirmDeleteMultipleBanner}
        handleConfirm={handleDeleteMultipleBanner}
        title={t('Title_delete_multiple_banner')}
        description={t('Confirm_delete_multiple_banner')}
      />

      {openCreateEdit.id ? (
        <CreateEditBanner open={openCreateEdit.open} onClose={handleCloseCreateEdit} idBanner={openCreateEdit.id} />
      ) : (
        <CreateBanner open={openCreateEdit.open} onClose={handleCloseCreateEdit} idBanner={openCreateEdit.id} />
      )}
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
            rows={banners.data}
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

export default BannerListPage

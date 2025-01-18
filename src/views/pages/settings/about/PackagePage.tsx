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
import { deletePackageAsync, deleteMultiplePackageAsync, getAllPackagesAsync } from 'src/stores/package/actions'
import { resetInitialState } from 'src/stores/package'

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
import CreateEditPackage from 'src/views/pages/settings/package/component/CreateEditPackage'

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
import CreateEditAbout from './component/CreateEditPackage'

type TProps = {}

const AboutListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()

  // State

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: true,
    id: '6788bd95f809cf516d23119c'
  })

  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({
      open: false,
      id: ''
    })
  }
  // ** Hooks
  const { VIEW, UPDATE, DELETE, CREATE } = usePermission('SETTING.CITY', ['CREATE', 'VIEW', 'UPDATE', 'DELETE'])

  // ** theme
  const theme = useTheme()

  return (
    <>
      <CreateEditAbout open={openCreateEdit.open} onClose={handleCloseCreateEdit} idAbout={openCreateEdit.id} />

      {/* <ConfirmationDialog
        open={openDeletePackage.open}
        handleClose={handleCloseConfirmDeletePackage}
        handleCancel={handleCloseConfirmDeletePackage}
        handleConfirm={handleDeletePackage}
        title={t('Title_delete_package')}
        description={t('Confirm_delete_package')}
      />
      <ConfirmationDialog
        open={openDeleteMultiplePackage}
        handleClose={handleCloseConfirmDeleteMultiplePackage}
        handleCancel={handleCloseConfirmDeleteMultiplePackage}
        handleConfirm={handleDeleteMultiplePackage}
        title={t('Title_delete_multiple_package')}
        description={t('Confirm_delete_multiple_package')}
      />
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
            rows={packages.data}
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
      </Box> */}
    </>
  )
}

export default AboutListPage

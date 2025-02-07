'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { useTheme } from '@mui/material'

// ** Redux

// ** Components

// ** Others

// ** Hooks
import { usePermission } from 'src/hooks/usePermission'

// ** Config

// ** Utils
import CreateEditAbout from './component/CreateEditPackage'

type TProps = {}

const AboutListPage: NextPage<TProps> = () => {
  // ** Translate
  const { t } = useTranslation()

  // State

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: true,
    id: '678f33bca37abbb25c8d15f9'
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
              actions={[{ label: t('Delete'), value: 'delete', disabled: !DELETE }]}
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

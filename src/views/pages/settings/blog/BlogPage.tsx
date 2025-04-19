'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ** Mui
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import { GridColDef, GridRowClassNameParams, GridRowSelectionModel, GridSortModel } from '@mui/x-data-grid'

// ** Components
import GridDelete from 'src/components/grid-delete'
import GridEdit from 'src/components/grid-edit'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
// import CreateEditBlog from 'src/views/pages/system/blog/component/CreateEditBlog'
import CustomDataGrid from 'src/components/custom-data-grid'
import Spinner from 'src/components/spinner'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import Icon from 'src/components/Icon'

// ** Others
import toast from 'react-hot-toast'
import { PERMISSIONS } from 'src/configs/permission'
import { getAllValueOfObject } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** Hooks
import { usePermission } from 'src/hooks/usePermission'
import { useMutation, useMutationState, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from 'src/configs/queryKey'
import TableHeader from 'src/components/table-header'
import CustomPagination from 'src/components/custom-pagination'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import CreateEditRole from '../../system/role/component/CreateEditRole'
import { deleteBlog, deleteMultipleBlog } from 'src/services/blog'
import { useGetListBlogs, useMutationEditBlog } from 'src/queries/blog'
import CreateEditBlog from './components/CreateEditBlog'

type TProps = {}

const BlogListPage: NextPage<TProps> = () => {
  // State

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: false,
    id: ''
  })
  const [openDeleteBlog, setOpenDeleteBlog] = useState({
    open: false,
    id: ''
  })
  const [sortBy, setSortBy] = useState('created asc')
  const [searchBy, setSearchBy] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
  const [page, setPage] = useState(1)

  const [openDeleteMultipleBlog, setOpenDeleteMultipleBlog] = useState(false)

  const [permissionSelected, setPermissionSelected] = useState<string[]>([])
  //   const [selectedRow, setSelectedRow] = useState({
  //     id: '',
  //     name: ''
  //   })
  const [selectedRow, setSelectedRow] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  // ** Query
  const queryClient = useQueryClient()

  // ** Permission
  const { VIEW, UPDATE, DELETE, CREATE } = usePermission('SYSTEM.ROLE', ['CREATE', 'VIEW', 'UPDATE', 'DELETE'])

  // ** Translate
  const { t } = useTranslation()

  // ** Ref
  const refActionGrid = useRef<boolean>(false)

  // ** theme
  const theme = useTheme()

  const handleOnchangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
  }

  // delete blog
  const fetchDeleteBlog = async (id: string) => {
    const res = await deleteBlog(id)

    return res?.data
  }

  // delete multiple blog
  const handleMultipleDeleteBlog = async (data: string[]) => {
    const res = await deleteMultipleBlog({ blogIds: data })

    return res?.data
  }

  const { isPending: isLoadingEdit, mutate: mutateEditBlog } = useMutationEditBlog({
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [queryKeys.blog_list, sortBy, searchBy, -1, -1] })
      toast.success(t('Update_blog_success'))
    },
    onError: () => {
      toast.success(t('Update_blog_error'))
    }
  })

  // hàm gọi toàn bộ giá trị bằng RQ (react query)
  const { data: blogsList, isPending } = useGetListBlogs(
    { limit: -1, page: -1, search: searchBy, order: sortBy },
    {
      //   select: data => data?.blogs,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 10000
    }
  )

  // xoá một blog từ RQ
  const { isPending: isLoadingDelete, mutate: mutateDeleteBlog } = useMutation({
    mutationFn: fetchDeleteBlog,
    mutationKey: [queryKeys.blog_delete],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [queryKeys.blog_list, sortBy, searchBy, -1, -1] })
      handleCloseConfirmDeleteBlog()
      toast.success(t('Delete_blog_success'))
    },
    onError: () => {
      toast.success(t('Delete_blog_error'))
    }
  })

  const { isPending: isLoadingMultipleDelete, mutate: mutateMultipleDeleteBlog } = useMutation({
    mutationFn: handleMultipleDeleteBlog,
    mutationKey: [queryKeys.blog_multiple_delete],
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [queryKeys.blog_list, sortBy, searchBy, -1, -1] })
      handleCloseConfirmDeleteMultipleBlog()
      toast.success(t('Delete_blog_success'))
    },
    onError: () => {
      toast.success(t('Delete_blog_error'))
    }
  })

  // handle
  const handleSort = (sort: GridSortModel) => {
    const sortOption = sort[0]
    setSortBy(`${sortOption.field} ${sortOption.sort}`)
  }

  const handleCloseConfirmDeleteBlog = useCallback(() => {
    setOpenDeleteBlog({
      open: false,
      id: ''
    })
    refActionGrid.current = false
  }, [])

  const handleCloseConfirmDeleteMultipleBlog = () => {
    setOpenDeleteMultipleBlog(false)
  }

  const handleDeleteMultipleBlog = () => {
    mutateMultipleDeleteBlog(selectedRow)
  }

  const handleDeleteBlog = useCallback(() => {
    mutateDeleteBlog(openDeleteBlog.id)
  }, [mutateDeleteBlog, openDeleteBlog.id])

  const handleAction = (action: string) => {
    switch (action) {
      case 'delete': {
        setOpenDeleteMultipleBlog(true)
        break
      }
    }
  }

  const handleCloseCreateEdit = useCallback(() => {
    setOpenCreateEdit({
      open: false,
      id: ''
    })
    refActionGrid.current = false
  }, [])

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name_blog'),
      flex: 1,
      minWidth: 150,
      renderCell: params => <Typography>{params.row?.name}</Typography>
    },
    {
      field: 'nameKo',
      headerName: t('Name_blog_ko'),
      flex: 1,
      minWidth: 150,
      renderCell: params => <Typography>{params.row?.nameKo}</Typography>
    },
    {
      field: 'nameEn',
      headerName: t('Name_blog_en'),
      flex: 1,
      minWidth: 150,
      renderCell: params => <Typography>{params.row?.nameEn}</Typography>
    },
    {
      field: 'nameJp',
      headerName: t('Name_blog_jp'),
      flex: 1,
      minWidth: 150,
      renderCell: params => <Typography>{params.row?.nameJp}</Typography>
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
                setOpenDeleteBlog({
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
        rowLength={blogsList?.totalPage}
      />
    )
  }
  console.log('««««« blogsList »»»»»', blogsList)

  return (
    <>
      {isPending && <Spinner />}

      <CreateEditBlog
        open={openCreateEdit.open}
        searchBy={searchBy}
        sortBy={sortBy}
        onClose={handleCloseCreateEdit}
        idBlog={openCreateEdit.id}
      />

      <ConfirmationDialog
        open={openDeleteBlog.open}
        handleClose={handleCloseConfirmDeleteBlog}
        handleCancel={handleCloseConfirmDeleteBlog}
        handleConfirm={handleDeleteBlog}
        title={t('Title_delete_city')}
        description={t('Confirm_delete_city')}
      />

      <ConfirmationDialog
        open={openDeleteMultipleBlog}
        handleClose={handleCloseConfirmDeleteMultipleBlog}
        handleCancel={handleCloseConfirmDeleteMultipleBlog}
        handleConfirm={handleDeleteMultipleBlog}
        title={t('Title_delete_multiple_city')}
        description={t('Confirm_delete_multiple_city')}
      />
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          display: 'flex',
          alignItems: 'center',
          padding: '1.25rem',
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
          {blogsList?.blogs && (
            <CustomDataGrid
              rows={blogsList?.blogs}
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
          )}
        </Grid>
      </Box>
    </>
  )
}

export default BlogListPage

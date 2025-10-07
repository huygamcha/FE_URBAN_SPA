'use client'

import React, { memo, Ref } from 'react'
import Box from '@mui/material/Box'
import { DataGrid, DataGridProps, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import { styled } from '@mui/material'

const StyleCustomGrid = styled(DataGrid)<DataGridProps>(({ theme }) => ({
  '.MuiDataGrid-withBorderColor': {
    outline: 'none !important'
  },
  '.MuiDataGrid-selectedRowCount': {
    display: 'none'
  },
  '.MuiDataGrid-columnHeaderTitle': {
    textTransform: 'capitalize',
    color: theme.palette.common.black
  },
  // Custom scrollbar
  '&::-webkit-scrollbar': {
    width: '2px', // Độ rộng của scrollbar dọc
    height: '2px' // Độ rộng của scrollbar ngang
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#757575', // Màu của thanh kéo
    borderRadius: '4px' // Bo tròn các góc
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f0f0f0' // Màu nền của track scrollbar
  }
}))

const CustomDataGrid = React.forwardRef((props: DataGridProps, ref: Ref<any>) => {
  return (
    <Box sx={{ height: '100%', width: '100%', overflow: 'auto' }}>
      <StyleCustomGrid {...props} />
    </Box>
  )
})

export default memo(CustomDataGrid)

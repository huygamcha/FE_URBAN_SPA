'use client'

import {
  BaseSelectProps,
  Box,
  InputLabel,
  InputLabelProps,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
  styled
} from '@mui/material'
import { useTranslation } from 'react-i18next'

interface TCustomSelect extends BaseSelectProps {
  options: { label: string; value: string }[]

  isNotText?: boolean
}

const StyledSelect = styled(Select)<SelectProps>(({ theme }) => ({
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
    padding: '8px 8px 8px 8px !important',
    // height: '38px',
    boxSizing: 'border-box',
    border: '0.063rem solid #000',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '0.5rem'
  },
  '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.Mui-error': {
    border: '0.063rem solid red'
  },
  // huyg bỏ vùng viền mặc đinh
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none' // Xóa bỏ viền
  },
  legend: {
    display: 'none'
  },
  svg: {
    top: 'calc(50% - .6em) !important'
  },
  '.MuiOutlinedInput-notchedOutline': {
    top: '-0px !important',
    bottom: '2px !important',
    height: '38px'
  }
}))

const CustomPlaceHolder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  left: '10px',
  zIndex: 2
}))

const StyledMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}))

const CustomSelect = (props: TCustomSelect) => {
  const { isNotText = false , value, label, onChange, fullWidth, placeholder, options, ...rest } = props
  const { t } = useTranslation()

  // MenuProps tùy chỉnh với style nền đỏ
  const MenuProps = {
    PaperProps: {
      sx: {
        // position: 'absolute',
        // width: '100%',
        // Tùy chỉnh scrollbar bằng cách sử dụng các pseudo-element CSS
        '&::-webkit-scrollbar': {
          width: '0.25rem' // Độ rộng của thanh cuộn
        },
        '&::-webkit-scrollbar-track': {
          background: '#f1f1f1' // Màu nền của track scrollbar
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#888', // Màu của thumb scrollbar
          borderRadius: '0.25rem' // Góc bo tròn của thumb scrollbar
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555' // Màu của thumb scrollbar khi hover
        }
      }
    }
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {((Array.isArray(value) && !value.length) || !value) && <CustomPlaceHolder>{placeholder}</CustomPlaceHolder>}
      <StyledSelect
        MenuProps={MenuProps} // Thêm MenuProps tùy chỉnh
        fullWidth={fullWidth}
        value={value}
        label={label}
        onChange={onChange}
        {...rest}
      >
        {options?.length > 0 ? (
          options?.map(opt => {
            return (
              <StyledMenuItem key={opt.value} value={opt.value}>
                {isNotText ?  opt.label : t(`${opt.label}`)}
              </StyledMenuItem>
            )
          })
        ) : (
          <StyledMenuItem>{t('No_data')}</StyledMenuItem>
        )}
      </StyledSelect>
    </Box>
  )
}

export default CustomSelect

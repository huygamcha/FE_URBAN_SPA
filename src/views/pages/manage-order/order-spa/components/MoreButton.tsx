'use client'

import { IconButton, Menu, MenuItem } from '@mui/material'
import { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import Icon from 'src/components/Icon'
import { AppDispatch } from 'src/stores'
import { updateStatusOrderSpaAsync } from 'src/stores/order-spa/actions'
import { TParamsStatusOrderUpdate } from 'src/types/order-spa'

type TProps = {
  memoOptionStatus: { label: string; value: string }[]
  data: any
}

const MoreButton = ({ memoOptionStatus, data }: TProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dispatch: AppDispatch = useDispatch()
  const {t, i18n} = useTranslation()

  const optionsOpen = Boolean(anchorEl)

  const handleOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleUpdateStatusOrder = (data: TParamsStatusOrderUpdate) => {
    dispatch(updateStatusOrderSpaAsync(data))
  }

  return (
    <>
      <IconButton onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)}>
        <Icon icon='pepicons-pencil:dots-y'></Icon>
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={optionsOpen}
        onClose={handleOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {memoOptionStatus?.map(item => {
          return (
            <MenuItem
              key={item.value}
              sx={{ '& svg': { mr: 2 } }}
              onClick={() => {
                handleUpdateStatusOrder({
                  id: data._id,
                  status: item.value
                })
                handleOptionsClose()
              }}
            >
              {t(`${item.label}`)}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}

export default MoreButton

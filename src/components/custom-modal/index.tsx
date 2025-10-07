'use client'

import { ModalProps, styled, Modal, Box, useTheme, Typography, IconButton } from '@mui/material'
import Icon from 'src/components/Icon'
import React from 'react'

interface TCustomModal extends ModalProps {}

const StyleModal = styled(Modal)<ModalProps>(({ theme }) => ({
  zIndex: 1300
}))

const CustomModal = (props: TCustomModal) => {
  const { children, open, onClose, title } = props
  const theme = useTheme()

  return (
    <StyleModal open={open} onClose={onClose} aria-labelledby='modal-modal-title'>
      <Box
        sx={{
          height: '100%',
          width: '100vw'
        }}
      >
        <Box sx={{ maxHeight: '100vh', overflow: 'auto' }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box sx={{ margin: '40px 0' }}>
              <Box
                sx={{
                  padding: '20px',
                  borderRadius: '15px',
                  backgroundColor: theme.palette.customColors.bodyBg
                }}
                minWidth={{ md: '800px', xs: '80vw' }}
                maxWidth={{ md: '80vw', xs: '80vw' }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', paddingBottom: '20px' }}>
                  <Typography variant='h4' sx={{ fontWeight: 600 }}>
                    {title}
                  </Typography>
                  <IconButton
                    sx={{ position: 'absolute', top: '-4px', right: '-10px' }}
                    onClick={onClose as unknown as React.MouseEventHandler<HTMLButtonElement>}
                  >
                    <Icon icon='material-symbols-light:close' fontSize={'30px'} />
                  </IconButton>
                </Box>
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </StyleModal>
  )
}

export default CustomModal

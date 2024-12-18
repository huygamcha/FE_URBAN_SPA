import IconifyIcon from 'src/components/Icon'
import { styled, useTheme, Box } from '@mui/material'

export function NextArrow(props: any) {
  const { className, style, onClick } = props
  const theme = useTheme()

  return (
    <div
      className={`${className} no-after`}
      onClick={onClick}
      style={{
        ...style,
        display: 'block',
        background: 'transparent',
        border: 'none',
        zIndex: 1,
        cursor: 'pointer'
      }}
    >
      <Box
        sx={{
          background: 'rgb(255, 255, 255, 0.7)',
          '&:hover': {
            background: `${theme.palette.primary.main}`,
            '& > svg': {
              color: '#fff !important'
            }
          }
        }}
        borderRadius='99px'
        width='max-content'
        p='0.5rem'
      >
        <IconifyIcon icon='mingcute:right-line' style={{ fontSize: '24px', color: theme.palette.text.primary }} />
      </Box>
    </div>
  )
}

export function PrevArrow(props: any) {
  const { className, style, onClick } = props
  const theme = useTheme()

  return (
    <div
      className={`${className} no-after`}
      onClick={onClick}
      style={{
        ...style,
        display: 'block',
        background: 'transparent',
        border: 'none',
        zIndex: 1,
        cursor: 'pointer'
      }}
    >
      <Box
        sx={{
          background: 'rgb(255, 255, 255, 0.7)',
          '&:hover': {
            background: `${theme.palette.primary.main}`,
            '& > svg': {
              color: '#fff !important'
            }
          }
        }}
        borderRadius='99px'
        width='max-content'
        p='0.5rem'
      >
        <IconifyIcon icon='mingcute:left-line' style={{ fontSize: '24px', color: theme.palette.text.primary }} />
      </Box>
    </div>
  )
}

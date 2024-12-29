'use client'

import { useMediaQuery, useTheme } from '@mui/material'

interface TResponsiveScreen {
  responsive: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const useResponsiveScreen = ({ responsive }: TResponsiveScreen) => {
  const theme = useTheme()
  const isResponsive = useMediaQuery(theme.breakpoints.up(responsive))

  return isResponsive
}

export default useResponsiveScreen

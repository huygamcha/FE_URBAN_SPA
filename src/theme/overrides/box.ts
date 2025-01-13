'use client'

// ** Type Import
import { OwnerStateThemeType } from '.'

// ** Hook Import

const Box = () => {
  // Hook & Var

  return {
    MuiBox: {
      styleOverrides: {
        root: ({ theme }: OwnerStateThemeType) => ({
          '&:hover': {
            background: theme.palette.customBackground.main
          }
        })
      }
    }
  }
}

export default Box

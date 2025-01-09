// src/contexts/DrawerContext.tsx
import React, { createContext, useContext, useState } from 'react'
// ** React
import { useTranslation } from 'react-i18next'
import { DrawerContextType } from './types'

const defaultDrawerContextType: DrawerContextType = {
  openBookingForm: false,
  setOpenBookingForm: () => {}
}

const DrawerContext = createContext(defaultDrawerContextType)

const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation()

  const [openBookingForm, setOpenBookingForm] = useState(defaultDrawerContextType.openBookingForm)

  return (
    <DrawerContext.Provider
      value={{
        openBookingForm,
        setOpenBookingForm
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}

export { DrawerContext, DrawerProvider }

// openAirSearch được sử dụng trong phần mobile

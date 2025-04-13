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
import CreateEditAbout from './component/CreateEditAbout'

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
    </>
  )
}

export default AboutListPage

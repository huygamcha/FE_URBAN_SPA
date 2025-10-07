'use client'

// ** Next
import { NextPage } from 'next'

// ** React
import { useState } from 'react'

// ** Component
import CreateEditAbout from './component/CreateEditAbout'

type TProps = {}

const AboutListPage: NextPage<TProps> = () => {
  // ** Translate

  // State

  // const [openCreateEdit, setOpenCreateEdit] = useState({
  //   open: true,
  //   id: '678f33bca37abbb25c8d15f9'
  // })

  const [openCreateEdit, setOpenCreateEdit] = useState({
    open: true,
    id: '68e0c02770a5eb03b4c3f804'
  })
  const handleCloseCreateEdit = () => {
    setOpenCreateEdit({
      open: false,
      id: ''
    })
  }

  return <CreateEditAbout open={openCreateEdit.open} onClose={handleCloseCreateEdit} idAbout={openCreateEdit.id} />
}

export default AboutListPage

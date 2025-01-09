'use client'
import { useContext } from 'react'
import { DrawerContext } from 'src/contexts/DrawerContext'

export const useDrawer = () => useContext(DrawerContext)

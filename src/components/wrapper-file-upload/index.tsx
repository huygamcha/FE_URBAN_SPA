'use client'

import React from 'react'
import { useDropzone } from 'react-dropzone'

interface TProps {

  multiple?: boolean
  children: React.ReactNode
  uploadFunc: (file: File) => void

  objectAcceptFile?: Record<string, string[]>
}

const WrapperFileUpload = (props: TProps) => {
  const { children, uploadFunc, objectAcceptFile } = props

  const { getRootProps, getInputProps } = useDropzone({
    accept: objectAcceptFile ? objectAcceptFile : {},
    onDrop: acceptedFiles => {
      uploadFunc(acceptedFiles[0])
    }
  })

  return (
    <div style={{ width: 'max-content' }} {...getRootProps({ className: 'dropzone' })}>
      <input multiple {...getInputProps()} />
      {children}
    </div>
  )
}

export default WrapperFileUpload

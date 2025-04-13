'use client'

import { FormHelperText, useTheme } from '@mui/material'
import { Box, BoxProps, InputLabel, styled } from '@mui/material'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ReactDraftWysiwyg from 'src/components/custom-editor/react-draft-wysiwyg'

interface TStyleWrapperEditor extends BoxProps {
  error?: boolean
}

interface TProps extends EditorProps {
  error?: boolean
  helperText?: string
  label?: string
}

const StyleWrapperEditor = styled(Box)<TStyleWrapperEditor>(({ theme, error }) => ({
  '.rdw-editor-wrapper': {
    borderRadius: 8,
    backgroundColor: 'transparent !important',
    border: error ? `1px solid ${theme.palette.error.main}` : `1px solid #000`
  },
  '.rdw-editor-toolbar': {
    border: 'none',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: theme.palette.background.paper,
    '.rdw-option-wrapper': {
      // backgroundColor: theme.palette.background.default,
      border: `1px solid #000`
    }
  },
  '.rdw-editor-main': {
    borderTop: `1px solid #000`,
    padding: '8px',
    minHeight: '200px',
    maxHeight: '200px',
    overflow: 'auto'
  }
}))

export function uploadCallback(
  file: File,
  uploadedImages: { file: File; localSrc: string }[],
  setUploadedImages: (images: { file: File; localSrc: string }[]) => void
) {
  const imageObject = {
    file: file,
    localSrc: URL.createObjectURL(file)
  }

  // const updatedImages = [...uploadedImages, imageObject]
  // setUploadedImages(updatedImages)

  // We need to return a promise with the image src
  // the img src we will use here will be what's needed
  // to preview it in the browser. This will be different than what
  // we will see in the index.md file we generate.
  return new Promise(resolve => {
    resolve({ data: { link: imageObject.localSrc } })
  })
}

const CustomEditor = (props: TProps) => {
  const { error, label, helperText, ...rests } = props

  /// ** Hooks
  const theme = useTheme()

  return (
    <StyleWrapperEditor error={error}>
      <InputLabel
        sx={{
          fontSize: '0.9rem',
          pb: '0.5rem',
          fontWeight: '600',
          color: error ? theme.palette.error.main : `rgba(${theme.palette.customColors.main}, 0.42)`
        }}
      >
        {label}
      </InputLabel>
      <ReactDraftWysiwyg
        toolbar={{
          image: {
            previewImage: true,
            uploadCallback: (file: File) => {
              return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => {
                  resolve({
                    data: {
                      url: reader.result
                    }
                  })
                }

                reader.onerror = reason => reject(reason)

                reader.readAsDataURL(file)
              })
            },
            alt: { present: true, mandatory: true }
          }
        }}
        handlePastedText={() => false}
        {...rests}
      />
      {helperText && (
        <FormHelperText
          sx={{
            color: theme.palette.error.main,
            marginTop: '10px'
          }}
        >
          {helperText}
        </FormHelperText>
      )}
    </StyleWrapperEditor>
  )
}

export default CustomEditor

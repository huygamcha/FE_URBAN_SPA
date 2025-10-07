'use client'

import { FormHelperText, useTheme } from '@mui/material'
import { Box, BoxProps, InputLabel, styled } from '@mui/material'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import ReactDraftWysiwyg from 'src/components/custom-editor/react-draft-wysiwyg'
import { uploadImageToCloud } from 'src/utils'

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
  '.rdw-dropdown-selectedtext': {
    border: error ? `1px solid ${theme.palette.error.main}` : `1px solid #000`
  },
  '.rdw-dropdown-wrapper:hover': {
    boxShadow: 'none'
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
  },
  '.rdw-image-modal': {
    zIndex: 100,
    backgroundColor: '#ffffff',
    boxShadow: '3px 3px 5px #BFBDBD',
    borderRadius: 12,
    padding: 24,
    minWidth: 320,
    left: '-300px'
  },
  '.rdw-image-modal-header-option': {
    padding: '10px 16px',
    fontWeight: 500,
    borderBottom: '2px solid transparent',
    color: '#555',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out'
  },

  '.rdw-image-modal-header-option-active': {
    borderBottom: `2px solid ${theme?.palette?.primary?.main || '#1976d2'}`,
    color: theme?.palette?.primary?.main || '#1976d2'
  },

  '.rdw-image-modal-upload-option': {
    border: '2px dashed #cfd8dc',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    color: '#666',
    fontSize: 14,
    padding: 20,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out'
  },

  '.rdw-image-modal-upload-option:hover': {
    borderColor: theme?.palette?.primary?.main || '#1976d2',
    backgroundColor: '#e3f2fd',
    color: theme?.palette?.primary?.main || '#1976d2'
  },
  '.rdw-image-modal-alt-lbl': {
    width: '50px'
  },
  '.rdw-image-modal-alt-input': {
    width: 'calc(100% - 50px)',
    padding: '10px 12px',
    border: '1px solid #ccc',
    height: '36px',
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#333',
    transition: 'border-color 0.3s ease'
  },

  '.rdw-image-modal-alt-input:focus': {
    outline: 'none',
    borderColor: theme?.palette?.primary?.main || '#1976d2',
    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
  },

  '.rdw-image-modal-size-input': {
    width: '48%',
    height: '36px',
    display: 'inline-block',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: 8,
    fontSize: 14,
    backgroundColor: '#fff',
    color: '#333',
    transition: 'border-color 0.3s ease'
  },

  '.rdw-image-modal-size-input:last-child': {
    marginRight: 0
  },

  '.rdw-image-modal-size-input:focus': {
    outline: 'none',
    borderColor: theme?.palette?.primary?.main || '#1976d2',
    boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
  },

  '.rdw-image-modal-btn': {
    marginTop: 10,
    padding: '10px 24px',
    backgroundColor: theme?.palette?.primary?.main || '#1976d2',
    color: '#ffffff',
    border: 'none',
    borderRadius: 8,
    fontWeight: 500,
    fontSize: 14,
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  '.rdw-image-modal-btn:disabled': {
    backgroundColor: '#e0e0e0',
    color: '#9e9e9e',
    cursor: 'not-allowed'
  },

  '.rdw-image-modal-btn:not(:disabled):hover': {
    backgroundColor: '#1565c0'
  },
  '.rdw-image-modal-btn-section': {
    margin: '0px',
    display: 'flex',
    justifyContent: 'center'
  }
}))

// Hàm upload ảnh
const uploadImageCallBack = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  const result = await uploadImageToCloud(formData)

  return { data: { link: result.data } }
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
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'history',
            'emoji',
            'image',
            'link',
            'embedded',
            'colorPicker',
            'remove'
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },

          image: {
            uploadCallback: uploadImageCallBack,
            previewImage: true,
            alt: { present: true, mandatory: false }
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

import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Select from './index'

const meta = {
  title: 'InputComponent/Select',
  component: Select,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: {
        type: 'text'
      },
      defaultValue: '',
      description: 'value of input'
    },
    sx: {
      control: {
        type: 'object'
      },
      defaultValue: {
        // "&.MuiInputBase-root": {
        width: '200px'
        // }
      },
      description: 'styled of select'
    },
    fullWidth: {
      description: 'width of select',
      defaultValue: true,
      control: { type: 'boolean' }
    },
    placeholder: {
      control: {
        type: 'text'
      },
      defaultValue: 'Enter input',
      description: 'placeholder of input'
    },
    onChange: { description: 'handle onchangeInput' },
    disabled: { description: 'disable input', defaultValue: false, control: { type: 'boolean' } },
    options: {
      description: 'list option of select',
      defaultValue: [{ label: 'option1', value: '1' }]
    },
    color: {
      description: `theme of input 'primary'
                        | 'secondary'
                        | 'error'
                        | 'info'
                        | 'success'
                        | 'warning'
                        | string`,
                        options: ['secondary', 'primary'],
      control: {
        type: 'select',
        defaultValue: 'primary'
      }
    },
    variant: {
      description: 'variant of select',
      defaultValue: 'outlined',
      control: { type: 'radio' },
      options: ['filled', 'outlined', 'standard']
    }
  },
  args: { onChange: fn() }
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const PlaceholderSelect: Story = {
  args: {
    placeholder: 'select',
    value: '',
    options: [{ label: '1', value: '1' }],
    sx: {
      width: '200px'
    }
  }
}

export const ValueSelect: Story = {
  args: {
    placeholder: 'select',
    value: '1',
    options: [
      { label: '1', value: '1' },
      { label: '2', value: '2' }
    ],
    sx: {
      width: '200px'
    }
  }
}

// export const Primary: Story = {
//       args: {
//             placeholder: 'enter input',
//             color: 'primary',
//             value: 'Lập trình thật dễ'
//       }
// }

// export const Secondary: Story = {
//       args: {
//             placeholder: 'enter input',
//             color: 'secondary',
//             value: 'Lập trình thật dễ'
//       }
// }

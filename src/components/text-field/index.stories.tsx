import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import TextField from './index'

const meta = {
      title: 'InputComponent/TextField',
      component: TextField,
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
            placeholder: {
                  control: {
                        type: 'text'
                  },
                  defaultValue: 'Enter input',
                  description: 'placeholder of input'
            },
            onChange: { description: 'handle onchangeInput' },
            helperText: { description: 'text when input error', defaultValue: 'Please input text', control: {type: 'text'} },
            disabled: { description: 'disable input', defaultValue: false, control: {type: 'boolean'} },
            color: {
                  description: `theme of input 'primary'
                        | 'secondary'
                        | 'error'
                        | 'info'
                        | 'success'
                        | 'warning'
                        | string`,
                  control: {
                        type: 'text',
                        defaultValue: 'primary'
                  }
            }
      },
      args: { onChange: fn() }
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const PlaceholderTextfield: Story = {
      args: {
            placeholder: 'enter input',
            value: ''
      }
}

export const ValueTextfield: Story = {
      args: {
            placeholder: 'enter input',
            value: 'Lập trình thật dễ'
      }
}

export const Primary: Story = {
      args: {
            placeholder: 'enter input',
            color: 'primary',
            value: 'Lập trình thật dễ'
      }
}

export const Secondary: Story = {
      args: {
            placeholder: 'enter input',
            color: 'secondary',
            value: 'Lập trình thật dễ'
      }
}


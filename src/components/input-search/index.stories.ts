import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import InputSearch from './index'

const meta = {
  title: 'InputComponent/InputSearch',
  component: InputSearch,
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
    onChange: {description: 'handle onchangeInput'}
  },
  args: { onChange: fn() }
} satisfies Meta<typeof InputSearch>

export default meta
type Story = StoryObj<typeof meta>

export const PlaceholderInput: Story = {
  args: {
    placeholder: 'enter input',
    value: ''
  }
}

import { render } from '@testing-library/react'
import { SettingsConsumer, SettingsProvider } from 'src/contexts/SettingsContext'
import ThemeComponent from 'src/theme/ThemeComponent'

import '@testing-library/react'

const renderWithProvider = (ui: React.ReactNode) => {
  render(
    <SettingsProvider>
      <SettingsConsumer>
        {({ settings }) => {
          return <ThemeComponent settings={settings}>{ui}</ThemeComponent>
        }}
      </SettingsConsumer>
    </SettingsProvider>
  )
}

export default renderWithProvider

"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ReactNode, useState } from "react"
import { Provider } from "react-redux"
import { AuthProvider } from "src/contexts/AuthContext"
import { AxiosInterceptor } from "src/helpers/axios"
import { store } from "src/stores"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SettingsConsumer, SettingsProvider } from "src/contexts/SettingsContext"
import ThemeComponent from 'src/theme/ThemeComponent'
import ReactHotToast from "src/components/react-hot-toast"
import { Toaster } from "react-hot-toast"
import { useTheme } from "@mui/material"

export const StoreWrapper = ({ children }: { children: ReactNode }) => {
      const [queryClient] = useState(() => new QueryClient())
      const theme = useTheme()

      const toastOptions = {
            success: {
                  className: 'react-hot-toast',
                  style: {
                        background: '#DDF6E8',
                        color: theme.palette.text.primary
                  }
            },
            error: {
                  className: 'react-hot-toast',
                  style: {
                        background: '#FDE4D5',
                        color: theme.palette.text.primary
                  }
            }
      }

      return (
            <Provider store={store}>
                  <QueryClientProvider client={queryClient}>
                        <AuthProvider>
                              <AxiosInterceptor>
                                    <SessionProvider>
                                          <SettingsProvider>
                                                <SettingsConsumer>
                                                      {({ settings }) => {
                                                            return (
                                                                  <ThemeComponent settings={settings}>
                                                                        {children}
                                                                        <ReactHotToast>
                                                                              <Toaster position={settings.toastPosition}
                                                                                    toastOptions={toastOptions} />
                                                                        </ReactHotToast>
                                                                  </ThemeComponent>
                                                            )
                                                      }}
                                                </SettingsConsumer>
                                          </SettingsProvider>
                                    </SessionProvider>
                              </AxiosInterceptor>
                        </AuthProvider>
                        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
                  </QueryClientProvider>
            </Provider>
      )
}
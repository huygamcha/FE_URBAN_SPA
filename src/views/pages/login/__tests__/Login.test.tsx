
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

import LoginPage from 'src/views/pages/login'

import renderWithProvider from 'src/utils/jest-utils'
import { signIn } from "next-auth/react"
import { ROUTE_CONFIG } from "src/configs/route"

const mockLogin = jest.fn()
const mockLoginGoogle = jest.fn()
const mockPushRouter = jest.fn()

let dataSession:any = {
      expires: new Date(Date.now() + 2 * 86400).toISOString(),
      user: { username: "admin" },
}

jest.mock('react-i18next', () => ({
      useTranslation: () => ({
            i18n: { language: 'vi' },
            t: (key: string) => key
      })
}))

jest.mock('src/hooks/useAuth', () => ({
      useAuth: () => ({
            login: mockLogin,
            loginGoogle: mockLoginGoogle,
            loginFacebook: jest.fn(),

      })
}))
jest.mock('react-redux')
jest.mock('next/navigation', () => ({
      useRouter: () => ({
            push: mockPushRouter
      })
}))
jest.mock('next-auth/react', () => ({
      useSession: () => ({
            data: dataSession,
            status: 'authenticated'
      }),
      signIn:jest.fn()
}))

describe('Testing login page', () => {

      const renderComponent = () => {

            renderWithProvider(
                  <LoginPage />
            )
      }
      test('render correct login page', async () => {
            renderComponent()
           
            expect(screen.getByText('Login')).toBeInTheDocument()
            expect(screen.getByPlaceholderText('Enter_email')).toBeInTheDocument()
            expect(screen.getByText('You_have_account')).toBeInTheDocument()
      })

      test('Validate form when empty', async () => {
            renderComponent()
            const btnLogin = screen.getByText('Sign In')
            const inputEmail = screen.getByPlaceholderText('Enter_email')
            fireEvent.change(inputEmail, {target: {value : 'email@gmail.com'}})
            fireEvent.click(btnLogin)
         
            await waitFor(() => {
                  expect(screen.getByText('Required_field')).toBeInTheDocument()
            })
      })

      test('Login success with email and password', async () => {
            const email = 'email@gmail.com'
            const password = 'Apple123@'

            renderComponent()
            const btnLogin = screen.getByText('Sign In')
            const inputEmail = screen.getByPlaceholderText('Enter_email')
            const inputPassword = screen.getByPlaceholderText('Enter_password')

            fireEvent.change(inputEmail, {target: {value : email}})
            fireEvent.change(inputPassword, {target: {value : password}})

            fireEvent.click(btnLogin)
         
            await waitFor(() => {
                  expect(mockLogin).toHaveBeenCalledWith(
                        {
                        email, password, rememberMe: true, deviceToken: ''
                  },
                  expect.any(Function)
            )
            })
      })

      test('Login success with google', async () => {
            const token = 'sdfygshjkdsjksjd'
            const provider = 'google'
            dataSession = {
                  ...dataSession,
                  accessToken: token,
                  provider
            }
            renderComponent()
            const btnLogin = screen.getByTestId('btn-google')
            fireEvent.click(btnLogin)
            await waitFor(() => {
                  expect(mockLoginGoogle).toHaveBeenCalledWith(
                        {
                              idToken: token, rememberMe: true, deviceToken: ''
                  },
                  expect.any(Function)
            )
            })
      })

      test('navigate forgot password page', async () => {
            renderComponent()

            const forgotPassword = screen.getByText('Forgot_password?')
            fireEvent.click(forgotPassword)
            await waitFor(() => {
                  expect(mockPushRouter).toHaveBeenCalledWith(`${ROUTE_CONFIG.FORGOT_PASSWORD}`)
            })
      })

})

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/jest-globals'
import 'jest'
import '@testing-library/react'
import 'ts-jest'


jest.spyOn(console, 'warn').mockImplementation(() => {})

// Suppress all error messages
jest.spyOn(console, 'error').mockImplementation(() => {})
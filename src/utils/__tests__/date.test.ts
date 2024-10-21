
import { describe, expect, test, beforeEach,beforeAll } from '@jest/globals'
import { formatDate, getTimePast } from '../date'

describe('test date utils file', () => {
  describe('test getTimePast function', () => {
    const t = (key:string) => key
    
    test('should return recently', () => {
      const recentInput = new Date(Date.now() - 1000 * 60 * 60) // 1 hours
      expect(getTimePast(recentInput,t)).toBe('recently')
    })

    test('should return days value', () => {
      const t = (key:string) => key
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days
      expect(getTimePast(pastDate,t)).toBe('3 day')
    })

    test('should return months value', () => {
      const t = (key:string) => key
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 60) // 60 days
      expect(getTimePast(pastDate,t)).toBe('2 month')
    })

    test('should return days value', () => {
      const t = (key:string) => key
      const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2) // 2 year
      expect(getTimePast(pastDate,t)).toBe('2 year')
    })
  })

  describe('test formatDate function', () => {
    test('test formatting default', () => {
      const input = new Date('2024-7-15')
      expect(formatDate(input)).toBe('15/7/2024')
    })

    test('test custom formatting', () => {
      const input = new Date('2024-7-15')
      const formatting:any = { month: 'long', day: 'numeric', year: 'numeric' }
      expect(formatDate(input,formatting)).toBe('15 tháng 7, 2024')
    })
  })
})

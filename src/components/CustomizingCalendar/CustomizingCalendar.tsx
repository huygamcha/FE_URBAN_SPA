'use client'

import moment from 'moment'
import Calendar from './Calender'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Box } from '@mui/material'
import { useGetListAppointments } from 'src/queries/appointments'
import Spinner from '../spinner'
import { isObject } from '@mui/x-data-grid/internals'
import { useState } from 'react'

const ControlCalendar = () => {
  const today = new Date()
  // ** State
  const [duration, setDuration] = useState<{ start: string; end: string }>({
    start: moment().startOf('month').format('YYYY-MM-DD'),
    end: moment().endOf('month').format('YYYY-MM-DD')
  })

  const { data: allAppointments, isPending } = useGetListAppointments(
    { start: duration.start, end: duration.end },
    {
      select: data =>
        data?.totalAppointments.map((item: any) => {
          return {
            ...item,
            start: moment(item.start).subtract(7, 'hour').toDate(), // Giữ nguyên thời gian UTC
            end: moment(item.end).subtract(7, 'hour').toDate() // Giữ nguyên thời gian UTC
          }
        }),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 10000,
      enabled: !!duration?.start && !!duration?.end
    }
  )

  console.log('««««« allAppointments »»»»»', allAppointments)
  const handleChange = (e: any) => {
    if (Array.isArray(e)) {
      if (e.length === 7) {
        const startDate = moment(e[0]).format('YYYY-MM-DD')
        const endDate = moment(e[6]).format('YYYY-MM-DD')
        setDuration(prev => ({
          ...prev,
          start: startDate,
          end: endDate
        }))
      } else {
        console.log('««««« e »»»»»', e)
        const startDate = moment(e[0]).format('YYYY-MM-DD')
        setDuration(prev => ({
          ...prev,
          start: startDate,
          end: startDate
        }))
      }
    } else if (isObject(e)) {
      const startDate = moment(e['start']).format('YYYY-MM-DD')
      const endDate = moment(e['end']).format('YYYY-MM-DD')
      setDuration(prev => ({
        ...prev,
        start: startDate,
        end: endDate
      }))
    }
  }

  return (
    <>
      {isPending && <Spinner />}
      <Box
        sx={{
          '& .rbc-calendar': {
            background: '#fff'
          }
        }}
      >
        <Calendar
          min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9)}
          max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22)}
          style={{ height: 600, width: '100%' }}
          events={allAppointments}
          onRangeChange={handleChange}
          formats={{ dayHeaderFormat: (date: any) => moment(date).format('dddd @ DD') }}
          step={15}
        />
      </Box>
    </>
  )
}

export default ControlCalendar

'use client'

import moment from 'moment'
import Calendar from './Calender'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Box } from '@mui/material'
import { useGetListAppointments } from 'src/queries/appointments'
import Spinner from '../spinner'

const events = [
  {
    start: moment('2025-01-19T14:00:00').toDate(),
    end: moment('2025-01-19T15:00:00').toDate(),
    title: 'Massage chân'
  },
  {
    start: moment('2025-01-20T11:00:00').toDate(),
    end: moment('2025-01-20T15:30:00').toDate(),
    title: 'Xông hơi'
  },
  {
    start: moment('2025-01-19T14:00:00').toDate(),
    end: moment('2025-01-19T15:00:00').toDate(),
    title: 'Thư giãn'
  },
  {
    start: moment('2025-01-19T14:30:00').toDate(),
    end: moment('2025-01-19T15:30:00').toDate(),
    title: 'Thư giãn'
  }
]

console.log('««««« events »»»»»', events)

const ControlCalendar = () => {
  const today = new Date()
  const { data: allAppointments, isPending } = useGetListAppointments(
    { start: '2025-01-12', end: '2025-01-30' },
    {
      select: data =>
        data?.totalAppointments.map((item: any) => {
          console.log('««««« item »»»»»', item)

          return {
            ...item,
            start: moment(item.start).toDate(), // Giữ nguyên thời gian UTC
            end: moment(item.end).toDate() // Giữ nguyên thời gian UTC
          }
        }),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 10000
    }
  )
  console.log('««««« allAppointments »»»»»', allAppointments)
  const handleChange = (e: any) => {
    console.log('««««« e »»»»»', e)
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

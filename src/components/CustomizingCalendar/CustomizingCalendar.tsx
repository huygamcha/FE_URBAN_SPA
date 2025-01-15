'use client'

import moment from 'moment'
import Calendar from './Calender'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Box } from '@mui/material'

const events = [
  {
    start: moment('2025-01-19T14:00:00').toDate(),
    end: moment('2025-01-19T15:30:00').toDate(),
    title: 'Massage chân'
  },
  {
    start: moment('2025-01-20T11:00:00').toDate(),
    end: moment('2025-01-20T15:30:00').toDate(),
    title: 'Xông hơi'
  },
  {
    start: moment('2025-01-19T14:00:00').toDate(),
    end: moment('2025-01-19T15:30:00').toDate(),
    title: 'Thư giãn'
  },
  {
    start: moment('2025-01-20T11:00:00').toDate(),
    end: moment('2025-01-20T15:30:00').toDate(),
    title: 'Xông hơi'
  },
  {
    start: moment('2025-01-19T14:00:00').toDate(),
    end: moment('2025-01-19T15:30:00').toDate(),
    title: 'Thư giãn'
  },
  {
    start: moment('2025-01-19T14:00:00').toDate(),
    end: moment('2025-01-19T15:30:00').toDate(),
    title: 'Thư giãn'
  },
  {
    start: moment('2025-01-20T11:00:00').toDate(),
    end: moment('2025-01-20T15:30:00').toDate(),
    title: 'Xông hơi'
  },
  {
    start: moment('2025-01-19T14:00:00').toDate(),
    end: moment('2025-01-19T15:30:00').toDate(),
    title: 'Thư giãn'
  }
]

const ControlCalendar = () => {
  return (
    <Box
      padding='3% 5%'
      sx={{
        '& .rbc-calendar': {
          background: '#fff'
        }
      }}
    >
      <Calendar
        style={{ height: 500, width: '95%' }}
        events={events}
        formats={{ dayHeaderFormat: date => moment(date).format('dddd @ DD') }}
      />
    </Box>
  )
}

export default ControlCalendar

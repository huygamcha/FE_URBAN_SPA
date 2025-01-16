import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from 'src/configs/queryKey'
import { getAllAppointments } from 'src/services/appointments'

// ** Services

// ** Types
import { TParamsEditAppointment, TParamsGetAppointments } from 'src/types/appointments'

export const useGetListAppointments = (
  params: TParamsGetAppointments,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: [queryKeys.appointment_list, params.start, params.end],
    queryFn: async () => {
      const res = await getAllAppointments({ params: { ...params } })

      return res.data
    },
    ...options
  })
}

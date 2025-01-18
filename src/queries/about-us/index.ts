import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { queryKeys } from 'src/configs/queryKey'
import { updateAbout } from 'src/services/about'
import { TParamsEditAbout } from 'src/types/about'

export const useMutationEditAbout = (
  options?: Omit<UseMutationOptions<any, unknown, TParamsEditAbout>, 'mutationKey' | 'mutationFn'>
) => {
  return useMutation({
    mutationFn: async data => {
      const res = await updateAbout(data)

      return res.data
    },
    mutationKey: [queryKeys.update_about],
    ...options
  })
}
